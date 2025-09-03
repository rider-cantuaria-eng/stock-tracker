"use client";

import * as React from "react";
import { ChevronDownIcon, ClockIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Label } from "../label";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Input } from "../input";
import { cn } from "@workspace/ui/lib/utils";

interface IDatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  showTime?: boolean;
}

export function DatePicker(props: IDatePickerProps) {
  const { label, value, onChange, error, showTime = false } = props;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [time, setTime] = React.useState<string>(() => {
    if (value && showTime) {
      const d = new Date(value);
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    }
    return "12:00";
  });

  const formatDisplayValue = (date: Date) => {
    if (showTime) {
      return `${date.toLocaleDateString()} ${time}`;
    }
    return date.toLocaleDateString();
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (!showTime) {
      setOpen(false);
      onChange?.(selectedDate?.toISOString().split('T')[0] ?? "");
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
  };

  const handleApply = () => {
    if (date && showTime) {
      const [hours = 0, minutes = 0] = time.split(':').map(Number);
      const dateWithTime = new Date(date);
      dateWithTime.setHours(hours, minutes, 0, 0);
      setOpen(false);
      onChange?.(dateWithTime.toISOString());
    }
  };

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
            {date ? formatDisplayValue(date) : showTime ? "Select date & time" : "Select date"}
            {showTime ? <ClockIcon className="h-4 w-4" /> : <ChevronDownIcon />}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">          
          <Calendar
            mode="single"
            required={true}
            selected={date}
            captionLayout="dropdown"
            className={cn(error && "border-destructive bg-amber-500")}
            onSelect={handleDateSelect}
          />
          {showTime && (
            <div className="p-3 border-t">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="h-4 w-4" />
                <Label className="text-sm">Time</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => handleTimeChange(e.target.value)}
                  className="w-32"
                />
                <Button
                  size="sm"
                  onClick={handleApply}
                  disabled={!date}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-destructive text-sm mt-1">{error}</p>
      )}
    </div>
  );
}
