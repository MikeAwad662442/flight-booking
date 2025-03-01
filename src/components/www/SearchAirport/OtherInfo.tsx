/*******************************
 * @author: Mike Awad
 * @description: Other Info
 * =====================
 * Cabin Class
 * economy - premium_economy -business - first
 * Adults": "Adults +12"
 * Children": "Children 0-12"
 *
 *******************************/
"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";

const PassengerSelector = () => {
  const SearchT = useTranslations("Search.OtherInfo");
  const { control } = useFormContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-64">
          {SearchT("Header")}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{SearchT("Header")}</SheetTitle>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {/* Adults +12 */}
          <FormField
            control={control}
            name="adults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{SearchT("Adults")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[1-9]*"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const cleanValue = rawValue.replace(/[^1-9]/g, "");
                      const finalValue = cleanValue.slice(0, 1);
                      field.onChange(finalValue);
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Children 0-12 */}
          <FormField
            control={control}
            name="children"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{SearchT("Children")}</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const rawValue = e.target.value;
                      const cleanValue = rawValue.replace(/[^0-9]/g, "");
                      const finalValue = cleanValue.slice(0, 1);
                      field.onChange(finalValue);
                    }}
                    onKeyDown={(e) => {
                      if (["e", "E", "+", "-"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* cabinClass */}
          <FormField
            control={control}
            name="cabinClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{SearchT("Cabin")}</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={SearchT("Cabin")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="economy">
                      {SearchT("economy")}
                    </SelectItem>
                    <SelectItem value="premium_economy">
                      {SearchT("premium_economy")}
                    </SelectItem>
                    <SelectItem value="business">
                      {SearchT("business")}
                    </SelectItem>
                    <SelectItem value="first">{SearchT("first")}</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { PassengerSelector };
