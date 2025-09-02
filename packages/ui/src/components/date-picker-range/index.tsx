"use client";
import { Button } from "@workspace/ui/components/button";
import { Calendar } from "@workspace/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@workspace/ui/components/popover";
import { cn } from "@workspace/ui/lib/utils"

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { IDateRangePickerProps } from "./types";

export const DateRangePicker = ({
	label,
	numberOfMonths = 1,
	date,
	setDate,
	classNameCalendar,
	className,
  classNameLabel,
}: IDateRangePickerProps) => {
	return (
		<div className={cn("w-full", className)}>
			{label && (
				<div className={cn(classNameLabel, "flex items-center justify-between")}>
					<h4 className="text-md font-semibold mb-1">{label}</h4>
				</div>
			)}

			<div className=" flex flex-wrap items-center gap-3">
				<Popover>
					<PopoverTrigger asChild>
						<Button
							id="date"
							variant={"outline"}
							className={cn(
								"w-full justify-start text-left font-normal",
								!date && "text-muted-foreground",
							)}
						>
							<CalendarIcon />
							{date?.from ? (
								date.to ? (
									<>
										{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
									</>
								) : (
									format(date.from, "LLL dd, y")
								)
							) : (
								<span>Pick a date</span>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-full p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={date?.from}
							selected={date}
							onSelect={setDate}
							numberOfMonths={numberOfMonths >= 1 ? numberOfMonths : 1}
							locale={ptBR}
							className={classNameCalendar}
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};

