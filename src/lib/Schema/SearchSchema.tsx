/*******************************
 * @author: Mike Awad
 * @description: Search Flight
 * ============================
 * [X] ContactEmailSchema
 *******************************/
import { z } from "zod";
import {
  date,
  //NotRequiredString,
  RequiredString,
} from "./GlobalsSchema";
export const SearchFlightSchema = z.object({
  FromAirport: RequiredString,
  FromDate: date,
  ToAirport: RequiredString,
  ToDate: date.optional(),
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
