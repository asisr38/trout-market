import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sections = ["", "#specials", "#deli", "#dinner", "#hours", "#about"];
  const entries: MetadataRoute.Sitemap = sections.map((hash) => ({
    url: `${SITE.url}/${hash}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: hash === "" ? 1 : 0.7,
  }));
  entries.push({
    url: `${SITE.url}/shop`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  });
  return entries;
}
