"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
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
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 sm:px-10"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto max-w-6xl text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-xs uppercase tracking-wider text-muted"
        >
          An atlas of the observable universe
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="aurora-text mt-6 font-display text-display leading-tight tracking-tight"
        >
          Cosmos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-fg/85 md:text-xl"
        >
          Two trillion galaxies. A hundred billion stars in each. Forty-six billion light-years in
          every direction. We catalogued a few of the stranger places.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center gap-6 font-mono text-xs uppercase tracking-wider text-muted"
        >
          <span aria-hidden="true" className="h-px w-12 bg-white/20" />
          <span>Scroll to navigate</span>
          <span aria-hidden="true" className="h-px w-12 bg-white/20" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: subY }}
        className="absolute inset-x-0 bottom-12 flex justify-center"
        aria-hidden="true"
      >
        <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.span
            initial={{ y: 0 }}
            animate={{ y: 14 }}
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
