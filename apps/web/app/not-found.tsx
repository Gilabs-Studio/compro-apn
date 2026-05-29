import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const locale = await getLocale();

  // For company profile site we always point back to the locale root
  const redirectUrl = `/${locale}`;

  const containerClass = "flex min-h-screen items-center justify-center px-4";

  return (
    <main className={`relative isolate overflow-hidden bg-neutral-950 text-white ${containerClass}`}>
      <div className="pointer-events-none absolute inset-0 bg-neutral-950" />
      <div className="pointer-events-none absolute inset-0 bg-[url('/landing/geometric_line_art.png')] bg-cover bg-center bg-no-repeat opacity-15 invert mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/70" />

      <div className="relative z-10 w-full max-w-md text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-white/55">
          {t("label")}
        </p>

        <p className="mt-3 text-7xl font-semibold leading-none tracking-tight text-white sm:text-8xl">
          404
        </p>

        <h1 className="mt-4 text-lg font-semibold text-white/92 sm:text-xl">
          {t("title")}
        </h1>

        <Link
          href={redirectUrl}
          className="mt-8 inline-flex h-12 items-center justify-center bg-white px-6 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
        >
          {t("backHome")}
        </Link>
      </div>
    </main>
  );
}
