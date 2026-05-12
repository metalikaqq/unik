import type { I18nString } from "@/i18n/config";

export interface AtlasSection {
  slug: "planets" | "galaxies" | "black-holes" | "nebulae";
  title: I18nString;
  subtitle: I18nString;
  hue: string;
  accent: string;
  blurb: I18nString;
}

export const SECTIONS: readonly AtlasSection[] = [
  {
    slug: "planets",
    title: { en: "Planets", uk: "Планети" },
    subtitle: {
      en: "Eight worlds. One sun.",
      uk: "Вісім світів. Одне Сонце.",
    },
    hue: "from-amber-400/30 via-rose-500/20 to-transparent",
    accent: "#ffb86b",
    blurb: {
      en: "Rocky cores, frozen oceans, storms wider than Earth — the eight planets of the Solar System, and the dwarfs that still wander beyond.",
      uk: "Кам’яні ядра, замерзлі океани, бурі ширші за Землю — вісім планет Сонячної системи та карликові тіла, що блукають далі.",
    },
  },
  {
    slug: "galaxies",
    title: { en: "Galaxies", uk: "Галактики" },
    subtitle: {
      en: "Two trillion islands of light.",
      uk: "Два трильйони островів світла.",
    },
    hue: "from-violet-500/30 via-fuchsia-500/20 to-transparent",
    accent: "#8b5cff",
    blurb: {
      en: "Spirals, ellipticals, irregulars. Each one a billion-star city drifting through 13.8 billion years of cosmic history.",
      uk: "Спіральні, еліптичні, неправильні. Кожна — місто з мільярдів зір, що пливе крізь 13,8 мільярда років космічної історії.",
    },
  },
  {
    slug: "black-holes",
    title: { en: "Black Holes", uk: "Чорні діри" },
    subtitle: {
      en: "Where light cannot escape.",
      uk: "Туди, звідки не вирветься світло.",
    },
    hue: "from-fuchsia-500/30 via-violet-700/20 to-transparent",
    accent: "#ff5edb",
    blurb: {
      en: "Singularities cloaked in event horizons. Stellar-mass remnants and the supermassive giants that anchor every galaxy.",
      uk: "Сингулярності, оповиті горизонтами подій. Зоряні залишки й надмасивні гіганти, що тримають кожну галактику.",
    },
  },
  {
    slug: "nebulae",
    title: { en: "Nebulae", uk: "Туманності" },
    subtitle: {
      en: "Nurseries of stars.",
      uk: "Колиски зір.",
    },
    hue: "from-cyan-400/30 via-teal-500/20 to-transparent",
    accent: "#5eead4",
    blurb: {
      en: "Hydrogen clouds light-years wide — collapsing under their own gravity to forge the next generation of suns.",
      uk: "Хмари водню завширшки у світлові роки — стискаються під власною гравітацією, щоб виплавити нове покоління сонць.",
    },
  },
] as const;
