import { ArrowRight, MapPin } from "lucide-react";
import { PageTransition } from "../PageTransition";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy } from "../content";

type ContactPageProps = {
  locale: string;
};

export function ContactPage({ locale }: ContactPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="relative bg-neutral-950 px-6 pb-20 pt-36 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-44 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/landing/geometric_dark_bg.webp')] bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Kontak" : "Contact"}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {locale === "id"
                ? "Konsultasi Mesin"
                : "Machine Consultation"}
            </h1>
          </div>
          <p className="max-w-2xl text-base leading-8 text-white/62">
            {locale === "id"
              ? "Kirim kebutuhan spesifikasi material dan target kapasitas Anda untuk mendapatkan rekomendasi sistem terbaik"
              : "Submit your material specifications and volume targets to receive tailored recommendations"}
          </p>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="bg-white p-8 sm:p-10 lg:p-12">
              <div className="grid size-12 place-items-center bg-neutral-950 text-white">
                <MapPin className="size-5" />
              </div>
              <h2 className="mt-8 text-3xl font-semibold tracking-tight">
                {copy.company}
              </h2>
              <div className="mt-7 space-y-3 text-base leading-7 text-neutral-600">
                {copy.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <form className="grid gap-5 bg-white p-8 sm:p-10 lg:p-12">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-neutral-600">
                  {locale === "id" ? "Nama" : "Name"}
                  <input
                    className="h-12 border border-neutral-200 bg-transparent px-4 text-base text-neutral-950 outline-none transition-colors focus:border-neutral-950"
                    placeholder={locale === "id" ? "Nama Anda" : "Your name"}
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-neutral-600">
                  Email
                  <input
                    type="email"
                    className="h-12 border border-neutral-200 bg-transparent px-4 text-base text-neutral-950 outline-none transition-colors focus:border-neutral-950"
                    placeholder="name@company.com"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium text-neutral-600">
                {locale === "id" ? "Kebutuhan mesin" : "Machine needs"}
                <input
                  className="h-12 border border-neutral-200 bg-transparent px-4 text-base text-neutral-950 outline-none transition-colors focus:border-neutral-950"
                  placeholder={
                    locale === "id"
                      ? "CNC, grinding, tooling, instalasi"
                      : "CNC, grinding, tooling, installation"
                  }
                />
              </label>
              <label className="grid gap-2 text-sm font-medium text-neutral-600">
                {locale === "id" ? "Pesan" : "Message"}
                <textarea
                  rows={6}
                  className="resize-none border border-neutral-200 bg-transparent px-4 py-3 text-base text-neutral-950 outline-none transition-colors focus:border-neutral-950"
                  placeholder={
                    locale === "id"
                      ? "Tulis spesifikasi material dan target volume produksi Anda"
                      : "Briefly outline your material details and production volume targets"
                  }
                />
              </label>
              <button
                type="button"
                className="group mt-2 inline-flex h-12 w-fit items-center gap-2 bg-neutral-950 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                {locale === "id" ? "Kirim inquiry" : "Send inquiry"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
