export interface ICardInvestmentInfoProps {
	title: string;
	icon?: React.ReactNode;
	value?: number;
	increase?: {
		className?: string;
		value: string | number;
	};
	className?: string;
}
