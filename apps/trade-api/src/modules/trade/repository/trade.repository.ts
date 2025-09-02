import { Injectable } from "@nestjs/common";
import { PrismaClient, Trade } from "@prisma/client";

import { CreateTradeDto } from "./dto/create-trade.dto";

@Injectable()
export class TradeRepository {
  private prisma = new PrismaClient();

  async create(tradeData: CreateTradeDto): Promise<Trade> {
    console.debug("creating trade on database...", tradeData);
    return this.prisma.trade.create({ data: tradeData });
  }

  async findAllByPortfolio(portfolioId: string): Promise<Trade[]> {
    console.debug(
      "finding all trades on database for portfolio...",
      portfolioId,
    );
    return this.prisma.trade.findMany({ where: { portfolioId } });
  }

  async findById(id: string): Promise<Trade | null> {
    console.debug("finding trade on database...", id);
    return this.prisma.trade.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<Trade>): Promise<Trade> {
    console.debug("updating trade on database...", id);
    return this.prisma.trade.update({ where: { id }, data });
  }

  async delete(id: string): Promise<Trade> {
    console.debug("deleting trade on database...", id);
    return this.prisma.trade.delete({ where: { id } });
  }

  async deleteAllByPortfolioId(
    portfolioId: string,
  ): Promise<{ count: number }> {
    console.debug(
      "deleting all trades on database for portfolio...",
      portfolioId,
    );
    return this.prisma.trade.deleteMany({ where: { portfolioId } });
  }
}
