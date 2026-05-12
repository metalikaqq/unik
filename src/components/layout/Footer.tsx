"use client";

import { usePathname } from "next/navigation";

import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { MESSAGES } from "@/i18n/messages";

export function Footer() {
  const pathname = usePathname() ?? "/";
  const first = pathname.split("/").filter(Boolean)[0];
  const locale = isLocale(first) ? first : DEFAULT_LOCALE;

  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm text-muted sm:px-8 sm:py-12 md:flex-row md:items-end md:justify-between lg:px-10">
        <div>
          <p className="font-display text-xl text-fg sm:text-2xl">
            {MESSAGES.footerQuote[locale]}
          </p>
          <p className="mt-2 max-w-md text-sm">
            {MESSAGES.footerAttribution[locale]}
          </p>
        </div>
        <div className="space-y-1 font-mono text-xs uppercase tracking-wider">
          <p>Cosmos / Atlas</p>
          <p className="text-dim">{MESSAGES.footerTagline[locale]}</p>
          <p className="text-dim">{new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
