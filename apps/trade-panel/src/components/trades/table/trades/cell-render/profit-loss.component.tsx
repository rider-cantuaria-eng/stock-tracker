import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

import { ITrade } from "../default-table/hooks/trades-grid.hook";

export interface IProfitOrLossRendererProps {
	data: ITrade;
}

export function PnLCell({ data }: IProfitOrLossRendererProps) {
	const difference = data.entry_price - data.exit_price;
	const isLoss = difference > 0;
	const percentage = Math.abs((difference / data.entry_price) * 100).toFixed(2);

	return (
		<div className="flex flex-col leading-none">
			<span className="flex items-center gap-1">
				{isLoss ? <FiMinus /> : <FiPlus />}
				{Math.abs(difference).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</span>

			<span
				className={`flex items-center gap-1 text-sm font-medium ${
					isLoss ? "text-[#791017]" : "text-[#19A173]"
				}`}
			>
				{isLoss ? <FiMinus /> : <FiPlus />}
				{percentage}%{isLoss ? <IoIosTrendingDown /> : <IoIosTrendingUp />}
			</span>
		</div>
	);
}
