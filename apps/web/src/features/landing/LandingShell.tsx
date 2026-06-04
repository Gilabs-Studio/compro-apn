import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { formatWhatsAppLink } from "@/lib/utils";
import { getLandingCopy } from "./content";
import { PremiumNav } from "./PremiumNav";
import { TransitionWrapper } from "./TransitionWrapper";

type LandingShellProps = {
  children: React.ReactNode;
  locale: string;
};

export function LandingShell({ children, locale }: Readonly<LandingShellProps>) {
  const copy = getLandingCopy(locale);
  const whatsappMessage = `Halo PT Adiguna,

Saya mendapatkan informasi mengenai perusahaan Anda melalui website dan tertarik untuk berdiskusi lebih lanjut terkait produk/layanan yang tersedia.

Mohon informasi lebih lanjut.

Terima kasih.`;
  const whatsappLink = formatWhatsAppLink("081291572817", whatsappMessage);

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-neutral-950">
      <PremiumNav locale={locale} />
      <TransitionWrapper>
        <div className="flex flex-col min-h-screen">
          <div className="grow">
            {children}
          </div>
          <footer
            data-nav-theme="dark"
            className="relative bg-neutral-950 px-6 py-16 text-white sm:px-8 lg:px-12 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-5 pointer-events-none invert mix-blend-screen">
              <Image
                src="/landing/geometric_line_art.png"
                alt="Geometric line art background"
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <Image
                  src="/landing/logo-apn.png"
                  alt="PT Adiguna Presisi Nusantara"
                  width={760}
                  height={382}
                  className="h-28 w-auto object-contain sm:h-32"
                />
                <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl whitespace-pre-line">
                  {copy.tagline}
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-sm font-semibold text-white/50">
                    {locale === "id" ? "Alamat" : "Address"}
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-white/72">
                    {copy.address.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/50">
                    {locale === "id" ? "Kontak" : "Contact"}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-white/72">
                    <a
                      href="mailto:adigunapresisinusantara@gmail.com"
                      className="inline-flex w-full min-w-0 items-start gap-2 hover:text-white"
                    >
                      <Mail className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 leading-relaxed">
                        adigunapresisinusantara
                        <wbr />
                        @gmail.com
                      </span>
                    </a>

                    <a
                      href="https://wa.me/6281291572817"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full min-w-0 items-start gap-3 break-words hover:text-white"
                    >
                      <Phone className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 break-words">+62 812-9157-2817</span>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white/50">
                    {locale === "id" ? "Navigasi" : "Navigation"}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-white/72">
                    {copy.nav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group inline-flex items-center gap-2 transition-colors hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </TransitionWrapper>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={locale === "id" ? "Chat WhatsApp" : "WhatsApp chat"}
        className="fixed bottom-5 right-5 z-[999] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] p-0 overflow-hidden shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.03]"
      >
        <Image
          src="/landing/whatsapp-putih.png"
          alt="WhatsApp"
          width={512}
          height={512}
          className="h-10 w-10 object-contain"
        />
      </a>
    </div>
  );
}
