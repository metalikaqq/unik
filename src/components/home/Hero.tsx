import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-6xl flex-col gap-[var(--space-8)] px-6 pb-[var(--space-section)] pt-[var(--space-16)]"
    >
      <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("eyebrow")}</p>
      <h1
        id="hero-heading"
        className="font-display text-display font-medium uppercase leading-tight tracking-tight break-words"
      >
        {t("title")}
      </h1>
      <p className="max-w-3xl text-md leading-relaxed text-fg/85 md:text-lg">{t("tagline")}</p>
      <div className="flex flex-col items-start gap-[var(--space-3)] pt-[var(--space-2)]">
        <a
          href="#cfp"
          className="inline-flex items-center justify-center bg-fg px-6 py-3 font-display text-lg font-medium uppercase tracking-wide text-bg transition-colors hover:bg-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {t("ctaLabel")}
        </a>
        <p className="font-mono text-xs uppercase tracking-wider text-muted">{t("ctaHint")}</p>
      </div>
    </section>
  );
}
