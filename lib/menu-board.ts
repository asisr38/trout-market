/**
 * Fried-chicken menu board shown on the in-store TV at /tv.
 *
 * HOW TO UPDATE (no developer needed):
 *  - Edit the prices/items below. The board rebuilds on the next deploy and the
 *    TV auto-refreshes every few minutes to pick up the change.
 *  - To show the food PHOTO, drop a WebP at /public/tv/chicken.webp. If the file
 *    is missing the board falls back to a clean branded panel — never a broken
 *    image.
 *  - Brand, address and phone come from lib/site.ts.
 */

export type BoardItem = {
  /** Item name, e.g. "8 Piece" or "Breast & Wing". */
  label: string;
  /** Price string, e.g. "$14.99". */
  price: string;
  /** Optional small note, e.g. "each" or "with 4 rolls". */
  note?: string;
};

export const CHICKEN_BOARD = {
  /** Two-tone script tagline beside the logo. */
  tagline: { lead: "Fresh.", accent: "Hot." },

  /** Optional /public path to the hero food photo (graceful fallback if absent). */
  photo: "/tv/chicken.webp",
  photoCaption: "Hand-breaded & fried to order, all day.",

  pieces: {
    kicker: "Chicken",
    title: "Pieces",
    /** Rendered as a 3 × 2 grid of price tiles. */
    items: [
      { label: "4 Piece", price: "$7.99" },
      { label: "8 Piece", price: "$14.99" },
      { label: "12 Piece", price: "$21.99" },
      { label: "16 Piece", price: "$26.99" },
      { label: "20 Pieces", price: "$31.99" },
      { label: "Over 20 Pieces", price: "$1.50", note: "each" },
    ] as BoardItem[],
  },

  individual: {
    title: "Individual Pieces",
    items: [
      { label: "Wing", price: "$1.39" },
      { label: "Leg", price: "$1.89" },
      { label: "Thigh", price: "$2.79" },
      { label: "Breast", price: "$3.79" },
    ] as BoardItem[],
  },

  meals: {
    kicker: "Chicken",
    title: "Meals",
    note: "Every meal includes 2 sides",
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
    ] as BoardItem[],
  },

  combos: {
    title: "Combos",
    items: [
      { label: "8 Piece", price: "$24.99", note: "with 4 rolls" },
      { label: "12 Piece", price: "$32.99", note: "with 6 rolls" },
      { label: "16 Piece", price: "$40.99", note: "with 8 rolls" },
    ] as BoardItem[],
  },

  /** How often the kiosk hard-refreshes to pick up redeployed content. */
  refreshMs: 5 * 60 * 1000,
};
