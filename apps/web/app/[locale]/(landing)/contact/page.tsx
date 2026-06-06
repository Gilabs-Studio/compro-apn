import type { Metadata } from "next";
import { ContactPage } from "@/features/landing/Contact/ContactPage";
import { getLandingCopy } from "@/features/landing/content";
import { buildLandingMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return buildLandingMetadata({
    locale,
    path: "/contact",
    title: `${locale === "id" ? "Kontak" : "Contact"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Hubungi PT Adiguna Presisi Nusantara untuk konsultasi kebutuhan mesin industri dan solusi manufaktur."
        : "Contact PT Adiguna Presisi Nusantara for industrial machine and manufacturing solution consultation.",
    keywords: [
      "kontak pt adiguna presisi nusantara",
      "contact adiguna presisi nusantara",
      "konsultasi mesin CNC",
      "technical consultation indonesia",
    ],
    imageAlt: "Contact PT Adiguna Presisi Nusantara",
    imageUrl: "/landing/geometric_contact_hero.png",
  });
}

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ContactPage locale={locale} />;
}
