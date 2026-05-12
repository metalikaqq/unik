"use client";

import { motion } from "framer-motion";
import type { CSSProperties } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type RuleOrientation = "horizontal" | "vertical";

export type RuleProps = {
  orientation?: RuleOrientation;
  drawIn?: boolean;
  durationMs?: number;
  className?: string;
};

export function Rule({
  orientation = "horizontal",
  drawIn = false,
  durationMs = 500,
  className,
}: RuleProps) {
  const reduced = useReducedMotion();
  const isHorizontal = orientation === "horizontal";

  const baseClass = cn("block bg-fg", isHorizontal ? "h-px w-full" : "w-px h-full", className);

  if (!drawIn || reduced) {
    return <div role="separator" aria-orientation={orientation} className={baseClass} />;
  }

  const initial = isHorizontal ? { scaleX: 0 } : { scaleY: 0 };
  const animate = isHorizontal ? { scaleX: 1 } : { scaleY: 1 };
  const style: CSSProperties = {
    transformOrigin: isHorizontal ? "left center" : "center top",
  };

  return (
    <motion.div
      role="separator"
      aria-orientation={orientation}
      className={baseClass}
      initial={initial}
      animate={animate}
      transition={{ duration: durationMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    />
  );
}
