import Image from "next/image";
import { Sliders, Wrench, ShieldCheck, Cpu } from "lucide-react";
import { Reveal } from "../../Reveal";
import { LandingEyebrow } from "../../LandingEyebrow";
import { getLandingCopy, getLandingImage } from "../../content";

type ServicesSectionProps = {
  locale: string;
  copy: ReturnType<typeof getLandingCopy>;
};

export default function ServicesSection({ locale, copy }: Readonly<ServicesSectionProps>) {
  return (
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
                src={getLandingImage("layananNoBg")}
                alt={locale === "id" ? "Ilustrasi layanan dan dukungan Adiguna" : "Adiguna services and support illustration"}
                width={580}
                height={326}
                sizes="(min-width: 1024px) 580px, (min-width: 768px) 520px, 100vw"
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
  );
}
