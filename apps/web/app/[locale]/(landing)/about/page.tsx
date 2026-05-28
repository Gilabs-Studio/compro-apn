import type { Metadata } from "next";
import { AboutPage } from "@/features/landing/About/AboutPage";
import { getLandingCopy } from "@/features/landing/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return {
    title: `${locale === "id" ? "Tentang Kami" : "About"} - ${copy.company}`,
    description: copy.vision,
  };
}

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <AboutPage locale={locale} />;
}
