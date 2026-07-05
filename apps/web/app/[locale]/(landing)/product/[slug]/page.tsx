import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/features/landing/Product/ProductDetailPage";
import {
  getLandingImage,
  getLandingProduct,
  getLandingProductSlugs,
  type LandingProductSlug,
} from "@/features/landing/content";
import { routing } from "@/i18n/routing";
import {
  buildBreadcrumbStructuredData,
  buildLandingMetadata,
  buildProductStructuredData,
} from "@/lib/seo";

type ProductDetailRouteProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

function isLandingProductSlug(slug: string): slug is LandingProductSlug {
  return getLandingProductSlugs().includes(slug as LandingProductSlug);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getLandingProductSlugs().map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductDetailRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLandingProductSlug(slug)) {
    return {};
  }

  const product = getLandingProduct(locale, slug);

  if (!product) {
    return {};
  }

  const isId = locale === "id";
  const path = `/product/${product.slug}`;

  return buildLandingMetadata({
    locale,
    path,
    title: `${product.name} - ${isId ? "Mesin CNC Tangerang" : "CNC Machine Tangerang"}`,
    description: isId
      ? `${product.description} Konsultasikan kebutuhan ${product.category} dengan PT Adiguna Presisi Nusantara di Tangerang Selatan.`
      : `${product.description} Consult your ${product.category} requirement with PT Adiguna Presisi Nusantara in South Tangerang.`,
    keywords: [
      product.name,
      product.category,
      `${product.category} Tangerang`,
      "mesin CNC Tangerang",
      "penjual mesin CNC Tangerang",
      "supplier mesin CNC Indonesia",
    ],
    imageAlt: product.name,
    imageUrl: getLandingImage(product.image),
  });
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { locale, slug } = await params;

  if (!isLandingProductSlug(slug)) {
    notFound();
  }

  const product = getLandingProduct(locale, slug);

  if (!product) {
    notFound();
  }

  const path = `/product/${product.slug}`;
  const breadcrumbs = buildBreadcrumbStructuredData({
    locale,
    items: [
      { name: locale === "id" ? "Beranda" : "Home", path: "/" },
      { name: locale === "id" ? "Produk" : "Product", path: "/product" },
      { name: product.name, path },
    ],
  });
  const productStructuredData = buildProductStructuredData({
    locale,
    path,
    name: product.name,
    description: product.description,
    category: product.category,
    image: getLandingImage(product.image),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <ProductDetailPage locale={locale} product={product} />
    </>
  );
}
