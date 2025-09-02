import { Badge } from "@workspace/ui/components/badge";
import { useTheme } from "next-themes";
import NextImage from "next/image";

import { ITrade } from "../hooks/trades-grid.hook";

export interface IPairHoldingProps {
	data: ITrade;
}

export function PairHoldingCell({ data }: IPairHoldingProps) {
	const { theme } = useTheme();

	return (
		<div className="flex items-center gap-3 text-foreground-secondary">
			<NextImage
				src={data?.imagem.value as unknown as string}
				alt="bitcoin image"
				width={25}
				height={25}
			/>
			{data?.ticker}
			<Badge
				className="py-[0.7] px-1.5 rounded-sm h-fit bg-background font-medium"
				style={{
					color: theme === "dark" ? "#114C84" : "#868686",
				}}
			>
				{data?.ticker}
			</Badge>
		</div>
	);
}
