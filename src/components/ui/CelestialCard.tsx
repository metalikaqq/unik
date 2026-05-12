"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: string;
}

interface CelestialCardProps {
  index: number;
  eyebrow: string;
  title: string;
  tagline: string;
  body: string;
  image: string;
  imageAlt: string;
  accent: string;
  stats?: Stat[];
  reverse?: boolean;
}

export function CelestialCard({
  index,
  eyebrow,
  title,
  tagline,
  body,
  image,
  imageAlt,
  accent,
  stats,
  reverse,
}: CelestialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div
        className={`grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="relative">
          <div
            className="absolute -inset-12 -z-10 rounded-full opacity-60 blur-3xl"
            style={{
              background: `radial-gradient(closest-side, ${accent}55, transparent 70%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="group relative aspect-square overflow-hidden rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${accent}40, #000 75%)`,
            }}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
              priority={index < 2}
              unoptimized
            />
            <div
              className="absolute inset-0 rounded-full ring-1 ring-inset"
              style={{ boxShadow: `inset 0 0 80px ${accent}50` }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider" style={{ color: accent }}>
            {String(index + 1).padStart(2, "0")} · {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-fg md:text-5xl">{title}</h2>
          <p className="mt-3 text-lg text-fg/85">{tagline}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{body}</p>

          {stats && stats.length > 0 ? (
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-bg-elevated/80 px-4 py-3 backdrop-blur-md">
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-sm text-fg">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
