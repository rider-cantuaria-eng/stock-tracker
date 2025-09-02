import { Injectable, NotFoundException } from "@nestjs/common";
import { Trade } from "@prisma/client";

import { TradeDto, UpdateTradeDto } from "./repository/dto";
import { TradeRepository } from "./repository/trade.repository";
import { PortfolioService } from "../portfolio/portfolio.service";
import { ServiceErrorException } from "src/exceptions/service-error.exception";

@Injectable()
export class TradeService {
  constructor(
    private readonly tradeRepo: TradeRepository,
    private readonly portfolioService: PortfolioService,
  ) {}

  async _findTradeAndPortfolio(tradeId: string, portfolioId: string) {
    console.debug(
      `checking if trade ${tradeId} and portfolio ${portfolioId} exist on database`,
    );

    const portfolio =
      await this.portfolioService.findPortfolioById(portfolioId);

    const trade = await this.tradeRepo.findById(tradeId);

    if (!trade) {
      throw new NotFoundException(`Trade ${tradeId} not found`);
    }

    console.debug(
      `trade ${tradeId} and portfolio ${portfolioId} fetched on database`,
    );

    return {
      portfolio,
      trade,
    };
  }

  async create(portfolioId: string, tradeData: TradeDto) {
    try {
      await this.portfolioService.findPortfolioById(portfolioId);

      const createdTrade = await this.tradeRepo.create({
        ...tradeData,
        portfolioId,
      });

      console.debug("trade created on database...", createdTrade);

      return createdTrade;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(
        `Error creating trade for portfolio ${portfolioId}`,
      );
    }
  }

  async findAllByPortfolio(portfolioId: string) {
    try {
      const portfolio =
        await this.portfolioService.findPortfolioById(portfolioId);
      const trades = await this.tradeRepo.findAllByPortfolio(portfolioId);

      console.debug("trades fetched on database...", trades);

      return {
        portfolio,
        trades,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceErrorException(
        `Error fetching trades for portfolio ${portfolioId}`,
      );
    }
  }

  async findById(tradeId: string, portfolioId: string) {
    try {
      const { trade } = await this._findTradeAndPortfolio(tradeId, portfolioId);

      if (!trade) {
        throw new NotFoundException(`Trade ${tradeId} not found`);
      }

      console.debug("trade fetched on database...", trade);

      return trade;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(
        `Error fetching trade ${tradeId} for portfolio ${portfolioId}`,
      );
    }
  }

  async update(tradeId: string, portfolioId: string, data: Partial<TradeDto>) {
    try {
      const { trade } = await this._findTradeAndPortfolio(tradeId, portfolioId);

      const updatedTrade = await this.tradeRepo.update(tradeId, {
        ...data,
        date: data.date ? new Date(data.date) : trade.date, // if date is not provided, use the existing date
      });

      console.debug("trade updated on database...", updatedTrade);

      return updatedTrade;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(
        `Error updating trade ${tradeId} for portfolio ${portfolioId}`,
      );
    }
  }

  async delete(tradeId: string, portfolioId: string) {
    try {
      await this._findTradeAndPortfolio(tradeId, portfolioId);

      const trade = await this.tradeRepo.delete(tradeId);

      console.debug("trade deleted on database...", tradeId);

      return trade;
    } catch (error) {
      console.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new ServiceErrorException(
        `Error deleting trade ${tradeId} for portfolio ${portfolioId}`,
      );
    }
  }

  async deleteAll(portfolioId: string) {
    try {
      const portfolio =
        await this.portfolioService.findPortfolioById(portfolioId);

      const { count } =
        await this.tradeRepo.deleteAllByPortfolioId(portfolioId);

      console.debug(
        `${count} trade${count > 1 ? "s" : ""} deleted on database for portfolio ${portfolioId}`,
      );

      return {
        portfolio,
        totalTradesDeleted: count,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceErrorException(
        `Error deleting all trades for portfolio ${portfolioId}`,
      );
    }
  }
}
