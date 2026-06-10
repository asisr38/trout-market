import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/site";
import { TV_DECKS } from "@/lib/tv-menu";
import { MenuSlideshow } from "@/components/signage/tv-menu/menu-slideshow";

export const metadata: Metadata = {
  title: `${TV_DECKS.tv3.name} — TV 3`,
  description: `In-store ${TV_DECKS.tv3.name.toLowerCase()} slideshow for ${SITE.name}.`,
  alternates: { canonical: "/tv3" },
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

export default function Tv3Page() {
  return <MenuSlideshow deck={TV_DECKS.tv3} />;
}
