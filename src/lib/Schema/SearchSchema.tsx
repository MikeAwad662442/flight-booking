/*******************************
 * @author: Mike Awad
 * @description: Search Flight
 * ============================
 * [X] ContactEmailSchema
 *******************************/
import { z } from "zod";
import {
  NotRequiredDate,
  NumberStringSchema,
  RequiredDate,
  RequiredString,
} from "./GlobalsSchema";

export const SearchFlightSchema = z.object({
  FromAirport: RequiredString,
  FromDate: RequiredDate,
  ToAirport: RequiredString,
  ToDate: NotRequiredDate,
  cabinClass: z.enum(["economy", "premium_economy", "business", "first"]),
  children: z
    .string()
    .regex(/^[0-9]$/)
    .optional(),
  adults: NumberStringSchema,
});

export type SearchFlightSchemaType = z.infer<typeof SearchFlightSchema>;

export type Flight = {
  Price: string;
  AirLineLogo: string;
  AirLineName: string;
  Duration: number;
  Stops: number;
  Departure: string;
  Arrival: string;
  OriginDisplayCode: string;
  OriginCity: string;
  OriginCountry: string;
  DestinationDisplayCode: string;
  DestinationCity: string;
  DestinationCountry: string;
};
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
