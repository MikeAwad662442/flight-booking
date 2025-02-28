/*******************************
 * @author: Mike Awad
 * @description: Contact Form Schema
 * ============================
 * [X] ContactEmailSchema
 *******************************/
import { z } from "zod";
import { Email, RequiredString } from "./GlobalsSchema";

export const ContactEmailSchema = z.object({
  FullName: RequiredString,
  Email: Email,
  Subject: RequiredString,
  Message: RequiredString.max(500, "You cannot send more than 500 characters."),
});
export type ContactEmailSchemaType = z.infer<typeof ContactEmailSchema>;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
