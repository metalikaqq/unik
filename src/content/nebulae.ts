import type { I18nString } from "@/i18n/config";

export interface Nebula {
  id: string;
  name: I18nString;
  type: I18nString;
  image: string;
  imageAlt: I18nString;
  distance: I18nString;
  size: I18nString;
  fact: I18nString;
  body: I18nString;
  accent: string;
}

export const NEBULAE: readonly Nebula[] = [
  {
    id: "pillars",
    name: { en: "Pillars of Creation", uk: "Стовпи Творення" },
    type: { en: "Emission · star nursery", uk: "Емісійна · колиска зір" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Pillars_of_Creation_%28NIRCam_Image%29.jpg/1280px-Pillars_of_Creation_%28NIRCam_Image%29.jpg",
    imageAlt: {
      en: "The Pillars of Creation inside the Eagle Nebula, JWST NIRCam",
      uk: "Стовпи Творення в туманності Орла, знімок JWST (NIRCam)",
    },
    distance: { en: "6,500 ly", uk: "6 500 св. років" },
    size: { en: "4–5 ly tall", uk: "4–5 св. років заввишки" },
    fact: {
      en: "Towers of gas where new stars are being born right now.",
      uk: "Газові вежі, де просто зараз народжуються нові зорі.",
    },
    body: {
      en: "Inside the Eagle Nebula (M16), three colossal columns of cool hydrogen and dust resist being eroded by intense ultraviolet light from nearby young stars. Globules at the pillars' tips are protostars — solar systems mid-assembly. Light from the pillars took 6,500 years to reach us; we're seeing them as they were when the first cities were built on Earth.",
      uk: "Усередині туманності Орла (M16) три колосальні стовпи холодного водню та пилу опираються ерозії від потужного ультрафіолету молодих сусідніх зір. На верхівках — глобули, протозорі, тобто сонячні системи в процесі складання. Світло від цих стовпів летіло до нас 6 500 років — ми бачимо їх такими, якими вони були, коли на Землі будували перші міста.",
    },
    accent: "#5eead4",
  },
  {
    id: "orion",
    name: { en: "The Orion Nebula", uk: "Туманність Оріона" },
    type: { en: "Emission · diffuse", uk: "Емісійна · дифузна" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/1280px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    imageAlt: {
      en: "The Orion Nebula photographed by Hubble",
      uk: "Туманність Оріона на знімку «Габбла»",
    },
    distance: { en: "1,344 ly", uk: "1 344 св. роки" },
    size: { en: "24 ly across", uk: "24 св. роки в поперечнику" },
    fact: {
      en: "Visible to the naked eye — the closest stellar nursery to Earth.",
      uk: "Видима неозброєним оком — найближча до Землі колиска зір.",
    },
    body: {
      en: "Hanging from Orion's belt is a smudge of light most of humanity has seen without realizing what they were looking at. The Orion Nebula contains some 2,000 young stars and is one of the most studied objects in the sky. The Trapezium cluster at its heart is illuminating the surrounding gas, making it glow.",
      uk: "На поясі Оріона висить світла пляма, яку більшість людства бачила, не усвідомлюючи, на що дивиться. У туманності Оріона приблизно 2 000 молодих зір — це один із найбільш досліджених об’єктів неба. Скупчення Трапеція в її серці підсвічує навколишній газ, змушуючи його сяяти.",
    },
    accent: "#ff7a5a",
  },
  {
    id: "crab",
    name: { en: "The Crab Nebula", uk: "Крабоподібна туманність" },
    type: { en: "Supernova remnant", uk: "Залишок наднової" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/1280px-Crab_Nebula.jpg",
    imageAlt: {
      en: "The Crab Nebula composite image from Hubble",
      uk: "Композитний знімок Крабоподібної туманності від «Габбла»",
    },
    distance: { en: "6,500 ly", uk: "6 500 св. років" },
    size: { en: "11 ly across", uk: "11 св. років у поперечнику" },
    fact: {
      en: "The shrapnel of a star that exploded in 1054 CE.",
      uk: "Уламки зорі, що вибухнула 1054 року нашої ери.",
    },
    body: {
      en: "Chinese astronomers recorded a 'guest star' bright enough to see in daylight for 23 days in July 1054. We now know they were watching a supernova. Today, the expanding wreckage forms the Crab Nebula, with a pulsar at its center — a 20-km neutron star spinning 30 times a second, a stellar corpse the size of a city.",
      uk: "У липні 1054 року китайські астрономи зафіксували «гостьову зорю», яка 23 дні була настільки яскравою, що її було видно вдень. Тепер ми знаємо: вони спостерігали наднову. Сьогодні уламки утворюють Крабоподібну туманність, а в її центрі обертається пульсар — 20-кілометрова нейтронна зоря, що робить 30 обертів на секунду. Зоряний труп завбільшки з місто.",
    },
    accent: "#ff5edb",
  },
  {
    id: "helix",
    name: { en: "The Helix Nebula", uk: "Туманність Спіраль" },
    type: { en: "Planetary", uk: "Планетарна" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/NGC7293_%282004%29.jpg/1280px-NGC7293_%282004%29.jpg",
    imageAlt: {
      en: "The Helix Nebula — the 'Eye of God' — from Hubble and Mosaic II",
      uk: "Туманність Спіраль — «Око Бога» — знімок «Габбла» та Mosaic II",
    },
    distance: { en: "655 ly", uk: "655 св. років" },
    size: { en: "2.87 ly across", uk: "2,87 св. року в поперечнику" },
    fact: {
      en: "Nicknamed the Eye of God.",
      uk: "Народна назва — «Око Бога».",
    },
    body: {
      en: "The Helix is what a Sun-like star looks like in its final act. Having shed its outer layers, the dying star's core — now a white dwarf — illuminates the expelled gas into a glowing shell. Our own Sun will do this in about 5 billion years.",
      uk: "Спіраль — це те, як виглядає зоря, схожа на Сонце, у фінальній дії. Скинувши зовнішні шари, ядро вмираючої зорі — нині білий карлик — підсвічує викинутий газ, перетворюючи його на сяйливу оболонку. Те саме станеться з нашим Сонцем приблизно за 5 мільярдів років.",
    },
    accent: "#6dd5ff",
  },
  {
    id: "carina",
    name: { en: "The Carina Nebula", uk: "Туманність Кіля" },
    type: {
      en: "Emission · star-forming complex",
      uk: "Емісійна · комплекс зореутворення",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/%E2%80%9CCosmic_Cliffs%E2%80%9D_in_the_Carina_Nebula_%28NIRCam_and_MIRI_Composite_Image%29.png/1280px-%E2%80%9CCosmic_Cliffs%E2%80%9D_in_the_Carina_Nebula_%28NIRCam_and_MIRI_Composite_Image%29.png",
    imageAlt: {
      en: "The Cosmic Cliffs in the Carina Nebula, JWST NIRCam + MIRI",
      uk: "Космічні скелі в туманності Кіля, JWST NIRCam + MIRI",
    },
    distance: { en: "7,500 ly", uk: "7 500 св. років" },
    size: { en: "230 ly across", uk: "230 св. років у поперечнику" },
    fact: {
      en: "James Webb's 'Cosmic Cliffs' debut image.",
      uk: "Дебютний знімок Джеймса Вебба — «Космічні скелі».",
    },
    body: {
      en: "The Carina Nebula is one of the largest and brightest in our galaxy, four times bigger than the Orion Nebula. It contains Eta Carinae, a hypergiant 100 times more massive than the Sun and a leading candidate for the next nearby supernova. JWST's image of its 'cosmic cliffs' revealed hundreds of newborn stars hidden by dust in earlier observations.",
      uk: "Туманність Кіля — одна з найбільших та найяскравіших у нашій галактиці, учетверо більша за туманність Оріона. У ній міститься Ета Кіля — гіпергігант, у 100 разів масивніший за Сонце, головний кандидат на наступну близьку наднову. Знімок «космічних скель» від JWST відкрив сотні новонароджених зір, прихованих пилом на попередніх спостереженнях.",
    },
    accent: "#8b5cff",
  },
  {
    id: "ring",
    name: { en: "The Ring Nebula", uk: "Туманність Кільце" },
    type: { en: "Planetary", uk: "Планетарна" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Hubble_image_of_the_Ring_Nebula_%28Messier_57%29.jpg/1280px-Hubble_image_of_the_Ring_Nebula_%28Messier_57%29.jpg",
    imageAlt: {
      en: "The Ring Nebula from Hubble",
      uk: "Туманність Кільце на знімку «Габбла»",
    },
    distance: { en: "2,283 ly", uk: "2 283 св. роки" },
    size: { en: "1.3 ly across", uk: "1,3 св. року в поперечнику" },
    fact: {
      en: "A dying star's perfect smoke ring.",
      uk: "Ідеальне димове кільце вмираючої зорі.",
    },
    body: {
      en: "Once thought to be a hollow doughnut, the Ring Nebula is actually a barrel-shaped cloud we happen to be staring straight down. Its blue-green tint is oxygen, the red is ionized hydrogen. JWST recently mapped its complex inner knots, finding structure no telescope had ever resolved.",
      uk: "Колись вважали, що це порожнистий пончик, а насправді туманність Кільце — хмара у формі діжки, у яку ми дивимося згори по осі. Синьо-зелений відтінок дає кисень, червоний — іонізований водень. JWST нещодавно склав мапу її складних внутрішніх вузлів, виявивши структуру, яку жоден телескоп до того не міг розв’язати.",
    },
    accent: "#5eead4",
  },
] as const;
