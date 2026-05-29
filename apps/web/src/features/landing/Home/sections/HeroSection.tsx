import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { ParallaxImage } from "../../ParallaxImage";
import { getLandingImage } from "../../content";

type HeroSectionProps = {
  locale: string;
  copy: any;
};

export default function HeroSection({ locale, copy }: Readonly<HeroSectionProps>) {
  return (
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
  );
}
