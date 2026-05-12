"use client";

import { motion } from "framer-motion";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  blurb: string;
  accent: string;
}

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  blurb,
  accent,
}: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      <div
        className="halo absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 sm:h-[36rem] sm:w-[36rem] lg:h-[40rem] lg:w-[40rem]"
        style={{
          background: `radial-gradient(closest-side, ${accent}33, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] uppercase tracking-wider text-muted sm:text-xs"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-text mt-3 font-display text-4xl leading-tight tracking-tight sm:mt-4 sm:text-5xl md:text-display"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-2xl text-lg text-fg/85 sm:mt-6 sm:text-xl"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-4 sm:text-base"
        >
          {blurb}
        </motion.p>
      </div>
    </section>
  );
}
