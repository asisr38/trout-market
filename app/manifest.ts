import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trout's Market",
    short_name: "Trout's",
    description: "Fresh seafood, deli, groceries, and hot foods in Woodsboro, Maryland.",
    start_url: "/",
    display: "standalone",
    background_color: "#0C0B09",
    theme_color: "#0C0B09",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
