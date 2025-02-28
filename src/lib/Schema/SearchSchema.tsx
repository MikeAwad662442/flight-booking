/*******************************
 * @author: Mike Awad
 * @description: Search Flight
 * ============================
 * [X] ContactEmailSchema
 *******************************/
import { z } from "zod";
import { NotRequiredDate, RequiredDate, RequiredString } from "./GlobalsSchema";
export const SearchFlightSchema = z.object({
  FromAirport: RequiredString,
  FromDate: RequiredDate,
  ToAirport: RequiredString,
  ToDate: NotRequiredDate,
  cabinClass: RequiredString,
  children: RequiredString,
  adults: RequiredString,
});
export type SearchFlightSchemaType = z.infer<typeof SearchFlightSchema>;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
