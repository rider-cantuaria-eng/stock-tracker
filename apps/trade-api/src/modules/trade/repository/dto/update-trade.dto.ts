import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from "class-validator";

export class UpdateTradeDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  ticker?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  entryPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  exitPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  quantity?: number;

  @IsDateString()
  @IsOptional()
  date?: string;
}
