/*******************************
 * @author: Mike Awad
 * @description: Global Schema Type from ZOD
 * ============================
 * [X] NumberStringSchema
 * [X] RequiredString
 * [X] NotRequiredString
 * [X] Cuid
 * [X] ImageSchema
 *******************************/
import { z } from "zod";
/*******************************
 * = Globals value
 * =====================
 * = static value
 * =====================
 *******************************/

export const NumberStringSchema = z.coerce
  .number()
  .refine((val) => !isNaN(val), {
    message: "Invalid number",
  }); // String => Number

export const RequiredString = z.string().trim().min(1, "Required"); // For string Filed,

export const NotRequiredString = z.string().trim().optional(); // For string Filed

export const Cuid = z.string().cuid().optional(); // When the database will be used this should be: z.string().uuid().optional(),

export const Email = RequiredString.email(
  "Please enter a valid email address.",
); // For Email

// export const date = z.date();
export const RequiredDate = z
  .string()
  .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "YYYY-MM-DD",
  });
export const NotRequiredDate = z
  .string()
  .optional()
  .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "YYYY-MM-DD",
  });

/*******************************
 * =====================
 * = static value
 * =====================
 * = Image File || Link DB
 *******************************/
const FileSizeLimit = 8 * 1024 * 1024; // 8MB in bytes
const AllowedImagesTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]; // File Types
const ImageFileSchema = z
  .instanceof(File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "Please upload a valid image file",
  })
  .refine((file) => AllowedImagesTypes.includes(file.type), {
    message: `Only ${AllowedImagesTypes.join(", ")} images are allowed.`,
  })
  .refine((file) => file.size <= FileSizeLimit, {
    message: "File size should not exceed 8MB",
  });

const ImageStringSchema = z
  .string()
  .min(1, { message: "Image URL is required" });

// === Combined schema for both File and string === //
export const ImageSchema = z
  // First, check if the value exists
  .custom<File | string>((value) => value !== undefined && value !== null, {
    message: "Image is required",
  })
  // Then, validate it's either a valid File or a non-empty string
  .pipe(z.union([ImageFileSchema, ImageStringSchema]));
/*******************************
 * = Image File || Link DB
 * =====================
 * = Globals value
 *******************************/

/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
