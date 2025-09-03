"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePortfolio } from "@workspace/api-client/hooks";
import {
	portfolioFormSchema,
	type PortfolioFormInput,
} from "@workspace/schemas/portfolio";
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
import { Input } from "@workspace/ui/components/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";

export function CreatePortfolioModal() {
	const [isOpen, setIsOpen] = useState(false);
	const createPortfolioMutation = useCreatePortfolio();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(portfolioFormSchema),
		defaultValues: {
			name: "",
			initialValue: "",
		},
	});

	const onSubmit = async (data: PortfolioFormInput) => {
		try {
			await createPortfolioMutation.mutateAsync(data);
			setIsOpen(false);
			reset();
		} catch (error) {
			console.error("Erro ao criar portfolio:", error);
		}
	};

	const handleOpenChange = (open: boolean) => {
		setIsOpen(open);
		if (!open) {
			reset(); // Reset form when dialog closes
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline" size="lg">
					<FiPlus />
					New Portfolio
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader>
						<DialogTitle>Create new Trade Account</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						{createPortfolioMutation.error && (
							<div className="text-destructive text-sm p-3 border border-destructive rounded-md bg-destructive/10">
								{createPortfolioMutation.error.message}
							</div>
						)}
						<div>
							<Input
								label="Name"
								placeholder="Bybit"
								className="uppercase"
								{...register("name")}
								error={errors.name?.message}
							/>
						</div>
						<div>
							<Input
								label="Initial Amount"
								placeholder="1000"
								type="number"
								step="0.01"
								min="0"
								{...register("initialValue")}
								error={errors.initialValue?.message}
							/>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant="outline"
								type="button"
								disabled={createPortfolioMutation.isPending}
							>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" disabled={createPortfolioMutation.isPending}>
							{createPortfolioMutation.isPending ? "Creating..." : "Create Portfolio"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
