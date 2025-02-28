/*******************************
 * @author: Mike Awad
 * @description: ThemeMode
 * =====================
 * [-] Light & Dark Mode
 * [-]
 *
 *
 * ????? shadcn/UI
 *******************************/
"use client";
import { useTheme } from "next-themes";
// ===================== //
// ===== shadcn/UI ===== //
import { MoonStar, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
// ===== shadcn/UI ===== //
// ===================== //
const ThemeMode = () => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-primary"
      onClick={() => setTheme(`${dark ? "light" : "dark"}`)}
      asChild
    >
      {dark ? <Sun className="h-2 w-2" /> : <MoonStar className="h-2 w-2" />}
    </Button>
  );
};

export default ThemeMode;

/**********************
 * Note:
 * we use this component to implement theme mode light | dark
 * The structure should be as it is here. I tried to change it more than once, but the icon always appears like the theme and not the other way around, so copy this content as it is.
 **********************/
