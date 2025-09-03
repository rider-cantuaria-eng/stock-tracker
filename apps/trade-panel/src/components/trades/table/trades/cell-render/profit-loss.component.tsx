import { ITrade } from "@workspace/api-client/types";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

export interface IProfitOrLossRendererProps {
	data: ITrade;
}

export function ProfitLossCell({ data }: IProfitOrLossRendererProps) {
	if (!data.exitPrice) {
		return <span className="flex items-center gap-1 text-foreground-secondary">N/A</span>;
	}

	const difference = data.entryPrice - data.exitPrice;
	const isLoss = difference > 0;
	const percentage = Math.abs((difference / data.entryPrice) * 100).toFixed(2);

	return (
		<div className="flex flex-col leading-none">
			<span className="flex items-center gap-1 text-foreground-secondary">
				{isLoss ? <FiMinus /> : <FiPlus />}
				{Math.abs(difference).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</span>

			<span
				className={`flex items-center gap-1 text-sm font-medium ${
					isLoss ? "text-red-700" : "text-green-700"
				}`}
			>
				{isLoss ? <FiMinus /> : <FiPlus />}
				{percentage}%{isLoss ? <IoIosTrendingDown /> : <IoIosTrendingUp />}
			</span>
		</div>
	);
}
