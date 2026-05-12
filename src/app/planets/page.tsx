import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { PLANETS } from "@/content/planets";
import { SECTIONS } from "@/lib/sections";

const SECTION = SECTIONS.find((s) => s.slug === "planets")!;

export const metadata: Metadata = {
  title: "Planets",
  description: SECTION.blurb,
};

export default function PlanetsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chapter 01 — Atlas"
        title={SECTION.title}
        subtitle={SECTION.subtitle}
        blurb={SECTION.blurb}
        accent={SECTION.accent}
      />
      <section className="relative pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 sm:px-10">
          {PLANETS.map((planet, i) => (
            <CelestialCard
              key={planet.id}
              index={i}
              eyebrow={planet.classification}
              title={planet.name}
              tagline={planet.tagline}
              body={planet.fact}
              image={planet.image}
              imageAlt={planet.imageAlt}
              accent={planet.accent}
              stats={[...planet.stats]}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
