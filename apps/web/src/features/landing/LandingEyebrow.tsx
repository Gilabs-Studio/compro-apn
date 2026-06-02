import { cn } from "@/lib/utils";

type LandingEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function LandingEyebrow({ children, className }: LandingEyebrowProps) {
  return (
    <p
      className={cn(
        "font-heading text-[1.8rem] leading-none",
        className,
      )}
    >
      {children}
    </p>
  );
}