import { getTranslations } from "next-intl/server";

import { sponsors } from "@/content/sponsors";

export async function SponsorStrip() {
  const t = await getTranslations("home.sponsorStrip");

  return (
    <section
      aria-labelledby="sponsor-strip-heading"
      className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 py-[var(--space-section)]"
    >
      <header className="flex flex-col gap-[var(--space-3)]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("eyebrow")}</p>
        <h2
          id="sponsor-strip-heading"
          className="font-display text-3xl font-medium uppercase leading-tight tracking-tight md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-fg/85">{t("intro")}</p>
      </header>

      <ul className="grid grid-cols-2 gap-px bg-fg/15 sm:grid-cols-4">
        {sponsors.map((sponsor) => (
          <li key={sponsor.id} className="bg-bg">
            <a
              href={sponsor.url ?? "#"}
              target={sponsor.url ? "_blank" : undefined}
              rel={sponsor.url ? "noopener noreferrer" : undefined}
              className="group flex h-24 items-center justify-center px-4 text-center font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              aria-label={sponsor.name}
            >
              <span aria-hidden="true">{sponsor.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
