import { Trade } from "@prisma/client";

import { ServiceErrorException } from "../../exceptions/service-error.exception";
import { TTradePeriodType } from "./trade.types";

const periodToDays: Record<TTradePeriodType, number | null> = {
  "7d": 7,
  "15d": 15,
  "1m": 30,
  "6m": 180,
  "1y": 365,
};

const dataPointsConfig: Record<TTradePeriodType, number> = {
  "7d": 7,
  "15d": 7,
  "1m": 7,
  "6m": 6,
  "1y": 12,
};

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const calculateProfitLossByDate = (
  trades: Trade[],
  period: TTradePeriodType,
) => {
  try {
    const now = new Date();
    const days = periodToDays[period];

    let startDate: Date;
    if (["1y", "6m"].includes(period)) {
      // For 1y, start from 12 months ago from the current month
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      startDate = new Date(currentYear - 1, currentMonth, 1);
    } else {
      startDate = days
        ? new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
        : new Date(0);
    }

    const filteredTrades = trades.filter(
      (trade) => new Date(trade.date) >= startDate,
    );

    // Sort trades by date
    filteredTrades.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const targetDataPoints = dataPointsConfig[period];
    const tradesWithProfitLoss = [];
    let cumulativeProfitLoss = 0;

    if (["1y", "6m"].includes(period)) {
      // For 1y, generate monthly data points from current month going backwards
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      for (let i = 0; i < targetDataPoints; i++) {
        // Calculate the month going backwards from current month
        const monthsBack = targetDataPoints - 1 - i;
        const targetYear =
          currentMonth - monthsBack < 0 ? currentYear - 1 : currentYear;
        const targetMonth =
          currentMonth - monthsBack < 0
            ? 12 + (currentMonth - monthsBack)
            : currentMonth - monthsBack;

        const monthDate = new Date(targetYear, targetMonth, 1);
        const nextMonthDate = new Date(targetYear, targetMonth + 1, 1);

        const label = monthNames[targetMonth];

        // Find trades within this month
        const tradesInMonth = filteredTrades.filter((trade) => {
          const tradeDate = new Date(trade.date);
          return tradeDate >= monthDate && tradeDate < nextMonthDate;
        });

        // Calculate profit/loss for trades in this month
        let monthProfitLoss = 0;
        tradesInMonth.forEach((trade) => {
          if (trade.exitPrice && trade.date) {
            monthProfitLoss +=
              (trade.exitPrice - trade.entryPrice) * trade.quantity;
          }
        });

        // Add to cumulative total
        cumulativeProfitLoss += monthProfitLoss;

        tradesWithProfitLoss.push({
          label,
          value: cumulativeProfitLoss,
        });
      }
    } else {
      // For other periods, use the existing interval-based logic
      const totalDays = days || 365;
      const interval = Math.max(1, Math.floor(totalDays / targetDataPoints));

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
