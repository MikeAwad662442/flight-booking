import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export type LocaleType = (typeof routing.locales)[number];

export const routing = defineRouting({
  locales: ["en", "ar"], // A list of all locales that are supported
  localePrefix: "always", // View the language always in link address
  defaultLocale: "en", // Used when no locale matches
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
/*********************
 * Notes :
 * ===================
 * In the old version the file name was navigation.ts
 *********************/
