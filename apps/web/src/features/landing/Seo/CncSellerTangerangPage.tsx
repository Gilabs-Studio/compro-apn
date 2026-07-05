import { ArrowRight, CheckCircle2, Factory, MapPin, Phone, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
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

type CncSellerTangerangPageProps = {
  locale: string;
};

const localAreas = [
  "Tangerang Selatan",
  "Ciputat",
  "Serpong",
  "Pamulang",
  "Kota Tangerang",
  "Kabupaten Tangerang",
  "Banten",
  "Jakarta",
] as const;

function getPageCopy(locale: string) {
  const isId = locale === "id";

  return {
    eyebrow: isId ? "Penjual Mesin CNC Tangerang" : "CNC Machine Supplier Tangerang",
    title: isId
      ? "Jual Mesin CNC Tangerang & Tangerang Selatan"
      : "CNC Machine Supplier for Tangerang and South Tangerang",
    description: isId
      ? "PT. Adiguna Presisi Nusantara membantu workshop dan pabrik memilih mesin CNC, machining center, CNC turning, tooling, dan laser cutting dengan dukungan konsultasi, instalasi, serta engineering support."
      : "PT Adiguna Presisi Nusantara helps workshops and factories select CNC machines, machining centers, CNC turning systems, tooling, and laser cutting machines with consultation, installation, and engineering support.",
    primaryCta: isId ? "Konsultasi mesin CNC" : "Consult CNC machine",
    secondaryCta: isId ? "Lihat katalog" : "View catalog",
    proof: [
      isId ? "5,0 rating Google" : "5.0 Google rating",
      isId ? "2 ulasan Google" : "2 Google reviews",
      isId ? "Alamat Tangerang Selatan" : "South Tangerang address",
    ],
    introTitle: isId
      ? "Rekomendasi mesin disesuaikan dengan proses produksi"
      : "Machine recommendations matched to your production process",
    introText: isId
      ? "Jika Anda mencari penjual mesin CNC di Tangerang, tim Adiguna membantu membaca kebutuhan material, toleransi, ukuran kerja, cycle time, dan target kapasitas sebelum merekomendasikan konfigurasi mesin."
      : "If you are looking for a CNC machine supplier in Tangerang, Adiguna reviews material needs, tolerances, work size, cycle time, and capacity targets before recommending the machine configuration.",
    strengths: [
      {
        icon: Factory,
        title: isId ? "Pilihan mesin industri" : "Industrial machine selection",
        description: isId
          ? "CNC milling, CNC turning, machining center, drilling tapping, five axis, dan fiber laser cutting untuk kebutuhan workshop dan pabrik."
          : "CNC milling, CNC turning, machining centers, drilling tapping, five axis, and fiber laser cutting machines for workshops and factories.",
      },
      {
        icon: Wrench,
        title: isId ? "Instalasi & kalibrasi" : "Installation & calibration",
        description: isId
          ? "Dukungan pemasangan, setting awal, uji performa, dan penyesuaian mesin di lokasi produksi."
          : "Support for setup, initial configuration, performance testing, and machine adjustment at your production site.",
      },
      {
        icon: ShieldCheck,
        title: isId ? "After-sales support" : "After-sales support",
        description: isId
          ? "Konsultasi teknis, pelatihan operator, spare part, dan troubleshooting untuk menjaga produksi tetap berjalan."
          : "Technical consultation, operator training, spare parts, and troubleshooting to keep production running.",
      },
    ],
    productTitle: isId ? "Produk mesin CNC yang bisa dikonsultasikan" : "CNC machine products available for consultation",
    areaTitle: isId ? "Area layanan" : "Service areas",
    faqTitle: isId ? "Pertanyaan umum" : "Frequently asked questions",
    faqs: [
      {
        question: isId
          ? "Apakah PT Adiguna Presisi Nusantara penjual mesin CNC di Tangerang?"
          : "Is PT Adiguna Presisi Nusantara a CNC machine supplier in Tangerang?",
        answer: isId
          ? "Ya. PT. Adiguna Presisi Nusantara beralamat di Cipayung, Ciputat, Kota Tangerang Selatan dan melayani kebutuhan mesin CNC untuk Tangerang, Tangerang Selatan, Banten, Jakarta, dan area industri Indonesia."
          : "Yes. PT Adiguna Presisi Nusantara is based in Cipayung, Ciputat, South Tangerang and serves CNC machine requirements across Tangerang, South Tangerang, Banten, Jakarta, and industrial areas in Indonesia.",
      },
      {
        question: isId
          ? "Bisa dibantu rekomen penjual mesin CNC sesuai kebutuhan produksi?"
          : "Can you recommend a CNC machine configuration for production needs?",
        answer: isId
          ? "Bisa. Tim kami membantu memilih tipe mesin berdasarkan material, kapasitas, toleransi, ukuran kerja, proses machining, dan rencana pengembangan produksi."
          : "Yes. Our team helps choose the machine type based on material, capacity, tolerance, work size, machining process, and production growth plan.",
      },
      {
        question: isId
          ? "Apakah tersedia konsultasi sebelum membeli mesin?"
          : "Is consultation available before purchasing a machine?",
        answer: isId
          ? "Tersedia. Anda dapat mengirim kebutuhan melalui WhatsApp agar tim kami menyiapkan rekomendasi produk, konfigurasi, dan estimasi kebutuhan pendukung."
          : "Yes. You can send your requirement through WhatsApp so our team can prepare product recommendations, configuration, and supporting requirement estimates.",
      },
    ],
    contactTitle: isId ? "Diskusikan kebutuhan mesin CNC" : "Discuss your CNC machine requirement",
    contactText: isId
      ? "Kirim kebutuhan material, ukuran kerja, kapasitas produksi, dan lokasi proyek agar tim Adiguna dapat menyiapkan rekomendasi yang tepat."
      : "Send the material, work size, production capacity, and project location so Adiguna can prepare the right recommendation.",
  };
}

export function getCncSellerTangerangFaqs(locale: string) {
  return getPageCopy(locale).faqs;
}

export function CncSellerTangerangPage({
  locale,
}: Readonly<CncSellerTangerangPageProps>) {
  const copy = getLandingCopy(locale);
  const page = getPageCopy(locale);
  const whatsappLink = getLandingWhatsAppLink(locale);
  const featuredProducts = copy.products.slice(0, 6);

  return (
    <PageTransition>
      <section
        data-nav-theme="dark"
        className="relative min-h-svh overflow-hidden bg-neutral-950 px-6 pb-20 pt-36 text-white sm:px-8 lg:px-12 lg:pb-28 lg:pt-44"
      >
        <Image
          src={getLandingImage("productHero")}
          alt={locale === "id" ? "Mesin CNC untuk area Tangerang" : "CNC machine for Tangerang area"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/62 to-black/28" />
        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
          <div className="max-w-4xl">
            <LandingEyebrow className="text-amber-300">
              {page.eyebrow}
            </LandingEyebrow>
            <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight sm:text-7xl lg:text-8xl">
              {page.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/66">
              {page.description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
              >
                {page.primaryCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/product"
                locale={locale}
                className="inline-flex h-12 items-center justify-center border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-neutral-950"
              >
                {page.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="grid gap-px bg-white/15 sm:grid-cols-3 lg:grid-cols-1">
            {page.proof.map((item) => (
              <div key={item} className="bg-neutral-950/72 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {locale === "id" ? "Konsultasi pembelian" : "Purchase consultation"}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {page.introTitle}
            </h2>
            <p className="mt-7 text-base leading-8 text-neutral-600">
              {page.introText}
            </p>
          </Reveal>
          <div className="grid gap-5">
            {page.strengths.map((strength, index) => {
              const Icon = strength.icon;

              return (
                <Reveal key={strength.title} delay={index * 0.08}>
                  <div className="grid gap-5 border border-neutral-200 bg-neutral-50 p-6 sm:grid-cols-[56px_1fr]">
                    <span className="grid size-12 place-items-center bg-neutral-950 text-white">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-950">
                        {strength.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-neutral-600">
                        {strength.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-neutral-50 px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <LandingEyebrow className="text-neutral-500">
                {locale === "id" ? "Katalog CNC" : "CNC catalog"}
              </LandingEyebrow>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
                {page.productTitle}
              </h2>
            </div>
            <Link
              href="/product"
              locale={locale}
              className="group inline-flex h-12 w-fit items-center gap-2 bg-neutral-950 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              {page.secondaryCta}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-14 grid gap-px bg-neutral-200 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product: ProductItem) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                locale={locale}
                className="group flex min-h-72 flex-col bg-white p-6 transition-colors hover:bg-neutral-950 hover:text-white"
              >
                <span className="w-fit bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
                  {product.category}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                  {product.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-neutral-600 transition-colors group-hover:text-white/66">
                  {product.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold">
                  {locale === "id" ? "Lihat detail" : "View detail"}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="dark"
        className="relative overflow-hidden bg-neutral-950 px-6 py-20 text-white sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none invert mix-blend-screen">
          <Image
            src="/landing/geometric_line_art.png"
            alt="Geometric line art"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <LandingEyebrow className="text-amber-300">
              {page.areaTitle}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Dekat dengan pusat manufaktur Banten dan Jabodetabek"
                : "Close to Banten and Greater Jakarta manufacturing hubs"}
            </h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {localAreas.map((area) => (
              <Reveal key={area}>
                <div className="flex items-center gap-3 border border-white/12 bg-white/5 px-5 py-4">
                  <CheckCircle2 className="size-5 text-amber-300" />
                  <span className="text-base font-medium">{area}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-white px-6 py-20 sm:px-8 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <LandingEyebrow className="text-neutral-500">
              {page.faqTitle}
            </LandingEyebrow>
            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
              {locale === "id"
                ? "Jawaban sebelum konsultasi"
                : "Answers before consultation"}
            </h2>
          </Reveal>
          <div className="grid gap-px bg-neutral-200">
            {page.faqs.map((faq, index) => (
              <Reveal key={faq.question} delay={index * 0.06}>
                <article className="bg-neutral-50 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold text-neutral-950">
                    {faq.question}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-neutral-600">
                    {faq.answer}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        data-nav-theme="light"
        className="bg-neutral-50 px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32"
      >
        <Reveal>
          <div className="mx-auto grid max-w-7xl gap-8 border-y border-neutral-950 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                {page.contactTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-600">
                {page.contactText}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-neutral-950 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Phone className="size-4" />
                {COMPANY_PHONE_DISPLAY}
              </a>
              <a
                href={COMPANY_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 border border-neutral-950 px-6 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"
              >
                <MapPin className="size-4" />
                {locale === "id" ? "Buka lokasi" : "Open location"}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
