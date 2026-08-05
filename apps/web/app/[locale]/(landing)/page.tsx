import type { Metadata } from "next";
import { HomePage } from "@/features/landing/Home/HomePage";
import { getLandingCopy } from "@/features/landing/content";
import { buildLandingMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return buildLandingMetadata({
    locale,
    path: "/",
    title: `${copy.company} - Precision Machinery`,
    description: copy.hero.description,
    keywords: [
      "precision machinery",
      "manufacturing solutions",
      "mesin CNC",
      "mesin perkakas workshop",
      "tooling machining",
    ],
    imageAlt: "PT Adiguna Presisi Nusantara precision machinery and CNC solutions",
    imageUrl: "/landing/hero.webp",
  });
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <HomePage locale={locale} />;
}
