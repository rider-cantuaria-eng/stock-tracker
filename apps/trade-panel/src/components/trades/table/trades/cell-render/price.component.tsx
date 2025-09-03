import { SkeletonCell } from "../loading-table.component";

export interface IEntryPriceRendererProps {
	value: number;
}

export function PriceCell({ value }: IEntryPriceRendererProps) {
	if (!value) return <SkeletonCell />;

	return (
		<span className="text-foreground-secondary">
			{(value &&
				value.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})) ||
				"N/A"}
		</span>
	);
}
