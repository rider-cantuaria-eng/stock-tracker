export interface IPairHoldingProps {
	quantity: string;
}

export function QuantityCell({ quantity }: IPairHoldingProps) {
	if (!quantity) return "N/A";

	return (
		<div className="flex items-center gap-3 text-foreground-secondary">
			<span>{quantity}</span>
		</div>
	);
}
