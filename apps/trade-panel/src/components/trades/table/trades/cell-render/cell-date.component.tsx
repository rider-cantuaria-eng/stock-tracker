import { formatDate } from "@workspace/utils/date";

export interface IDateRendererProps {
	date: Date | string;
}

export function DateCell({ date }: IDateRendererProps) {
	return <span>{formatDate({ date: date })}</span>;
}
