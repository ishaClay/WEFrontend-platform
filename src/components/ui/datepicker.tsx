import * as React from "react";
// @ts-ignore
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "./label";

interface DatePickerProps {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  labelText?: string;
  placeHolder?: string;
  buttonClassName?: string;
}

export const DatePicker = ({
  date,
  setDate,
  labelText = "Date",
  placeHolder = "Pick a date",
  buttonClassName,
}: DatePickerProps) => {
  // const [date, setDate] = React.useState<Date>();

  return (
    <div className="flex flex-col gap-[9px]">
      <Label className="text-md font-normal font-calibri">{labelText}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
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
            initialFocus
            className="font-calibri"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
