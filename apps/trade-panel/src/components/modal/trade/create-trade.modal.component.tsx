import { TradeFormInput } from "@workspace/schemas/trade";
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
import { GoPlus } from "react-icons/go";

import { TradeForm } from "../../../forms/trade.form";

interface IModalCreateTradeProps {
	title: string;
	onSubmit?: (data: TradeFormInput) => void;
}

export function ModalCreateTrade(props: IModalCreateTradeProps) {
	const { onSubmit, title } = props;

	const handleSubmit = async (data: TradeFormInput) => {
		console.log("Trade data:", data);
		await onSubmit?.(data);
	};

	return (
		<Dialog>
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
				<TradeForm id="create-trade-form" onSubmit={handleSubmit} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form="create-trade-form">
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
