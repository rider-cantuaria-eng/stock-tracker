import { ITrade } from "@workspace/api-client/types";

import { SkeletonCell } from "../loading-table.component";

export interface IPairHoldingProps {
	data: ITrade;
}

export function PairHoldingCell({ data }: IPairHoldingProps) {
	if (!data?.id) return <SkeletonCell />;
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
