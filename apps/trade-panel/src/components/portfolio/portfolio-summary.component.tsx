"use client";

import { CardInvestmentInfo } from "@/src/components/cards/card-investimento-info.component";
import { usePortfolio, usePortfolioBalance } from "@workspace/api-client/hooks";
import { showLocaleDate } from "@workspace/utils/date";
import { useParams } from "next/navigation";
import { IoCashOutline, IoCashSharp, IoWalletOutline } from "react-icons/io5";

import { NotFoundModal } from "../modal/not-found.modal";
import { CreatePortfolioModal } from "../modal/portfolio/create-portfolio.modal";
import { UpdatePortfolioModal } from "../modal/portfolio/update-portfolio.modal";
import { WelcomePortfolioModal } from "../modal/portfolio/welcome.portfolio.modal";
import { PortfolioSummarySkeleton } from "./portfolio-summary.skeleton";

export function PortfolioSummary() {
	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string);
	const balance = usePortfolioBalance(portfolioId as string);

	/**
	 * @author Ríder Cantuária
	 * @todo Handle not found portfolio by other way
	 */
	if (portfolio.isError && portfolioId)
		return (
			<NotFoundModal
				title="Where my Portfolio?"
				description="It appears that the portfolio you are looking for is not found. You can create a new one to start tracking your investments and trades."
			/>
		);

	if (portfolio.isLoading) {
		return <PortfolioSummarySkeleton />;
	}

	if (!portfolio.data && portfolioId) {
		return (
			<NotFoundModal
				title="Where my Portfolio?"
				description="It appears that the portfolio you are looking for is not found. You can create a new one to start tracking your investments and trades."
			/>
		);
	}
	/*eof @todo Handle not found portfolio by other way */

	return (
		<>
			<WelcomePortfolioModal />
			<section className="!w-full h-fit bg-background-secondary rounded-md p-7 mb-[1.5rem]">
				<div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
					<div>
						<h2 className="text-xl font-medium">{portfolio.data?.name || "Portfolio"}</h2>
						<span className="text-gray-500 text-sm">
							Updated {showLocaleDate(portfolio.data?.updatedAt)}
						</span>
					</div>
					<div className="flex gap-[0.5rem] mt-4 lg:mt-0">
						{portfolioId && <UpdatePortfolioModal />}
						<CreatePortfolioModal />
					</div>
				</div>

				<div className="flex flex-col items-start  2xl:flex-row  justify-between gap-4 mt-[3rem]">
					<div>
						<span className="flex items-center gap-2 text-gray-500">
							<IoWalletOutline />
							Initial Value
						</span>
						<div className="flex items-center mt-4 gap-[3rem]">
							<h3 className="text-3xl">
								$ {balance.data?.initialValue.toLocaleString() || "0"}
							</h3>
						</div>
					</div>

					<div className="grid grid-cols-1  md:grid-cols-3 2xl:grid-cols-2 w-full lg:max-w-[800px] gap-[2rem] ">
						<CardInvestmentInfo
							title="Initial Investment"
							icon={<IoCashOutline />}
							value={
								(balance.data?.totalTradesValue ?? 0) - (balance.data?.profitLoss ?? 0)
							}
						/>
						<CardInvestmentInfo
							title="Current Balance"
							icon={<IoCashSharp />}
							value={balance.data?.totalTradesValue ?? 0}
							percentage={{
								value: balance.data?.profitLossPercentage ?? 0,
							}}
						/>
						<CardInvestmentInfo
							title="Total Return"
							icon={<IoWalletOutline />}
							value={balance.data?.profitLoss ?? 0}
						/>
					</div>
				</div>
			</section>
		</>
	);
}
