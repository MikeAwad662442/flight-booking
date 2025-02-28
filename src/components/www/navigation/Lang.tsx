/*******************************
 * @author: Mike Awad
 * @description: Button to change the site language between the used languages
 * ============================
 * Dropdown Menu shadcn/UI
 *
 *******************************/
"use client";

// ===================== //
// ===== shadcn/UI ===== //
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// ===== shadcn/UI ===== //
// ===================== //
// ===== NEXT INTL ===== //
import { useLocale } from "next-intl"; // to Get the language it use now in the site
import { useTranslations } from "next-intl";
import { LocaleType, routing, usePathname, useRouter } from "@/i18n/routing";

// ===================== //
type Props = {
  isSticky?: boolean;
};
const LangTranslation: React.FC<Props> = ({ isSticky }) => {
  const t = useTranslations("Languages");
  const Router = useRouter(); // to return the path and language
  const ActiveLocal = useLocale(); //   // to Get the language it use now in the site
  const pathname = usePathname(); // to get the path link for the page

  const handleLanguageChange = (nextLocale: string) => {
    // You can perform any asynchronous operations here if needed
    Router.replace({ pathname }, { locale: nextLocale as LocaleType });
  };
  // console.log("isSticky: ", isSticky);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className={cn(
            `${isSticky === false ? "text-chart-5" : "text-primary"}`,
          )}
        >
          <Globe className="h-2 w-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-lg">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={
              ActiveLocal === `${locale}`
                ? "bg-chart-1 text-secondary"
                : "text-primary"
            }
            onClick={() => handleLanguageChange(`${locale}`)}
          >
            {t(`${locale}`)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangTranslation;

/**********************
 * Note:
 * Next intl
 * To get valid links that change and return the same page with language changes we use
 * usePathname, useRouter from "@/navigation" and It belongs to next-intl
 **********************/
