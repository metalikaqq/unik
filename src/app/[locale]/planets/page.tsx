import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { PLANETS } from "@/content/planets";
import { SECTIONS } from "@/lib/sections";
import { MESSAGES } from "@/i18n/messages";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

const SECTION = SECTIONS.find((s) => s.slug === "planets")!;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return {
    title: SECTION.title[locale],
    description: SECTION.blurb[locale],
  };
}

export default async function PlanetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <>
      <PageIntro
        eyebrow={`${MESSAGES.chapterPrefix[locale]} 01 — ${MESSAGES.atlasSuffix[locale]}`}
        title={SECTION.title[locale]}
        subtitle={SECTION.subtitle[locale]}
        blurb={SECTION.blurb[locale]}
        accent={SECTION.accent}
      />
      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 sm:gap-28 sm:px-8 lg:gap-32 lg:px-10">
          {PLANETS.map((planet, i) => (
            <CelestialCard
              key={planet.id}
              index={i}
              eyebrow={planet.classification[locale]}
              title={planet.name[locale]}
              tagline={planet.tagline[locale]}
              body={planet.fact[locale]}
              image={planet.image}
              imageAlt={planet.imageAlt[locale]}
              accent={planet.accent}
              stats={planet.stats.map((s) => ({
                label: s.label[locale],
                value: s.value[locale],
              }))}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
