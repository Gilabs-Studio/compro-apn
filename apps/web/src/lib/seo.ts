import type { Metadata } from "next";

export const SEO_BASE_URL = "https://adigunapresisinusantara.com";
export const SUPPORTED_SEO_LOCALES = ["id", "en"] as const;
export const COMPANY_NAME = "PT Adiguna Presisi Nusantara";
export const COMPANY_LOGO_PATH = "/landing/logo-apn.png";
export const COMPANY_KEYWORDS = [
  "adiguna",
  "pt adiguna",
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
    "@type": "Organization",
    "@id": `${SEO_BASE_URL}/#organization`,
    name: COMPANY_NAME,
    alternateName: [
      "Adiguna Presisi Nusantara",
      "PT Adiguna",
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
    email: "mailto:adigunapresisinusantara@gmail.com",
    telephone: "+62-812-9157-2817",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Grand Cendrawasih Asri, Jl. Cendrawasih Kav.5, Desa/Kelurahan Cipayung, Kec. Ciputat",
      addressLocality: "Tangerang Selatan",
      addressRegion: "Banten",
      postalCode: "15411",
      addressCountry: "ID",
    },
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    keywords: getCompanyKeywords(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: "+62-812-9157-2817",
        email: "adigunapresisinusantara@gmail.com",
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
