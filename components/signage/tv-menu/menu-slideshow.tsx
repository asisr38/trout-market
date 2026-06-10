import { existsSync } from "node:fs";
import path from "node:path";
import { Archivo, Figtree } from "next/font/google";
import type { TvDeck } from "@/lib/tv-menu";
import { DigitalMenuCarousel } from "./digital-menu-carousel";
// Slideshow styles live in app/tv2/tv2.css (shared by /tv1–/tv4).
import "@/app/tv2/tv2.css";

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

/**
 * Server wrapper shared by the TV routes (/tv1–/tv4). Each route passes its
 * own deck from TV_DECKS so every screen plays different content in the same
 * slideshow design.
 */
export function MenuSlideshow({ deck }: { deck: TvDeck }) {
  // Resolve which slide photos exist (server-only fs check) so the client
  // carousel uses the photo or the branded fallback without importing fs.
  const imageMap: Record<string, string | null> = {};
  for (const slide of deck.slides) {
    const img = "image" in slide ? slide.image : undefined;
    imageMap[slide.id] =
      img && existsSync(path.join(process.cwd(), "public", img.replace(/^\//, "")))
        ? img
        : null;
  }

  return (
    <div className={`${archivo.variable} ${figtree.variable}`}>
      <DigitalMenuCarousel deck={deck} imageMap={imageMap} />
    </div>
  );
}
