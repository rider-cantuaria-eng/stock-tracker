import {
  IsString,
  IsNumber,
  IsDateString,
  Min,
  IsOptional,
  MinLength,
} from "class-validator";

export class TradeDto {
  @IsString()
  @MinLength(3)
  ticker: string;

  @IsNumber()
  @Min(0.01)
  entryPrice: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  exitPrice: number;

  @IsNumber()
  @Min(0.01)
  quantity: number;

  @IsDateString()
  date: string;
}
