import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarDaysIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface DateSelectProps {
  selectedDate?: Date;
  setSelectedDate?: (value: Date) => void;
  disabledDates?: (date: Date) => boolean;
  label: string;
  disabled?: boolean;
}

export default function DateSelect({
  selectedDate,
  setSelectedDate,
  disabledDates,
  label,
  disabled,
}: DateSelectProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="grid grid-cols-1 w-full gap-2">
      <label htmlFor="reason" className="text-sm font-bold text-primary">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="w-full">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-select"
              className="w-full justify-start text-left font-normal bg-transparent "
              variant="outline"
              disabled={disabled}
            >
              <CalendarDaysIcon className="hidden sm:inline-block mr-2 h-4 w-4 text-primary" />
              <span className="font-medium text-primary">
                {selectedDate &&
                selectedDate instanceof Date &&
                !isNaN(selectedDate.getTime())
                  ? selectedDate.toLocaleDateString("fr-FR", dateOptions)
                  : "Choisir une date"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto p-0">
            <Calendar
              initialFocus
              mode="single"
              selected={selectedDate}
              onSelect={(value) => {
                setSelectedDate && setSelectedDate(value as Date);
                setCalendarOpen(false);
              }}
              disabled={disabledDates}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
