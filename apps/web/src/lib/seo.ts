import type { Metadata } from "next";

export const SEO_BASE_URL = "https://adigunapresisinusantara.com";
export const SUPPORTED_SEO_LOCALES = ["id", "en"] as const;
export const COMPANY_NAME = "PT Adiguna Presisi Nusantara";
export const COMPANY_LOGO_PATH = "/landing/logo-apn.png";
export const COMPANY_EMAIL = "adigunapresisinusantara@gmail.com";
export const COMPANY_PHONE_E164 = "+6281291572817";
export const COMPANY_PHONE_DISPLAY = "+62 812-9157-2817";
export const COMPANY_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=-6.327678067048983,106.75129545090675";
export const LOCAL_CNC_PAGE_PATH = "/jual-mesin-cnc-tangerang";
export const COMPANY_ADDRESS = {
  streetAddress: "MQC2+WGG, Jl. Grand Cendrawasih Asri, Cipayung, Kec. Ciputat",
  addressLocality: "Tangerang Selatan",
  addressRegion: "Banten",
  postalCode: "15411",
  addressCountry: "ID",
} as const;
export const COMPANY_GEO = {
  latitude: -6.327678067048983,
  longitude: 106.75129545090675,
} as const;
export const COMPANY_KEYWORDS = [
  "adiguna",
  "pt adiguna",
  "pt. adiguna presisi nusantara",
  "adiguna nusantara presisi",
  "apn",
  "pt adiguna nusantara presisi",
  "PT Adiguna Presisi Nusantara",
  "Adiguna Presisi Nusantara",
  "mesin CNC Indonesia",
  "mesin industri",
  "mesin perkakas workshop",
  "tooling machining",
  "precision machinery",
  "manufacturing solutions",
  "instalasi mesin",
  "engineering support",
  "penjual mesin cnc",
  "rekomen penjual mesin cnc",
  "mesin cnc tangerang",
  "mesin cnc tangerang selatan",
  "rekomen penjual mesin cnc tangerang",
  "penjual mesin cnc tangerang selatan",
  "jual mesin cnc tangerang",
  "jual mesin cnc tangerang selatan",
  "distributor mesin cnc tangerang",
  "supplier mesin cnc tangerang selatan",
  "rekomendasi penjual mesin cnc presisi",
  "penjual mesin cnc vertical machining center",
  "jual mesin cnc bubut tangerang",
  "vendor mesin cnc",
  "vendor mesin cnc tangerang",
  "vendor mesin cnc tangerang selatan",
  "vendor mesin cnc jakarta",
  "vendor mesin cnc banten",
  "pemasok mesin industri tangerang",
  "pemasok peralatan industri tangerang selatan",
  "penyedia mesin manufaktur tangerang",
  "jual mesin cnc murah",
  "harga mesin cnc baru",
  "distributor mesin cnc indonesia",
  "supplier mesin cnc jakarta",
  "supplier mesin cnc tangerang",
  "jual mesin cnc milling",
  "jual mesin cnc bubut",
  "mesin cnc 5 axis indonesia",
  "mesin fiber laser cutting tangerang",
  "jasa service mesin cnc",
  "tooling mesin cnc tangerang",
  "mesin perkakas bengkel bubut",
  "importir mesin cnc indonesia",
  "beli mesin cnc tangerang",
  "agen resmi mesin cnc",
] as const;

type SupportedLocale = (typeof SUPPORTED_SEO_LOCALES)[number];

type LandingMetadataInput = {
  locale: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  imageAlt: string;
  imageUrl?: string;
};

type BreadcrumbStructuredDataInput = {
  locale: string;
  items: Array<{
    name: string;
    path: string;
  }>;
};

