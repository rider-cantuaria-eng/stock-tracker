import { ApiProperty } from "@nestjs/swagger";

export class PortfolioResponseDto {
  @ApiProperty({
    example: "uuid-v4-string",
    description: "Unique identifier of the portfolio",
  })
  id: string;

  @ApiProperty({
    example: "My Investment Portfolio",
    description: "Name of the portfolio",
  })
  name: string;

  @ApiProperty({
    example: 10000.0,
    description: "Initial value of the portfolio",
  })
  initialValue: number;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "Portfolio creation date",
  })
  createdAt: string;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "Portfolio last update date",
  })
  updatedAt: string;
}

export class PortfolioBalanceResponseDto {
  @ApiProperty({ example: "uuid-v4-string", description: "Portfolio ID" })
  portfolioId: string;

  @ApiProperty({
    example: "My Investment Portfolio",
    description: "Portfolio name",
  })
  portfolioName: string;

  @ApiProperty({
    example: 10000.0,
    description: "Initial value of the portfolio",
  })
  initialValue: number;

  @ApiProperty({ example: 12500.0, description: "Total value from all trades" })
  totalTradesValue: number;

  @ApiProperty({
    example: 15,
    description: "Total number of trades in the portfolio",
  })
  totalTrades: number;

  @ApiProperty({ example: 2500.0, description: "Profit or loss amount" })
  profitLoss: number;

  @ApiProperty({ example: 25.0, description: "Profit or loss percentage" })
  profitLossPercentage: number;
}

export class ApiResponseDto<T> {
  @ApiProperty({
    example: "Operation completed successfully",
    description: "Response message",
  })
  message: string;

  @ApiProperty({ description: "Response data" })
  data: T;
}

export class PortfolioApiResponseDto extends ApiResponseDto<PortfolioResponseDto> {
  @ApiProperty({ type: PortfolioResponseDto })
  data: PortfolioResponseDto;
}

export class PortfolioListApiResponseDto extends ApiResponseDto<
  PortfolioResponseDto[]
> {
  @ApiProperty({ type: [PortfolioResponseDto] })
  data: PortfolioResponseDto[];
}

export class PortfolioBalanceApiResponseDto extends ApiResponseDto<PortfolioBalanceResponseDto> {
  @ApiProperty({ type: PortfolioBalanceResponseDto })
  data: PortfolioBalanceResponseDto;
}
