export interface IEntryPriceRendererProps {
	value: number;
}

export function PriceCell({ value }: IEntryPriceRendererProps) {
	if (!value) return "N/A";

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
