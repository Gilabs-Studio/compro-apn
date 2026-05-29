"use client";

import React, { useContext, useState } from "react";
import { usePathname } from "@/i18n/routing";
import { motion, AnimatePresence, useIsPresent } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

// FrozenRouter freezes the context of Next.js LayoutRouter to prevent immediate unmount of children content
function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const [frozen] = useState(() => context);

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

function getRouteIndex(pathname: string): number {
  if (pathname === "/" || pathname === "") return 0;
  if (pathname === "/product") return 10;
  if (pathname.startsWith("/product/")) return 11;
  if (pathname === "/about") return 20;
  if (pathname === "/blog") return 30;
  if (pathname === "/contact") return 40;
  return 0;
}

const variants = {
  initial: (isForward: boolean) => ({
    x: isForward ? "100%" : "-100%",
    opacity: 1,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (isForward: boolean) => ({
    x: isForward ? "-100%" : "100%",
    opacity: 1,
  }),
};

function TransitionItem({
  children,
  isForward,
}: {
  children: React.ReactNode;
  isForward: boolean;
}) {
  const isPresent = useIsPresent();

  return (
    <motion.div
      custom={isForward}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 35, mass: 1 },
        opacity: { duration: 0.25 },
      }}
      style={{
        position: isPresent ? "relative" : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: isPresent ? 10 : 0,
      }}
    >
      <FrozenRouter>{children}</FrozenRouter>
    </motion.div>
  );
}

export function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [prevPath, setPrevPath] = useState<string | null>(null);

  if (pathname !== currentPath) {
    setPrevPath(currentPath);
    setCurrentPath(pathname);
  }

  const prevIndex = prevPath ? getRouteIndex(prevPath) : 0;
  const currIndex = getRouteIndex(currentPath);
  const isForward = currIndex > prevIndex;

  return (
    <div className="relative w-full overflow-hidden min-h-screen bg-[#f6f3ee]">
      <AnimatePresence initial={false} custom={isForward}>
        <TransitionItem key={currentPath} isForward={isForward}>
          {children}
        </TransitionItem>
      </AnimatePresence>
    </div>
  );
}
