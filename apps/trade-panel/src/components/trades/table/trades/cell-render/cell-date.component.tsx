import { showLocaleDate } from "@workspace/utils/date";

import { SkeletonCell } from "../loading-table.component";

export interface IDateRendererProps {
	id: string | null;
	date: Date | string | null;
}

export function DateCell({ id, date }: IDateRendererProps) {
	if (!id || !date) return <SkeletonCell />;

	return <span className="text-foreground-secondary">{showLocaleDate(date)}</span>;
}
