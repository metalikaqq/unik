import type { Locale } from "./config";

export const MESSAGES = {
  brandLine: {
    en: "An atlas of the observable universe",
    uk: "Атлас спостережного Всесвіту",
  },
  heroTitle: {
    en: "Cosmos",
    uk: "Космос",
  },
  heroBody: {
    en: "Two trillion galaxies. A hundred billion stars in each. Forty-six billion light-years in every direction. We catalogued a few of the stranger places.",
    uk: "Два трильйони галактик. Сотня мільярдів зір у кожній. Сорок шість мільярдів світлових років у кожному напрямку. Ми занесли до каталогу кілька з найдивніших місць.",
  },
  scrollHint: {
    en: "Scroll to navigate",
    uk: "Прокручуйте, щоб подорожувати",
  },
  scaleEyebrow: {
    en: "The scale of things",
    uk: "Масштаб речей",
  },
  scaleObsUniverse: {
    label: { en: "Observable universe", uk: "Спостережний Всесвіт" },
    value: { en: "93 billion ly across", uk: "93 млрд св. років" },
  },
  scaleGalaxies: {
    label: { en: "Galaxies", uk: "Галактик" },
    value: { en: "2 trillion", uk: "2 трильйони" },
  },
  scaleStarsMW: {
    label: { en: "Stars in the Milky Way", uk: "Зір у Чумацькому шляху" },
    value: { en: "100–400 billion", uk: "100–400 мільярдів" },
  },
  scaleAge: {
    label: { en: "Age of the universe", uk: "Вік Всесвіту" },
    value: { en: "13.787 billion years", uk: "13,787 млрд років" },
  },
  scaleSpeedLight: {
    label: { en: "Speed of light", uk: "Швидкість світла" },
    value: { en: "299,792,458 m/s", uk: "299 792 458 м/с" },
  },
  scaleAtoms: {
    label: { en: "Atoms in your body", uk: "Атомів у вашому тілі" },
    value: { en: "~7 × 10²⁷", uk: "~7 × 10²⁷" },
  },
  scaleStarsPerGrain: {
    label: {
      en: "Stars per grain of beach sand",
      uk: "Зір на піщинку морського піску",
    },
    value: { en: "≈ 10,000", uk: "≈ 10 000" },
  },
  beginEyebrow: {
    en: "Atlas / Four chapters",
    uk: "Атлас / Чотири розділи",
  },
  beginTitle: {
    en: "Begin anywhere.",
    uk: "Починайте звідки завгодно.",
  },
  beginBody: {
    en: "Each chapter is its own gravity well. Drift in, drift out, return to the dark between.",
    uk: "Кожен розділ — окрема гравітаційна яма. Зайдіть, вийдіть, поверніться в темряву поміж ними.",
  },
  enter: {
    en: "Enter",
    uk: "Увійти",
  },
  footerQuote: {
    en: "We are made of starstuff.",
    uk: "Ми зроблені з зоряної речовини.",
  },
  footerAttribution: {
    en: "— Carl Sagan. Imagery from NASA, ESA, Hubble, JWST, and ESO. Public-domain contributions to humanity.",
    uk: "— Карл Саґан. Зображення NASA, ESA, Hubble, JWST та ESO. Суспільне надбання людства.",
  },
  footerTagline: {
    en: "An exploration of the observable universe.",
    uk: "Дослідження спостережного Всесвіту.",
  },
  chapterPrefix: {
    en: "Chapter",
    uk: "Розділ",
  },
  atlasSuffix: {
    en: "Atlas",
    uk: "Атлас",
  },
  switchLanguage: {
    en: "Switch language",
    uk: "Змінити мову",
  },
} as const;

export function m<K extends keyof typeof MESSAGES>(key: K, locale: Locale): string {
  const entry = MESSAGES[key];
  if ("en" in entry && "uk" in entry && typeof entry.en === "string") {
    return entry[locale];
  }
  // Shouldn't be reached — type-only guard for non-leaf entries
  return "";
}
