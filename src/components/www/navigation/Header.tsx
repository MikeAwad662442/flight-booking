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
import { Phone } from "lucide-react";
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
      // className={cn(
      //   "inset-x-0 left-0 right-0 top-0 z-10 flex h-20 w-full flex-row items-center justify-between gap-2 border-b text-primary shadow-md",
      //   `${isSticky ? "sticky bg-white bg-opacity-50" : " "}`,
      // )}
    >
      <Image
        src={`/assets/Logo.png`}
        alt="Logo"
        width={200}
        height={50}
        className="ml-4"
      />
      {/* Company Links */}
      <nav className="flex flex-row items-center justify-start gap-4 text-primary">
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

      <div className="flex h-full flex-row items-center justify-between gap-8 p-0">
        <Button size="icon" className="rounded-lg">
          <Phone className="h-4 w-4" />
        </Button>
        <ThemeMode />
        <LangTranslation />
      </div>
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
