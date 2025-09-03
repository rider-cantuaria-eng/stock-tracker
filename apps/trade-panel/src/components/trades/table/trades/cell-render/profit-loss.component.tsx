import { ITrade } from "@workspace/api-client/types";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";

import { SkeletonCell } from "../loading-table.component";

export interface IProfitOrLossRendererProps {
	data: ITrade;
}

export function ProfitLossCell({ data }: IProfitOrLossRendererProps) {
	if (!data.exitPrice) {
		return <SkeletonCell />;
	}

	const totalEntry = data.entryPrice * data.quantity;
	const totalExit = data.exitPrice * data.quantity;

	const difference = totalEntry - totalExit;
	const isLoss = difference > 0;

	console.log(totalEntry, totalExit, difference);
	const percentage = Math.abs((difference / totalEntry) * 100).toFixed(2);

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
