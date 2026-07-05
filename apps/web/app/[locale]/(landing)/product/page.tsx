import type { Metadata } from "next";
import { ProductPage } from "@/features/landing/Product/ProductPage";
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
    path: "/product",
    title: `${locale === "id" ? "Produk" : "Product"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Katalog mesin CNC, machining center, CNC turning, laser cutting, dan solusi manufaktur PT Adiguna Presisi Nusantara di Tangerang Selatan."
        : "Catalog of CNC machines, machining centers, CNC turning, laser cutting, and manufacturing solutions from PT Adiguna Presisi Nusantara in South Tangerang.",
    keywords: [
      "katalog mesin CNC",
      "penjual mesin CNC Tangerang",
      "vendor mesin CNC Tangerang Selatan",
      "vertical machining center",
      "horizontal machining center",
      "precision lathe",
      "laser cutting machine",
      "solusi manufaktur",
      "VMC-850",
      "DX-1080",
      "GY-60200",
      "GY-860",
      "NC-FZ632",
      "CNC-T-V8",
      "GX Series",
      "GH Series",
      "C Series",
    ],
    imageAlt: "Products from PT Adiguna Presisi Nusantara",
    imageUrl: "/landing/product-hero-machine3.webp",
  });
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ProductPage locale={locale} />;
}
