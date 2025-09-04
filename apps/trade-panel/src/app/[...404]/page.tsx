"use client";

import { NotFoundModal } from "@/src/components/modal/not-found.modal";
import { PortfolioSummarySkeleton } from "@/src/components/portfolio/portfolio-summary.skeleton";
import { TradesChart } from "@/src/components/trades/chart/trades-chart.component";
import { RecentsTrades } from "@/src/components/trades/recents-trades/recent-trades.component";
import { TradesTable } from "@/src/components/trades/table/trades/default-table/trades-table.component";

export default function NotFound() {
	return (
		<div className="flex max-w-[1600px] w-full gap-4 my-16">
			<NotFoundModal
				title="Page not found"
				description="The requested portfolio could not be found. Please check the URL or return to the home page."
			/>

			<div className="flex flex-col w-full h-auto">
				<PortfolioSummarySkeleton />
				<TradesTable />
			</div>
			<div className="hidden lg:flex flex-col w-[450px] h-auto gap-4">
				<TradesChart />
				<RecentsTrades />
			</div>
		</div>
	);
}
