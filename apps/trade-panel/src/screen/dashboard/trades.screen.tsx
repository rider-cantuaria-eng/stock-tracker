import { PortfolioSummary } from "@/src/components/portfolio/portfolio-summary.component";
import { TradesChart } from "@/src/components/trades/chart/trades-chart.component";
import { RecentsTrades } from "@/src/components/trades/recents-trades/recent-trades.component";
import { TradesTable } from "@/src/components/trades/table/trades/default-table/trades-table.component";
import React from "react";

export function TradesScreen() {
	return (
		<div className="flex max-w-[1600px] w-full gap-4 my-16">
			<div className="flex flex-col w-full h-auto">
				<PortfolioSummary />
				<TradesTable />
			</div>

			<div className="hidden lg:flex flex-col w-[450px] h-auto gap-4">
				<TradesChart />
				<RecentsTrades />
			</div>
		</div>
	);
}
