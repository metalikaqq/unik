"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { Rule } from "@/components/ui/Rule";
import { Tag } from "@/components/ui/Tag";
import type { DayNumber, SessionKind } from "@/content/schedule";
import { cn } from "@/lib/cn";

const DAYS: DayNumber[] = [1, 2, 3];

type ClientSession = {
  id: string;
  day: DayNumber;
  start: string;
  end: string;
  room: string;
  title: string;
  abstract: string;
  track: string;
  trackLabel: string;
  kind: SessionKind;
  speakers: ReadonlyArray<{ id: string; name: string }>;
};

export type ScheduleClientProps = {
  sessions: ReadonlyArray<ClientSession>;
  dayLabels: Record<DayNumber, string>;
  dayDates: Record<DayNumber, string>;
};

export function ScheduleClient({ sessions, dayLabels, dayDates }: ScheduleClientProps) {
  const tTabs = useTranslations("schedule.tabs");
  const tSession = useTranslations("schedule.session");
  const tEmpty = useTranslations("schedule");

  const [activeDay, setActiveDay] = useState<DayNumber>(1);
  const [openSessionId, setOpenSessionId] = useState<string | null>(null);

  // On mount, honour any #day{n} / #session-{id} hash present in the URL so
  // deep links open the correct day with the correct session expanded.
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;

    const sessionMatch = sessions.find((s) => s.id === hash || `session-${s.id}` === hash);
    if (sessionMatch) {
      setActiveDay(sessionMatch.day);
      setOpenSessionId(sessionMatch.id);
      return;
    }

    const dayMatch = /^day([123])$/.exec(hash);
    if (dayMatch) {
      setActiveDay(Number(dayMatch[1]) as DayNumber);
    }
  }, [sessions]);

  const sessionsByDay = useMemo(() => {
    const out = new Map<DayNumber, ClientSession[]>();
    for (const day of DAYS) out.set(day, []);
    for (const s of sessions) out.get(s.day)?.push(s);
    return out;
  }, [sessions]);

  const onDayClick = (day: DayNumber) => {
    setActiveDay(day);
    setOpenSessionId(null);
    history.replaceState(null, "", `#day${day}`);
  };

  const onSessionToggle = (id: string) => {
    setOpenSessionId((prev) => {
      const next = prev === id ? null : id;
      if (next) history.replaceState(null, "", `#session-${id}`);
      else history.replaceState(null, "", `#day${activeDay}`);
      return next;
    });
  };

  const activeSessions = sessionsByDay.get(activeDay) ?? [];

  return (
    <div className="flex flex-col gap-[var(--space-8)]">
      <nav aria-label={tTabs("label")} className="flex flex-wrap items-center gap-[var(--space-2)]">
        {DAYS.map((day) => {
          const isActive = day === activeDay;
          return (
            <button
              key={day}
              type="button"
              onClick={() => onDayClick(day)}
              aria-pressed={isActive}
              className={cn(
                "flex flex-col gap-[var(--space-1)] border px-4 py-2 text-left transition-colors",
                "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                isActive
                  ? "border-accent text-fg"
                  : "border-fg/15 text-muted hover:border-fg hover:text-fg"
              )}
            >
              <span className="font-mono text-xs uppercase tracking-wider">
                {tTabs("day", { n: day })}
              </span>
              <span className="font-display text-base font-medium uppercase tracking-tight">
                {dayLabels[day]}
              </span>
              {isActive && <Rule className="mt-[var(--space-1)] bg-accent" />}
            </button>
          );
        })}
      </nav>

      {activeSessions.length === 0 ? (
        <p className="font-mono text-sm uppercase tracking-wider text-muted">
          {tEmpty("empty")}
        </p>
      ) : (
        <Accordion singleOpen className="border-t border-fg/15">
          {activeSessions.map((session) => {
            const isOpen = openSessionId === session.id;
            return (
              <AccordionItem
                key={session.id}
                itemId={session.id}
                className="border-fg/15"
              >
                <a
                  id={`session-${session.id}`}
                  aria-hidden="true"
                  className="invisible -mt-24 block h-0"
                />
                <AccordionTrigger
                  onClick={() => onSessionToggle(session.id)}
                  aria-expanded={isOpen}
                  className="px-0"
                >
                  <span className="grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-[var(--space-4)] md:grid-cols-[6rem_1fr_auto]">
                    <span className="font-mono text-sm text-muted">
                      {session.start}–{session.end}
                    </span>
                    <span className="flex flex-col gap-[var(--space-1)] text-left">
                      <span className="font-display text-base font-medium uppercase tracking-tight md:text-lg">
                        {session.title}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider text-muted">
                        {session.speakers.map((s) => s.name).join(", ")} ·{" "}
                        {tSession("in")} {session.room}
                      </span>
                    </span>
                    <Tag className="text-accent">{tSession(`kind.${session.kind}`)}</Tag>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 gap-[var(--space-4)] md:grid-cols-[6rem_1fr_auto]">
                  <span aria-hidden="true" />
                  <div className="flex flex-col gap-[var(--space-3)]">
                    <p className="text-base leading-relaxed text-fg/85">{session.abstract}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">
                      {tSession("with")}: {session.speakers.map((s) => s.name).join(", ")} ·{" "}
                      <span className="text-fg/85">{session.trackLabel}</span>
                    </p>
                    <a
                      href={`#session-${session.id}`}
                      className="self-start font-mono text-xs uppercase tracking-wider text-muted hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {tSession("anchor")} →
                    </a>
                  </div>
                  <span aria-hidden="true" />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}

      <p className="font-mono text-xs uppercase tracking-wider text-muted">
        {dayDates[activeDay]}
      </p>
    </div>
  );
}
