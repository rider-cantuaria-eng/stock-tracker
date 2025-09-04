import { ApiProperty } from "@nestjs/swagger";

export class TradeResponseDto {
  @ApiProperty({
    example: "uuid-v4-string",
    description: "Unique identifier of the trade",
  })
  id: string;

  @ApiProperty({ example: "AAPL", description: "Stock ticker symbol" })
  ticker: string;

  @ApiProperty({ example: 150.25, description: "Entry price of the trade" })
  entryPrice: number;

  @ApiProperty({
    example: 165.5,
    description: "Exit price of the trade",
    required: false,
  })
  exitPrice?: number;

  @ApiProperty({ example: 10, description: "Quantity of shares traded" })
  quantity: number;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "Trade execution date",
  })
  date: string;

  @ApiProperty({
    example: "uuid-v4-string",
    description: "Portfolio ID this trade belongs to",
  })
  portfolioId: string;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "Trade creation date",
  })
  createdAt: string;

  @ApiProperty({
    example: "2024-01-01T00:00:00Z",
    description: "Trade last update date",
  })
  updatedAt: string;
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1, description: "Current page number" })
  page: number;

  @ApiProperty({ example: 10, description: "Number of items per page" })
  limit: number;

  @ApiProperty({ example: 100, description: "Total number of items" })
  total: number;

  @ApiProperty({ example: 10, description: "Total number of pages" })
  totalPages: number;

  @ApiProperty({ example: true, description: "Whether there is a next page" })
  hasNextPage: boolean;

  @ApiProperty({
    example: false,
    description: "Whether there is a previous page",
  })
  hasPreviousPage: boolean;
}

export class TradeReportDataPointDto {
  @ApiProperty({
    example: "2024-01-01",
    description: "Date label for the data point",
  })
  label: string;

  @ApiProperty({
    example: 1250.5,
    description: "Profit/loss value for this date",
  })
  value: number;
}

export class TradeApiResponseDto {
  @ApiProperty({
    example: "Trade created successfully",
    description: "Response message",
  })
  message: string;

  @ApiProperty({ type: TradeResponseDto })
  data: TradeResponseDto;
}

export class TradeListApiResponseDto {
  @ApiProperty({
    example: "Trades fetched successfully",
    description: "Response message",
  })
  message: string;

  @ApiProperty({ type: [TradeResponseDto] })
  data: TradeResponseDto[];
}

export class PaginatedTradesApiResponseDto {
  @ApiProperty({
    example: "Paginated trades fetched successfully",
    description: "Response message",
  })
  message: string;

  @ApiProperty({ type: [TradeResponseDto] })
  data: TradeResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  pagination: PaginationMetaDto;
}

export class TradeReportApiResponseDto {
  @ApiProperty({
    example: "Report generated successfully",
    description: "Response message",
  })
  message: string;

  @ApiProperty({ type: [TradeReportDataPointDto] })
  data: TradeReportDataPointDto[];
}
