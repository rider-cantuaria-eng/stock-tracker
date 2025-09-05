import {
  IsString,
  IsNumber,
  IsDateString,
  Min,
  IsOptional,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TradeDto {
  @ApiProperty({
    description: "Stock ticker symbol",
    example: "AAPL",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  ticker: string;

  @ApiProperty({
    description: "Entry price of the trade in USD",
    example: 150.25,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  entryPrice: number;

  @ApiProperty({
    description: "Exit price of the trade in USD (optional for open positions)",
    example: 165.5,
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  exitPrice: number;

  @ApiProperty({
    description: "Number of shares traded",
    example: 10,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  quantity: number;

  @ApiProperty({
    description: "Date of the trade execution",
    example: "2024-01-15T10:30:00Z",
  })
  @IsDateString()
  date: string;
}
