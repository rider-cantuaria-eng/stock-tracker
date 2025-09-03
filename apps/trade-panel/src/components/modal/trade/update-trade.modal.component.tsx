import { useUpdateTrade } from "@workspace/api-client/hooks";
import { ITrade } from "@workspace/api-client/types";
import { TTradeFormInput } from "@workspace/schemas/trade";
import { Button } from "@workspace/ui/components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@workspace/ui/components/dialog";
import { Spinner } from "@workspace/ui/components/spinner";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { TradeForm } from "../../../forms/trade.form";

interface IModalEditTradeProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	trade: ITrade | null;
}

export function ModalEditTrade(props: IModalEditTradeProps) {
	const { isOpen, onOpenChange, trade } = props;
	const { id: portfolioId } = useParams();
	const updateTradeMutation = useUpdateTrade();

	const onSubmit = async (data: TTradeFormInput) => {
		try {
			if (!portfolioId || !trade) {
				throw new Error("Portfolio ID and trade are required");
			}

			await updateTradeMutation.mutateAsync({
				portfolioId: portfolioId as string,
				tradeId: trade.id,
				data,
			});

			onOpenChange(false);
			toast.success("Trade updated successfully!", {
				description: `"${data.ticker}" has been updated.`,
			});
		} catch (error) {
			console.error("Error updating trade:", error);
			toast.error("Failed to update trade", {
				description:
					error instanceof Error
						? error.message
						: "An unexpected error occurred. Please try again.",
			});
		}
	};

	const defaultValues = trade
		? {
				ticker: trade.ticker,
				entryPrice: trade.entryPrice.toString(),
				exitPrice: trade.exitPrice?.toString() || "",
				quantity: trade.quantity.toString(),
				date: new Date(trade.date).toISOString().split("T")[0],
			}
		: undefined;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>Edit Trade - {trade?.ticker}</DialogTitle>
				</DialogHeader>
				<TradeForm
					id="edit-trade-form"
					onSubmit={onSubmit}
					defaultValues={defaultValues}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						type="submit"
						form="edit-trade-form"
						disabled={updateTradeMutation.isPending}
					>
						{updateTradeMutation.isPending ? (
							<div className="flex items-center gap-2">
								<span>Updating Trade...</span>
								<Spinner size="sm" />
							</div>
						) : (
							"Update Trade"
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