type FaqStructuredDataInput = {
  locale: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

type ServiceStructuredDataInput = {
  locale: string;
  path: string;
  name: string;
  description: string;
  serviceType: string;
};

type ProductStructuredDataInput = {
  locale: string;
  path: string;
  name: string;
  description: string;
  category: string;
  image: string;
};

function getDefaultImageByPath(path: string): string {
  const normalized = withLeadingSlash(path).toLowerCase();

  if (normalized.includes("/crm")) return "/screenshot/pipeline.webp";
  if (normalized.includes("/sales") || normalized.includes("/quotations") || normalized.includes("/invoicing")) {
    return "/screenshot/sales-order.webp";
  }
  if (
    normalized.includes("/stock") ||
    normalized.includes("/goods-receipt") ||
    normalized.includes("/movements") ||
    normalized.includes("/purchase")
  ) {
    return "/screenshot/stock-inventory.webp";
  }
  if (
    normalized.includes("/accounting") ||
    normalized.includes("/financial-reports") ||
    normalized.includes("/reconciliation") ||
    normalized.includes("/fixed-assets") ||
    normalized.includes("/pricing")
  ) {
    return "/screenshot/profit-loss.webp";
  }
  if (
    normalized.includes("/employees") ||
    normalized.includes("/attendance") ||
    normalized.includes("/recruitment") ||
    normalized.includes("/travel-planner") ||
    normalized.includes("/evaluation")
  ) {
    return "/screenshot/salary.webp";
  }

  return "/landing/og-machine.svg";
}

function normalizeLocale(locale: string): SupportedLocale {
  return locale === "id" ? "id" : "en";
}

function withLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

export function getLocalizedPath(path: string, locale: string): string {
  const normalizedLocale = normalizeLocale(locale);
  const normalizedPath = withLeadingSlash(path);

  if (normalizedPath === "/") {
    return `/${normalizedLocale}`;
  }

  return `/${normalizedLocale}${normalizedPath}`;
}

export function getLanguageAlternates(path: string): Record<string, string> {
  return {
    id: getLocalizedPath(path, "id"),
    en: getLocalizedPath(path, "en"),
    "x-default": getLocalizedPath(path, "en"),
  };
}

export function getCompanyKeywords(extraKeywords: string[] = []): string[] {
  return [...new Set([...COMPANY_KEYWORDS, ...extraKeywords])];
}

type OrganizationStructuredDataInput = {
  locale: string;
};

export function buildOrganizationStructuredData({
  locale,
}: OrganizationStructuredDataInput) {
  const isId = locale === "id";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_BASE_URL}/#organization`,
    name: COMPANY_NAME,
    legalName: COMPANY_NAME,
    alternateName: [
      "Adiguna Presisi Nusantara",
      "PT Adiguna",
      "PT. Adiguna Presisi Nusantara",
      "APN",
      "Adiguna Nusantara Presisi",
      "PT Adiguna Nusantara Presisi",
    ],
    url: SEO_BASE_URL,
    logo: `${SEO_BASE_URL}${COMPANY_LOGO_PATH}`,
    image: `${SEO_BASE_URL}${COMPANY_LOGO_PATH}`,
    description: isId
      ? "PT Adiguna Presisi Nusantara menyediakan mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia."
      : "PT Adiguna Presisi Nusantara provides CNC machines, workshop machine tools, machining tooling, machine installation, and engineering support for manufacturers in Indonesia.",
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      ...COMPANY_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...COMPANY_GEO,
    },
    hasMap: COMPANY_GOOGLE_MAPS_URL,
    priceRange: "$$",
    currenciesAccepted: "IDR",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: [
      {
        "@type": "City",
        name: "Tangerang Selatan",
      },
      {
        "@type": "City",
        name: "Tangerang",
      },
      {
        "@type": "AdministrativeArea",
        name: "Banten",
      },
      {
        "@type": "Country",
        name: "Indonesia",
      },
    ],
    keywords: getCompanyKeywords(),
    knowsAbout: [
      "mesin CNC",
      "vertical machining center",
      "horizontal machining center",
      "CNC turning",
      "fiber laser cutting",
      "tooling machining",
      "instalasi mesin industri",
      "engineering support",
    ],
    makesOffer: {
      "@type": "OfferCatalog",
      name: isId
        ? "Katalog mesin CNC dan solusi manufaktur"
        : "CNC machinery and manufacturing solutions catalog",
      itemListElement: [
        "Vertical Machining Center",
        "Horizontal Machining Center",
        "Precision Lathe",
        "Five Axis Machining Center",
        "Fiber Laser Cutting Machine",
        "Engineering Support",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: COMPANY_PHONE_E164,
        email: COMPANY_EMAIL,
        areaServed: "ID",
        availableLanguage: ["id", "en"],
      },
    ],
  };
}

type WebSiteStructuredDataInput = {
  locale: string;
};

export function buildWebSiteStructuredData({
  locale,
}: WebSiteStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_BASE_URL}/#website`,
    url: SEO_BASE_URL,
    name: COMPANY_NAME,
    alternateName: ["Adiguna Presisi Nusantara", "APN"],
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    publisher: {
      "@id": `${SEO_BASE_URL}/#organization`,
    },
  };
}

export function buildBreadcrumbStructuredData({
  locale,
  items,
}: BreadcrumbStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SEO_BASE_URL}${getLocalizedPath(item.path, locale)}`,
    })),
  };
}

export function buildFaqStructuredData({
  locale,
  items,
}: FaqStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildServiceStructuredData({
  locale,
  path,
  name,
  description,
  serviceType,
}: ServiceStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SEO_BASE_URL}${getLocalizedPath(path, locale)}#service`,
    name,
    description,
    serviceType,
    provider: {
      "@id": `${SEO_BASE_URL}/#organization`,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Tangerang Selatan",
      },
      {
        "@type": "City",
        name: "Tangerang",
      },
      {
        "@type": "AdministrativeArea",
        name: "Banten",
      },
      {
        "@type": "Country",
        name: "Indonesia",
      },
    ],
    url: `${SEO_BASE_URL}${getLocalizedPath(path, locale)}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
  };
}

export function buildProductStructuredData({
  locale,
  path,
  name,
  description,
  category,
  image,
}: ProductStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SEO_BASE_URL}${getLocalizedPath(path, locale)}#product`,
    name,
    description,
    category,
    image: `${SEO_BASE_URL}${image}`,
    brand: {
      "@id": `${SEO_BASE_URL}/#organization`,
    },
    manufacturer: {
      "@id": `${SEO_BASE_URL}/#organization`,
    },
    seller: {
      "@id": `${SEO_BASE_URL}/#organization`,
    },
    url: `${SEO_BASE_URL}${getLocalizedPath(path, locale)}`,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
  };
}

export function buildLandingMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  imageAlt,
  imageUrl,
}: LandingMetadataInput): Metadata {
  const canonicalPath = getLocalizedPath(path, locale);
  const selectedImage = imageUrl ?? getDefaultImageByPath(path);

  return {
    title,
    description,
    keywords: getCompanyKeywords(keywords),
    alternates: {
      canonical: canonicalPath,
      languages: getLanguageAlternates(path),
    },
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `${SEO_BASE_URL}${canonicalPath}`,
      title,
      description,
      siteName: COMPANY_NAME,
      images: [
        {
          url: selectedImage,
          width: 1920,
          height: 1080,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [selectedImage],
    },
  };
}
