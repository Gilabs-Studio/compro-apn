import { ArrowRight, CheckCircle2, Factory, Gauge, MapPin, Wrench } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  COMPANY_ADDRESS,
  COMPANY_GOOGLE_MAPS_URL,
  COMPANY_PHONE_DISPLAY,
} from "@/lib/seo";
import { LandingEyebrow } from "../LandingEyebrow";
import { PageTransition } from "../PageTransition";
import { Reveal } from "../Reveal";
import {
  getLandingCopy,
  getLandingImage,
  getLandingWhatsAppLink,
  type ProductItem,
} from "../content";

type ProductDetailPageProps = {
  locale: string;
  product: ProductItem;
};

function getProductSupport(locale: string) {
  const isId = locale === "id";

  return [
    {
      icon: Factory,
      title: isId ? "Konsultasi aplikasi" : "Application consultation",
      description: isId
        ? "Pemilihan mesin menyesuaikan material, target kapasitas, toleransi, ukuran kerja, dan proses produksi."
        : "Machine selection aligned with material, capacity target, tolerance, work size, and production process.",
    },
    {
      icon: Wrench,
      title: isId ? "Instalasi & setting" : "Installation & setup",
      description: isId
        ? "Dukungan pemasangan, konfigurasi awal, uji performa, dan penyesuaian kebutuhan operasional."
        : "Support for installation, initial configuration, performance testing, and operational adjustment.",
    },
    {
      icon: Gauge,
      title: isId ? "Optimasi produksi" : "Production optimization",
      description: isId
        ? "Arahan teknis untuk meningkatkan kestabilan proses, cycle time, kualitas hasil, dan efisiensi operator."
        : "Technical guidance to improve process stability, cycle time, output quality, and operator efficiency.",
    },
  ];
}

function getUseCases(product: ProductItem, locale: string) {
  const isId = locale === "id";
  const category = product.category.toLowerCase();

  if (category.includes("turning")) {
    return isId
      ? ["Komponen silinder", "Shaft dan bushing", "Part otomotif", "Produksi toleransi ketat"]
      : ["Cylindrical components", "Shafts and bushings", "Automotive parts", "Tight tolerance production"];
  }

  if (category.includes("laser")) {
    return isId
      ? ["Pemotongan plat logam", "Fabrikasi sheet metal", "Produksi enclosure", "Komponen industri berat"]
      : ["Metal plate cutting", "Sheet metal fabrication", "Enclosure production", "Heavy industry components"];
  }

  return isId
    ? ["Milling presisi", "Pembuatan mold dan jig", "Komponen mesin", "Produksi workshop engineering"]
    : ["Precision milling", "Mold and jig production", "Machine components", "Engineering workshop production"];
}

export function ProductDetailPage({
  locale,
  product,
}: Readonly<ProductDetailPageProps>) {
  const copy = getLandingCopy(locale);
  const whatsappLink = getLandingWhatsAppLink(locale, product);
  const supportItems = getProductSupport(locale);
  const useCases = getUseCases(product, locale);
  const relatedProducts = copy.products
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="grid min-h-screen bg-neutral-950 text-white lg:grid-cols-[0.92fr_1.08fr]"
      >
        <div className="relative flex items-end overflow-hidden px-6 pb-16 pt-36 sm:px-8 lg:min-h-screen lg:px-12">
          <div className="absolute inset-0 opacity-15 pointer-events-none invert mix-blend-screen">
            <Image
              src="/landing/geometric_minimal_curves.webp"
              alt="Geometric background"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-2xl">
            <LandingEyebrow className="text-amber-300">
              {product.category}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {product.name}
            </h1>
            <p className="mt-7 text-base leading-8 text-white/66">
              {product.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {locale === "id" ? "Minta penawaran" : "Request a quote"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/jual-mesin-cnc-tangerang"
                locale={locale}
                className="inline-flex h-12 items-center justify-center border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                {locale === "id" ? "Konsultasi CNC Tangerang" : "Tangerang CNC consultation"}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[56svh] overflow-hidden bg-white lg:min-h-screen">
          <Image
            src={getLandingImage(product.image)}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-contain p-8 sm:p-12 lg:p-16"
          />
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Aplikasi produksi" : "Production applications"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Disiapkan untuk kebutuhan workshop dan manufaktur"
                : "Prepared for workshop and manufacturing needs"}
            </h2>
          </Reveal>
          <div className="grid gap-px bg-neutral-200 sm:grid-cols-2">
            {useCases.map((useCase, index) => (
              <Reveal key={useCase} delay={index * 0.05}>
                <div className="flex min-h-28 items-center gap-4 bg-neutral-50 p-6">
                  <CheckCircle2 className="size-5 shrink-0 text-amber-500" />
                  <p className="text-lg font-medium text-neutral-900">{useCase}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-neutral-50 px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Dukungan pembelian" : "Purchase support"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Tidak hanya menjual mesin, kami bantu sampai siap produksi"
                : "More than supplying machines, we help until production is ready"}
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {supportItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 0.08}>
                  <div className="min-h-72 bg-white p-7">
                    <span className="grid size-12 place-items-center bg-neutral-950 text-white">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        className="bg-neutral-950 px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Lokasi & kontak" : "Location & contact"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Konsultasi mesin CNC dari Tangerang Selatan"
                : "CNC machine consultation from South Tangerang"}
            </h2>
          </Reveal>
          <Reveal>
            <div className="grid gap-5 bg-white/5 p-6 sm:p-8">
              <div className="flex gap-4">
                <MapPin className="mt-1 size-5 shrink-0 text-amber-300" />
                <div>
                  <p className="font-semibold">{copy.company}</p>
                  <p className="mt-2 text-sm leading-7 text-white/66">
                    {COMPANY_ADDRESS.streetAddress}, {COMPANY_ADDRESS.addressLocality}, {COMPANY_ADDRESS.addressRegion} {COMPANY_ADDRESS.postalCode}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform hover:-translate-y-0.5"
                >
                  {COMPANY_PHONE_DISPLAY}
                </a>
                <a
                  href={COMPANY_GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
                >
                  {locale === "id" ? "Buka Google Maps" : "Open Google Maps"}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <LandingEyebrow className="text-neutral-500">
                {locale === "id" ? "Produk terkait" : "Related products"}
              </LandingEyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                {locale === "id" ? "Lihat mesin lainnya" : "See other machines"}
              </h2>
            </div>
            <Link
              href="/product"
              locale={locale}
              className="group inline-flex h-12 w-fit items-center gap-2 bg-neutral-950 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {locale === "id" ? "Semua produk" : "All products"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-14 grid gap-px bg-neutral-200 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/product/${item.slug}`}
                locale={locale}
                className="group flex min-h-64 flex-col bg-neutral-50 p-6 transition-colors hover:bg-neutral-950 hover:text-white"
              >
                <span className="text-sm font-semibold text-amber-500">
                  {item.category}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  {item.name}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
                  {locale === "id" ? "Lihat detail" : "View detail"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
