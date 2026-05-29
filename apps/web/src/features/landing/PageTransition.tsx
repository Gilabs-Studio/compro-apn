"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";

type PageTransitionProps = {
  children: ReactNode;
  className?: string;
};

export function PageTransition({ children, className }: PageTransitionProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none",
        isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className,
      )}
    >
      {children}
    </main>
  );
}
