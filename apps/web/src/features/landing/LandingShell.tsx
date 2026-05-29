import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { getLandingCopy } from "./content";
import { PremiumNav } from "./PremiumNav";

type LandingShellProps = {
  children: React.ReactNode;
  locale: string;
};

export function LandingShell({ children, locale }: LandingShellProps) {
  const copy = getLandingCopy(locale);

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-neutral-950">
      <PremiumNav locale={locale} />
      {children}
      <footer
        data-nav-theme="dark"
        className="relative bg-neutral-950 px-6 py-16 text-white sm:px-8 lg:px-12 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('/landing/geometric_line_art.png')] bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none invert mix-blend-screen"
        />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              {copy.company}
            </p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              {copy.tagline}
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
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
  );
}
