/*******************************
 * @author: Mike Awad
 * @description: Date Picker
 * =====================
 *******************************/
"use client";
import { format, parse } from "date-fns";
// ===================== //
// ===== shadcn/UI ===== //
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormLabel } from "@/components/ui/form";

// ===== shadcn/UI ===== //
// ===================== //
type DatePickerProps = {
  value?: string;
  onChange: (value?: string) => void;
  label: string;
  placeholder: string;
  disabled?: (date: Date) => boolean;
};

const DatePicker = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
}: DatePickerProps) => {
  // === Convert the incoming value to a Date object === //
  const parsedValue = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
  // === Convert the incoming value to a Date object === //
  // ===================== //
  // === Processing date change === //
  const handleDateChange = (date?: Date) => {
    if (date) {
      // const adjustedDate = new Date(
      //   Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
      // );
      const formattedDate = format(date, "yyyy-MM-dd");
      onChange(formattedDate);
    } else {
      onChange(undefined);
    }
  };
  return (
    <Popover>
      <div className="flex flex-col space-y-2">
        {/* <label className="text-sm font-medium">{label}</label> */}
        <FormLabel className="text-primary">{label}</FormLabel>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-64 pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {parsedValue ? (
              format(parsedValue, "yyyy-MM-dd")
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 items-end opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={parsedValue || undefined}
          onSelect={handleDateChange}
          disabled={disabled || ((date) => date < new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
