/**
 * Trout's Market — Digital signage MENU SLIDESHOW data (/tv2).
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ THIS IS THE ONLY FILE YOU NEED TO EDIT PRICES & COPY.                  │
 * │  • Change any `price` string to update what shows on the TV.           │
 * │  • SLIDE TIMING → SLIDE_SECONDS below (5–12s recommended).             │
 * │  • REFRESH      → REFRESH_INTERVAL_MS below.                           │
 * │  • Add/remove items inside any slide's `items` array.                  │
 * │  Layout & animation live in the components — they read this object.    │
 * └──────────────────────────────────────────────────────────────────────┘
 *
 * (The single-screen board at /tv1 has its own data in lib/menu-board.ts.)
 */

/** How long each slide stays on screen before rotating (seconds). */
export const SLIDE_SECONDS = 8;

/** How often the TV hard-refreshes to pick up redeployed prices. */
export const REFRESH_INTERVAL_MS = 5 * 60 * 1_000;

/** Small line shown bottom-left on every slide. */
export const MENU_FOOTER =
  "Made fresh in-store daily  ·  Prices subject to change";

/** Brand wordmark (rendered top-left on every slide). */
export const BRAND_NAME = "Trout's Market";

export type MenuItem = {
  label: string;
  price: string;
  /** Small unit after the price, e.g. "each". */
  unit?: string;
  /** Green descriptor line, e.g. "With 4 Rolls". */
  desc?: string;
  /** Pill badge above the card, e.g. "Best Value". */
  badge?: string;
};

export type Slide =
  | {
      type: "hero";
      id: string;
      badge: string;
      /** Each entry is a stacked line; the 2nd line renders in the accent green. */
      headline: string[];
      subhead: string;
      image?: string;
    }
  | {
      type: "pieces";
      id: string;
      title: string;
      subtitle: string;
      items: MenuItem[];
      /** Item label that gets the accent-highlight tile, e.g. "12 Piece". */
      featuredLabel?: string;
    }
  | { type: "meals"; id: string; title: string; subtitle: string; items: MenuItem[] }
  | { type: "combos"; id: string; title: string; subtitle: string; items: MenuItem[] }
  | {
      type: "individual";
      id: string;
      title: string;
      subtitle: string;
      items: MenuItem[];
      image?: string;
    };

export const SLIDES: Slide[] = [
  /* ---------- SLIDE 1 · HERO ---------- */
  {
    type: "hero",
    id: "hero",
    badge: "Made Fresh In-Store",
    headline: ["Fresh.", "Hot.", "Ready."], // 2nd line ("Hot.") shows in green
    subhead: "Crispy Fried Chicken Daily",
    image: "/tv/chicken.webp", // drop this WebP into /public/tv/ to show a photo
  },

  /* ---------- SLIDE 2 · CHICKEN PIECES ---------- */
  {
    type: "pieces",
    id: "pieces",
    title: "Chicken Pieces",
    subtitle: "Hand-breaded · Fried to order",
    featuredLabel: "12 Piece",
    items: [
      { label: "4 Piece", price: "$7.99" },
      { label: "8 Piece", price: "$14.99" },
      { label: "12 Piece", price: "$21.99" },
      { label: "16 Piece", price: "$26.99" },
      { label: "20 Piece", price: "$31.99" },
      { label: "Over 20 Pieces", price: "$1.50", unit: "each" },
    ],
  },

  /* ---------- SLIDE 3 · CHICKEN MEALS ---------- */
  {
    type: "meals",
    id: "meals",
    title: "Chicken Meals",
    subtitle: "Includes 2 Sides",
    items: [
      { label: "Breast & Wing", price: "$9.79" },
      { label: "Thigh & Leg", price: "$9.79" },
      { label: "Breast & Leg", price: "$10.29" },
      { label: "Breast & Thigh", price: "$10.49" },
      { label: "2 Leg Meal", price: "$8.79" },
      { label: "2 Breast Meal", price: "$10.99" },
      { label: "2 Thigh Meal", price: "$9.99" },
      { label: "4 Wing Meal", price: "$8.99" },
      { label: "2 Thigh & Leg Meal", price: "$10.99" },
      { label: "2 Breast & Wing Meal", price: "$11.99" },
    ],
  },

  /* ---------- SLIDE 4 · FAMILY COMBOS ---------- */
  {
    type: "combos",
    id: "combos",
    title: "Family Combos",
    subtitle: "Hot, crispy, and ready to share",
    items: [
      { label: "8 Piece Combo", price: "$24.99", desc: "With 4 Rolls" },
      {
        label: "12 Piece Combo",
        price: "$32.99",
        desc: "With 6 Rolls",
        badge: "Best Value",
      },
      { label: "16 Piece Combo", price: "$40.99", desc: "With 8 Rolls" },
    ],
  },

  /* ---------- SLIDE 5 · INDIVIDUAL PIECES ---------- */
  {
    type: "individual",
    id: "individual",
    title: "Individual Pieces",
    subtitle: "Grab one or build your own box",
    image: "/tv/individual.webp",
    items: [
      { label: "Wing", price: "$1.39" },
      { label: "Leg", price: "$1.89" },
      { label: "Thigh", price: "$2.79" },
      { label: "Breast", price: "$3.79" },
    ],
  },
];
