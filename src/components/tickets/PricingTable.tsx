"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Sheet } from "@/components/ui/Sheet";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

type TierView = {
  id: string;
  name: string;
  tagline: string;
  priceUsd: number;
  features: ReadonlyArray<string>;
  recommended: boolean;
};

export type PricingTableProps = {
  tiers: ReadonlyArray<TierView>;
};

export function PricingTable({ tiers }: PricingTableProps) {
  const t = useTranslations("tickets.pricing");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <ul
        id="pricing"
        className="grid grid-cols-1 gap-px bg-fg/15 md:grid-cols-3"
        aria-label={t("buy")}
      >
        {tiers.map((tier) => (
          <li
            key={tier.id}
            className={cn(
              "flex flex-col gap-[var(--space-4)] bg-bg p-[var(--space-6)]",
              tier.recommended && "outline outline-2 outline-accent -outline-offset-2"
            )}
          >
            <header className="flex items-center justify-between gap-[var(--space-2)]">
              <h3 className="font-display text-2xl font-medium uppercase tracking-tight">
                {tier.name}
              </h3>
              {tier.recommended && <Tag className="text-accent">{t("recommended")}</Tag>}
            </header>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">{tier.tagline}</p>
            <p className="flex items-baseline gap-[var(--space-2)]">
              <span className="font-display text-4xl font-medium tracking-tight">
                ${tier.priceUsd}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted">
                {t("perTicket")}
              </span>
            </p>
            <ul className="flex flex-col gap-[var(--space-2)] text-base leading-relaxed text-fg/85">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex gap-[var(--space-2)]">
                  <span aria-hidden="true" className="text-accent">
                    ✦
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-[var(--space-4)]">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className={cn(
                  "inline-flex w-full items-center justify-center px-4 py-3 font-display text-sm font-medium uppercase tracking-wide transition-colors",
                  "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
                  tier.recommended
                    ? "bg-accent text-bg hover:bg-fg"
                    : "border border-fg text-fg hover:bg-fg hover:text-bg"
                )}
              >
                {t("buy")}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Sheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title={t("soon.title")}
      >
        <div className="flex flex-col gap-[var(--space-4)]">
          <p className="text-base leading-relaxed text-fg/85">{t("soon.body")}</p>
          <button
            type="button"
            onClick={() => setSheetOpen(false)}
            className="self-start border border-fg px-4 py-2 font-display text-sm font-medium uppercase tracking-wide text-fg transition-colors hover:bg-fg hover:text-bg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            {t("soon.close")}
          </button>
        </div>
      </Sheet>
    </>
  );
}
