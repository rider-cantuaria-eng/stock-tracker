import { usePortfolioBalance } from "@workspace/api-client/hooks";
import { IPortfolio } from "@workspace/api-client/types";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

interface ISelectItemPortfolioProps {
	portfolio: IPortfolio;
}

export function SelectItemPortfolio(props: ISelectItemPortfolioProps) {
	const { portfolio } = props;

	const router = useRouter();
	const balance = usePortfolioBalance(portfolio.id);

	if (!portfolio) return null;

	return (
		<div
			key={portfolio.id}
			className="flex items-center justify-between p-3 border rounded-lg"
		>
			<div className="flex items-center gap-3">
				<div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center">
					<span className="text-white text-sm font-medium">
						{portfolio.name.charAt(0).toUpperCase()}
					</span>
				</div>
				<div>
					<div className="font-medium">{portfolio.name}</div>
					{balance.isLoading ? (
						<div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
					) : (
						<div className="text-sm text-gray-500">
							${balance.data?.totalTradesValue.toLocaleString()}
						</div>
					)}
				</div>
			</div>
			<Button
				type="button"
				size="sm"
				onClick={() => router.push(`/portfolio/${portfolio.id}`)}
			>
				Select
			</Button>
		</div>
	);
}
