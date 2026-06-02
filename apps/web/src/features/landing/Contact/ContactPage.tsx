"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageTransition } from "../PageTransition";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy } from "../content";

type ContactPageProps = {
  locale: string;
};

export function ContactPage({ locale }: Readonly<ContactPageProps>) {
  const copy = getLandingCopy(locale);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Defer mounting Google Maps to avoid blocking main thread on initial load
    const timeoutId = setTimeout(() => {
      setShowMap(true);
    }, 1200);
    return () => clearTimeout(timeoutId);
  }, []);

  // Use exact coordinates for a reliable embed and open URL
  const lat = -6.327678067048983;
  const lng = 106.75129545090675;
  const gmapsEmbedUrl = `https://www.google.com/maps?ll=${lat},${lng}&q=${lat},${lng}&z=20&t=m&output=embed`;
  const gmapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="relative bg-neutral-950 px-6 pb-20 pt-36 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-44 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-15 pointer-events-none invert mix-blend-screen">
          <Image
            src="/landing/geometric_contact_hero.png"
            alt="Geometric background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <LandingEyebrow className="text-amber-300">
              {locale === "id" ? "Hubungi Kami" : "Contact Us"}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
              {locale === "id"
                ? "Konsultasi Teknis"
                : "Technical Consultation"}
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
        className="min-h-screen bg-white"
      >
        <div className="grid min-h-screen lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full items-center px-6 py-12 sm:px-8 lg:px-14 lg:py-16">
              <div className="w-full max-w-xl">
                <div className="grid size-12 place-items-center bg-neutral-950 text-white">
                  <MapPin className="size-5" />
                </div>
                <h2 className="mt-8 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
                  {copy.company}
                </h2>
                <div className="mt-7 space-y-3 text-base leading-7 text-neutral-600">
                  {copy.address.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <a
                  href={gmapsOpenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-950"
                >
                  {locale === "id" ? "Buka di Google Maps" : "Open in Google Maps"}
                </a>

                <div className="mt-10 border-t border-neutral-200 pt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                    {locale === "id" ? "Kontak" : "Contact"}
                  </p>
                  <div className="mt-6 grid gap-4 text-base leading-7 text-neutral-600">
                    <a
                      href="mailto:adigunapresisi@gmail.com"
                      className="inline-flex items-start gap-3 transition-colors hover:text-neutral-950"
                    >
                      <span className="grid size-10 shrink-0 place-items-center bg-neutral-950 text-white">
                        <Mail className="size-5" />
                      </span>
                      <span className="min-w-0 break-all pt-1">
                        adigunapresisi@gmail.com
                      </span>
                    </a>

                    <a
                      href="https://wa.me/6281291572817"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-start gap-3 transition-colors hover:text-neutral-950"
                    >
                      <span className="grid size-10 shrink-0 place-items-center bg-neutral-950 text-white">
                        <Phone className="size-5" />
                      </span>
                      <span className="pt-1">62 812-9157-2817</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-[55vh] overflow-hidden lg:h-screen bg-neutral-900 flex items-center justify-center relative">
              {showMap ? (
                <iframe
                  src={gmapsEmbedUrl}
                  title={locale === "id" ? "Peta lokasi kantor" : "Office location map"}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-neutral-400">
                  <div className="size-6 animate-spin rounded-full border-2 border-neutral-700 border-t-amber-300" />
                  <span className="text-sm font-light">
                    {locale === "id" ? "Memuat peta..." : "Loading map..."}
                  </span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
