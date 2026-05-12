"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Sheet } from "@/components/ui/Sheet";

type PhotoView = {
  id: string;
  caption: string;
  width: number;
  height: number;
  hue: number;
};

export type GalleryProps = {
  photos: ReadonlyArray<PhotoView>;
};

/**
 * Inline SVG block in lieu of real photography for the diploma demo —
 * gives us explicit width/height (no CLS) without external image hosts.
 */
function buildPlaceholder(width: number, height: number, hue: number): string {
  const bg = `hsl(${hue} 25% 88%)`;
  const stripe = `hsl(${hue} 45% 70%)`;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}' preserveAspectRatio='none'><rect width='${width}' height='${height}' fill='${bg}'/><path d='M0 ${
    height * 0.65
  } L${width * 0.4} ${height * 0.45} L${width * 0.7} ${height * 0.55} L${width} ${
    height * 0.4
  } L${width} ${height} L0 ${height} Z' fill='${stripe}'/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function Gallery({ photos }: GalleryProps) {
  const t = useTranslations("venue.gallery");
  const tSheet = useTranslations("venue.sheet");

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = activeId ? photos.find((p) => p.id === activeId) ?? null : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-px bg-fg/15 md:grid-cols-3">
        {photos.map((photo, index) => (
          <li key={photo.id} className="bg-bg">
            <button
              type="button"
              onClick={() => setActiveId(photo.id)}
              aria-label={t("openLabel", { caption: photo.caption })}
              className="group block w-full text-left focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
            >
              <img
                src={buildPlaceholder(photo.width, photo.height, photo.hue)}
                alt={photo.caption}
                width={photo.width}
                height={photo.height}
                loading={index < 2 ? "eager" : "lazy"}
                className="block aspect-[3/2] w-full object-cover grayscale transition-[filter] group-hover:grayscale-0"
              />
              <figcaption className="px-[var(--space-3)] py-[var(--space-2)] font-mono text-xs uppercase tracking-wider text-muted">
                {photo.caption}
              </figcaption>
            </button>
          </li>
        ))}
      </ul>

      <Sheet
        open={active !== null}
        onClose={() => setActiveId(null)}
        title={active?.caption ?? ""}
      >
        {active && (
          <div className="flex flex-col gap-[var(--space-4)]">
            <img
              src={buildPlaceholder(active.width, active.height, active.hue)}
              alt={active.caption}
              width={active.width}
              height={active.height}
              className="block w-full"
            />
            <p className="text-base leading-relaxed text-fg/85">{active.caption}</p>
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="self-start border border-fg px-4 py-2 font-display text-sm font-medium uppercase tracking-wide text-fg transition-colors hover:bg-fg hover:text-bg focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {tSheet("close")}
            </button>
          </div>
        )}
      </Sheet>
    </>
  );
}
