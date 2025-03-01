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
import { PassengerSelector } from "./OtherInfo";
import { useRouter } from "@/i18n/routing";

// ===================== //
// == React Hook Form == //
const SearchBar = () => {
  const SearchBarT = useTranslations("Search.SearchBarComponent");
  const router = useRouter();

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
    // getValues,
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
      formData.append("FromDate", values.FromDate);
      formData.append("ToAirport", values.ToAirport || "");
      if (values.ToDate) {
        formData.append("ToDate", values.ToDate);
      }
      formData.append("cabinClass", values.cabinClass);
      formData.append("adults", values.adults);
      formData.append("children", values.children || "0");

      // console.log("onSubmit", FormData);
      const { message, success, data, issues } =
        await onSubmitSearchAction(formData);
      if (success) {
        // ===================== //
        // == Remove Lod Data == //

        localStorage.removeItem("SaveFormData");
        localStorage.removeItem("flights");

        // == Remove Lod Data == //
        // ===================== //
        // == Save FormData to localStorage == //

        const SaveFormData = JSON.stringify(values);
        localStorage.setItem("SaveFormData", SaveFormData);

        // == Save FormData to localStorage == //
        // ===================== //
        // == Save Flight to localStorage == //

        const flightsString = JSON.stringify(data);
        localStorage.setItem("flights", flightsString);

        // == Save Flight to localStorage == //
        // ===================== //
        setTimeout(() => {
          toast.success(message);
          router.push("/flight-booking");
        }, 1000);
      }
      toast.error(message, {
        description: issues,
      });
    } catch (error) {
      toast.error("An error occurred while sending", {
        description: error instanceof Error,
      });
    }
  };
  return (
    <Form {...SearchInfo}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mx-auto w-fit">
          <CardHeader>
            <CardTitle>{SearchBarT("Search")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 items-start justify-start gap-2 md:grid-cols-4">
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
            <PassengerSelector />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {/* <p>{JSON.stringify(getValues())}</p> */}
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
