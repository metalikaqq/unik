"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { cn } from "@/lib/cn";
import { FILTER_VALUES, type FilterValue } from "@/lib/track-filter";

type TrackLabelMap = Record<FilterValue, string>;

export type TrackFilterProps = {
  active: FilterValue;
  labels: TrackLabelMap;
  ariaLabel: string;
};

export function TrackFilter({ active, labels, ariaLabel }: TrackFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const onSelect = (value: FilterValue) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "all") next.delete("track");
    else next.set("track", value);
    const query = next.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    startTransition(() => {
      router.replace(url, { scroll: false });
    });
  };

  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap items-center gap-[var(--space-2)]">
      {FILTER_VALUES.map((value) => {
        const isActive = value === active;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            aria-pressed={isActive}
            disabled={isPending && isActive}
            className={cn(
              "border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
              "focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive
                ? "border-accent bg-accent text-bg"
                : "border-fg/20 bg-bg text-muted hover:border-fg hover:text-fg"
            )}
          >
            {labels[value]}
          </button>
        );
      })}
    </nav>
  );
}
