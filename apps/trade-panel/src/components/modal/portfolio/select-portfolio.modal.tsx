import { IPortfolio } from "@workspace/api-client/types";
import { Button } from "@workspace/ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CreatePortfolioModal } from "./create-portfolio.modal";

interface ISelectPortfolioModalProps {
	portfolios: IPortfolio[];
}
export function SelectPortfolioModal(props: ISelectPortfolioModalProps) {
	const { portfolios } = props;

	const router = useRouter();

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
										<div className="text-sm text-gray-500">
											${portfolio.initialValue.toLocaleString()}
										</div>
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
