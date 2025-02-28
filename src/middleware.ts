import createMiddleware from "next-intl/middleware"; // === next-intl === //
import { routing } from "./i18n/routing"; // === next-intl === //

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Match only internationalized pathnames
    "/",
    "/(fr|en)/:path*",
  ],
};

/*********************
 * Notes :
 * ===================
 *
 *********************/
