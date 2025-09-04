import { Trade } from "@prisma/client";

import { ServiceErrorException } from "../../exceptions/service-error.exception";
import { TTradePeriodType } from "./trade.types";

const periodToDays: Record<TTradePeriodType, number | null> = {
  "7d": 7,
  "15d": 15,
  "1m": 30,
  "6m": 180,
  "1y": 365,
  all: null,
};

const dataPointsConfig: Record<TTradePeriodType, number> = {
  "7d": 7,
  "15d": 5,
  "1m": 10,
  "6m": 6,
  "1y": 12,
  all: 12,
};

export const calculateProfitLossByDate = (
  trades: Trade[],
  period: TTradePeriodType,
) => {
  try {
    const now = new Date();
    const days = periodToDays[period];
    const startDate = days
      ? new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
      : new Date(0);

    const filteredTrades = trades.filter(
      (trade) => new Date(trade.date) >= startDate,
    );

    // Sort trades by date
    filteredTrades.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const targetDataPoints = dataPointsConfig[period];
    const totalDays = days || 365;
    const interval = Math.max(1, Math.floor(totalDays / targetDataPoints));

    // Generate evenly spaced data points
    const tradesWithProfitLoss = [];
    let cumulativeProfitLoss = 0;

    for (let i = 0; i < targetDataPoints; i++) {
      const dayOffset = i * interval;
      const intervalEndDate = new Date(
        startDate.getTime() + (dayOffset + interval) * 24 * 60 * 60 * 1000,
      );
      const label = `${intervalEndDate.getMonth() + 1}/${intervalEndDate.getDate()}`;

      // Find trades within this interval
      const tradesInInterval = filteredTrades.filter((trade) => {
        const tradeDate = new Date(trade.date);
        const intervalStartDate = new Date(
          startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000,
        );
        return tradeDate >= intervalStartDate && tradeDate < intervalEndDate;
      });

      // Calculate profit/loss for trades in this interval
      let intervalProfitLoss = 0;
      tradesInInterval.forEach((trade) => {
        if (trade.exitPrice && trade.date) {
          intervalProfitLoss +=
            (trade.exitPrice - trade.entryPrice) * trade.quantity;
        }
      });

      // Add to cumulative total
      cumulativeProfitLoss += intervalProfitLoss;

      tradesWithProfitLoss.push({
        label,
        value: cumulativeProfitLoss,
      });
    }

    return tradesWithProfitLoss;
  } catch (error) {
    console.error(error);

    throw new ServiceErrorException(
      `Error calculating profit/loss by date for period ${period}`,
    );
  }
};

/**
 * Calculate total trades value
 * If trade has exitPrice, use exitPrice * quantity
 * If trade doesn't have exitPrice, use entryPrice * quantity (open position)
 */
export const calculatePortfolioBalance = (trades: Trade[]) => {
  const totalTradesValue = trades.reduce((total, trade) => {
    const price = trade.exitPrice || trade.entryPrice;
    return total + price * trade.quantity;
  }, 0);

  return totalTradesValue;
};

export const calculateProfitLoss = (trades: Trade[]) => {
  const profitLoss = trades.reduce((total, trade) => {
    if (!trade.exitPrice) return total;

    const difference =
      trade.exitPrice * trade.quantity - trade.entryPrice * trade.quantity;

    return total + difference;
  }, 0);

  return profitLoss;
};

// all money invested in the trades
export const calculateCollateral = (trades: Trade[]) => {
  const collateral = trades.reduce((total, trade) => {
    return total + trade.entryPrice * trade.quantity;
  }, 0);

  return collateral;
};

export const calculateProfitLossPercentage = (trades: Trade[]) => {
  const profitLoss = calculateProfitLoss(trades);
  const collateral = calculateCollateral(trades);
  const profitLossPercentage =
    collateral > 0 ? (profitLoss / collateral) * 100 : 0;

  return profitLossPercentage;
};
