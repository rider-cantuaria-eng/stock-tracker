import { IsString, IsNumber, Min, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PortfolioDto {
  @ApiProperty({
    description: "Name of the portfolio",
    example: "My Investment Portfolio",
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: "Initial value of the portfolio in USD",
    example: 10000.0,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  initialValue: number;
}
