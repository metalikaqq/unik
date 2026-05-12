"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Sheet } from "@/components/ui/Sheet";
import { Tag } from "@/components/ui/Tag";
import type { Speaker } from "@/content/speakers";

type SpeakerCardData = {
  id: string;
  name: string;
  role: string;
  talkTitle: string;
  talkAbstract: string;
  track: Speaker["track"];
  trackLabel: string;
  social?: Speaker["social"];
};

export type SpeakerGridProps = {
  speakers: ReadonlyArray<SpeakerCardData>;
};

export function SpeakerGrid({ speakers }: SpeakerGridProps) {
  const tSheet = useTranslations("speakers.sheet");
  const tEmpty = useTranslations("speakers.empty");

  const [activeId, setActiveId] = useState<string | null>(null);

  const active = activeId ? (speakers.find((s) => s.id === activeId) ?? null) : null;

  if (speakers.length === 0) {
    return (
      <div className="flex flex-col gap-[var(--space-3)] border border-fg/15 p-[var(--space-8)]">
        <h2 className="font-display text-xl font-medium uppercase tracking-tight">
          {tEmpty("title")}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{tEmpty("body")}</p>
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-px bg-fg/15 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <li key={speaker.id} className="bg-bg">
            <button
              type="button"
              onClick={() => setActiveId(speaker.id)}
              className="group flex h-full w-full flex-col gap-[var(--space-3)] p-[var(--space-6)] text-left transition-colors hover:bg-fg/4 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <div
                aria-hidden="true"
                className="aspect-[4/5] w-full bg-fg/8 grayscale transition-[filter] group-hover:grayscale-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, color-mix(in oklab, var(--color-fg) 12%, transparent), color-mix(in oklab, var(--color-accent) 18%, transparent))",
                }}
              />
              <Tag className="text-muted">{speaker.trackLabel}</Tag>
              <h2 className="font-display text-lg font-medium uppercase tracking-tight">
                {speaker.name}
              </h2>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {speaker.role}
              </p>
              <p className="text-sm leading-snug text-fg/85">{speaker.talkTitle}</p>
            </button>
          </li>
        ))}
      </ul>

      <Sheet open={active !== null} onClose={() => setActiveId(null)} title={active?.name ?? ""}>
        {active && (
          <div className="flex flex-col gap-[var(--space-4)] text-base leading-relaxed">
            <div className="flex items-center gap-[var(--space-3)]">
              <Tag className="text-muted">{tSheet("trackLabel")}</Tag>
              <span className="font-mono text-xs uppercase tracking-wider text-fg">
                {active.trackLabel}
              </span>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{active.role}</p>
            <h3 className="font-display text-xl font-medium uppercase leading-tight tracking-tight">
              {active.talkTitle}
            </h3>
            <section
              aria-labelledby={`abstract-${active.id}`}
              className="flex flex-col gap-[var(--space-2)]"
            >
              <h4
                id={`abstract-${active.id}`}
                className="font-mono text-xs uppercase tracking-wider text-muted"
              >
                {tSheet("abstractHeading")}
              </h4>
              <p className="text-base leading-relaxed text-fg/85">{active.talkAbstract}</p>
            </section>
            {active.social && Object.keys(active.social).length > 0 && (
              <section
                aria-labelledby={`social-${active.id}`}
                className="flex flex-col gap-[var(--space-2)]"
              >
                <h4
                  id={`social-${active.id}`}
                  className="font-mono text-xs uppercase tracking-wider text-muted"
                >
                  {tSheet("socialHeading")}
                </h4>
                <ul className="flex flex-wrap gap-[var(--space-3)] font-mono text-xs uppercase tracking-wider">
                  {active.social.twitter && (
                    <li>
                      <a
                        href={`https://x.com/${active.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        x.com/{active.social.twitter}
                      </a>
                    </li>
                  )}
                  {active.social.linkedin && (
                    <li>
                      <a
                        href={`https://linkedin.com/in/${active.social.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        linkedin/{active.social.linkedin}
                      </a>
                    </li>
                  )}
                  {active.social.github && (
                    <li>
                      <a
                        href={`https://github.com/${active.social.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fg hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        github/{active.social.github}
                      </a>
                    </li>
                  )}
                </ul>
              </section>
            )}
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="mt-[var(--space-4)] self-start border border-fg px-4 py-2 font-display text-sm font-medium uppercase tracking-wide text-fg transition-colors hover:bg-fg hover:text-bg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {tSheet("close")}
            </button>
          </div>
        )}
      </Sheet>
    </>
  );
}
