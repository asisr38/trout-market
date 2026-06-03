import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { ChickenBoard } from "@/components/signage/chicken-board";
import { KioskRuntime } from "@/components/signage/kiosk-runtime";
import "./tv.css";

export const metadata: Metadata = {
  title: "Fried Chicken Menu",
  description: `In-store fried chicken menu board for ${SITE.name}.`,
  alternates: { canonical: "/tv" },
  // Kiosk page — keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0C0B09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function TvPage() {
  return (
    <>
      <ChickenBoard />
      <KioskRuntime />
    </>
  );
}
