import { IPortfolio } from "@workspace/api-client/types";
import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

import { PortfolioDropdownItem } from "./portfolio-dropdown-item.component";

interface IListPortfolioProps {
	title: string;
	portfolios: IPortfolio[];
	isLoading?: boolean;
}

export function DropdownPortfolio(props: IListPortfolioProps) {
	const { title, portfolios, isLoading } = props;

	if (isLoading) return <div className="h-4 w-32 bg-foreground/20 rounded mx-3" />;

	if (portfolios?.length <= 0)
		return <span className="text-sm px-2">No portfolios found.</span>;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="darK:text-white font-medium text-md mr-3">
					{title}
					<IoIosArrowDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="start">
				<DropdownMenuLabel>My Portifolios</DropdownMenuLabel>

				<DropdownMenuGroup>
					{portfolios?.map(portfolio => (
						<PortfolioDropdownItem key={portfolio?.id} portfolio={portfolio} />
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
