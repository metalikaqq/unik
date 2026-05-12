"use client";

import type { HTMLAttributes, ReactNode } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type MarqueeTextProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode;
  /**
   * Number of inline copies of `children` rendered into the track.
   * Three (default) covers viewports up to ~3× the rendered content width
   * with a seamless `translateX(-50%)` loop and one trailing buffer copy.
   */
  copies?: number;
};

export function MarqueeText({ children, className, copies = 3, ...rest }: MarqueeTextProps) {
  const reduced = useReducedMotion();
  const segments = Array.from({ length: copies });

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)} {...rest}>
      <div
        data-marquee-track
        className={cn("inline-flex w-max gap-[var(--space-12)]", !reduced && "animate-marquee")}
      >
        {segments.map((_, i) => (
          <span key={i} aria-hidden={i === 0 ? undefined : true}>
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}
