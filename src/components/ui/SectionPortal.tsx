"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { AtlasSection } from "@/lib/sections";

interface SectionPortalProps {
  section: AtlasSection;
  index: number;
}

export function SectionPortal({ section, index }: SectionPortalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/${section.slug}`}
        className="group relative block h-full overflow-hidden rounded-3xl glass-strong p-8 transition-transform duration-500 hover:-translate-y-1"
      >
        <div
          className={`absolute -top-32 -right-24 h-72 w-72 rounded-full bg-gradient-to-br ${section.hue} blur-3xl transition-opacity duration-700 group-hover:opacity-90`}
          aria-hidden="true"
        />
        <div className="relative">
          <p
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: section.accent }}
          >
            {String(index + 1).padStart(2, "0")} / 04 — Atlas
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-tight text-fg md:text-4xl">
            {section.title}
          </h3>
          <p className="mt-2 text-fg/80">{section.subtitle}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted">{section.blurb}</p>
          <div className="mt-10 flex items-center gap-3 text-sm font-mono uppercase tracking-wider text-fg">
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              Enter
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:from-white/60"
            />
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-2"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
