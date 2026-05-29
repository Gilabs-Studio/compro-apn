import Image from "next/image";
import { ArrowRight, MoveRight, Sliders, Wrench, ShieldCheck, Cpu } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PageTransition } from "../PageTransition";
import { ParallaxImage } from "../ParallaxImage";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy, getLandingImage } from "../content";
import { ProductCard } from "../Product/ProductCard";

type HomePageProps = {
  locale: string;
};

export function HomePage({ locale }: Readonly<HomePageProps>) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="relative min-h-svh overflow-hidden bg-neutral-950 px-6 text-white sm:px-8 lg:px-12"
      >
        <ParallaxImage
          src={getLandingImage("hero")}
          alt="Premium CNC manufacturing machine"
          priority
          fetchPriority="high"
          intensity={400}
          sizes="100vw"
          className="absolute inset-0 h-full"
          imageClassName="opacity-72"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-neutral-950 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-end pb-20 pt-36">
          <div className="max-w-4xl">
            <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              {copy.company}
            </h1>
            <p
              className="mt-7 max-w-2xl text-2xl text-amber-300 sm:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-damion)" }}
            >
              {copy.hero.title}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/62">
              {copy.hero.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/product"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {copy.hero.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                {copy.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        className="relative bg-neutral-950 px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 60%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1) 60%)',
          }}
        >
          <Image
            src="/landing/geometric_minimal_circles.webp"
            alt="Geometric minimal circles background"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Kapabilitas Kami" : "Our Capabilities"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Solusi Presisi Terintegrasi"
                : "Integrated Precision Solutions"}
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {copy.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 0.08}>
                <div className="border-l border-white/15 py-2 pl-6">
                  <p className="text-5xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/58">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <LandingEyebrow className="text-neutral-500">
                {locale === "id" ? "Produk Utama" : "Featured Products"}
              </LandingEyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                {locale === "id"
                  ? "Portofolio Mesin Presisi"
                  : "Precision Machinery Portfolio"}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-neutral-600 lg:ml-auto">
              {locale === "id"
                ? "Katalog sistem mesin perkakas berstandar tinggi yang dirancang untuk performa maksimal dan akurasi mutlak."
                : "High-standard machine tool systems engineered for maximum performance and absolute accuracy."}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3 items-stretch">
            {copy.products.slice(0, 3).map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="relative overflow-hidden bg-neutral-50 px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        {/* Radial subtle grid highlight */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(var(--color-neutral-950) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <Reveal>
              <LandingEyebrow className="text-neutral-500 justify-center">
                {locale === "id" ? "Layanan & Dukungan" : "Services & Support"}
              </LandingEyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl text-neutral-900">
                {locale === "id"
                  ? "Keandalan Operasional & Kemitraan Teknis"
                  : "Operational Reliability & Technical Partnership"}
              </h2>
              <p className="mt-6 text-base leading-8 text-neutral-600">
                {locale === "id"
                  ? "PT Adiguna Presisi Nusantara mengintegrasikan penyediaan mesin perkakas presisi tinggi dengan dukungan engineering terpadu untuk memastikan keandalan berkelanjutan pada lini produksi Anda."
                  : "PT Adiguna Presisi Nusantara integrates high-precision machinery supply with comprehensive engineering support to ensure the long-term reliability of your production lines."}
              </p>
            </Reveal>
          </div>

          <div className="relative grid gap-12 lg:grid-cols-3 lg:items-center">
            {/* Left Side: Services 1 & 2 */}
            <div className="flex flex-col gap-8 order-2 lg:order-1 lg:text-right">
              {/* Service 1 */}
              <Reveal delay={0.1}>
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:border-neutral-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] lg:items-end">
                  <span className="grid size-12 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-95">
                    <Sliders className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {copy.services[0].title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-neutral-600">
                      {copy.services[0].description}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Service 2 */}
              <Reveal delay={0.2}>
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:border-neutral-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)] lg:items-end">
                  <span className="grid size-12 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-95">
                    <Wrench className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {copy.services[1].title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-neutral-600">
                      {copy.services[1].description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Center: Premium Transparent Machine Image with Pedestal Glow */}
            <div className="relative flex flex-col items-center justify-center order-1 lg:order-2 py-8 lg:py-0">
              {/* Radial Backdrop Glow */}
              <div 
                className="absolute inset-0 -z-10 mix-blend-multiply opacity-55 blur-3xl pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, var(--color-neutral-300) 0%, transparent 70%)',
                }}
              />
            

              {/* Pedestal Shadow */}
              <div className="absolute bottom-6 left-1/2 h-6 w-4/5 -translate-x-1/2 rounded-full bg-neutral-950/10 blur-md pointer-events-none" />

              <Reveal delay={0.3} className="relative z-10 flex items-center justify-center">
                <Image
                  src="/landing/HF-4080-nobg.png"
                  alt="Adiguna HF-4080 Surface Grinder"
                  width={800}
                  height={450}
                  priority
                  className="h-auto w-full max-w-[520px] object-contain transition-transform duration-700 ease-out hover:scale-105 md:max-w-[580px]"
                />
              </Reveal>
            </div>

            {/* Right Side: Services 3 & 4 */}
            <div className="flex flex-col gap-8 order-3 lg:order-3">
              {/* Service 3 */}
              <Reveal delay={0.4}>
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:border-neutral-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                  <span className="grid size-12 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-95">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {copy.services[2].title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-neutral-600">
                      {copy.services[2].description}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Service 4 */}
              <Reveal delay={0.5}>
                <div className="group relative flex flex-col gap-4 rounded-2xl border border-neutral-200/60 bg-white p-6 transition-all duration-300 hover:border-neutral-900 hover:shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
                  <span className="grid size-12 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-95">
                    <Cpu className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {copy.services[3].title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-neutral-600">
                      {copy.services[3].description}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-linear-to-b from-neutral-50 px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32"
      >
        <Reveal>
          <Link
            href="https://wa.me/6281291572817"
            className="group mx-auto flex max-w-7xl items-center justify-between gap-8 border-y border-neutral-950 py-10"
          >
            <span className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Hubungi Kami Sekarang"
                : "Contact Us Today"}
            </span>
            <span className="grid size-14 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-2">
              <MoveRight className="size-6" />
            </span>
          </Link>
        </Reveal>
      </section>
    </PageTransition>
  );
}
