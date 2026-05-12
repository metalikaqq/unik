import { getTranslations } from "next-intl/server";

import { Tag } from "@/components/ui/Tag";
import { speakers } from "@/content/speakers";
import { pickLocale } from "@/content/types";
import { Link } from "@/i18n/navigation";

export async function SpeakerPreview({ locale }: { locale: string }) {
  const t = await getTranslations("home.speakerPreview");
  const tCommon = await getTranslations("common.tracks");

  return (
    <section
      aria-labelledby="speaker-preview-heading"
      className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]"
    >
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("eyebrow")}</p>
        <h2
          id="speaker-preview-heading"
          className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{t("intro")}</p>
      </header>

      <ul
        className="-mx-6 flex snap-x snap-mandatory gap-[var(--space-6)] overflow-x-auto px-6 pb-[var(--space-4)] [scrollbar-width:thin]"
        aria-label={t("title")}
      >
        {speakers.map((speaker) => (
          <li
            key={speaker.id}
            className="snap-start shrink-0 basis-[min(85%,22rem)]"
          >
            <Link
              href="/speakers"
              className="group flex h-full flex-col gap-[var(--space-3)] border border-fg/15 bg-bg p-[var(--space-4)] transition-colors hover:border-fg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div
                aria-hidden="true"
                className="aspect-[4/5] w-full bg-fg/8 grayscale transition-[filter] group-hover:grayscale-0"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, color-mix(in oklab, var(--color-fg) 12%, transparent), color-mix(in oklab, var(--color-accent) 18%, transparent))",
                }}
              />
              <div className="flex items-center justify-between gap-[var(--space-2)]">
                <Tag className="text-muted">{tCommon(speaker.track)}</Tag>
              </div>
              <h3 className="font-display text-lg font-medium uppercase tracking-tight">
                {pickLocale(speaker.name, locale)}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {pickLocale(speaker.role, locale)}
              </p>
              <p className="text-sm leading-snug text-fg/85 line-clamp-2">
                {pickLocale(speaker.talkTitle, locale)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <Link
          href="/speakers"
          className="inline-flex items-center font-mono text-xs uppercase tracking-wider text-fg hover:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {t("allCta")}
        </Link>
      </div>
    </section>
  );
}
