import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { BLACK_HOLES } from "@/content/black-holes";
import { SECTIONS } from "@/lib/sections";
import { MESSAGES } from "@/i18n/messages";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

const SECTION = SECTIONS.find((s) => s.slug === "black-holes")!;

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

export default async function BlackHolesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <>
      <PageIntro
        eyebrow={`${MESSAGES.chapterPrefix[locale]} 03 — ${MESSAGES.atlasSuffix[locale]}`}
        title={SECTION.title[locale]}
        subtitle={SECTION.subtitle[locale]}
        blurb={SECTION.blurb[locale]}
        accent={SECTION.accent}
      />
      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 sm:gap-28 sm:px-8 lg:gap-32 lg:px-10">
          {BLACK_HOLES.map((bh, i) => (
            <CelestialCard
              key={bh.id}
              index={i}
              eyebrow={bh.type[locale]}
              title={bh.name[locale]}
              tagline={bh.fact[locale]}
              body={bh.body[locale]}
              image={bh.image}
              imageAlt={bh.imageAlt[locale]}
              accent={bh.accent}
              stats={[
                {
                  label: locale === "uk" ? "Маса" : "Mass",
                  value: bh.mass[locale],
                },
                {
                  label: locale === "uk" ? "Відстань" : "Distance",
                  value: bh.distance[locale],
                },
              ]}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
