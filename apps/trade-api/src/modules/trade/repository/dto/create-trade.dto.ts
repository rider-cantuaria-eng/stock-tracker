import { IsString } from "class-validator";

import { TradeDto } from "./trade.dto";

export class CreateTradeDto extends TradeDto {
  @IsString()
  portfolioId: string;
}
