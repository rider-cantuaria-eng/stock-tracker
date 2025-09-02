import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@workspace/ui/components/sheet";
import { IoIosArrowDown } from "react-icons/io";

import { TradesChart } from "../../trades/chart/trades-chart.component";
import { RecentsTrades } from "../../trades/recents-trades/recent-trades.component";

export function HeaderMobile() {
	return (
		<header className="flex items-center justify-center h-[98px] bg-background-secondary border-b-1 border-b-border-secondary px-4">
			<div className="flex justify-between max-w-[1600px] w-full h-full">
				<nav className="flex items-center gap-4 h">
					<span className="flex items-center text-foreground-secondary">LOGO</span>

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
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="ghost"
											className="darK:text-white font-medium text-md"
										>
											Total value in 2.10983 BTC
											<IoIosArrowDown />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56" align="start">
										<DropdownMenuLabel>My Portifolios</DropdownMenuLabel>
										<DropdownMenuGroup>
											<DropdownMenuItem>
												kucoin
												<DropdownMenuShortcut>2.10983 BTC</DropdownMenuShortcut>
											</DropdownMenuItem>
											<DropdownMenuItem>
												bybit
												<DropdownMenuShortcut>2.10983 BTC</DropdownMenuShortcut>
											</DropdownMenuItem>
										</DropdownMenuGroup>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											Log out
											<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>

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
