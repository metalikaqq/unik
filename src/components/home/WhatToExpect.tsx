import { getTranslations } from "next-intl/server";

import { Rule } from "@/components/ui/Rule";
import { Tag } from "@/components/ui/Tag";

const COLUMN_KEYS = ["tracks", "format", "community"] as const;

export async function WhatToExpect() {
  const t = await getTranslations("home.whatToExpect");

  return (
    <section
      aria-labelledby="what-to-expect-heading"
      className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]"
    >
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("eyebrow")}</p>
        <h2
          id="what-to-expect-heading"
          className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
        >
          {t("title")}
        </h2>
      </header>

      <ul className="grid grid-cols-1 gap-px bg-fg/15 md:grid-cols-3">
        {COLUMN_KEYS.map((key, index) => (
          <li key={key} className="bg-bg">
            <article className="flex h-full flex-col gap-[var(--space-3)] p-[var(--space-6)]">
              <div className="flex items-center gap-[var(--space-3)]">
                <Tag className="text-accent">{t(`columns.${key}.tag`)}</Tag>
                <span aria-hidden="true" className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
              </div>
              <Rule />
              <h3 className="font-display text-xl font-medium uppercase tracking-tight">
                {t(`columns.${key}.title`)}
              </h3>
              <p className="text-base leading-relaxed text-fg/85">{t(`columns.${key}.body`)}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
