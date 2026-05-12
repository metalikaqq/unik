"use client";

import { motion } from "framer-motion";

const SCALES = [
  { label: "Observable universe", value: "93 billion ly across" },
  { label: "Galaxies", value: "2 trillion" },
  { label: "Stars in the Milky Way", value: "100–400 billion" },
  { label: "Age of the universe", value: "13.787 billion years" },
  { label: "Speed of light", value: "299,792,458 m/s" },
  { label: "Atoms in your body", value: "~7 × 10²⁷" },
  { label: "Stars per grain of beach sand", value: "≈ 10,000" },
];

export function ScaleStrip() {
  return (
    <section className="relative border-y border-white/5 bg-bg/40 py-20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-wider text-muted"
        >
          The scale of things
        </motion.p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          {SCALES.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-bg-elevated/80 p-6 backdrop-blur-md"
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{s.label}</p>
              <p className="mt-2 font-display text-2xl tracking-tight text-fg">{s.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
