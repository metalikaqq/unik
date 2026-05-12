import { getTranslations, setRequestLocale } from "next-intl/server";

import { Faq } from "@/components/tickets/Faq";
import { PricingTable } from "@/components/tickets/PricingTable";
import { StickyCta } from "@/components/tickets/StickyCta";
import { Rule } from "@/components/ui/Rule";
import { faqEntries, ticketTiers } from "@/content/tickets";
import { pickLocale } from "@/content/types";

export default async function TicketsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("tickets.page");
  const tFaq = await getTranslations("tickets.faq");

  const tiers = ticketTiers.map((tier) => ({
    id: tier.id,
    name: pickLocale(tier.name, locale),
    tagline: pickLocale(tier.tagline, locale),
    priceUsd: tier.priceUsd,
    features: tier.features.map((f) => pickLocale(f, locale)),
    recommended: tier.recommended,
  }));

  const faqs = faqEntries.map((entry) => ({
    id: entry.id,
    question: pickLocale(entry.question, locale),
    answer: pickLocale(entry.answer, locale),
  }));

  const minPriceUsd = Math.min(...tiers.map((t) => t.priceUsd));

  return (
    <>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]">
        <header className="flex flex-col gap-[var(--space-3)]">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {tPage("eyebrow")}
          </p>
          <h1 className="font-display text-4xl font-medium uppercase leading-tight tracking-tight">
            {tPage("title")}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-fg/85">{tPage("intro")}</p>
        </header>

        <PricingTable tiers={tiers} />

        <Rule className="my-[var(--space-8)]" />

        <section aria-labelledby="faq-heading" className="flex flex-col gap-[var(--space-6)]">
          <header className="flex flex-col gap-[var(--space-3)]">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {tFaq("eyebrow")}
            </p>
            <h2
              id="faq-heading"
              className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
            >
              {tFaq("title")}
            </h2>
          </header>
          <Faq entries={faqs} />
        </section>
      </div>

      <StickyCta minPriceUsd={minPriceUsd} />
    </>
  );
}
