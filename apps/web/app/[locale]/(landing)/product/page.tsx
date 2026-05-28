import type { Metadata } from "next";
import { ProductPage } from "@/features/landing/Product/ProductPage";
import { getLandingCopy } from "@/features/landing/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return {
    title: `${locale === "id" ? "Produk" : "Product"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Katalog mesin CNC, grinding, machining center, dan solusi manufaktur PT Adiguna Presisi Nusantara."
        : "Catalog of CNC, grinding, machining center, and manufacturing solutions from PT Adiguna Presisi Nusantara.",
  };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ProductPage locale={locale} />;
}
