import type { Metadata, Viewport } from "next";
import { Damion, Geist, Geist_Mono, Sora, Newsreader } from "next/font/google";
import { headers } from "next/headers";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import {
  normalizeLocale,
  REQUEST_LOCALE_HEADER,
} from "@/lib/locale-preference";
import {
  COMPANY_NAME,
  getCompanyKeywords,
  SEO_BASE_URL,
  getLanguageAlternates,
} from "@/lib/seo";
import type { Locale } from "@/types/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headingFont = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const accentFont = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  display: "swap",
});

const damionFont = Damion({
  variable: "--font-damion",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

async function resolveRequestLocale(): Promise<Locale> {
  try {
    const headerStore = await headers();
    const headerLocale = normalizeLocale(
      headerStore.get(REQUEST_LOCALE_HEADER),
    );

    if (headerLocale) {
      return headerLocale;
    }
  } catch {
    // Fall through to next-intl locale resolution.
  }

  try {
    const localeValue = await getLocale();

    if (routing.locales.includes(localeValue as Locale)) {
      return localeValue as Locale;
    }
  } catch {
    // Fall through to default locale.
  }

  return routing.defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveRequestLocale();

  return {
    metadataBase: new URL(SEO_BASE_URL),
    title: {
      template: `%s | ${COMPANY_NAME}`,
      default:
        `${COMPANY_NAME} - Precision Machinery & Manufacturing Solutions`,
    },
    description:
      "PT Adiguna Presisi Nusantara menyediakan mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia.",
    keywords: getCompanyKeywords(["surface grinding machine", "vertical machining center"]),
    authors: [{ name: COMPANY_NAME }],
    creator: COMPANY_NAME,
    publisher: COMPANY_NAME,
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: SEO_BASE_URL,
      title:
        `${COMPANY_NAME} - Precision Machinery & Manufacturing Solutions`,
      description:
        "Penyedia mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia.",
      siteName: COMPANY_NAME,
      images: [
        {
          url: "/landing/og-machine.svg",
          width: 1920,
          height: 1080,
          alt: `${COMPANY_NAME} precision machinery`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        `${COMPANY_NAME} - Precision Machinery & Manufacturing Solutions`,
      description:
        "Penyedia mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia.",
      images: ["/landing/og-machine.svg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: SEO_BASE_URL,
      languages: getLanguageAlternates("/"),
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headingFont.variable} ${accentFont.variable} ${damionFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
