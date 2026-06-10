/**
 * Trout's Market — Digital signage SLIDESHOW data for all four TVs.
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │ THIS IS THE ONLY FILE YOU NEED TO EDIT PRICES & COPY.                  │
 * │  • /tv1 → CHICKEN_DECK   (fried chicken)                               │
 * │  • /tv2 → SEAFOOD_DECK   (seafood counter & blue crab)                 │
 * │  • /tv3 → DELI_DECK      (deli, bakery & hot dinner specials)          │
 * │  • /tv4 → MARKET_DECK    (weekly specials, butcher & produce)          │
 * │  • Change any `price` string to update what shows on the TV.           │
 * │  • SLIDE TIMING → SLIDE_SECONDS below (5–12s recommended).             │
 * │  • REFRESH      → REFRESH_INTERVAL_MS below.                           │
 * │  • Add/remove items inside any slide's `items` array.                  │
 * │  • To show a PHOTO on a slide, drop a WebP into /public/tv/ matching    │
 * │    the slide's `image` path. Missing files fall back to a branded       │
 * │    panel — never a broken image.                                        │
 * │  Layout & animation live in the components — they read these objects.   │
 * └──────────────────────────────────────────────────────────────────────┘
 */

/** How long each slide stays on screen before rotating (seconds). */
export const SLIDE_SECONDS = 8;

/** How often the TV hard-refreshes to pick up redeployed prices. */
export const REFRESH_INTERVAL_MS = 5 * 60 * 1_000;

/** Small line shown bottom-left on every slide (decks can override). */
export const MENU_FOOTER = "Made fresh daily · Prices subject to change";

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

export type TvDeck = {
  /** Short label used in the page <title>. */
  name: string;
  /** Two-tone text on the branded panel shown when a slide photo is missing. */
  fallback: { lead: string; accent: string };
  /** Bottom-left line on every slide (defaults to MENU_FOOTER if omitted). */
  footer?: string;
  slides: Slide[];
};

/* ════════════════════════ TV 1 · FRIED CHICKEN ════════════════════════ */

