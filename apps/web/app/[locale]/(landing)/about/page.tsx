import type { Metadata } from "next";
import { AboutPage } from "@/features/landing/About/AboutPage";
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
    path: "/about",
    title: `${locale === "id" ? "Tentang Kami" : "About"} - ${copy.company}`,
    description: copy.vision,
    keywords: [
      "tentang pt adiguna presisi nusantara",
      "about adiguna presisi nusantara",
      "company profile",
      "engineering support indonesia",
    ],
    imageAlt: "About PT Adiguna Presisi Nusantara",
    imageUrl: "/landing/about-machine.webp",
  });
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <AboutPage locale={locale} />;
}
