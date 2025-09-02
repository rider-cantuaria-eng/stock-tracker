import { Module } from "@nestjs/common";

import { TradeController } from "./trade.controller";
import { TradeService } from "./trade.service";
import { TradeRepository } from "./repository/trade.repository";
import { PortfolioModule } from "../portfolio/portfolio.module";

@Module({
  imports: [PortfolioModule],
  controllers: [TradeController],
  providers: [TradeService, TradeRepository],
  exports: [TradeService, TradeRepository],
})
export class TradeModule {}