export const CHICKEN_DECK: TvDeck = {
  name: "Fried Chicken",
  fallback: { lead: "Famous", accent: "Fried Chicken" },
  slides: [
    /* ---------- SLIDE 1 · HERO ---------- */
    {
      type: "hero",
      id: "hero",
      badge: "Made Fresh In-Store",
      headline: ["Fresh.", "Hot.", "Ready."], // 2nd line ("Hot.") shows in green
      subhead: "Crispy Fried Chicken Daily",
      image: "/tv/chicken.webp",
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
  ],
};

/* ════════════════════════ TV 2 · FRESH SEAFOOD ════════════════════════ */

export const SEAFOOD_DECK: TvDeck = {
  name: "Fresh Seafood",
  fallback: { lead: "Fresh", accent: "Seafood" },
  footer: "Blue crab: market price · ask at the counter",
  slides: [
    /* ---------- SLIDE 1 · HERO ---------- */
    {
      type: "hero",
      id: "hero",
      badge: "Sourced Local When Possible",
      headline: ["Fresh.", "Local.", "Seafood."],
      subhead: "Maryland Blue Crab · Shrimp · Fish",
      image: "/tv/seafood.webp",
    },

    /* ---------- SLIDE 2 · SEAFOOD COUNTER ---------- */
    {
      type: "pieces",
      id: "counter",
      title: "Seafood Counter",
      subtitle: "Fresh daily · Steamed to order",
      featuredLabel: "Jumbo Lump Crab Cakes",
      items: [
        { label: "Jumbo Lump Crab Cakes", price: "$14.99", unit: "each" },
        { label: "Steamed Jumbo Shrimp", price: "$9.99", unit: "/ lb" },
        { label: "Fresh Rockfish Fillet", price: "$12.99", unit: "/ lb" },
        { label: "Stuffed Shrimp", price: "Market" },
        { label: "Soft Shell Crabs", price: "Market" },
        { label: "Fish Fillets", price: "Market" },
      ],
    },

    /* ---------- SLIDE 3 · BLUE CRAB ---------- */
    {
      type: "meals",
      id: "crab",
      title: "Maryland Blue Crab",
      subtitle: "Steamed or live · Market price — ask at the counter",
      items: [
        { label: "#1 Jimmies", price: "Market" },
        { label: "#2 Jimmies", price: "Market" },
        { label: "#1 Sooks", price: "Market" },
        { label: "Soft Shell", price: "Market" },
      ],
    },

    /* ---------- SLIDE 4 · PARTY FAVORITES ---------- */
    {
      type: "individual",
      id: "party",
      title: "Party Favorites",
      subtitle: "Order ahead for your next gathering",
      image: "/tv/party.webp",
      items: [
        { label: "Housemade Crab Dip", price: "$9.99 / lb" },
        { label: "Steamed Shrimp Platters", price: "Order Ahead" },
        { label: "Stuffed Shrimp", price: "Market" },
        { label: "Seafood Catering", price: "Call Us" },
      ],
    },
  ],
};

/* ══════════════════ TV 3 · DELI, BAKERY & HOT FOODS ══════════════════ */

export const DELI_DECK: TvDeck = {
  name: "Deli & Hot Foods",
  fallback: { lead: "Housemade", accent: "Deli" },
  footer: "Hot foods case closes at 6:30pm daily",
  slides: [
    /* ---------- SLIDE 1 · HERO ---------- */
    {
      type: "hero",
      id: "hero",
      badge: "Made Fresh Daily",
      headline: ["Sliced.", "Stacked.", "Fresh."],
      subhead: "Housemade Deli · Bakery · Hot Foods",
      image: "/tv/deli.webp",
    },

    /* ---------- SLIDE 2 · HOT DINNER SPECIALS ---------- */
    {
      type: "meals",
      id: "dinners",
      title: "Hot Dinner Specials",
      subtitle: "Mon–Sat 3–7:30pm · Includes 2 sides, roll & butter",
      items: [
        { label: "Mon · Meatloaf", price: "$12.99" },
        { label: "Tue · BBQ Ribs", price: "$12.99" },
        { label: "Wed · Ham & Swiss Casserole", price: "$10.99" },
        { label: "Thu · Chicken Pot Pie", price: "$12.99" },
        { label: "Fri · Grilled Steak", price: "$14.99" },
        { label: "Mon · Beef Pot Roast", price: "$10.99" },
        { label: "Daily · 8 pc Fried Chicken", price: "$10.99" },
        { label: "Mon · 12 pc Fried Chicken", price: "$14.99" },
      ],
    },

    /* ---------- SLIDE 3 · PLATTERS & CATERING ---------- */
    {
      type: "combos",
      id: "platters",
      title: "Platters & Catering",
      subtitle: "Order ahead — we'll have it ready",
      items: [
        { label: "Party Subs", price: "Order Ahead", desc: "Built to feed a crowd" },
        {
          label: "Deli Platters",
          price: "Order Ahead",
          desc: "Meats, cheeses & sides",
          badge: "Crowd Favorite",
        },
        { label: "Seafood Catering", price: "Call Us", desc: "Events of any size" },
      ],
    },

    /* ---------- SLIDE 4 · DELI COUNTER ---------- */
    {
      type: "individual",
      id: "counter",
      title: "Deli Counter",
      subtitle: "Sliced to order · Boar's Head",
      image: "/tv/deli-counter.webp",
      items: [
        { label: "Sliced Meats & Cheeses", price: "Boar's Head" },
        { label: "Housemade Sides", price: "Fresh Daily" },
        { label: "Fresh-Baked Dinner Rolls", price: "$3.99 / dz" },
        { label: "Sub Sandwiches", price: "Made to Order" },
      ],
    },
  ],
};

/* ═══════════════ TV 4 · WEEKLY SPECIALS, BUTCHER & PRODUCE ═══════════════ */

export const MARKET_DECK: TvDeck = {
  name: "Market Specials",
  fallback: { lead: "Fresh", accent: "Every Day" },
  slides: [
    /* ---------- SLIDE 1 · HERO ---------- */
    {
      type: "hero",
      id: "hero",
      badge: "This Week at Trout's",
      headline: ["Fresh.", "Local.", "Yours."],
      subhead: "Produce · Butcher · Everyday Groceries",
      image: "/tv/market.webp",
    },

    /* ---------- SLIDE 2 · WEEKLY SPECIALS ---------- */
    {
      type: "combos",
      id: "specials",
      title: "Weekly Specials",
      subtitle: "While supplies last",
      items: [
        { label: "Jumbo Lump Crab Cakes", price: "$14.99", desc: "Each" },
        {
          label: "Steamed Jumbo Shrimp",
          price: "$9.99",
          desc: "Per pound",
          badge: "This Week",
        },
        { label: "8 pc Fried Chicken", price: "$10.99", desc: "Hot & ready" },
      ],
    },

    /* ---------- SLIDE 3 · BUTCHER'S PICKS ---------- */
    {
      type: "combos",
      id: "butcher",
      title: "Butcher's Picks",
      subtitle: "Cut fresh · USDA Choice",
      items: [
        {
          label: "USDA Choice Ribeye",
          price: "$12.99",
          desc: "Per pound",
          badge: "Butcher's Pick",
        },
        { label: "Boneless Pork Chops", price: "$4.99", desc: "Per pound" },
        { label: "Ground Beef · 80/20", price: "$4.49", desc: "Per pound" },
      ],
    },

    /* ---------- SLIDE 4 · FRESH PRODUCE ---------- */
    {
      type: "meals",
      id: "produce",
      title: "Fresh Produce",
      subtitle: "Local first · Picked daily",
      items: [
        { label: "Local Heirloom Tomatoes", price: "$2.99 / lb" },
        { label: "Sweet Corn", price: "5 / $2.99" },
        { label: "Maryland Cantaloupe", price: "$3.49 ea" },
        { label: "Crisp Romaine Hearts", price: "$2.49" },
      ],
    },

    /* ---------- SLIDE 5 · GROCERY & PROVISIONS ---------- */
    {
      type: "individual",
      id: "grocery",
      title: "Grocery & Provisions",
      subtitle: "Everything you need — without the big-box run",
      image: "/tv/grocery.webp",
      items: [
        { label: "Fresh Produce", price: "Picked Daily" },
        { label: "Dairy & Eggs", price: "Local" },
        { label: "Bread & Bakery", price: "Fresh" },
        { label: "Local Goods", price: "In Store" },
      ],
    },
  ],
};

/** Route → deck mapping used by the /tv1–/tv4 pages. */
export const TV_DECKS = {
  tv1: CHICKEN_DECK,
  tv2: SEAFOOD_DECK,
  tv3: DELI_DECK,
  tv4: MARKET_DECK,
} as const;
