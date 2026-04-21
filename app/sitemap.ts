import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#specials", "#deli", "#hours", "#about"];
  return sections.map((hash) => ({
    url: `${SITE.url}/${hash}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: hash === "" ? 1 : 0.7,
  }));
}
