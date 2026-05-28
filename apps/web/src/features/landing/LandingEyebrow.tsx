import { cn } from "@/lib/utils";

type LandingEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function LandingEyebrow({ children, className }: LandingEyebrowProps) {
  return (
    <p
      className={cn(
        "text-[1.8rem] leading-none",
        className,
      )}
      style={{ fontFamily: "var(--font-damion)" }}
    >
      {children}
    </p>
  );
}