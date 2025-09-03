import { showLocaleDate } from "@workspace/utils/date";

export interface IDateRendererProps {
	date: Date | string;
}

export function DateCell({ date }: IDateRendererProps) {
	return <span className="text-foreground-secondary">{showLocaleDate(date)}</span>;
}
