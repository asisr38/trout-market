export const SITE = {
  name: "Trout's Market",
  legalName: "Trout's Seafood & Deli Market",
  tagline: "Seafood · Deli · Groceries · Est. 1994",
  description:
    "Trout's Market in Woodsboro, MD — fresh seafood, housemade deli, legendary fried chicken, and everyday groceries serving Frederick County since 1994.",
  url: "https://www.troutsmarket.com",
  phone: "301-845-8674",
  phoneTel: "+13018458674",
  email: "info@troutsmarket.com",
  curbsideEmail: "troutsmarketcurbside@gmail.com",
  address: {
    street: "3 North Main Street",
    city: "Woodsboro",
    region: "MD",
    postal: "21798",
    country: "US",
  },
  geo: { lat: 39.5321, lng: -77.3136 },
  founded: "1994",
  hours: [
    ["Monday", "7:00 AM – 7:00 PM", "07:00", "19:00"],
    ["Tuesday", "7:00 AM – 7:00 PM", "07:00", "19:00"],
    ["Wednesday", "7:00 AM – 7:00 PM", "07:00", "19:00"],
    ["Thursday", "7:00 AM – 7:00 PM", "07:00", "19:00"],
    ["Friday", "7:00 AM – 7:00 PM", "07:00", "19:00"],
    ["Saturday", "8:00 AM – 6:00 PM", "08:00", "18:00"],
    ["Sunday", "9:00 AM – 7:00 PM", "09:00", "19:00"],
  ] as const,
  hotFoodsNote: "Hot foods case closes at 6:30pm daily — call ahead after that.",
  paymentsAccepted: ["Visa", "Mastercard", "American Express", "Discover", "Cash"] as const,
};

export type DinnerItem = { name: string; price: string };
export const DINNER = {
  scheduleNote: "Served Mon–Sat 3pm–7:30pm · Sun until 6:30pm",
  includesNote: "Every meal includes 2 sides, a dinner roll & butter.",
  days: [
    {
      day: "Monday",
      items: [
        { name: "Meatloaf", price: "$12.99" },
        { name: "12 pc Fried Chicken", price: "$14.99" },
        { name: "Beef Pot Roast", price: "$10.99" },
      ],
    },
    {
      day: "Tuesday",
      items: [
        { name: "BBQ Ribs", price: "$12.99" },
        { name: "8 pc Fried Chicken", price: "$10.99" },
      ],
    },
    {
      day: "Wednesday",
      items: [
        { name: "Ham & Swiss Casserole", price: "$10.99" },
        { name: "8 pc Fried Chicken", price: "$10.99" },
      ],
    },
    {
      day: "Thursday",
      items: [
        { name: "Chicken Pot Pie", price: "$12.99" },
        { name: "8 pc Fried Chicken", price: "$10.99" },
      ],
    },
    {
      day: "Friday",
      items: [
        { name: "Grilled Steak", price: "$14.99" },
        { name: "8 pc Fried Chicken", price: "$10.99" },
      ],
    },
  ] as { day: string; items: DinnerItem[] }[],
  sides: [
    "Mac & Cheese",
    "Green Beans",
    "Mashed Potatoes",
    "Spring Blend",
    "Cole Slaw",
    "Potato Salad",
    "Macaroni Salad",
  ],
};

export const DEPARTMENTS = [
  {
    slug: "seafood",
    title: "Fresh Seafood",
    kicker: "Counter service",
    desc: "Fresh blue crab, jumbo shrimp, crab cakes, and seasonal fish — sourced locally where possible. Market pricing on crab; call for current rates and availability.",
    highlights: ["#1 & #2 Jimmies", "#1 Sooks", "Soft Shell", "Jumbo Shrimp", "Stuffed Shrimp", "Fish Fillets"],
  },
  {
    slug: "deli",
    title: "Housemade Deli",
    kicker: "Made fresh daily",
    desc: "Sliced-to-order deli meats and cheeses, housemade sides, sandwich builds, party platters, and seafood catering for events of any size.",
    highlights: ["Sub Sandwiches", "Party Platters", "Sliced Meats & Cheeses", "Housemade Sides", "Catering"],
  },
  {
    slug: "hot-foods",
    title: "Hot Foods & Dinners",
    kicker: "Ready to eat",
    desc: "Legendary fried chicken, rotating daily dinner specials, and comfort classics from the hot foods case. Case closes at 6:30pm daily — call ahead after that.",
    highlights: ["Fried Chicken 4/8/12/16 pc", "Weekly Dinner Specials", "Crab Cakes", "Fish & Chips", "Mac & Cheese"],
  },
  {
    slug: "grocery",
    title: "Grocery & Provisions",
    kicker: "Everyday essentials",
    desc: "A full selection of grocery staples, fresh produce, pantry basics, dairy, bread, and local goods — everything you need without the big-box run.",
    highlights: ["Fresh Produce", "Dairy & Eggs", "Bread & Bakery", "Pantry Staples", "Snacks & Beverages", "Local Goods"],
  },
];
