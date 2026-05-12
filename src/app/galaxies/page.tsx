import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { GALAXIES } from "@/content/galaxies";
import { SECTIONS } from "@/lib/sections";

const SECTION = SECTIONS.find((s) => s.slug === "galaxies")!;

export const metadata: Metadata = {
  title: "Galaxies",
  description: SECTION.blurb,
};

export default function GalaxiesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chapter 02 — Atlas"
        title={SECTION.title}
        subtitle={SECTION.subtitle}
        blurb={SECTION.blurb}
        accent={SECTION.accent}
      />
      <section className="relative pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 sm:px-10">
          {GALAXIES.map((galaxy, i) => (
            <CelestialCard
              key={galaxy.id}
              index={i}
              eyebrow={galaxy.classification}
              title={galaxy.name}
              tagline={galaxy.fact}
              body={galaxy.body}
              image={galaxy.image}
              imageAlt={galaxy.imageAlt}
              accent={galaxy.accent}
              stats={[
                { label: "Distance", value: galaxy.distance },
                { label: "Diameter", value: galaxy.diameter },
              ]}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
