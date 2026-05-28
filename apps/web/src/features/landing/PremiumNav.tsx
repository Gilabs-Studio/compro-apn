"use client";

import { useState } from "react";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getLandingCopy } from "./content";

type PremiumNavProps = {
  locale: string;
};

export function PremiumNav({ locale }: PremiumNavProps) {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const copy = getLandingCopy(locale);
  const nextLocale = activeLocale === "id" ? "en" : "id";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between border border-white/15 bg-neutral-950/60 px-4 text-white shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-6"
      >
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid size-9 place-items-center bg-white text-sm font-semibold text-neutral-950 transition-transform duration-300 group-hover:scale-95">
            AP
          </span>
          <span className="hidden text-sm font-medium tracking-[0.18em] sm:block">
            ADIGUNA
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {copy.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative text-sm font-medium text-white/72 transition-colors hover:text-white",
                  isActive && "text-white",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100",
                    isActive && "scale-x-100",
                  )}
                />
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className="inline-flex h-10 items-center gap-2 border border-white/15 px-3 text-sm font-medium text-white/75 transition-colors hover:border-white/35 hover:text-white"
          >
            <Globe2 className="size-4" />
            {nextLocale.toUpperCase()}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 bg-white px-4 text-sm font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-0.5"
          >
            {locale === "id" ? "Hubungi" : "Contact"}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
          className="inline-grid size-10 place-items-center border border-white/15 text-white lg:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.nav>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-7xl border border-white/10 bg-neutral-950/95 p-4 text-white shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <div className="grid gap-2">
            {copy.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-2 py-3 text-base font-medium text-white/80"
              >
                {item.label}
                <ArrowUpRight className="size-4 text-white/35" />
              </Link>
            ))}
            <Link
              href={pathname}
              locale={nextLocale}
              onClick={() => setIsOpen(false)}
              className="mt-2 flex items-center gap-2 border border-white/15 px-2 py-3 text-sm text-white/70"
            >
              <Globe2 className="size-4" />
              {nextLocale.toUpperCase()}
            </Link>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
