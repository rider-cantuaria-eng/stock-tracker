import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTradeDto {
  @ApiProperty({
    description: "Stock ticker symbol",
    example: "MSFT",
    minLength: 3,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  ticker?: string;

  @ApiProperty({
    description: "Entry price of the trade in USD",
    example: 180.75,
    minimum: 0.01,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  entryPrice?: number;

  @ApiProperty({
    description: "Exit price of the trade in USD",
    example: 195.2,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  exitPrice?: number;

  @ApiProperty({
    description: "Number of shares traded",
    example: 15,
    minimum: 0.01,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.01)
  quantity?: number;

  @ApiProperty({
    description: "Date of the trade execution",
    example: "2024-02-15T14:30:00Z",
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;
}
