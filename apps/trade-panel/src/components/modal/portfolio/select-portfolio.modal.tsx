import { IPortfolio } from "@workspace/api-client/types";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import Image from "next/image";

import { CreatePortfolioModal } from "./create-portfolio.modal";
import { SelectItemPortfolio } from "./select-item-portfolio.component";

interface ISelectPortfolioModalProps {
	portfolios: IPortfolio[];
}
export function SelectPortfolioModal(props: ISelectPortfolioModalProps) {
	const { portfolios } = props;

	const handleOpenChange = () => {
		// Prevent modal from closing
		return;
	};

	return (
		<Dialog open onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
				<DialogHeader>
					<DialogTitle />
				</DialogHeader>
				<div className="grid gap-4">
					<div className="flex flex-col items-center gap-4">
						<Image
							src="/images/portfolio.png"
							alt="Portfolio"
							width={300}
							height={300}
							draggable={false}
						/>
						<div className="flex flex-col items-center gap-1.5">
							<h1 className="text-2xl font-bold">Portfolio</h1>
							<p className="text-sm text-gray-500 text-center max-w-sm">
								Choose from your existing portfolios below or create a new one to start
								tracking your investments and trades
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						{portfolios?.map(portfolio => (
							<SelectItemPortfolio key={portfolio.id} portfolio={portfolio} />
						))}
					</div>
				</div>
				<DialogFooter className="flex flex-col items-center gap-2 mt-10">
					<span className="text-sm text-gray-500">or</span>
					<CreatePortfolioModal />
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
