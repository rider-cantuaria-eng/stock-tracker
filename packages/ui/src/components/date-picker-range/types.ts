import { DateRange } from "react-day-picker";

export interface IDateRangePickerProps {
	date: DateRange | undefined;
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
	numberOfMonths?: number;
	label?: string;
  className?: string;
	classNameLabel?: string;
	classNameCalendar?: string;
}