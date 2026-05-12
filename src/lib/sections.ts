export interface AtlasSection {
  slug: "planets" | "galaxies" | "black-holes" | "nebulae";
  title: string;
  subtitle: string;
  hue: string;
  accent: string;
  blurb: string;
}

export const SECTIONS: readonly AtlasSection[] = [
  {
    slug: "planets",
    title: "Planets",
    subtitle: "Eight worlds. One sun.",
    hue: "from-amber-400/30 via-rose-500/20 to-transparent",
    accent: "#ffb86b",
    blurb:
      "Rocky cores, frozen oceans, storms wider than Earth — the eight planets of the Solar System, and the dwarfs that still wander beyond.",
  },
  {
    slug: "galaxies",
    title: "Galaxies",
    subtitle: "Two trillion islands of light.",
    hue: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
    accent: "#8b5cff",
    blurb:
      "Spirals, ellipticals, irregulars. Each one a billion-star city drifting through 13.8 billion years of cosmic history.",
  },
  {
    slug: "black-holes",
    title: "Black Holes",
    subtitle: "Where light cannot escape.",
    hue: "from-fuchsia-500/30 via-violet-700/20 to-transparent",
    accent: "#ff5edb",
    blurb:
      "Singularities cloaked in event horizons. Stellar-mass remnants and the supermassive giants that anchor every galaxy.",
  },
  {
    slug: "nebulae",
    title: "Nebulae",
    subtitle: "Nurseries of stars.",
    hue: "from-cyan-400/30 via-teal-500/20 to-transparent",
    accent: "#5eead4",
    blurb:
      "Hydrogen clouds light-years wide — collapsing under their own gravity to forge the next generation of suns.",
  },
] as const;
