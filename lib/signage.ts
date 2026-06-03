/**
 * Digital-signage content for the in-store TVs at /tv.
 *
 * HOW TO UPDATE (no developer needed):
 *  - Edit the items in SIGNAGE_SLIDES below. Each slide rebuilds automatically.
 *  - `price` and `note` are optional. Leave `price` off for "see counter" items.
 *  - To show a PHOTO on a slide, drop a WebP into /public (e.g. /public/tv/produce.webp)
 *    and set `image: "/tv/produce.webp"`. If the file is missing the slide simply
 *    falls back to a clean text-only layout — no broken images.
 *  - Store hours, address, phone and the QR code are pulled from lib/site.ts and
 *    do not need to be edited here.
 *
 * After editing, redeploy the site. The TVs auto-refresh every 5 minutes and will
 * pick up the new content on their own.
 */

export type SignageItem = {
  /** Product / item name. */
  name: string;
  /** Optional price, e.g. "$14.99 ea" or "$9.99 / lb". */
  price?: string;
  /** Optional short note, e.g. "Picked daily". */
  note?: string;
};

export type SignageSlide = {
  /** Stable id used as the React key. */
  id: string;
  /** Small uppercase label above the title, e.g. "This Week". */
  eyebrow: string;
  /** Large heading, e.g. "Weekly Specials". */
  title: string;
  /** Items shown on the slide. */
  items: SignageItem[];
  /** Optional /public path to a WebP photo (hybrid photo slot). */
  image?: string;
  /** Optional small line shown beneath the items. */
  footnote?: string;
};

/** Rotation interval per slide (8–10s recommended for signage). */
export const SLIDE_DURATION_MS = 9_000;

/** How often the page hard-refreshes to pick up redeployed content. */
export const REFRESH_INTERVAL_MS = 5 * 60 * 1_000;

export const SIGNAGE_SLIDES: SignageSlide[] = [
  {
    id: "specials",
    eyebrow: "This Week",
    title: "Weekly Specials",
    items: [
      { name: "Jumbo Lump Crab Cakes", price: "$14.99 ea" },
      { name: "Steamed Jumbo Shrimp", price: "$9.99 / lb" },
      { name: "Fresh Rockfish Fillet", price: "$12.99 / lb" },
      { name: "8 pc Fried Chicken", price: "$10.99" },
    ],
    footnote: "Blue crab is market price — ask at the seafood counter.",
    // image: "/tv/specials.webp",
  },
  {
    id: "produce",
    eyebrow: "Garden Fresh",
    title: "Fresh Produce",
    items: [
      { name: "Local Heirloom Tomatoes", price: "$2.99 / lb" },
      { name: "Sweet Corn", price: "5 / $2.99", note: "Picked daily" },
      { name: "Maryland Cantaloupe", price: "$3.49 ea" },
      { name: "Crisp Romaine Hearts", price: "$2.49" },
    ],
    // image: "/tv/produce.webp",
  },
  {
    id: "meat",
    eyebrow: "Butcher's Picks",
    title: "Meat Deals",
    items: [
      { name: "USDA Choice Ribeye", price: "$12.99 / lb" },
      { name: "Boneless Pork Chops", price: "$4.99 / lb" },
      { name: "Ground Beef · 80/20", price: "$4.49 / lb" },
      { name: "Marinated Chicken Breast", price: "$5.99 / lb" },
    ],
    // image: "/tv/meat.webp",
  },
  {
    id: "bakery-deli",
    eyebrow: "Made Fresh Daily",
    title: "Bakery & Deli",
    items: [
      { name: "Housemade Crab Dip", price: "$9.99 / lb" },
      { name: "Sliced-to-Order Deli Meats", note: "Boar's Head" },
      { name: "Fresh-Baked Dinner Rolls", price: "$3.99 / dozen" },
      { name: "Party Subs & Platters", note: "Order ahead" },
    ],
    // image: "/tv/bakery-deli.webp",
  },
];

/** Shown when a slide has no items (e.g. content not updated yet). */
const GENERIC_FALLBACK: SignageItem[] = [
  { name: "Fresh selections daily" },
  { name: "Ask our staff for today's picks" },
];

/**
 * Returns the slide deck with graceful fallbacks applied so the TV never shows
 * a blank panel:
 *  - If SIGNAGE_SLIDES is empty, returns a single welcome slide.
 *  - If an individual slide has no items, swaps in generic fallback copy.
 */
export function resolveSignageSlides(): SignageSlide[] {
  if (SIGNAGE_SLIDES.length === 0) {
    return [
      {
        id: "fallback",
        eyebrow: "Welcome",
        title: "Fresh Every Day",
        items: GENERIC_FALLBACK,
      },
    ];
  }

  return SIGNAGE_SLIDES.map((slide) => ({
    ...slide,
    items: slide.items.length > 0 ? slide.items : GENERIC_FALLBACK,
  }));
}
