import { LandingShell } from "@/features/landing/LandingShell";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <LandingShell locale={locale}>{children}</LandingShell>;
}
