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
import { Label } from "./label";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  labelText?: string;
  labelClassName?: string;
  placeHolder?: string;
  buttonClassName?: string;
  fromDate?: Date | undefined;
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
  disabled = false,
}: DatePickerProps) => {
  // const [date, setDate] = React.useState<Date>();

  console.log("date", date);

  return (
    <div className="flex flex-col">
      <Label className={cn("text-md font-normal font-calibri", labelClassName)}>
        {labelText}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[280px] justify-between text-left font-normal font-calibri",
              !date && "text-muted-foreground",
              buttonClassName
            )}
          >
            {date ? format(date, "dd-MM-yyyy") : <span>{placeHolder}</span>}
            <CalendarIcon className="mr-2 h-4 w-4 font-calibri" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            fromDate={fromDate}
            initialFocus
            className="font-calibri"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
