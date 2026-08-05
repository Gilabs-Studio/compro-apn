import type { Metadata } from "next";
import {
  CncSellerTangerangPage,
  getCncSellerTangerangFaqs,
} from "@/features/landing/Seo/CncSellerTangerangPage";
import {
  LOCAL_CNC_PAGE_PATH,
  buildBreadcrumbStructuredData,
  buildFaqStructuredData,
  buildLandingMetadata,
  buildServiceStructuredData,
} from "@/lib/seo";

type LocalCncRouteProps = {
  params: Promise<{ locale: string }>;
};

function getLocalCncPageMeta(locale: string) {
  const isId = locale === "id";

  return {
    title: isId
      ? "Jual Mesin CNC Tangerang & Tangerang Selatan"
      : "CNC Machine Supplier in Tangerang and South Tangerang",
    description: isId
      ? "PT Adiguna Presisi Nusantara adalah penjual mesin CNC di Tangerang Selatan untuk CNC milling, CNC turning, machining center, laser cutting, instalasi, dan engineering support."
      : "PT Adiguna Presisi Nusantara is a CNC machine supplier in South Tangerang for CNC milling, CNC turning, machining centers, laser cutting, installation, and engineering support.",
    serviceType: isId
      ? "Penjualan mesin CNC dan konsultasi mesin industri"
      : "CNC machine supply and industrial machine consultation",
  };
}

export async function generateMetadata({
  params,
}: LocalCncRouteProps): Promise<Metadata> {
  const { locale } = await params;
  const meta = getLocalCncPageMeta(locale);

  return buildLandingMetadata({
    locale,
    path: LOCAL_CNC_PAGE_PATH,
    title: meta.title,
    description: meta.description,
    keywords: [
      "jual mesin CNC Tangerang",
      "penjual mesin CNC Tangerang",
      "rekomen penjual mesin CNC",
      "vendor mesin CNC Tangerang Selatan",
      "supplier mesin CNC Tangerang",
      "distributor mesin CNC Banten",
      "mesin CNC milling Tangerang",
      "mesin CNC bubut Tangerang",
      "mesin fiber laser cutting Tangerang",
    ],
    imageAlt: "Penjual mesin CNC Tangerang PT Adiguna Presisi Nusantara",
    imageUrl: "/landing/product-hero-machine3.webp",
  });
}

export default async function LocalCncRoute({ params }: LocalCncRouteProps) {
  const { locale } = await params;
  const meta = getLocalCncPageMeta(locale);
  const breadcrumbs = buildBreadcrumbStructuredData({
    locale,
    items: [
      { name: locale === "id" ? "Beranda" : "Home", path: "/" },
      { name: meta.title, path: LOCAL_CNC_PAGE_PATH },
    ],
  });
  const serviceStructuredData = buildServiceStructuredData({
    locale,
    path: LOCAL_CNC_PAGE_PATH,
    name: meta.title,
    description: meta.description,
    serviceType: meta.serviceType,
  });
  const faqStructuredData = buildFaqStructuredData({
    locale,
    items: getCncSellerTangerangFaqs(locale),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <CncSellerTangerangPage locale={locale} />
    </>
  );
}
