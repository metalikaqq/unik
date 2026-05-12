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
        className={`grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 ${
          reverse ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm md:max-w-md lg:max-w-none">
          <div
            className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-3xl sm:-inset-10 lg:-inset-12"
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
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 75vw, 100vw"
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

        <div className="min-w-0">
          <p
            className="font-mono text-[11px] uppercase tracking-wider sm:text-xs"
            style={{ color: accent }}
          >
            {String(index + 1).padStart(2, "0")} · {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-fg sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="mt-3 text-base text-fg/85 sm:text-lg">{tagline}</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
            {body}
          </p>

          {stats && stats.length > 0 ? (
            <dl
              className={`mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/5 sm:mt-8 ${
                stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-2"
              }`}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bg-elevated/80 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-display text-xs text-fg sm:text-sm">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
