import { LandingShell } from "@/features/landing/LandingShell";
import {
  buildOrganizationStructuredData,
  buildWebSiteStructuredData,
} from "@/lib/seo";

export const revalidate = 86400;

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const organizationStructuredData = buildOrganizationStructuredData({ locale });
  const webSiteStructuredData = buildWebSiteStructuredData({ locale });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteStructuredData),
        }}
      />
      <LandingShell locale={locale}>{children}</LandingShell>
    </>
  );
}
