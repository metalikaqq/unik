import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { NEBULAE } from "@/content/nebulae";
import { SECTIONS } from "@/lib/sections";
import { MESSAGES } from "@/i18n/messages";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

const SECTION = SECTIONS.find((s) => s.slug === "nebulae")!;

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

export default async function NebulaePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  return (
    <>
      <PageIntro
        eyebrow={`${MESSAGES.chapterPrefix[locale]} 04 — ${MESSAGES.atlasSuffix[locale]}`}
        title={SECTION.title[locale]}
        subtitle={SECTION.subtitle[locale]}
        blurb={SECTION.blurb[locale]}
        accent={SECTION.accent}
      />
      <section className="relative pb-24 sm:pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-5 sm:gap-28 sm:px-8 lg:gap-32 lg:px-10">
          {NEBULAE.map((neb, i) => (
            <CelestialCard
              key={neb.id}
              index={i}
              eyebrow={neb.type[locale]}
              title={neb.name[locale]}
              tagline={neb.fact[locale]}
              body={neb.body[locale]}
              image={neb.image}
              imageAlt={neb.imageAlt[locale]}
              accent={neb.accent}
              stats={[
                {
                  label: locale === "uk" ? "Відстань" : "Distance",
                  value: neb.distance[locale],
                },
                {
                  label: locale === "uk" ? "Розмір" : "Size",
                  value: neb.size[locale],
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
