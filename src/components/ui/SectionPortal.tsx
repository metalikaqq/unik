"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { AtlasSection } from "@/lib/sections";
import type { Locale } from "@/i18n/config";
import { MESSAGES } from "@/i18n/messages";

interface SectionPortalProps {
  section: AtlasSection;
  index: number;
  locale: Locale;
}

export function SectionPortal({ section, index, locale }: SectionPortalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/${locale}/${section.slug}`}
        className="group relative block h-full overflow-hidden rounded-3xl glass-strong p-6 transition-transform duration-500 hover:-translate-y-1 sm:p-8"
      >
        <div
          className={`absolute -top-24 -right-16 h-56 w-56 rounded-full bg-gradient-to-br ${section.hue} blur-3xl transition-opacity duration-700 group-hover:opacity-90 sm:-top-32 sm:-right-24 sm:h-72 sm:w-72`}
          aria-hidden="true"
        />
        <div className="relative">
          <p
            className="font-mono text-[10px] uppercase tracking-wider sm:text-xs"
            style={{ color: section.accent }}
          >
            {String(index + 1).padStart(2, "0")} / 04 — {MESSAGES.atlasSuffix[locale]}
          </p>
          <h3 className="mt-3 font-display text-2xl tracking-tight text-fg sm:text-3xl md:text-4xl">
            {section.title[locale]}
          </h3>
          <p className="mt-2 text-sm text-fg/80 sm:text-base">
            {section.subtitle[locale]}
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:mt-6">
            {section.blurb[locale]}
          </p>
          <div className="mt-8 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg sm:mt-10 sm:text-sm">
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              {MESSAGES.enter[locale]}
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
