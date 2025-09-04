import { usePortfolioBalance } from "@workspace/api-client/hooks";
import { IPortfolio } from "@workspace/api-client/types";
import {
	DropdownMenuItem,
	DropdownMenuShortcut,
} from "@workspace/ui/components/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";

interface IPortfolioDropdownItemProps {
	portfolio: IPortfolio;
}

export function PortfolioDropdownItem(props: IPortfolioDropdownItemProps) {
	const { portfolio } = props;

	const pathname = usePathname();
	const router = useRouter();
	const balance = usePortfolioBalance(portfolio.id);

	if (!portfolio) return null;

	const handleToPortfolio = (id: string) => {
		return router.push(`/portfolio/${id}`);
	};

	return (
		<DropdownMenuItem
			key={portfolio.id}
			className={`${pathname === `/portfolio/${portfolio.id}` && "text-blue-400"} cursor-pointer`}
			onClick={() => handleToPortfolio(portfolio.id)}
		>
			{portfolio?.name}
			<DropdownMenuShortcut>
				{balance.isLoading ? (
					<div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
				) : (
					`$${balance.data?.totalTradesValue.toLocaleString()}`
				)}
			</DropdownMenuShortcut>
		</DropdownMenuItem>
	);
}
