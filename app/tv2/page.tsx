import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata, Viewport } from "next";
import { Archivo, Figtree } from "next/font/google";
import { SITE } from "@/lib/site";
import { SLIDES } from "@/lib/tv-menu";
import { DigitalMenuCarousel } from "@/components/signage/tv-menu/digital-menu-carousel";
import "./tv2.css";

// Reference fonts: Archivo (heavy display) + Figtree (UI). Self-hosted via
// next/font and exposed as the CSS variables tv2.css references.
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fried Chicken Menu — Slideshow",
  description: `Auto-rotating in-store fried chicken menu for ${SITE.name}.`,
  alternates: { canonical: "/tv2" },
  // Kiosk page — keep it out of search results.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function Tv2Page() {
  // Resolve which slide photos exist (server-only fs check) so the client
  // carousel uses the photo or the branded fallback without importing fs.
  const imageMap: Record<string, string | null> = {};
  for (const slide of SLIDES) {
    const img = "image" in slide ? slide.image : undefined;
    imageMap[slide.id] =
      img && existsSync(path.join(process.cwd(), "public", img.replace(/^\//, "")))
        ? img
        : null;
  }

  return (
    <div className={`${archivo.variable} ${figtree.variable}`}>
      <DigitalMenuCarousel imageMap={imageMap} />
    </div>
  );
}
