import { PortfolioSummary } from "@/src/components/portfolio/portfolio-summary.component";
import { TradesChart } from "@/src/components/trades/chart/trades-chart.component";
import { RecentsTrades } from "@/src/components/trades/recents-trades/recent-trades.component";
import { TradesTable } from "@/src/components/trades/table/trades/default-table/trades-table.component";
import React from "react";

export function TradesScreen() {
	return (
		<div className="flex justify-center mb-[1rem] p-[1rem] h-fit mt-[3.8125rem] w-full lg:w-[85%]">
			<div className="flex max-w-[1600px] w-full  gap-4">
				<div className="w-full h-full">
					<PortfolioSummary />
					<TradesTable />
				</div>

				<div className="hidden lg:block w-[450px] ">
					<TradesChart />
					<RecentsTrades />
				</div>
			</div>
		</div>
	);
}
