import {
  IsString,
  IsNumber,
  Min,
  MinLength,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePortfolioDto {
  @ApiProperty({
    description: "Name of the portfolio",
    example: "My Updated Portfolio",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "Initial value of the portfolio in USD",
    example: 15000.0,
    minimum: 0,
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  initialValue: number;
}
