"use client";

import { PortfolioForm } from "@/src/forms/portfolio.form";
import { usePortfolio, useUpdatePortfolio } from "@workspace/api-client/hooks";
import { type PortfolioFormInput } from "@workspace/schemas/portfolio";
import { Button } from "@workspace/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Spinner } from "@workspace/ui/components/spinner";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiEdit2Line } from "react-icons/ri";
import { toast } from "sonner";

export function UpdatePortfolioModal() {
	const [isOpen, setIsOpen] = useState(false);

	const updatePortfolioMutation = useUpdatePortfolio();

	const { id: portfolioId } = useParams();
	const portfolio = usePortfolio(portfolioId as string);

	if (portfolio.error) {
		toast.error("Portfolio not found", {
			description: "Please select a valid portfolio",
		});
		return;
	}

	const onSubmit = async (data: PortfolioFormInput) => {
		try {
			await updatePortfolioMutation.mutateAsync({
				id: portfolioId as string,
				data,
			});

			toast.success("Portfolio updated successfully!", {
				description: `Portfolio "${data.name}" has been updated.`,
			});

			setIsOpen(false);
		} catch (error) {
			console.error("Error updating portfolio:", error);

			toast.error("Failed to update portfolio", {
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred. Please try again.",
			});
		}
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" size="lg">
					<RiEdit2Line />
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Update Trade Account</DialogTitle>
				</DialogHeader>
				<PortfolioForm
					id={"update-portfolio"}
					defaultValues={portfolio.data}
					onSubmit={onSubmit}
				/>
				<DialogFooter>
					{!updatePortfolioMutation.isPending && (
						<DialogClose asChild>
							<Button
								variant="outline"
								type="button"
								disabled={updatePortfolioMutation.isPending}
							>
								Cancel
							</Button>
						</DialogClose>
					)}
					<Button
						type="submit"
						form="update-portfolio"
						disabled={updatePortfolioMutation.isPending}
					>
						{updatePortfolioMutation.isPending ? (
							<div className="flex items-center gap-2">
								<span>Updating Portfolio...</span>
								<Spinner size="sm" />
							</div>
						) : (
							"Update Portfolio"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
