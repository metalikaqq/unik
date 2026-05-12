"use client";

import { motion } from "framer-motion";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  blurb: string;
  accent: string;
}

export function PageIntro({ eyebrow, title, subtitle, blurb, accent }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48">
      <div
        className="halo absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2"
        style={{
          background: `radial-gradient(closest-side, ${accent}33, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-wider text-muted"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-text mt-4 font-display text-4xl leading-tight tracking-tight md:text-display"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-xl text-fg/85"
        >
          {subtitle}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl text-base leading-relaxed text-muted"
        >
          {blurb}
        </motion.p>
      </div>
    </section>
  );
}
