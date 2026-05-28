import { ArrowUpRight } from "lucide-react";
import { PageTransition } from "../PageTransition";
import { Reveal } from "../Reveal";
import { LandingEyebrow } from "../LandingEyebrow";
import { getLandingCopy } from "../content";

type BlogPageProps = {
  locale: string;
};

export function BlogPage({ locale }: BlogPageProps) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <section className="px-6 pb-20 pt-36 sm:px-8 lg:px-12 lg:pb-28 lg:pt-44">
        <div className="mx-auto max-w-7xl">
          <LandingEyebrow className="text-neutral-500">
            {locale === "id" ? "Blog" : "Blog"}
          </LandingEyebrow>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-none tracking-tight sm:text-7xl">
            {locale === "id"
              ? "Catatan tentang mesin, proses, dan produktivitas."
              : "Notes on machines, process, and productivity."}
          </h1>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-px bg-neutral-200 lg:grid-cols-3">
          {copy.blogPosts.map((post, index) => (
            <Reveal key={post.title} delay={index * 0.08}>
              <article className="group min-h-[420px] bg-white p-8 transition-colors hover:bg-neutral-950 hover:text-white sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-950">
                    {post.category}
                  </span>
                  <span className="grid size-10 place-items-center border border-neutral-200 transition-colors group-hover:border-white/20">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <h2 className="mt-20 text-3xl font-semibold tracking-tight">
                  {post.title}
                </h2>
                <p className="mt-6 text-base leading-8 text-neutral-600 transition-colors group-hover:text-white/62">
                  {post.excerpt}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
