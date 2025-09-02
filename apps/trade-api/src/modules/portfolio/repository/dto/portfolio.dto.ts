import { IsString, IsNumber, Min, MinLength } from "class-validator";

export class PortfolioDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(0)
  initialValue: number;
}
