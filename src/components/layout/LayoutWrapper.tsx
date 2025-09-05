"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import EndPoint from "@/components/layout/Endpoint";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes without header/footer
  const noLayoutRoutes = ["/signin", "/signup"];
  const hideLayout =
    noLayoutRoutes.includes(pathname) || pathname.startsWith("/verify/");

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <EndPoint />}
    </>
  );
}
