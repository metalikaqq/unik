import type { I18nString } from "@/i18n/config";

export interface BlackHole {
  id: string;
  name: I18nString;
  type: I18nString;
  image: string;
  imageAlt: I18nString;
  mass: I18nString;
  distance: I18nString;
  fact: I18nString;
  body: I18nString;
  accent: string;
}

export const BLACK_HOLES: readonly BlackHole[] = [
  {
    id: "m87",
    name: { en: "M87*", uk: "M87*" },
    type: {
      en: "Supermassive · first image",
      uk: "Надмасивна · перший знімок",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg/1280px-Black_hole_-_Messier_87_crop_max_res.jpg",
    imageAlt: {
      en: "First image of a black hole — M87* from the Event Horizon Telescope",
      uk: "Перший знімок чорної діри — M87* від телескопа Горизонту подій",
    },
    mass: { en: "6.5 billion suns", uk: "6,5 млрд Сонць" },
    distance: { en: "53.49 million ly", uk: "53,49 млн св. років" },
    fact: {
      en: "The first black hole ever photographed.",
      uk: "Перша чорна діра, яку коли-небудь сфотографували.",
    },
    body: {
      en: "Released in April 2019 by the Event Horizon Telescope collaboration, the silhouette of M87* required eight observatories synchronized to atomic clocks across four continents, effectively forming a telescope the size of Earth. The bright ring is light bent around the event horizon by the black hole's gravity.",
      uk: "Опублікований у квітні 2019 року колаборацією Телескопа Горизонту подій, силует M87* отримали завдяки восьми обсерваторіям, синхронізованим за атомним годинником на чотирьох континентах — фактично утворився телескоп розміром із Землю. Яскраве кільце — це світло, вигнуте навколо горизонту подій гравітацією діри.",
    },
    accent: "#ffb86b",
  },
  {
    id: "sgr-a",
    name: { en: "Sagittarius A*", uk: "Стрілець A*" },
    type: {
      en: "Supermassive · galactic center",
      uk: "Надмасивна · центр галактики",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/A_view_of_the_Milky_Way_supermassive_black_hole_Sagittarius_A%2A_in_polarised_light_%28eso2406a%29.jpg/1280px-A_view_of_the_Milky_Way_supermassive_black_hole_Sagittarius_A%2A_in_polarised_light_%28eso2406a%29.jpg",
    imageAlt: {
      en: "Event Horizon Telescope image of Sagittarius A* in polarized light",
      uk: "Знімок Стрільця A* у поляризованому світлі від Телескопа Горизонту подій",
    },
    mass: { en: "4.15 million suns", uk: "4,15 млн Сонць" },
    distance: { en: "26,673 ly", uk: "26 673 св. роки" },
    fact: {
      en: "The supermassive black hole at the heart of the Milky Way.",
      uk: "Надмасивна чорна діра у серці Чумацького шляху.",
    },
    body: {
      en: "Sgr A* anchors our galaxy. Stars near it orbit at over 5,000 km/s — fast enough to traverse Earth in a heartbeat. Its existence was confirmed by tracking these stellar orbits for 30 years, work that won the 2020 Nobel Prize in Physics.",
      uk: "Стрілець A* — гравітаційний якір нашої галактики. Зорі поблизу обертаються зі швидкістю понад 5 000 км/с — досить, щоб перетнути Землю за одну мить серцебиття. Існування діри підтвердили, спостерігаючи ці орбіти впродовж 30 років, — за цю роботу присуджено Нобелівську премію з фізики 2020 року.",
    },
    accent: "#ff5edb",
  },
  {
    id: "cygnus-x1",
    name: { en: "Cygnus X-1", uk: "Лебідь X-1" },
    type: {
      en: "Stellar-mass · X-ray binary",
      uk: "Зоряної маси · рентгенівська подвійна",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Black_Hole_Cygnus_X-1_%28Illustration%29_%284187-Image%29.png/1280px-Black_Hole_Cygnus_X-1_%28Illustration%29_%284187-Image%29.png",
    imageAlt: {
      en: "Illustration of the Cygnus X-1 binary system",
      uk: "Ілюстрація подвійної системи Лебідь X-1",
    },
    mass: { en: "21.2 suns", uk: "21,2 Сонця" },
    distance: { en: "7,200 ly", uk: "7 200 св. років" },
    fact: {
      en: "The first object identified as a black hole — and Stephen Hawking lost a bet over it.",
      uk: "Перший об’єкт, ідентифікований як чорна діра, — і Стівен Гокінґ через нього програв парі.",
    },
    body: {
      en: "Discovered in 1964 by X-ray observations, Cygnus X-1 is a stellar-mass black hole stripping gas from a blue supergiant companion. The infalling matter heats to millions of degrees and screams in X-rays. Hawking famously bet Kip Thorne that it wasn't a black hole — and conceded the bet in 1990.",
      uk: "Відкритий 1964 року в рентгенівському діапазоні, Лебідь X-1 — чорна діра зоряної маси, що зриває газ із компаньйонки — блакитного надгіганта. Падаюча речовина розігрівається до мільйонів градусів і «кричить» у рентгенівських променях. Гокінґ закладався з Кіпом Торном, що це не чорна діра, — і визнав програш 1990 року.",
    },
    accent: "#6dd5ff",
  },
  {
    id: "quasar",
    name: { en: "Quasar J0313–1806", uk: "Квазар J0313–1806" },
    type: {
      en: "Ultramassive · ancient quasar",
      uk: "Ультрамасивна · стародавній квазар",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Artist%E2%80%99s_impression_of_quasar_J0313-1806.jpg/1280px-Artist%E2%80%99s_impression_of_quasar_J0313-1806.jpg",
    imageAlt: {
      en: "Artist's impression of the quasar J0313-1806",
      uk: "Художнє уявлення про квазар J0313-1806",
    },
    mass: { en: "1.6 billion suns", uk: "1,6 млрд Сонць" },
    distance: { en: "13.0 billion ly", uk: "13,0 млрд св. років" },
    fact: {
      en: "The most distant quasar known — fully formed when the universe was only 670 million years old.",
      uk: "Найвіддаленіший відомий квазар — повністю сформований, коли Всесвіту було лише 670 мільйонів років.",
    },
    body: {
      en: "Quasars are galaxies whose central black holes are devouring matter so fast that the accretion disk outshines every star in the host galaxy combined. J0313–1806's existence is a puzzle: there shouldn't have been enough time after the Big Bang to grow a black hole this massive. The light from it has travelled for 13 billion years to reach us.",
      uk: "Квазари — це галактики, центральні чорні діри яких поглинають речовину так швидко, що акреційний диск сяє яскравіше за всі зорі галактики разом. Існування J0313–1806 — це загадка: після Великого вибуху не мало вистачити часу, щоб «виростити» таку масивну чорну діру. Світло від нього летіло до нас 13 мільярдів років.",
    },
    accent: "#8b5cff",
  },
] as const;
