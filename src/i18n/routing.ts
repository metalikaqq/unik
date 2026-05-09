import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uk", "en"] as const,
  defaultLocale: "uk",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const isLocale = (value: string): value is Locale =>
  (routing.locales as readonly string[]).includes(value);
