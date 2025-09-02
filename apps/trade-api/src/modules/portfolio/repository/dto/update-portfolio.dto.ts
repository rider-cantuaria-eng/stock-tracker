import {
  IsString,
  IsNumber,
  Min,
  MinLength,
  IsOptional,
} from "class-validator";

export class UpdatePortfolioDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  initialValue: number;
}
