/*******************************
 * @author: Mike Awad
 * @description: Date Picker
 * =====================
 *******************************/
"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  label: string;
  placeholder: string;
  disabled?: (date: Date) => boolean;
}

const DatePicker = ({
  value,
  onChange,
  label,
  placeholder,
  disabled,
}: DatePickerProps) => {
  return (
    <Popover>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] pl-3 text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled || ((date) => date < new Date())}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
