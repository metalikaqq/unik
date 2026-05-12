import { getTranslations } from "next-intl/server";

export async function StickyCta({ minPriceUsd }: { minPriceUsd: number }) {
  const t = await getTranslations("tickets.sticky");
  return (
    <div className="sticky bottom-0 z-[var(--z-sticky)] border-t border-fg bg-bg p-[var(--space-3)] md:hidden">
      <a
        href="#pricing"
        className="flex w-full items-center justify-between gap-[var(--space-2)] bg-fg px-4 py-3 font-display text-sm font-medium uppercase tracking-wide text-bg transition-colors hover:bg-accent focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <span>{t("label", { price: minPriceUsd })}</span>
        <span aria-hidden="true">{t("cta")} →</span>
      </a>
    </div>
  );
}
