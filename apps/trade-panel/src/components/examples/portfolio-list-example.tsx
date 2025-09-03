import { usePortfolios } from "@workspace/api-client/hooks";

import { PortfolioListLoading } from "../portfolio/portfolio-loading";
import { LoadingOverlay } from "../ui/loading";

export function PortfolioListExample() {
	const { data: portfolios, isLoading, error, isRefetching } = usePortfolios();

	if (isLoading) {
		return <PortfolioListLoading />;
	}

	if (error) {
		return (
			<div className="text-center py-8">
				<p className="text-red-600">Error: {error.message}</p>
			</div>
		);
	}

	return (
		<div className="relative">
			{isRefetching && <LoadingOverlay message="Refreshing..." />}

			<div className="space-y-4">
				<h2 className="text-xl font-semibold">Your Portfolios</h2>

				{portfolios?.length === 0 ? (
					<p className="text-gray-500 text-center py-8">
						No portfolios found. Create your first portfolio!
					</p>
				) : (
					<div className="grid gap-4">
						{portfolios?.map(portfolio => (
							<div key={portfolio.id} className="rounded-lg border p-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-medium">{portfolio.name}</h3>
										<p className="text-sm text-gray-500">
											Initial: ${portfolio.initialValue}
										</p>
									</div>
									<button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">
										View
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
