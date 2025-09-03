import { useCreateTrade } from "@workspace/api-client/hooks";
import { TTradeFormInput } from "@workspace/schemas/trade";
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
import { GoPlus } from "react-icons/go";
import { toast } from "sonner";

import { TradeForm } from "../../../forms/trade.form";

interface IModalCreateTradeProps {
	title: string;
}

export function ModalCreateTrade(props: IModalCreateTradeProps) {
	const { title } = props;

	const { id: portfolioId } = useParams();
	const [isOpen, setIsOpen] = useState(false);
	const createTradeMutation = useCreateTrade();

	const onSubmit = async (data: TTradeFormInput) => {
		try {
			console.log("data", data);

			if (!portfolioId) {
				throw new Error("Portfolio ID is required");
			}

			await createTradeMutation.mutateAsync({
				portfolioId: portfolioId as string,
				data,
			});

			setIsOpen(false);
			toast.success("Portfolio created successfully!", {
				description: `"${data.ticker}" has been created.`,
			});
		} catch (error) {
			console.error("Error creating trade:", error);
			toast.error("Failed to create trade", {
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
				<Button variant="outline" className="text-foreground">
					<GoPlus />
					Create New Trade
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<TradeForm id="create-trade-form" onSubmit={onSubmit} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						type="submit"
						form="create-trade-form"
						disabled={createTradeMutation.isPending}
					>
						{createTradeMutation.isPending ? (
							<div className="flex items-center gap-2">
								<span>Creating Trade...</span>
								<Spinner size="sm" />
							</div>
						) : (
							"Create Trade"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
