import { getTranslations, setRequestLocale } from "next-intl/server";

import { Gallery } from "@/components/venue/Gallery";
import { GettingThere } from "@/components/venue/GettingThere";
import { Rule } from "@/components/ui/Rule";
import { pickLocale } from "@/content/types";
import { venue } from "@/content/venue";

export default async function VenuePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("venue.page");
  const tFacts = await getTranslations("venue.facts");

  const name = pickLocale(venue.name, locale);
  const address = pickLocale(venue.address, locale);

  const photos = venue.photos.map((p) => ({
    id: p.id,
    caption: pickLocale(p.caption, locale),
    width: p.width,
    height: p.height,
    hue: p.hue,
  }));

  const transports = venue.gettingThere.map((entry) => ({
    mode: entry.mode,
    title: pickLocale(entry.title, locale),
    body: pickLocale(entry.body, locale),
  }));

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-section)] px-6 py-[var(--space-section)]">
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{tPage("eyebrow")}</p>
        <h1 className="font-display text-4xl font-medium uppercase leading-tight tracking-tight">
          {name}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{tPage("intro")}</p>
      </header>

      <section aria-labelledby="venue-facts-heading" className="flex flex-col gap-[var(--space-4)]">
        <h2 id="venue-facts-heading" className="sr-only">
          {tFacts("address")}
        </h2>
        <dl className="grid grid-cols-1 gap-px bg-fg/15 sm:grid-cols-2">
          <div className="flex flex-col gap-[var(--space-2)] bg-bg p-[var(--space-4)]">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {tFacts("address")}
            </dt>
            <dd className="text-base leading-relaxed text-fg">{address}</dd>
          </div>
          <div className="flex flex-col gap-[var(--space-2)] bg-bg p-[var(--space-4)]">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {tFacts("coords")}
            </dt>
            <dd className="font-mono text-sm text-fg">
              {venue.coords.lat.toFixed(4)}, {venue.coords.lng.toFixed(4)}
            </dd>
          </div>
          <div className="flex flex-col gap-[var(--space-2)] bg-bg p-[var(--space-4)]">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {tFacts("capacity")}
            </dt>
            <dd className="text-base text-fg">{venue.capacity}</dd>
          </div>
          <div className="flex flex-col gap-[var(--space-2)] bg-bg p-[var(--space-4)]">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted">
              {tFacts("amenities")}
            </dt>
            <dd>
              <ul className="flex flex-col gap-[var(--space-1)] text-base leading-relaxed text-fg/85">
                {venue.amenities.map((a, i) => (
                  <li key={i}>{pickLocale(a, locale)}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-wider text-fg hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {tFacts("openInMaps")}
          </a>
        </p>
      </section>

      <Rule />

      <Gallery photos={photos} />

      <Rule />

      <GettingThere entries={transports} />
    </div>
  );
}
