import type { Metadata } from "next";
import { BlogPage } from "@/features/landing/Blog/BlogPage";
import { getLandingCopy } from "@/features/landing/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return {
    title: `${locale === "id" ? "Blog" : "Blog"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Artikel seputar mesin industri, proses manufaktur, CNC, dan produktivitas workshop."
        : "Articles about industrial machines, manufacturing processes, CNC, and workshop productivity.",
  };
}

export default async function BlogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <BlogPage locale={locale} />;
}
