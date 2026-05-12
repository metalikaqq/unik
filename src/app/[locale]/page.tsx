import { getTranslations, setRequestLocale } from "next-intl/server";

import { CfpForm } from "@/components/home/CfpForm";
import { Hero } from "@/components/home/Hero";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { Rule } from "@/components/ui/Rule";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home.cfp");

  return (
    <div className="flex flex-col">
      <Hero />
      <Rule />
      <HomeMarquee />
      <Rule />
      <section
        id="cfp"
        aria-labelledby="cfp-heading"
        className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]"
      >
        <header className="flex flex-col gap-[var(--space-3)]">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("section")}</p>
          <h2
            id="cfp-heading"
            className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-fg/85">{t("intro")}</p>
        </header>
        <div className="grid grid-cols-1 gap-[var(--space-12)] md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div aria-hidden="true" className="hidden md:block">
            <Rule orientation="vertical" />
          </div>
          <CfpForm />
        </div>
      </section>
    </div>
  );
}
