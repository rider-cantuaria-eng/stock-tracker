export type RangeType = "7d" | "15d" | "1m" | "6m" | "1y" | "all";

export interface LineChartProps {
	range?: RangeType;
}
