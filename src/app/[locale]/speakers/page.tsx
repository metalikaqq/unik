import { getTranslations, setRequestLocale } from "next-intl/server";

import { SpeakerGrid } from "@/components/speakers/SpeakerGrid";
import { TrackFilter } from "@/components/speakers/TrackFilter";
import { speakers } from "@/content/speakers";
import { pickLocale } from "@/content/types";
import { isFilterValue, type FilterValue } from "@/lib/track-filter";

type SpeakersPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SpeakersPage({ params, searchParams }: SpeakersPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const rawTrack = typeof sp.track === "string" ? sp.track : undefined;
  const active: FilterValue = isFilterValue(rawTrack) ? rawTrack : "all";

  const tPage = await getTranslations("speakers.page");
  const tFilter = await getTranslations("speakers.filter");
  const tTracks = await getTranslations("common.tracks");

  const filtered = active === "all" ? speakers : speakers.filter((s) => s.track === active);

  const localized = filtered.map((s) => ({
    id: s.id,
    name: pickLocale(s.name, locale),
    role: pickLocale(s.role, locale),
    talkTitle: pickLocale(s.talkTitle, locale),
    talkAbstract: pickLocale(s.talkAbstract, locale),
    track: s.track,
    trackLabel: tTracks(s.track),
    social: s.social,
  }));

  const filterLabels = {
    all: tFilter("all"),
    design: tTracks("design"),
    engineering: tTracks("engineering"),
    community: tTracks("community"),
  } as const;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]">
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{tPage("eyebrow")}</p>
        <h1 className="font-display text-4xl font-medium uppercase leading-tight tracking-tight">
          {tPage("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{tPage("intro")}</p>
      </header>

      <div className="flex items-center justify-between gap-[var(--space-4)]">
        <TrackFilter active={active} labels={filterLabels} ariaLabel={tFilter("label")} />
        <p
          aria-live="polite"
          className="font-mono text-xs uppercase tracking-wider text-muted"
        >
          {tFilter("ariaCount", { count: filtered.length })}
        </p>
      </div>

      <SpeakerGrid speakers={localized} />
    </div>
  );
}
