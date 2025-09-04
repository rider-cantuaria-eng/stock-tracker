import { ITrade } from "@workspace/api-client/types";

export interface IPairHoldingProps {
	data: ITrade;
}

export function PairHoldingCell({ data }: IPairHoldingProps) {
	if (!data?.id) return "N/A";

	return (
		<div className="flex items-center gap-3 text-foreground-secondary">
			<div
				className={`w-[25px] h-[25px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium`}
			>
				{data?.ticker?.charAt(0)?.toUpperCase() || "?"}
			</div>
			{data?.ticker}
		</div>
	);
}
