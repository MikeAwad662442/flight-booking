/*******************************
 * @author: Mike Awad
 * @description: **********************
 * =====================
 * [-]
 * [-]
 *
 *
 * ????? shadcn/UI
 *******************************/
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
// import { format } from "date-fns";
// ===================== //
// ===== shadcn/UI ===== //
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// ===== shadcn/UI ===== //
// ===================== //
import AirportSearch from "./AirportSearch";
import {
  SearchFlightSchema,
  SearchFlightSchemaType,
} from "@/lib/Schema/SearchSchema";
import { onSubmitSearchAction } from "@/app/api/airports/route";
import DatePicker from "./DatePicker";

// ===================== //
// == React Hook Form == //
const SearchBar = () => {
  const SearchBarT = useTranslations("Search.SearchBarComponent");
  const SearchInfo = useForm<SearchFlightSchemaType>({
    resolver: zodResolver(SearchFlightSchema),
    defaultValues: {
      FromAirport: "",
      FromDate: "",
      ToAirport: "",
      ToDate: "",
      cabinClass: "economy",
      children: "0",
      adults: "1",
    },
    mode: "all",
  });
  // ===================== //
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = SearchInfo;
  // == React Hook Form == //
  // ===================== //
  // === Send Data To server === //
  const onSubmit: SubmitHandler<SearchFlightSchemaType> = async (values) => {
    try {
      if (!values.FromAirport || !values.FromDate) {
        throw new Error("The required data is missing");
      }
      const formData = new FormData();
      formData.append("FromAirport", values.FromAirport);
      // formData.append("FromDate", format(values.FromDate, "yyyy-MM-dd"));
      formData.append("FromDate", values.FromDate);
      formData.append("ToAirport", values.ToAirport || "");
      if (values.ToDate) {
        formData.append("ToDate", values.ToDate);
      }

      const { message, success, issues } = await onSubmitSearchAction(formData);
      if (success) {
        setTimeout(() => {
          toast.success(message);
        }, 2000);
      }
      toast.error(message, {
        description: issues,
      });
    } catch (error) {
      toast.error("An error occurred while sending", {
        description: error instanceof Error,
      });
    }
    // console.log("onSubmit", formData);
  };
  return (
    <Form {...SearchInfo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto">
          <CardHeader>
            <CardTitle>{SearchBarT("Search")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-start justify-start gap-4 md:flex-row">
            {/* From Airport: String inputType Text*/}
            <FormField
              control={control}
              name="FromAirport"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>{SearchBarT("FromAirport")}</FormLabel>
                  <FormControl>
                    <AirportSearch
                      value={field.value}
                      onLocationSelected={(value) => {
                        field.onChange(value);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* From Date: String inputType Text*/}
            <FormField
              control={control}
              name="FromDate"
              render={({ field }) => (
                <FormItem>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    label={SearchBarT("FromDate")}
                    placeholder={SearchBarT("PickDate")}
                    disabled={(date) => date < new Date()}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* To Airport: String inputType Text*/}
            <FormField
              control={control}
              name="ToAirport"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>{SearchBarT("ToAirport")}</FormLabel>
                  <FormControl>
                    <AirportSearch
                      value={field.value}
                      onLocationSelected={(value) => {
                        field.onChange(value);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* To Date: String inputType Text*/}
            <FormField
              control={control}
              name="ToDate"
              render={({ field }) => (
                <FormItem>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    label={SearchBarT("ToDate")}
                    placeholder={SearchBarT("PickDate")}
                    disabled={(date) => date < new Date()}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p>{JSON.stringify(getValues())}</p>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SearchBar;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
