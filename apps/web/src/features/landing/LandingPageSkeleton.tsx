import { PageMotion } from "@/components/motion";
import { Skeleton } from "@/components/ui/skeleton";

type LandingPageSkeletonProps = {
  compact?: boolean;
};

export function LandingPageSkeleton({ compact = false }: LandingPageSkeletonProps) {
  return (
    <PageMotion className="space-y-12 p-6">
      <section className="container mx-auto py-10 sm:py-14 lg:py-18">
        <div className="flex flex-col items-start gap-5">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-12 w-full max-w-2xl sm:h-14" />
          <Skeleton className="h-24 w-full max-w-3xl" />
          <div className="mt-2 flex w-full flex-wrap gap-3 sm:w-auto">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-36 rounded-full" />
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
        {!compact ? <Skeleton className="h-64 rounded-3xl" /> : null}
      </section>

      <section className="container mx-auto space-y-5 pb-10 sm:pb-14 lg:pb-20">
        <Skeleton className="h-28 rounded-3xl" />
        <Skeleton className="h-28 rounded-3xl" />
      </section>
    </PageMotion>
  );
}
