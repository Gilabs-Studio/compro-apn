import { MoveRight } from "lucide-react";
import { Reveal } from "../../Reveal";

type ContactCtaSectionProps = {
  locale: string;
};

export default function ContactCtaSection({ locale }: Readonly<ContactCtaSectionProps>) {
  return (
    <section
      data-nav-theme="light"
      className="bg-linear-to-b from-neutral-50 px-6 pb-20 sm:px-8 lg:px-12 lg:pb-32"
    >
      <Reveal>
        <a
          href="https://wa.me/6281291572817"
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto flex max-w-7xl items-center justify-between gap-8 border-y border-neutral-950 py-10"
        >
          <span className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            {locale === "id"
              ? "Hubungi Kami Sekarang"
              : "Contact Us Today"}
          </span>
          <span className="grid size-14 shrink-0 place-items-center bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-2">
            <MoveRight className="size-6" />
          </span>
        </a>
      </Reveal>
    </section>
  );
}
