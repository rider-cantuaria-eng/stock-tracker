export type RangeType = "7d" | "15d" | "1m" | "6m" | "1y" | "all";

export interface ILineChartProps {
	range?: RangeType;
	height?: string;
	width?: string;
}
