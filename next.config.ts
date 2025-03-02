import type { NextConfig } from "next";
// === Next-intl === //
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
// === Next-intl === //
const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/webp", "image/avif"], // Add AVIF and WebP support and export images in these formats
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com", // To allow user photos to appear in the app when sent along with other information when using Auth
      },
      {
        hostname: "logos.skyscnr.com", // To allow user photos to appear in the app when sent along with other information when using Auth
      },
    ],
  },
  // experimental: {
  //   serverActions: {
  //     bodySizeLimit: "8mb",
  //   },
  // },
};

export default withNextIntl(nextConfig);
