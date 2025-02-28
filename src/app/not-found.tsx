// ===================== //
// 404 Page Page not Found //
// ===================== //
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Not use "@/i18n/routing" || "next/router"
import Error from "next/error";
// ===================== //
// Logo Images
import Image from "next/image";

// Logo Images
// ===================== //

const GlobalNotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);
    return () => clearTimeout(timer);
  });
  return (
    <html>
      <body>
        <main className="my-16 flex flex-col items-center justify-center gap-2">
          <Image
            src={`/assets/Logo.png`}
            alt="LOGO"
            width={300}
            height={300}
            priority={true}
            className="mx-auto my-2"
          />
          <Error statusCode={404} />
        </main>
      </body>
    </html>
  );
};

export default GlobalNotFound;
