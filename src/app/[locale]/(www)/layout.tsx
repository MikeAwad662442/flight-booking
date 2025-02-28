/*******************************
 * @author: Mike Awad
 * @description: Layout For the Website
 * =====================
 * Font : Montserrat
 *
 *
 *******************************/

// ===================== //
// === i18n Next-init == //
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { LocaleType, routing } from "@/i18n/routing";
// === i18n Next-init == //
// ===================== //
// ==== Clerck AUTH ==== //
// import { ClerkProvider } from "@clerk/nextjs";
// ==== Clerck AUTH ==== //
// ===================== //
// ======== Next ======= //
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Toaster } from "sonner";
// ======== Next ======= //
// ===================== //
// ===== components ==== //

import HeaderNavBar from "@/components/www/navigation/Header";
import Footer from "@/components/www/navigation/Footer";
// ===== components ==== //
// ===================== //
// ===== Font & CSS ==== //
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});
// ===================== //
// ==== Font & CSS ===== //
// ===================== //

type Props = {
  children: ReactNode;
  params: { locale: LocaleType };
};
// ===================== //
// ====== Metadata ===== //
// export async function generateMetadata(props: Omit<Props, "children">) {
//   const { locale } = await props.params;

//   const t = await getTranslations({ locale, namespace: "LocaleLayout" });

//   return {
//     title: t("title"),
//   };
// }

// ====== Metadata ===== //
// ===================== //

const LocaleLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as LocaleType)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      dir={locale === "en" ? "ltr" : "rtl"}
    >
      <body className={montserrat.className}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <HeaderNavBar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
export default LocaleLayout;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
