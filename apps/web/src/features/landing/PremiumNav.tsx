"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const themeMapRef = useRef(new Map<Element, number>());
  const lastScrollYRef = useRef(0);
  const copy = getLandingCopy(locale);
  const nextLocale = activeLocale === "id" ? "en" : "id";

  useLayoutEffect(() => {
    let observer: IntersectionObserver | null = null;
    let retryFrame = 0;
    let isCancelled = false;

    const updateTheme = () => {
      let nextTheme: NavTheme = "dark";
      let bestRatio = 0;

      themeMapRef.current.forEach((ratio, element) => {
        if (ratio >= bestRatio) {
          bestRatio = ratio;
          nextTheme =
            ((element.getAttribute("data-nav-theme") as NavTheme | null) ??
              "dark");
        }
      });

      setTheme(nextTheme);
    };

    const connectObserver = () => {
      if (isCancelled) {
        return;
      }

      themeMapRef.current.clear();

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );

      if (sections.length === 0) {
        retryFrame = window.requestAnimationFrame(connectObserver);
        return;
      }

      observer = new IntersectionObserver(
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

      sections.forEach((section) => observer?.observe(section));
      updateTheme();
    };

    connectObserver();

    return () => {
      isCancelled = true;

      if (retryFrame) {
        window.cancelAnimationFrame(retryFrame);
      }

      observer?.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isNearTop = currentScrollY <= 12;
        const previousScrollY = lastScrollYRef.current;
        const scrollingDown = currentScrollY > previousScrollY + 4;
        const scrollingUp = currentScrollY < previousScrollY - 4;

        lastScrollYRef.current = currentScrollY;
        setIsAtTop((prev) => (prev === isNearTop ? prev : isNearTop));

        if (isNearTop) {
          setIsHidden((prev) => (prev ? false : prev));
          ticking = false;
          return;
        }

        if (scrollingDown) {
          setIsHidden((prev) => (prev ? prev : true));
          ticking = false;
          return;
        }

        if (scrollingUp) {
          setIsHidden((prev) => (prev ? false : prev));
        }

        ticking = false;
      });
    };

    const resetNavState = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY <= 12;
      const previousScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > previousScrollY + 4;
      const scrollingUp = currentScrollY < previousScrollY - 4;

      lastScrollYRef.current = currentScrollY;
      setIsAtTop(isNearTop);

      if (isNearTop) {
        setIsHidden(false);
        return;
      }

      if (scrollingDown) {
        setIsHidden(true);
        return;
      }

      if (scrollingUp) {
        setIsHidden(false);
      }
    };

    lastScrollYRef.current = window.scrollY;
    resetNavState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isDarkTheme = theme === "dark";
  const isTransparentSurface = isAtTop;
  const showSurface = !isTransparentSurface || isOpen;
  const isNavVisible = !isHidden || isOpen || isAtTop;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8",
        isOpen && "z-60",
      )}
    >
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: isNavVisible ? 1 : 0,
          y: isNavVisible ? 0 : -28,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={cn(
          "mx-auto flex h-14 max-w-7xl items-center justify-between px-0 transition-[background-color,box-shadow,backdrop-filter,padding] duration-300 sm:h-16",
          isDarkTheme ? "text-white" : "text-neutral-950",
          showSurface
            ? isDarkTheme
              ? "rounded-full border border-white/10 bg-neutral-950/72 px-4 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5"
              : "rounded-full border border-neutral-950/8 bg-[#f6f3ee]/78 px-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-5"
            : "rounded-none border-transparent bg-transparent px-0 shadow-none backdrop-blur-0",
          isHidden && !isOpen ? "pointer-events-none" : "pointer-events-auto",
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
            href="https://wa.me/6281291572817"
            target="_blank"
            rel="noopener noreferrer"
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
              href="https://wa.me/6281291572817"
              target="_blank"
              rel="noopener noreferrer"
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
