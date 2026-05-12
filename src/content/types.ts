import { z } from "zod";

import { CFP_TRACKS } from "@/lib/cfp-schema";

export const bilingualSchema = z.object({
  uk: z.string().min(1),
  en: z.string().min(1),
});

export type BilingualText = z.infer<typeof bilingualSchema>;

export const trackSchema = z.enum(CFP_TRACKS);
export type Track = z.infer<typeof trackSchema>;

/**
 * Resolve a bilingual field for a given locale, with UA as the canonical
 * fallback per ADR-0003. Server components pass `locale` down from the
 * [locale] route segment.
 */
export function pickLocale(value: BilingualText, locale: string): string {
  if (locale === "en") return value.en;
  return value.uk;
}
