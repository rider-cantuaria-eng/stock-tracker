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
import { FiPlus } from "react-icons/fi";

export function ModalCreatePortoflio() {
	return (
		<Dialog>
			<form>
				<DialogTrigger asChild>
					<Button variant="outline" size="lg">
						<FiPlus />
						New Portfolio
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create new Trade Account</DialogTitle>
					</DialogHeader>
					<div className="grid gap-4">
						<Input label="Name" htmlFor="name-1" placeholder="Bybit" />
						<Input
							label="Initial Amount"
							htmlFor="amount-1"
							placeholder="1"
							type="number"
						/>
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
