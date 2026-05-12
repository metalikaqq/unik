import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/PageIntro";
import { CelestialCard } from "@/components/ui/CelestialCard";
import { BLACK_HOLES } from "@/content/black-holes";
import { SECTIONS } from "@/lib/sections";

const SECTION = SECTIONS.find((s) => s.slug === "black-holes")!;

export const metadata: Metadata = {
  title: "Black Holes",
  description: SECTION.blurb,
};

export default function BlackHolesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Chapter 03 — Atlas"
        title={SECTION.title}
        subtitle={SECTION.subtitle}
        blurb={SECTION.blurb}
        accent={SECTION.accent}
      />
      <section className="relative pb-32">
        <div className="mx-auto flex max-w-6xl flex-col gap-32 px-6 sm:px-10">
          {BLACK_HOLES.map((bh, i) => (
            <CelestialCard
              key={bh.id}
              index={i}
              eyebrow={bh.type}
              title={bh.name}
              tagline={bh.fact}
              body={bh.body}
              image={bh.image}
              imageAlt={bh.imageAlt}
              accent={bh.accent}
              stats={[
                { label: "Mass", value: bh.mass },
                { label: "Distance", value: bh.distance },
              ]}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
