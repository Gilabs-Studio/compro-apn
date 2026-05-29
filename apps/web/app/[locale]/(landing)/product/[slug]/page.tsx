import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { buildLandingMetadata } from "@/lib/seo";
import {
  getLandingCopy,
  getLandingImage,
  getLandingProduct,
  getLandingProductSlugs,
  type LandingProductSlug,
} from "@/features/landing/content";
import { PageTransition } from "@/features/landing/PageTransition";
import { ParallaxImage } from "@/features/landing/ParallaxImage";
import { Reveal } from "@/features/landing/Reveal";
import { LandingEyebrow } from "@/features/landing/LandingEyebrow";
import { ProductCard } from "@/features/landing/Product/ProductCard";

type ProductDetailRouteParams = {
  locale: string;
  slug: LandingProductSlug;
};

export async function generateStaticParams() {
  return ["id", "en"].flatMap((locale) =>
    getLandingProductSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ProductDetailRouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const copy = getLandingCopy(locale);
  const product = getLandingProduct(locale, slug);

  if (!product) {
    return buildLandingMetadata({
      locale,
      path: `/product/${slug}`,
      title: `${slug} - ${copy.company}`,
      description: copy.hero.description,
      keywords: [slug, "machine", "product"],
      imageAlt: copy.company,
    });
  }

  return buildLandingMetadata({
    locale,
    path: `/product/${slug}`,
    title: `${product.name} - ${copy.company}`,
    description: product.description,
    keywords: [
      product.name,
      product.category,
      slug,
      "mesin industri",
      "CNC machine",
      copy.company,
    ],
    imageAlt: product.name,
    imageUrl: getLandingImage(product.image),
  });
}

export default async function ProductDetailRoute({
  params,
}: {
  params: Promise<ProductDetailRouteParams>;
}) {
  const { locale, slug } = await params;
  const copy = getLandingCopy(locale);
  const product = getLandingProduct(locale, slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = copy.products.filter((item) => item.slug !== slug);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="grid min-h-screen bg-neutral-950 text-white lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="flex items-end px-6 pb-16 pt-36 sm:px-8 lg:min-h-screen lg:px-12">
          <div className="max-w-xl">
            <LandingEyebrow className="text-amber-300">
              {product.category}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {product.name}
            </h1>
            <p className="mt-7 text-base leading-8 text-white/62">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {product.specs.map((spec) => (
                <span
                  key={spec}
                  className="border border-white/15 px-3 py-1 text-xs font-medium text-white/72"
                >
                  {spec}
                </span>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://wa.me/6281291572817"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {locale === "id" ? "Hubungi kami" : "Contact us"}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/product"
                className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                <ArrowLeft className="size-4" />
                {locale === "id" ? "Kembali ke katalog" : "Back to catalog"}
              </Link>
            </div>
          </div>
        </div>
        <ParallaxImage
          src={getLandingImage(product.image)}
          alt={product.name}
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="min-h-[56svh] lg:min-h-screen"
          intensity={400}
          imageClassName="object-contain p-8"
        />
      </section>

      <section
        data-nav-theme="light"
        className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <LandingEyebrow className="text-neutral-500">
                {locale === "id" ? "Produk lain" : "Other products"}
              </LandingEyebrow>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                {locale === "id"
                  ? "Navigasi Produk"
                  : "Product Navigation"}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-neutral-600 lg:ml-auto">
              {locale === "id"
                ? "Setiap mesin memiliki detail informasi lengkap untuk membantu Anda memahami fitur teknis secara rinci"
                : "Each machine includes comprehensive specifications to help you understand detailed technical features"}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} index={index} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}