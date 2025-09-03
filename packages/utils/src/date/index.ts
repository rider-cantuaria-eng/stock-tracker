import { format } from "date-fns";
import { parse } from "date-fns";
import { enUS } from "date-fns/locale";

import { IFormatDate } from "./types";

export function formatDate(dateProps: IFormatDate): string {
	if (!dateProps?.date) return "N/A";

	const dateObj =
		typeof dateProps.date === "string" ? new Date(dateProps.date) : dateProps.date;

	const defaultFormat = dateProps.hasTime ? "MM/dd/yyyy HH:mm:ss" : "MM/dd/yyyy";

	return format(dateObj, dateProps.format || defaultFormat, {
		locale: enUS,
	});
}

export function combineDateAndTime(dateStr: string, timeStr: string): Date {
	if (!dateStr) return new Date();
	if (!timeStr) return new Date(dateStr);

	const datePart = ((dateStr || "").split(",")[0] || "").trim();
	const combinedStr = `${datePart} ${timeStr}`;

	return parse(combinedStr, "M/dd/yyyy HH:mm:ss", new Date());
}

export function extractTime(dateInput: string | Date): string {
	const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${hours}:${minutes}:${seconds}`;
}

export const datetoUTC = (timeStr: string): string => {
	const today = new Date().toISOString().split("T")[0];
	const localDate = new Date(`${today}T${timeStr}`);
	return localDate.toISOString().replace(".000Z", "+00:00");
};

export const showLocaleDate = (date: Date | string | undefined): string => {
	return date ? new Date(date).toLocaleString() : "N/A";
};