// @ts-ignore
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "./label";

interface DatePickerProps {
  date: Date | undefined;
  // () => {setDate(e)}: (date: Date | undefined) => void;
  setDate: (date: Date | undefined) => void;
  labelText?: string;
  labelClassName?: string;
  placeHolder?: string;
  buttonClassName?: string;
  placeholderClassName?: string;
  fromDate?: Date | undefined;
  toDate?: Date | undefined;
  disabled?: boolean;
}

export const DatePicker = ({
  date,
  setDate,
  labelText = "Date",
  placeHolder = "Pick a date",
  buttonClassName,
  labelClassName,
  fromDate = undefined,
  toDate = undefined,
  disabled = false,
  placeholderClassName,
}: DatePickerProps) => {
  // const [date, setDate] = React.useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectDate = (date: Date | undefined) => {
    setDate(date);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col">
      <Label className={cn("text-md font-normal font-droid", labelClassName)}>
        {labelText}
      </Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[280px] justify-between text-left font-normal font-droid",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            {date ? (
              format(date, "dd-MM-yyyy")
            ) : (
              <span className={placeholderClassName}>{placeHolder}</span>
            )}
            <CalendarIcon className="mr-2 h-4 w-4 font-droid" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelectDate}
            fromDate={fromDate}
            toDate={toDate}
            initialFocus
            className="font-droid"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
