import { getTranslations, setRequestLocale } from "next-intl/server";

import { ScheduleClient } from "@/components/schedule/ScheduleClient";
import { DAY_NUMBERS, formatDayDate, schedule } from "@/content/schedule";
import { speakers } from "@/content/speakers";
import { pickLocale } from "@/content/types";

export default async function SchedulePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPage = await getTranslations("schedule.page");
  const tTracks = await getTranslations("common.tracks");

  const speakerLookup = new Map(speakers.map((s) => [s.id, pickLocale(s.name, locale)] as const));

  const sessions = schedule.map((s) => ({
    id: s.id,
    day: s.day,
    start: s.start,
    end: s.end,
    room: s.room,
    title: pickLocale(s.title, locale),
    abstract: pickLocale(s.abstract, locale),
    track: s.track,
    trackLabel: tTracks(s.track),
    kind: s.kind,
    speakers: s.speakerIds.map((id) => ({ id, name: speakerLookup.get(id) ?? id })),
  }));

  const dayLabels = Object.fromEntries(
    DAY_NUMBERS.map((day) => [day, formatDayDate(day, locale)])
  ) as Record<(typeof DAY_NUMBERS)[number], string>;

  const dayDates = dayLabels;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]">
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{tPage("eyebrow")}</p>
        <h1 className="font-display text-4xl font-medium uppercase leading-tight tracking-tight">
          {tPage("title")}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{tPage("intro")}</p>
      </header>

      <ScheduleClient sessions={sessions} dayLabels={dayLabels} dayDates={dayDates} />
    </div>
  );
}
