"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Readonly<RevealProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) {
      return;
    }

    // Fallback: If the element is vertically within the initial viewport,
    // force set isVisible to true after the page slide transition (approx. 1000ms)
    // in case the browser's IntersectionObserver misses the intersection during CSS translation.
    const rect = element.getBoundingClientRect();
    let fallbackId: NodeJS.Timeout | null = null;

    if (rect.top < (window.innerHeight || 800)) {
      fallbackId = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        setIsVisible(true);
        observer.disconnect();
        if (fallbackId) {
          clearTimeout(fallbackId);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (fallbackId) {
        clearTimeout(fallbackId);
      }
    };
  }, [isVisible]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0",
        className,
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

