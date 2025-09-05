import { showLocaleDate } from "@workspace/utils/date";

export interface IDateRendererProps {
	id: string | null;
	date: Date | string | null;
}

export function DateCell({ id, date }: IDateRendererProps) {
	if (!id || !date) return "N/A";

	return <span className="text-foreground-secondary">{showLocaleDate(date)}</span>;
}
