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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
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
import {
  TradeApiResponseDto,
  TradeListApiResponseDto,
  PaginatedTradesApiResponseDto,
  TradeReportApiResponseDto,
  PortfolioBalanceApiResponseDto,
} from "../swagger/dto";

@ApiTags("trades")
@Controller("portfolios/:portfolioId/trades")
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  @ApiOperation({
    summary: "Create a new trade",
    description: "Creates a new trade within a specific portfolio",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiBody({ type: TradeDto })
  @ApiResponse({
    status: 201,
    description: "Trade created successfully",
    type: TradeApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid trade data",
  })
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
  @ApiOperation({
    summary: "Get portfolio profit/loss report",
    description:
      "Generates a profit/loss report for a portfolio over a specified time period",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiQuery({
    name: "period",
    description: "Time period for the report",
    enum: ["7d", "15d", "1m", "6m", "1y"],
    example: "1m",
  })
  @ApiResponse({
    status: 200,
    description: "Report generated successfully",
    type: TradeReportApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
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
  @ApiOperation({
    summary: "Get portfolio balance",
    description:
      "Calculates and returns the current balance of a portfolio including profit/loss",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Balance calculated successfully",
    type: PortfolioBalanceApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
  async getBalance(@Param("portfolioId") portfolioId: string) {
    const balance = await this.tradeService.getPortfolioBalance(portfolioId);

    const response = new ResponseDto<IPortfolioBalance>({
      message: `Balance for portfolio '${balance.portfolioName}' calculated successfully`,
      data: balance,
    });

    return response;
  }

  @Get()
  @ApiOperation({
    summary: "Get all trades in portfolio",
    description: "Retrieves all trades associated with a specific portfolio",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Trades fetched successfully",
    type: TradeListApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
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
  @ApiOperation({
    summary: "Get recent trades (paginated)",
    description:
      "Retrieves the most recent trades from a portfolio with pagination",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiQuery({
    name: "page",
    description: "Page number for pagination",
    required: false,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: "Recent trades fetched successfully",
    type: PaginatedTradesApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
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
  @ApiOperation({
    summary: "Get trade by ID",
    description: "Retrieves a specific trade by its unique identifier",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiParam({
    name: "tradeId",
    description: "Trade unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Trade fetched successfully",
    type: TradeApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trade or portfolio not found",
  })
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
  @ApiOperation({
    summary: "Update trade",
    description: "Updates an existing trade with new data",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiParam({
    name: "tradeId",
    description: "Trade unique identifier",
    example: "uuid-v4-string",
  })
  @ApiBody({ type: UpdateTradeDto })
  @ApiResponse({
    status: 200,
    description: "Trade updated successfully",
    type: TradeApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trade or portfolio not found",
  })
  @ApiResponse({
    status: 400,
    description: "Bad request - Invalid trade data",
  })
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
  @ApiOperation({
    summary: "Delete trade",
    description: "Deletes a specific trade from a portfolio",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiParam({
    name: "tradeId",
    description: "Trade unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "Trade deleted successfully",
    type: TradeApiResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: "Trade or portfolio not found",
  })
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
  @ApiOperation({
    summary: "Delete all trades",
    description: "Deletes all trades from a specific portfolio",
  })
  @ApiParam({
    name: "portfolioId",
    description: "Portfolio unique identifier",
    example: "uuid-v4-string",
  })
  @ApiResponse({
    status: 200,
    description: "All trades deleted successfully",
  })
  @ApiResponse({
    status: 404,
    description: "Portfolio not found",
  })
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
