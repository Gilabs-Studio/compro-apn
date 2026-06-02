import type { Metadata, Viewport } from "next";
import { Damion, Geist, Geist_Mono, Sora, Newsreader } from "next/font/google";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getLanguageAlternates } from "@/lib/seo";
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

export async function generateMetadata(): Promise<Metadata> {
  let locale: Locale;

  try {
    const localeValue = await getLocale();
    locale = routing.locales.includes(localeValue as Locale)
      ? (localeValue as Locale)
      : routing.defaultLocale;
  } catch {
    locale = routing.defaultLocale;
  }

  return {
    metadataBase: new URL("https://adigunapresisi.co.id"),
    title: {
      template: "%s | PT Adiguna Presisi Nusantara",
      default:
        "PT Adiguna Presisi Nusantara - Precision Machinery & Manufacturing Solutions",
    },
    description:
      "PT Adiguna Presisi Nusantara menyediakan mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia.",
    keywords: [
      "PT Adiguna Presisi Nusantara",
      "mesin CNC Indonesia",
      "mesin industri",
      "mesin perkakas workshop",
      "tooling machining",
      "precision machinery",
      "manufacturing solutions",
      "instalasi mesin",
      "engineering support",
      "surface grinding machine",
      "vertical machining center",
    ],
    authors: [{ name: "PT Adiguna Presisi Nusantara" }],
    creator: "PT Adiguna Presisi Nusantara",
    publisher: "PT Adiguna Presisi Nusantara",
    openGraph: {
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      url: "https://adigunapresisi.co.id",
      title:
        "PT Adiguna Presisi Nusantara - Precision Machinery & Manufacturing Solutions",
      description:
        "Penyedia mesin CNC, mesin perkakas workshop, tooling machining, instalasi mesin, dan engineering support untuk industri Indonesia.",
      siteName: "PT Adiguna Presisi Nusantara",
      images: [
        {
          url: "/landing/og-machine.svg",
          width: 1920,
          height: 1080,
          alt: "PT Adiguna Presisi Nusantara precision machinery",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "PT Adiguna Presisi Nusantara - Precision Machinery & Manufacturing Solutions",
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
      canonical: "https://adigunapresisi.co.id",
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
  let locale: Locale;
  try {
    const localeValue = await getLocale();
    locale = routing.locales.includes(localeValue as Locale)
      ? (localeValue as Locale)
      : routing.defaultLocale;
  } catch {
    locale = routing.defaultLocale;
  }

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
