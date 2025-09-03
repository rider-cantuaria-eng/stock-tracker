"use client";

import { PortfolioForm } from "@/src/forms/portfolio.form";
import { useCreatePortfolio } from "@workspace/api-client/hooks";
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
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

export function CreatePortfolioModal() {
	const [isOpen, setIsOpen] = useState(false);
	const createPortfolioMutation = useCreatePortfolio();

	const onSubmit = async (data: PortfolioFormInput) => {
		try {
			await createPortfolioMutation.mutateAsync(data);
			setIsOpen(false);
			toast.success("Portfolio created successfully!", {
				description: `Portfolio "${data.name}" has been created with initial value of $${data.initialValue}.`,
			});
		} catch (error) {
			console.error("Error creating portfolio:", error);
			toast.error("Failed to create portfolio", {
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
					<FiPlus />
					Create New Portfolio
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create new Trade Account</DialogTitle>
				</DialogHeader>
				<PortfolioForm id={"create-portfolio"} onSubmit={onSubmit} />
				<DialogFooter>
					{!createPortfolioMutation.isPending && (
						<DialogClose asChild>
							<Button
								variant="outline"
								type="button"
								disabled={createPortfolioMutation.isPending}
							>
								Cancel
							</Button>
						</DialogClose>
					)}
					<Button
						type="submit"
						form="create-portfolio"
						disabled={createPortfolioMutation.isPending}
					>
						{createPortfolioMutation.isPending ? (
							<div className="flex items-center gap-2">
								<span>Creating Portfolio...</span>
								<Spinner size="sm" />
							</div>
						) : (
							"Create Portfolio"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
