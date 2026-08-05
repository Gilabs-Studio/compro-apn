import type { Metadata } from "next";
import { BlogPage } from "@/features/landing/Blog/BlogPage";
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
    path: "/blog",
    title: `${locale === "id" ? "Blog" : "Blog"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Artikel seputar mesin industri, proses manufaktur, CNC, dan produktivitas workshop."
        : "Articles about industrial machines, manufacturing processes, CNC, and workshop productivity.",
    keywords: [
      "blog mesin CNC",
      "artikel manufaktur",
      "workshop productivity",
      "industrial machinery insights",
    ],
    imageAlt: "Blog PT Adiguna Presisi Nusantara",
    imageUrl: "/landing/hero.webp",
  });
}

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <BlogPage locale={locale} />;
}
