"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { Locale } from "@/i18n/config";
import { MESSAGES } from "@/i18n/messages";

interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 pt-36 pb-20 sm:px-8 sm:pt-32 lg:px-10"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-xs"
        >
          {MESSAGES.brandLine[locale]}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-text mt-5 font-display text-display leading-[0.95] tracking-tight sm:mt-6"
        >
          {MESSAGES.heroTitle[locale]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-fg/85 sm:mt-8 sm:text-lg md:text-xl"
        >
          {MESSAGES.heroBody[locale]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-wider text-muted sm:mt-12 sm:gap-6 sm:text-xs"
        >
          <span aria-hidden="true" className="h-px w-8 bg-white/20 sm:w-12" />
          <span>{MESSAGES.scrollHint[locale]}</span>
          <span aria-hidden="true" className="h-px w-8 bg-white/20 sm:w-12" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: subY }}
        className="absolute inset-x-0 bottom-8 flex justify-center sm:bottom-12"
        aria-hidden="true"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5 sm:h-12 sm:w-7">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: 12 }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-fg"
          />
        </div>
      </motion.div>
    </section>
  );
}
