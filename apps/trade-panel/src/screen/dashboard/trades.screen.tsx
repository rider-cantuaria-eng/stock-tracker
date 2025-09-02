import { PortfolioSummary } from "@/src/components/portfolio/portfolio-summary.component";
import React from "react";

export function TradesScreen() {
	return (
		<div className="flex mb-[1rem] p-[1rem] h-fit gap-4 mt-[3.8125rem]">
			<div>
				<PortfolioSummary />
			</div>

			<div className="w-[450px]"></div>
		</div>
	);
}
