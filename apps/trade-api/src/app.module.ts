import { Module } from "@nestjs/common";

// Modules
import { PortfolioModule } from "./modules/portfolio/portfolio.module";
import { TradeModule } from "./modules/trade/trade.module";

@Module({
  imports: [PortfolioModule, TradeModule],
  providers: [],
})
export class AppModule {}
