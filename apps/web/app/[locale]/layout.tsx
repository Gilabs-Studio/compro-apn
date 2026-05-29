import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/types/locale";

import { ReactQueryProvider } from "@/lib/react-query";
import ErrorBoundary from "@/components/error-boundary";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ErrorBoundary>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            {children}
            <Toaster position="top-right" offset={80} />
          </ReactQueryProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </NextIntlClientProvider>
  );
}
