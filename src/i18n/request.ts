import { getRequestConfig } from "next-intl/server";
import { LocaleType, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as LocaleType)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : import(`../../messages/${locale}.json`))
    ).default,
  };
});

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });
/*********************
 * Notes :
 * ===================
 * In the old version the file name was navigation.ts
 *********************/
