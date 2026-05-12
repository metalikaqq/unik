import { Hero } from "@/components/home/Hero";
import { ScaleStrip } from "@/components/home/ScaleStrip";
import { SectionPortal } from "@/components/ui/SectionPortal";
import { SECTIONS } from "@/lib/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScaleStrip />
      <section className="relative py-section">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Atlas / Four chapters
            </p>
            <h2 className="aurora-text mt-4 font-display text-4xl tracking-tight md:text-5xl">
              Begin anywhere.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Each chapter is its own gravity well. Drift in, drift out, return to the dark between.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {SECTIONS.map((section, i) => (
              <SectionPortal key={section.slug} section={section} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
