import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SITE, DINNER } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Fresh Seafood, Deli & Groceries in Woodsboro, MD`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Trout's Market",
    "Woodsboro MD grocery",
    "fresh blue crab Maryland",
    "Frederick County seafood",
    "fried chicken Woodsboro",
    "deli catering Frederick MD",
    "crab cakes Maryland",
    "Woodsboro market",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Fresh Seafood, Deli & Groceries`,
    description: SITE.description,
    images: [
      {
        url: "/buildingFront.webp",
        width: 1295,
        height: 510,
        alt: `${SITE.name} storefront — ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/buildingFront.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "Grocery Store",
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F0E4" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0B09" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

const THEME_INIT = `(function(){try{var t=localStorage.getItem('trouts-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const dayNames: Record<string, string> = {
  Monday: "Mo",
  Tuesday: "Tu",
  Wednesday: "We",
  Thursday: "Th",
  Friday: "Fr",
  Saturday: "Sa",
  Sunday: "Su",
};

function LocalBusinessJsonLd() {
  const openingHoursSpecification = SITE.hours.map(([day, , open, close]) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${day}`,
    opens: open,
    closes: close,
  }));

  const openingHours = SITE.hours.map(
    ([day, , open, close]) => `${dayNames[day]} ${open}-${close}`,
  );

  const data = {
    "@context": "https://schema.org",
    "@type": ["GroceryStore", "LocalBusiness"],
    "@id": `${SITE.url}#business`,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneTel,
    email: SITE.email,
    foundingDate: SITE.founded,
    priceRange: "$$",
    image: `${SITE.url}/buildingFront.webp`,
    logo: `${SITE.url}/logo.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHours,
    openingHoursSpecification,
    paymentAccepted: SITE.paymentsAccepted.join(", "),
    currenciesAccepted: "USD",
    hasMenu: {
      "@type": "Menu",
      name: "Dinner Menu",
      description: `${DINNER.scheduleNote}. ${DINNER.includesNote}`,
      hasMenuSection: DINNER.days.map(({ day, items }) => ({
        "@type": "MenuSection",
        name: day,
        hasMenuItem: items.map((it) => ({
          "@type": "MenuItem",
          name: it.name,
          offers: {
            "@type": "Offer",
            price: it.price.replace("$", ""),
            priceCurrency: "USD",
          },
        })),
      })),
    },
    areaServed: [
      { "@type": "City", name: "Woodsboro" },
      { "@type": "City", name: "Frederick" },
      { "@type": "AdministrativeArea", name: "Frederick County, MD" },
    ],
    makesOffer: [
      { "@type": "Offer", name: "Fresh Blue Crab" },
      { "@type": "Offer", name: "Fried Chicken" },
      { "@type": "Offer", name: "Deli & Catering Platters" },
      { "@type": "Offer", name: "Jumbo Shrimp" },
      { "@type": "Offer", name: "Crab Cakes" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Weekly Specials",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Jumbo Shrimp" },
          price: "9.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "9.99",
            priceCurrency: "USD",
            unitText: "LB",
          },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Crab Cakes" },
          price: "11.99",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Fried Chicken (4pc)" },
          price: "7.49",
          priceCurrency: "USD",
        },
      ],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": `${SITE.url}#business` },
    inLanguage: "en-US",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        {children}
      </body>
    </html>
  );
}
