import { Injectable } from "@nestjs/common";
import { PrismaClient, Trade } from "@prisma/client";

import { CreateTradeDto } from "./dto/create-trade.dto";
import { IPaginatedResult, IPaginationParams } from "../trade.types";

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

  async findAllByPortfolioPaginated(
    portfolioId: string,
    params: IPaginationParams = {},
  ): Promise<IPaginatedResult<Trade>> {
    const {
      page = 1,
      limit = 5,
      sortBy = "updatedAt",
      sortOrder = "desc",
    } = params;

    const skip = (page - 1) * limit;

    console.debug("finding paginated trades on database for portfolio...", {
      portfolioId,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    // Get total count for pagination meta
    const total = await this.prisma.trade.count({
      where: { portfolioId },
    });

    // Get paginated data
    const data = await this.prisma.trade.findMany({
      where: { portfolioId },
      orderBy: { [sortBy]: sortOrder },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    };
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
