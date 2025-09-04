import { usePortfolio, usePortfolios } from "@workspace/api-client/hooks";
import { Button } from "@workspace/ui/components/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@workspace/ui/components/sheet";
import { useParams } from "next/navigation";

import { TradesChart } from "../../trades/chart/trades-chart.component";
import { RecentsTrades } from "../../trades/recents-trades/recent-trades.component";
import { AppLogo } from "../app-logo.component";
import { DropdownPortfolio } from "../../portfolio/portfolio-dropdown.component";

export function HeaderMobile() {
	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string)?.data;
	const portfolios = usePortfolios();

	return (
		<header className="flex items-center justify-center h-[98px] bg-background-secondary border-b-1 border-b-border-secondary px-4">
			<div className="flex justify-between max-w-[1600px] w-full h-full">
				<nav className="flex items-center gap-4 h">
					<AppLogo width={120} height={31} />

					<div className="bg-[#4C4D52] w-[1px] h-[50px] mx-[1.5rem]"></div>
				</nav>
				<div className="flex items-center">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">📊 Dashboard</Button>
						</SheetTrigger>
						<SheetContent className="!max-w-full w-[80%] overflow-x-hidden px-3">
							<SheetHeader className="hidden">
								<SheetTitle className="hidden"></SheetTitle>
							</SheetHeader>
							<div className="py-5">
								<DropdownPortfolio
									title={`${portfolio?.name} • $${portfolio?.initialValue.toLocaleString()}`}
									portfolios={portfolios?.data ?? []}
								/>

								<TradesChart />
								<RecentsTrades />
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button variant="outline">Close</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
