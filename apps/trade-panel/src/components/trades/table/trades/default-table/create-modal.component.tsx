import { Button } from "@workspace/ui/components/button";
import { DatePicker } from "@workspace/ui/components/date-picker";
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
import { GoPlus } from "react-icons/go";

export function ModalCreateTrade() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline" className="text-foreground">
						<GoPlus />
						New Trade
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
					<DialogHeader>
						<DialogTitle>Create trade</DialogTitle>
					</DialogHeader>
					<div className="grid grid-cols-2 gap-4">
						<Input label="Ticker" htmlFor="ticker-1" placeholder="GOOG" />
						<Input label="Entry Price" htmlFor="entry_price-1" placeholder="213.53" />
						<Input label="Entry Price" htmlFor="entry_price-1" placeholder="213.53" />
						<Input label="Exit Price" htmlFor="exit_price-1" placeholder="213.33" />
						<Input label="Exit Price" htmlFor="exit_price-1" placeholder="213.33" />

						<Input label="Profit" htmlFor="profit-1" placeholder="213.33" />

						<Input label="Quantity" htmlFor="quantity-1" placeholder="20" />
						<DatePicker />
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Save changes</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
}
