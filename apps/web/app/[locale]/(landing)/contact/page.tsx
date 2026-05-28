import type { Metadata } from "next";
import { ContactPage } from "@/features/landing/Contact/ContactPage";
import { getLandingCopy } from "@/features/landing/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = getLandingCopy(locale);

  return {
    title: `${locale === "id" ? "Kontak" : "Contact"} - ${copy.company}`,
    description:
      locale === "id"
        ? "Hubungi PT Adiguna Presisi Nusantara untuk konsultasi kebutuhan mesin industri dan solusi manufaktur."
        : "Contact PT Adiguna Presisi Nusantara for industrial machine and manufacturing solution consultation.",
  };
}

export default async function ContactRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ContactPage locale={locale} />;
}
