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

export function NotFoundPortfolioModal() {
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
							src="/images/404.png"
							alt="Portfolio"
							width={300}
							height={300}
							draggable={false}
						/>
						<div className="flex flex-col items-center gap-1.5">
							<h1 className="text-2xl font-bold">Where my Portfolio?</h1>
							<p className="text-sm text-gray-500 text-center max-w-sm">
								It appears that the portfolio you are looking for is not found. You can
								create a new one to start tracking your investments and trades.
							</p>
						</div>
					</div>
				</div>
				<DialogFooter className="flex flex-col items-center gap-2 mt-10">
					<Button type="button" onClick={() => router.push("/")}>
						Go Home
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
