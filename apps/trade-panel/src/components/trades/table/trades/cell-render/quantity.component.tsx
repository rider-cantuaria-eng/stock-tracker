export interface IPairHoldingProps {
	quantity: string;
}

export function QuantityCell({ quantity }: IPairHoldingProps) {
	return (
		<div className="flex items-center gap-3 text-foreground-secondary">
			<span>{quantity}</span>
		</div>
	);
}
