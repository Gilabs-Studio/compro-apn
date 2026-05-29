import { ArrowRight, Check, MoveRight } from "lucide-react";
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

export function HomePage({ locale }: HomePageProps) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="relative min-h-[92svh] overflow-hidden bg-neutral-950 text-white"
      >
        <ParallaxImage
          src={getLandingImage("hero")}
          alt="Premium CNC manufacturing machine"
          priority
          intensity={90}
          sizes="100vw"
          className="absolute inset-0 h-full"
          imageClassName="opacity-72"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-neutral-950 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-7xl items-end pb-20 pt-36">
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
        className="bg-neutral-950 px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Adiguna dalam angka" : "Adiguna in numbers"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Teknologi manufaktur untuk pekerjaan presisi."
                : "Manufacturing technology for precision work."}
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
                {locale === "id" ? "Produk unggulan" : "Featured products"}
              </LandingEyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
                {locale === "id"
                  ? "Mesin industri dengan karakter visual yang kuat."
                  : "Industrial machines with a strong visual presence."}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-neutral-600 lg:ml-auto">
              {locale === "id"
                ? "Layout dibuat banyak whitespace agar fotografi produk menjadi fokus utama, seperti katalog premium untuk mesin manufaktur."
                : "The layout uses generous whitespace so product photography becomes the main focus, like a premium manufacturing catalog."}
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {copy.products.slice(0, 3).map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <ParallaxImage
            src={getLandingImage("aboutHero")}
            alt="Clean precision manufacturing floor"
            className="min-h-[520px]"
            intensity={55}
          />
          <div className="flex flex-col justify-center bg-white p-8 sm:p-12 lg:p-16">
            <Reveal>
              <LandingEyebrow className="text-neutral-500">
                {locale === "id" ? "Layanan" : "Services"}
              </LandingEyebrow>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                {locale === "id"
                  ? "Bukan hanya menjual mesin, kami membantu memilih solusi."
                  : "More than selling machines, we help select the solution."}
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6">
              {copy.services.map((service) => (
                <Reveal key={service.title}>
                  <div className="group flex gap-4 border-t border-neutral-200 pt-6">
                    <span className="mt-1 grid size-7 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:scale-90">
                      <Check className="size-4" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-neutral-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32"
      >
        <Reveal>
          <Link
            href="/contact"
            className="group mx-auto flex max-w-7xl items-center justify-between gap-8 border-y border-neutral-950 py-10"
          >
            <span className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Mulai konsultasi kebutuhan mesin Anda."
                : "Start consulting your machine needs."}
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
