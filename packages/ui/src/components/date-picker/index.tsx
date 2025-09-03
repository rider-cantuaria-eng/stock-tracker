"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Label } from "../label";
import { Button } from "../button";
import { Calendar } from "../calendar";

interface IDatePickerProps {
  label?: string;
}

export function DatePicker(props: IDatePickerProps) {
  const { label } = props;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="date" className="px-1">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            required={true}
            selected={date}
            captionLayout="dropdown"
            onSelect={(date: Date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
