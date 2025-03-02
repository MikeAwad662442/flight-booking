/*******************************
 * @author: Mike Awad
 * @description: Website Header
 * =====================
 * All links that are used in Navbar Headers
 * and Footer in (www) Folder
 * [x] Website Links = NavLinkJson
 *******************************/
"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
// ===== Next-intl ===== //
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// ===== Next-intl ===== //
// ===================== //
// ===== shadcn/UI ===== //
import { cn } from "@/lib/utils";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// ===== shadcn/UI ===== //
// ===================== //
import dynamic from "next/dynamic";

const LangTranslation = dynamic(() => import("./Lang"), {
  ssr: false,
});
const ThemeMode = dynamic(() => import("./ThemeMode"), {
  ssr: false,
});

import { NavBarItemsType, NavLinksJson } from "./NavbarJson";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HeaderNavBar = () => {
  const Pathname = usePathname();
  const HeaderT = useTranslations("Navbar");
  // ===================== //
  // === sticky Header === //
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  // console.log("isSticky: ", isSticky);
  // === sticky Header === //
  // ===================== //
  return (
    <header
      className={cn(
        "inset-x-0 left-0 right-0 top-0 z-10 flex h-20 w-full flex-row items-center justify-between border-b px-4 text-primary shadow-md",
        `${isSticky ? "sticky bg-white bg-opacity-50" : " "}`,
      )}
    >
      <Image
        src={`/assets/Logo.jpeg`}
        alt="Logo"
        width={50}
        height={50}
        className="ml-4"
      />
      {/* Desktop Screen */}
      {/* Company Links */}
      <nav className="hidden flex-row items-center justify-start gap-4 font-bold text-primary md:visible md:flex">
        {NavLinksJson.map((Items: NavBarItemsType) => (
          <Link
            key={Items.label}
            href={`${Items.href}`}
            className={cn(
              `${Items.href === Pathname ? "font-bold italic text-chart-5" : ""}`,
            )}
          >
            {HeaderT(Items.label)}
          </Link>
        ))}
      </nav>

      <div className="hidden h-full flex-row items-center justify-between gap-8 p-0 md:visible md:flex">
        <Button size="icon" className="rounded-lg">
          <Phone className="h-4 w-4" />
        </Button>
        <ThemeMode />
        <LangTranslation />
      </div>
      {/* Desktop Screen */}
      {/* Tablet & Mobile Screen */}
      <div className="mx-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="m-0 bg-foreground p-0">
              <SheetTitle></SheetTitle>
              <SheetClose asChild>
                <SheetDescription className="flex flex-row items-center justify-center gap-8 px-4 py-1">
                  <Button size="icon" className="rounded-lg">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <ThemeMode />
                  <LangTranslation />
                </SheetDescription>
              </SheetClose>
            </SheetHeader>
            <Accordion type="single" collapsible className="w-full">
              {NavLinksJson.map((Items: NavBarItemsType, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    <SheetClose asChild>
                      <Link
                        href={`${Items.href}`}
                        className={cn("mx-4 flex w-full justify-start gap-4")}
                      >
                        {HeaderT(`${Items.label}`)}
                      </Link>
                    </SheetClose>
                  </AccordionTrigger>
                </AccordionItem>
              ))}
            </Accordion>
          </SheetContent>
        </Sheet>
      </div>
      {/* Tablet & Mobile Screen */}
    </header>
  );
};

export default HeaderNavBar;
/*******************************
 * Notes:
 * ============================
 *
 *
 *
 *
 *******************************/
