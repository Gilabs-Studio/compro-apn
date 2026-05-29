import dynamic from "next/dynamic";
import { PageTransition } from "../PageTransition";
import { getLandingCopy } from "../content";
import HeroSection from "./sections/HeroSection";

// Dynamically import sections below the fold to optimize performance
const CapabilitiesSection = dynamic(() => import("./sections/CapabilitiesSection"), {
  ssr: true,
});

const FeaturedProductsSection = dynamic(() => import("./sections/FeaturedProductsSection"), {
  ssr: true,
});

const ServicesSection = dynamic(() => import("./sections/ServicesSection"), {
  ssr: true,
});

const ContactCtaSection = dynamic(() => import("./sections/ContactCtaSection"), {
  ssr: true,
});

type HomePageProps = {
  locale: string;
};

export function HomePage({ locale }: Readonly<HomePageProps>) {
  const copy = getLandingCopy(locale);

  return (
    <PageTransition>
      <HeroSection locale={locale} copy={copy} />
      <CapabilitiesSection locale={locale} copy={copy} />
      <FeaturedProductsSection locale={locale} copy={copy} />
      <ServicesSection locale={locale} copy={copy} />
      <ContactCtaSection locale={locale} />
    </PageTransition>
  );
}
