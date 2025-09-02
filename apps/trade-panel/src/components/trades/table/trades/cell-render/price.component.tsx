export interface IEntryPriceRendererProps {
	value: number;
}

export function PriceCell({ value }: IEntryPriceRendererProps) {
	return (
		<span>
			{value.toLocaleString("en-US", {
				style: "currency",
				currency: "USD",
			})}
		</span>
	);
}
