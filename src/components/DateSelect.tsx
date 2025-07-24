import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarDaysIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

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
  const [displayMonth, setDisplayMonth] = React.useState<Date>(
    selectedDate || new Date()
  );

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 11 }, 
    (_, i) => currentYear - i + 10
  ).reverse();

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const handleYearChange = (year: string) => {
    const newDate = new Date(displayMonth);
    newDate.setFullYear(parseInt(year));
    setDisplayMonth(newDate);
  };

  const handleMonthChange = (monthIndex: string) => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(parseInt(monthIndex));
    setDisplayMonth(newDate);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && setSelectedDate) {
      setSelectedDate(date);
      setCalendarOpen(false);
    }
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
              className="w-full justify-start text-left font-normal bg-transparent"
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
            <div className="p-3 border-b">
              <div className="flex gap-2 mb-3">
                <Select
                  value={displayMonth.getFullYear().toString()}
                  onValueChange={handleYearChange}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={displayMonth.getMonth().toString()}
                  onValueChange={handleMonthChange}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Mois" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-7"
                  onClick={() => {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() - 1);
                    setDisplayMonth(date);
                  }}
                >
                  Il y a 1 an
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-7"
                  onClick={() => {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() - 5);
                    setDisplayMonth(date);
                  }}
                >
                  Il y a 5 ans
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-7"
                  onClick={() => {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() - 10);
                    setDisplayMonth(date);
                  }}
                >
                  Il y a 10 ans
                </Button>
              </div>
            </div>
            
            <Calendar
              initialFocus
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={disabledDates}
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              defaultMonth={displayMonth}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
