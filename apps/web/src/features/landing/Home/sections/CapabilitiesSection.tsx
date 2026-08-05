import Image from "next/image";
import { Reveal } from "../../Reveal";
import { LandingEyebrow } from "../../LandingEyebrow";
import { getLandingCopy } from "../../content";

type CapabilitiesSectionProps = {
  locale: string;
  copy: ReturnType<typeof getLandingCopy>;
};

export default function CapabilitiesSection({ locale, copy }: Readonly<CapabilitiesSectionProps>) {
  return (
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
  );
}
