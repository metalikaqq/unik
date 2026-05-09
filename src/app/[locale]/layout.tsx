import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";

import "../globals.css";

/*
 * Inter variable font with the `opsz` (optical-size) axis enabled —
 * this gives us the "Inter Display" variant at large font-sizes via
 * `font-optical-sizing: auto` (set on body in globals.css). One variable
 * font file covers the full 100..900 weight range, so this is the leanest
 * way to ship Inter Display without duplicating per-weight static files.
 *
 * Cyrillic subset is mandatory (UA-EN bilingual surface — ADR-0003).
 */
const interDisplay = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CARPATHIAN.CONF 2026",
  description:
    "Independent technology and design conference in Uzhhorod, Ukraine — 14-16 May 2026.",
};

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
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${interDisplay.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
