import { Module } from "@nestjs/common";

// Modules
import { PortfolioModule } from "./modules/portfolio/portfolio.module";

@Module({
  imports: [PortfolioModule],
  providers: [],
})
export class AppModule {}
