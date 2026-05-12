import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { NEBULAE } from "@/content/nebulae";
import { SECTIONS } from "@/lib/sections";

const SECTION = SECTIONS.find((s) => s.slug === "nebulae")!;

export const metadata: Metadata = {
  title: "Nebulae",
  description: SECTION.blurb,
};

export default function NebulaePage() {
  return (
    <>
      <PageIntro
        eyebrow="Chapter 04 — Atlas"
        title={SECTION.title}
        subtitle={SECTION.subtitle}
        blurb={SECTION.blurb}
        accent={SECTION.accent}
      />
      <section className="relative pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 sm:px-10">
          {NEBULAE.map((neb, i) => (
            <CelestialCard
              key={neb.id}
              index={i}
              eyebrow={neb.type}
              title={neb.name}
              tagline={neb.fact}
              body={neb.body}
              image={neb.image}
              imageAlt={neb.imageAlt}
              accent={neb.accent}
              stats={[
                { label: "Distance", value: neb.distance },
                { label: "Size", value: neb.size },
              ]}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
