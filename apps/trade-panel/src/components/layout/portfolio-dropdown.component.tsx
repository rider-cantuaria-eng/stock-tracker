import { IPortfolio } from "@workspace/api-client/types";
import { Button } from "@workspace/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

interface IListPortfolioProps {
	title: string;
	portfolios: IPortfolio[];
	isLoading?: boolean;
}

export function DropdownPortfolio(props: IListPortfolioProps) {
	const { title, portfolios, isLoading } = props;
	const pathname = usePathname();
	const router = useRouter();

	if (isLoading) return <div className="h-4 w-32 bg-foreground/20 rounded mx-3" />;

	if (portfolios?.length <= 0)
		return <span className="text-sm px-2">No portfolios found.</span>;

	const handleToPortfolio = (id: string) => {
		return router.push(`/portfolio/${id}`);
	};

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
						<DropdownMenuItem
							key={portfolio?.id}
							className={`${pathname === `/portfolio/${portfolio?.id}` && "text-blue-400"} cursor-pointer`}
							onClick={() => handleToPortfolio(portfolio.id)}
						>
							{portfolio?.name}
							<DropdownMenuShortcut>
								${portfolio?.initialValue.toLocaleString()}
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
