export interface IEntryPriceRendererProps {
	value: number;
}

export function PriceCell({ value }: IEntryPriceRendererProps) {
	return (
		<span className="text-foreground-secondary">
			{value.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})}
		</span>
	);
}
