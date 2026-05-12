import { getTranslations } from "next-intl/server";

import { Tag } from "@/components/ui/Tag";

type TransportView = {
  mode: string;
  title: string;
  body: string;
};

export type GettingThereProps = {
  entries: ReadonlyArray<TransportView>;
};

export async function GettingThere({ entries }: GettingThereProps) {
  const t = await getTranslations("venue.gettingThere");

  return (
    <section aria-labelledby="getting-there-heading" className="flex flex-col gap-[var(--space-6)]">
      <h2
        id="getting-there-heading"
        className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
      >
        {t("title")}
      </h2>
      <ul className="grid grid-cols-1 gap-px bg-fg/15 md:grid-cols-3">
        {entries.map((entry, index) => (
          <li key={entry.mode} className="bg-bg">
            <article className="flex h-full flex-col gap-[var(--space-3)] p-[var(--space-6)]">
              <div className="flex items-center gap-[var(--space-3)]">
                <Tag className="text-accent">{entry.mode}</Tag>
                <span aria-hidden="true" className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium uppercase tracking-tight">
                {entry.title}
              </h3>
              <p className="text-base leading-relaxed text-fg/85">{entry.body}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
