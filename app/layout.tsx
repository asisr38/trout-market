import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SITE } from "@/lib/site";
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Woodsboro, MD`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    images: ["/og-image.jpg"],
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
  themeColor: "#0C0B09",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

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
    image: `${SITE.url}/og-image.jpg`,
    logo: `${SITE.url}/logo.png`,
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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        {children}
      </body>
    </html>
  );
}
