import { PortfolioSummary } from "@/src/components/portfolio/portfolio-summary.component";
import { TradesChart } from "@/src/components/trades/chart/trades-chart.component";
import { TradeTable } from "@/src/components/trades/table/trades-table.component";
import React from "react";

export function TradesScreen() {
	return (
		<div className="flex mb-[1rem] p-[1rem] h-fit gap-4 mt-[3.8125rem]">
			<div>
				<PortfolioSummary />
				<TradeTable />
			</div>

			<div className="w-[450px]">
				<TradesChart />
			</div>
		</div>
	);
}
