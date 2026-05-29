"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Globe2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { getLandingCopy } from "./content";

type PremiumNavProps = {
  locale: string;
};

type NavTheme = "dark" | "light";

export function PremiumNav({ locale }: PremiumNavProps) {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("dark");
  const themeMapRef = useRef(new Map<Element, number>());
  const copy = getLandingCopy(locale);
  const nextLocale = activeLocale === "id" ? "en" : "id";

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
    );

    if (sections.length === 0) {
      return;
    }

    const updateTheme = () => {
      let nextTheme: NavTheme = "dark";
      let bestRatio = 0;

      themeMapRef.current.forEach((ratio, element) => {
        if (ratio >= bestRatio) {
          bestRatio = ratio;
          nextTheme = (element.getAttribute("data-nav-theme") as NavTheme) ?? "dark";
        }
      });

      setTheme(nextTheme);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          themeMapRef.current.set(
            entry.target,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        updateTheme();
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    updateTheme();

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isDarkTheme = theme === "dark";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8",
        isOpen && "z-60",
      )}
    >
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between px-0 sm:h-16",
          isDarkTheme ? "text-white" : "text-neutral-950",
        )}
      >
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-semibold tracking-[0.24em] transition-opacity duration-300 group-hover:opacity-70",
              isDarkTheme ? "text-white/92" : "text-neutral-950/82",
            )}
          >
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
                  "group text-sm font-medium transition-colors",
                  isDarkTheme
                    ? "text-white/70 hover:text-white"
                    : "text-neutral-950/62 hover:text-neutral-950",
                  isActive && (isDarkTheme ? "text-white" : "text-neutral-950"),
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={pathname}
            locale={nextLocale}
            className={cn(
              "inline-flex h-10 items-center gap-2 text-sm font-medium transition-colors",
              isDarkTheme
                ? "text-white/70 hover:text-white"
                : "text-neutral-950/62 hover:text-neutral-950",
            )}
          >
            <Globe2 className="size-4" />
            {nextLocale.toUpperCase()}
          </Link>
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-10 items-center gap-2 text-sm font-medium transition-colors",
              isDarkTheme
                ? "text-white/70 hover:text-white"
                : "text-neutral-950/62 hover:text-neutral-950",
            )}
          >
            {locale === "id" ? "Hubungi" : "Contact"}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
          className={cn(
            "inline-flex h-10 items-center text-sm font-medium transition-colors lg:hidden",
            isDarkTheme
              ? "text-white/70 hover:text-white"
              : "text-neutral-950/62 hover:text-neutral-950",
          )}
        >
          <Menu className="size-5" />
        </button>
      </motion.nav>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "fixed inset-0 z-60 flex flex-col justify-between px-6 py-6 lg:hidden",
            isDarkTheme
              ? "bg-neutral-950/96 text-white"
              : "bg-[#f6f3ee]/98 text-neutral-950",
          )}
        >
          <div className="flex items-center justify-between">
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.3em]",
                isDarkTheme ? "text-white/45" : "text-neutral-950/40",
              )}
            >
              Navigation
            </span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className={cn(
                "inline-flex h-10 items-center text-sm font-medium transition-colors",
                isDarkTheme
                  ? "text-white/70 hover:text-white"
                  : "text-neutral-950/62 hover:text-neutral-950",
              )}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 items-center">
            <div className="grid w-full gap-5">
              {copy.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-4xl font-semibold tracking-tight transition-colors sm:text-5xl",
                    isDarkTheme
                      ? "text-white/88 hover:text-white"
                      : "text-neutral-950/85 hover:text-neutral-950",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <Link
              href={pathname}
              locale={nextLocale}
              onClick={() => setIsOpen(false)}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                isDarkTheme
                  ? "text-white/70 hover:text-white"
                  : "text-neutral-950/62 hover:text-neutral-950",
              )}
            >
              <Globe2 className="size-4" />
              {nextLocale.toUpperCase()}
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-medium transition-colors",
                isDarkTheme
                  ? "text-white/70 hover:text-white"
                  : "text-neutral-950/62 hover:text-neutral-950",
              )}
            >
              {locale === "id" ? "Hubungi" : "Contact"}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
