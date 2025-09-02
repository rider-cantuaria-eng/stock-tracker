import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
} from "@nestjs/common";
import { Trade } from "@prisma/client";

import { TradeService } from "./trade.service";
import { TradeDto, UpdateTradeDto } from "./repository/dto";
import { ResponseDto } from "../response.dto";

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

  @Get()
  async findAll(@Param("portfolioId") portfolioId: string) {
    const { portfolio, trades } =
      await this.tradeService.findAllByPortfolio(portfolioId);

    const response = new ResponseDto<Trade[]>({
      message: `Trades for '${portfolio.name}' fetched successfully`,
      data: trades,
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
