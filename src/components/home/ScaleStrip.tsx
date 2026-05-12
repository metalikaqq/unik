"use client";

import { motion } from "framer-motion";

import type { Locale } from "@/i18n/config";
import { MESSAGES } from "@/i18n/messages";

interface ScaleStripProps {
  locale: Locale;
}

export function ScaleStrip({ locale }: ScaleStripProps) {
  const items = [
    MESSAGES.scaleObsUniverse,
    MESSAGES.scaleGalaxies,
    MESSAGES.scaleStarsMW,
    MESSAGES.scaleAge,
    MESSAGES.scaleSpeedLight,
    MESSAGES.scaleAtoms,
    MESSAGES.scaleStarsPerGrain,
  ];

  return (
    <section className="relative border-y border-white/5 bg-bg/40 py-14 backdrop-blur-sm sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-xs"
        >
          {MESSAGES.scaleEyebrow[locale]}
        </motion.p>
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="bg-bg-elevated/80 p-4 backdrop-blur-md sm:p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {item.label[locale]}
              </p>
              <p className="mt-2 font-display text-lg tracking-tight text-fg sm:text-xl md:text-2xl">
                {item.value[locale]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
