import { PageTransition } from "../PageTransition";
import { ParallaxImage } from "../ParallaxImage";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy, getLandingImage } from "../content";

type AboutPageProps = {
  locale: string;
};

export function AboutPage({ locale }: AboutPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section className="relative min-h-[88svh] overflow-hidden bg-neutral-950 text-white">
        <ParallaxImage
          src={getLandingImage("aboutHero")}
          alt="Precision manufacturing workshop"
          priority
          sizes="100vw"
          className="absolute inset-0 h-full"
          imageClassName="opacity-68"
          intensity={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/52 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-7xl items-end px-6 pb-16 pt-36 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Tentang Kami" : "About Us"}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {locale === "id"
                ? "Perusahaan mesin industri dengan orientasi presisi."
                : "An industrial machinery company oriented around precision."}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">
              {locale === "id"
                ? "PT Adiguna Presisi Nusantara menyediakan mesin industri, peralatan manufaktur, tooling machining, dan solusi pendukung produksi untuk berbagai sektor industri."
                : "PT Adiguna Presisi Nusantara provides industrial machines, manufacturing equipment, machining tooling, and production support solutions for various industrial sectors."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Visi" : "Vision"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {copy.vision}
            </h2>
          </Reveal>
          <Reveal className="bg-white p-8 sm:p-10 lg:p-12">
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Misi" : "Mission"}
            </LandingEyebrow>
            <div className="mt-8 grid gap-5">
              {copy.mission.map((mission, index) => (
                <div
                  key={mission}
                  className="grid gap-4 border-t border-neutral-200 pt-5 sm:grid-cols-[72px_1fr]"
                >
                  <span className="text-sm font-semibold text-amber-500">
                    0{index + 1}
                  </span>
                  <p className="text-lg leading-8 text-neutral-700">{mission}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-950 px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Nilai perusahaan" : "Company values"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              ADIGUNA
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {copy.values.map(([letter, value], index) => (
              <Reveal key={`${letter}-${value}`} delay={index * 0.04}>
                <div className="min-h-52 bg-neutral-950 p-7 transition-colors hover:bg-white hover:text-neutral-950">
                  <span className="text-6xl font-semibold tracking-tight text-amber-300">
                    {letter}
                  </span>
                  <h3 className="mt-8 text-2xl font-semibold">{value}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Target industri" : "Target industries"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Dibangun untuk banyak kebutuhan produksi."
                : "Built for many production needs."}
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.industries.map((industry) => (
              <Reveal key={industry}>
                <div className="border border-neutral-200 bg-white px-6 py-5 text-lg font-medium transition-colors hover:border-neutral-950 hover:bg-neutral-950 hover:text-white">
                  {industry}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
