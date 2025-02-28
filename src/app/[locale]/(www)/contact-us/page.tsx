/*******************************
 * @author: Mike Awad
 * @description: Contact Us Page
 * =====================
 * [-]
 * [-]
 *
 *
 * ????? shadcn/UI
 *******************************/
import SwiperSection from "@/lib/Swiper";
import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import React from "react";
import FormContactUs from "./form";
import {
  ContactUsJson,
  NavBarItemsType,
} from "@/components/www/navigation/NavbarJson";
import { Link } from "@/i18n/routing";

const ContactUsPage = async () => {
  const HeroT = await getTranslations("Hero.ContactUs");
  const ContactUsT = await getTranslations("ContactUs");
  const ActiveLocal = await getLocale();
  const BodyImages = [
    "/assets/ContactUs01.webp",
    "/assets/ContactUs02.webp",
    "/assets/ContactUs03.webp",
    "/assets/ContactUs04.webp",
    "/assets/ContactUs05.webp",
  ];
  const BodyText = (
    // <article className="absolute left-0   h-full w-[80%] gap-4 bg-gradient-to-r from-slate-50 via-zinc-200 pl-16 pt-48">
    <article
      className={cn(
        "absolute top-0 h-full w-[60%] gap-4 from-slate-50 via-zinc-200 pt-48",
        `${ActiveLocal === "ar" ? "bg-gradient-to-l pr-16" : "bg-gradient-to-r pl-16"}`,
      )}
    >
      <h1 className="my-4 text-5xl font-extrabold text-chart-5">
        {HeroT("H1")}
      </h1>
      <p className="my-2 text-2xl text-primary">{HeroT("P1")}</p>
    </article>
  );

  return (
    <section>
      <SwiperSection BodyImages={BodyImages} BodyText={BodyText} />
      <h2 className="mx-auto my-8 text-center text-5xl font-extrabold text-chart-5">
        {HeroT("H1")}
      </h2>
      <FormContactUs />
      <div className="m-8 flex flex-col items-center justify-between gap-10 md:flex-row">
        {/* ContactUs */}
        <div className="flex flex-col items-start justify-start gap-4">
          <h2 className="font-bold text-chart-5">{ContactUsT("ContactUs")}</h2>
          <ul className="flex flex-col items-start justify-start gap-4">
            {ContactUsJson.map((Items: NavBarItemsType) => (
              <li key={Items.label}>
                <Link
                  href={`${Items.href}`}
                  target="_blank"
                  className="flex flex-row gap-4"
                >
                  {Items.icon && <Items.icon />} {Items.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Google Map */}
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.435182562629!2d35.77268567462801!3d35.51824203891228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1526adb7c4cc3123%3A0xa205710d5e796158!2sM.TECH!5e0!3m2!1sen!2s!4v1740567597730!5m2!1sen!2s"
            width="600"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
/*******************************
 * Notes:
 * =====================
 *
 *
 *
 *
 *
 *******************************/
