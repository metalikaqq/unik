import { Hero } from "@/components/home/Hero";
import { ScaleStrip } from "@/components/home/ScaleStrip";
import { SectionPortal } from "@/components/ui/SectionPortal";
import { SECTIONS } from "@/lib/sections";
import { MESSAGES } from "@/i18n/messages";
import { isLocale, DEFAULT_LOCALE } from "@/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return (
    <>
      <Hero locale={locale} />
      <ScaleStrip locale={locale} />
      <section className="relative py-section">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 max-w-2xl sm:mb-16">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {MESSAGES.beginEyebrow[locale]}
            </p>
            <h2 className="aurora-text mt-4 font-display text-3xl tracking-tight sm:text-4xl md:text-5xl">
              {MESSAGES.beginTitle[locale]}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              {MESSAGES.beginBody[locale]}
            </p>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {SECTIONS.map((section, i) => (
              <SectionPortal
                key={section.slug}
                section={section}
                index={i}
                locale={locale}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
