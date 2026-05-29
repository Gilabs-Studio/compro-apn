import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageTransition } from "../PageTransition";
import { ParallaxImage } from "../ParallaxImage";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy, getLandingImage } from "../content";
import { ProductCard } from "./ProductCard";

type ProductPageProps = {
  locale: string;
};

export function ProductPage({ locale }: ProductPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="grid min-h-screen bg-neutral-950 text-white lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="flex items-end px-6 pb-16 pt-36 sm:px-8 lg:px-12 lg:min-h-screen relative overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/landing/geometric_minimal_curves.webp')] bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
          />
          <div className="relative z-10 max-w-xl">
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Produk" : "Product"}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {locale === "id"
                ? "Mesin Workshop Presisi"
                : "Precision Workshop Machines"}
            </h1>
            <p className="mt-7 text-base leading-8 text-white/62">
              {locale === "id"
                ? "Pilihan mesin CNC, gerinda datar, dan machining center yang dikonfigurasi untuk target produksi Anda"
                : "CNC systems, surface grinders, and machining centers configured for your production goals"}
            </p>
          </div>
        </div>
        <ParallaxImage
          src={getLandingImage("productHero")}
          alt="Industrial machine product hero"
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="min-h-[56svh] lg:min-h-screen"
          intensity={400}
          imageClassName="object-cover object-center"
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
                {locale === "id" ? "Katalog mesin" : "Machine catalog"}
              </LandingEyebrow>
              <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
                {locale === "id"
                  ? "Perspektif Detail"
                  : "Detailed Perspective"}
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-12 w-fit items-center gap-2 bg-neutral-950 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {locale === "id" ? "Minta rekomendasi" : "Ask recommendation"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {copy.products.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Keunggulan" : "Advantages"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {locale === "id"
                ? "Ekosistem Terintegrasi"
                : "Integrated Ecosystems"}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.advantages.map((advantage, index) => (
              <Reveal key={advantage} delay={index * 0.06}>
                <div className="min-h-40 border border-neutral-200 p-6 transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white">
                  <span className="text-sm font-semibold text-amber-500">
                    0{index + 1}
                  </span>
                  <p className="mt-6 text-lg leading-7">{advantage}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
