import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { Trade } from "@prisma/client";

import { ResponseDto } from "../response.dto";

import { TradeDto, UpdateTradeDto } from "./repository/dto";
import { TradeService } from "./trade.service";
import {
  IPaginationMeta,
  IPaginationParams,
  TTradePeriodType,
  IPortfolioBalance,
} from "./trade.types";

@Controller("portfolios/:portfolioId/trades")
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  async create(
    @Param("portfolioId") portfolioId: string,
    @Body() tradeData: TradeDto,
  ) {
    const trade = await this.tradeService.create(portfolioId, tradeData);

    const response = new ResponseDto<Trade>({
      message: `Trade for '${trade.ticker}' created successfully`,
      data: trade,
    });

    return response;
  }

  @Get("/report")
  async getReport(
    @Param("portfolioId") portfolioId: string,
    @Query("period") period: TTradePeriodType,
  ) {
    const report = await this.tradeService.getReportByPortfolio(
      portfolioId,
      period,
    );

    const response = new ResponseDto<any>({
      message: `Report for portfolio fetched successfully`,
      data: report,
    });

    return response;
  }

  @Get("/balance")
  async getBalance(@Param("portfolioId") portfolioId: string) {
    const balance = await this.tradeService.getPortfolioBalance(portfolioId);

    const response = new ResponseDto<IPortfolioBalance>({
      message: `Balance for portfolio '${balance.portfolioName}' calculated successfully`,
      data: balance,
    });

    return response;
  }

  @Get()
  async findAll(@Param("portfolioId") portfolioId: string) {
    // Default behavior - return all trades
    const { portfolio, trades } =
      await this.tradeService.findAllByPortfolio(portfolioId);

    const response = new ResponseDto<Trade[]>({
      message: `Trades for '${portfolio.name}' fetched successfully`,
      data: trades,
    });

    return response;
  }

  @Get("/recents")
  async findAllRecents(
    @Param("portfolioId") portfolioId: string,
    @Query("page") page?: string,
  ) {
    const result = await this.tradeService.findRecentsByPortfolio(
      portfolioId,
      page ? parseInt(page, 10) : 1,
    );

    const response = new ResponseDto<Trade[]>({
      message: `Paginated trades for '${result.portfolio.name}' fetched successfully`,
      data: result.data,
      pagination: result.meta,
    });

    return response;
  }

  @Get(":tradeId")
  async findById(
    @Param("tradeId") tradeId: string,
    @Param("portfolioId") portfolioId: string,
  ) {
    const trade = await this.tradeService.findById(tradeId, portfolioId);

    const response = new ResponseDto<Trade>({
      message: `Trade for '${trade.ticker}' fetched successfully`,
      data: trade,
    });

    return response;
  }

  @Patch(":tradeId")
  async update(
    @Param("tradeId") tradeId: string,
    @Param("portfolioId") portfolioId: string,
    @Body() tradeData: UpdateTradeDto,
  ) {
    const trade = await this.tradeService.update(
      tradeId,
      portfolioId,
      tradeData,
    );

    const response = new ResponseDto<Trade>({
      message: `Trade for '${trade.ticker}' updated successfully`,
      data: trade,
    });

    return response;
  }

  @Delete(":tradeId")
  async delete(
    @Param("tradeId") tradeId: string,
    @Param("portfolioId") portfolioId: string,
  ) {
    const trade = await this.tradeService.delete(tradeId, portfolioId);

    const response = new ResponseDto<Trade>({
      message: `Trade for '${trade.ticker}' deleted successfully`,
      data: trade,
    });

    return response;
  }

  @Delete()
  async deleteAll(@Param("portfolioId") portfolioId: string) {
    const { totalTradesDeleted, portfolio } =
      await this.tradeService.deleteAll(portfolioId);

    const response = new ResponseDto<Trade[]>({
      message: `Removed ${totalTradesDeleted} trades from '${portfolio.name}' successfully`,
      data: null,
    });

    return response;
  }
}
