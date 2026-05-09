"use client";

import { type RefObject, useEffect, useState } from "react";

const THRESHOLD_STEPS = 100;
const THRESHOLDS: number[] = Array.from(
  { length: THRESHOLD_STEPS + 1 },
  (_, i) => i / THRESHOLD_STEPS,
);

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return value;
}

function progressFromEntry(entry: IntersectionObserverEntry): number {
  const rootBounds = entry.rootBounds;
  const rect = entry.boundingClientRect;
  if (!rootBounds) return clamp01(entry.intersectionRatio);

  const denom = rootBounds.height + rect.height;
  if (denom <= 0) return 0;

  return clamp01((rootBounds.height - rect.top) / denom);
}

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        if (!entry) return;
        setProgress(progressFromEntry(entry));
      },
      { threshold: THRESHOLDS },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [ref]);

  return progress;
}
