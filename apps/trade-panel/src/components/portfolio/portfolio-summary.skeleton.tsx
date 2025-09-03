import { IoMdTime } from "react-icons/io";

import { CardInvestmentInfo } from "../cards/card-investimento-info.component";

export function PortfolioSummarySkeleton() {
	return (
		<section className="!w-full h-fit bg-background-secondary rounded-md p-7 mb-[1.5rem] animate-pulse">
			<div className="flex items-start lg:items-center justify-between flex-col lg:flex-row">
				<div>
					<div className="h-5 w-40 bg-foreground/20 rounded mb-2" />
					<div className="h-4 w-24 bg-foreground/20 rounded" />
				</div>
				<div className="flex gap-[0.5rem] mt-4 lg:mt-0">
					<div className="h-[48px] w-[82.41px] bg-foreground/20 rounded mb-2" />
					<div className="h-[48px] w-[146.2px] bg-foreground/20 rounded" />
				</div>
			</div>

			<div className="flex flex-col items-start 2xl:flex-row justify-between gap-4 mt-[3rem]">
				<div>
					<span className="flex items-center gap-2 text-gray-500">Available Balance</span>
					<div className="flex items-center mt-4 gap-[3rem]">
						<h3 className="text-3xl">
							<div className="h-8 w-32 bg-foreground/20 rounded" />
						</h3>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-2 w-full lg:max-w-[800px] gap-[2rem]">
					<CardInvestmentInfo
						title="Total Investment"
						icon={<IoMdTime />}
						value={3045512}
						increase={{
							value: "0.2%",
						}}
						isLoading={true}
					/>
					<CardInvestmentInfo
						title="Total Investment"
						icon={<IoMdTime />}
						value={3045512}
						increase={{
							value: "0.2%",
						}}
						isLoading={true}
					/>
				</div>
			</div>
		</section>
	);
}
