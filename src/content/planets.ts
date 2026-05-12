import type { I18nString } from "@/i18n/config";

export interface PlanetStat {
  label: I18nString;
  value: I18nString;
}

export interface Planet {
  id: string;
  name: I18nString;
  classification: I18nString;
  image: string;
  imageAlt: I18nString;
  tagline: I18nString;
  fact: I18nString;
  stats: PlanetStat[];
  accent: string;
}

export const PLANETS: readonly Planet[] = [
  {
    id: "mercury",
    name: { en: "Mercury", uk: "Меркурій" },
    classification: {
      en: "Terrestrial · innermost",
      uk: "Земного типу · найближча до Сонця",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_true_color.jpg",
    imageAlt: {
      en: "Mercury photographed by MESSENGER in true color",
      uk: "Меркурій у справжніх кольорах, знімок місії MESSENGER",
    },
    tagline: {
      en: "A scorched cinder one-third the size of Earth.",
      uk: "Обвуглений вугільчик, утричі менший за Землю.",
    },
    fact: {
      en: "A single Mercurian day — from sunrise to sunrise — lasts 176 Earth days, longer than its 88-day year. The planet rotates three times for every two orbits, locked in a strange 3:2 resonance.",
      uk: "Одна меркуріанська доба — від сходу до сходу Сонця — триває 176 земних діб, довше за 88-добовий рік планети. Меркурій обертається тричі на кожні два оберти навколо Сонця, замкнений у дивному резонансі 3:2.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "4,879 km", uk: "4 879 км" },
      },
      {
        label: { en: "Day length", uk: "Тривалість доби" },
        value: { en: "176 d", uk: "176 діб" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "88 d", uk: "88 діб" },
      },
      {
        label: { en: "Surface temp", uk: "Темп. поверхні" },
        value: { en: "−173 to 427°C", uk: "−173 до 427 °C" },
      },
    ],
    accent: "#c9a880",
  },
  {
    id: "venus",
    name: { en: "Venus", uk: "Венера" },
    classification: {
      en: "Terrestrial · Earth's twin",
      uk: "Земного типу · сестра Землі",
    },
    image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg",
    imageAlt: {
      en: "Venus in ultraviolet light from Mariner 10",
      uk: "Венера в ультрафіолеті, знімок Mariner 10",
    },
    tagline: {
      en: "Hotter than Mercury, with rain made of sulfuric acid.",
      uk: "Гарячіша за Меркурій, з дощами з сірчаної кислоти.",
    },
    fact: {
      en: "Venus rotates backwards — the Sun rises in the west. Its atmosphere is so dense that surface pressure equals being a kilometer underwater on Earth, and a runaway greenhouse effect bakes it at 462°C, hotter than Mercury despite being twice as far from the Sun.",
      uk: "Венера обертається у зворотний бік — Сонце там сходить на заході. Атмосфера настільки густа, що тиск на поверхні дорівнює зануренню на кілометр під воду на Землі, а некерований парниковий ефект розпікає її до 462 °C — гарячіше за Меркурій, попри удвічі більшу відстань від Сонця.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "12,104 km", uk: "12 104 км" },
      },
      {
        label: { en: "Day length", uk: "Тривалість доби" },
        value: { en: "243 d (retrograde)", uk: "243 доби (ретроградно)" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "225 d", uk: "225 діб" },
      },
      {
        label: { en: "Surface pressure", uk: "Тиск на поверхні" },
        value: { en: "92× Earth", uk: "92× земного" },
      },
    ],
    accent: "#e8c97a",
  },
  {
    id: "earth",
    name: { en: "Earth", uk: "Земля" },
    classification: {
      en: "Terrestrial · life-bearing",
      uk: "Земного типу · з життям",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/1280px-The_Earth_seen_from_Apollo_17.jpg",
    imageAlt: {
      en: "The Blue Marble — Earth photographed from Apollo 17",
      uk: "«Блакитна перлина» — Земля зі знімка Apollo 17",
    },
    tagline: {
      en: "The only known cradle of life in the universe.",
      uk: "Єдина відома колиска життя у Всесвіті.",
    },
    fact: {
      en: "Earth is a giant magnet. Its molten iron outer core, swirling at 3.8 billion amps, generates a magnetic field that deflects the solar wind and keeps the atmosphere from being stripped away. Mars lost its field 4 billion years ago and dried out.",
      uk: "Земля — велетенський магніт. Її розплавлене залізне зовнішнє ядро з силою струму 3,8 мільярда ампер створює магнітне поле, що відхиляє сонячний вітер і захищає атмосферу. Марс утратив своє поле 4 мільярди років тому й висох.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "12,742 km", uk: "12 742 км" },
      },
      {
        label: { en: "Day length", uk: "Тривалість доби" },
        value: { en: "23 h 56 m", uk: "23 год 56 хв" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "365.25 d", uk: "365,25 діб" },
      },
      {
        label: { en: "Moons", uk: "Супутники" },
        value: { en: "1", uk: "1" },
      },
    ],
    accent: "#6dd5ff",
  },
  {
    id: "mars",
    name: { en: "Mars", uk: "Марс" },
    classification: {
      en: "Terrestrial · cold desert",
      uk: "Земного типу · холодна пустеля",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1280px-OSIRIS_Mars_true_color.jpg",
    imageAlt: {
      en: "Mars in true color from the OSIRIS instrument",
      uk: "Марс у справжніх кольорах, знімок інструмента OSIRIS",
    },
    tagline: {
      en: "Home to the tallest mountain in the solar system.",
      uk: "Домівка найвищої гори Сонячної системи.",
    },
    fact: {
      en: "Olympus Mons stands 22 km tall — nearly three times the height of Everest — and is wider than Poland. Its summit is so high it pokes through most of the Martian atmosphere. Mars built it because the planet has no plate tectonics, so a single volcanic hotspot piled lava in place for billions of years.",
      uk: "Гора Олімп заввишки 22 км — майже втричі вища за Еверест — і ширша за Польщу. Її вершина стирчить понад більшу частину марсіанської атмосфери. Марс зміг її «виплавити», бо не має тектонічних плит, тож одна вулканічна точка нашаровувала лаву мільярди років.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "6,779 km", uk: "6 779 км" },
      },
      {
        label: { en: "Day length", uk: "Тривалість доби" },
        value: { en: "24 h 37 m", uk: "24 год 37 хв" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "687 d", uk: "687 діб" },
      },
      {
        label: { en: "Olympus Mons", uk: "Гора Олімп" },
        value: { en: "22 km tall", uk: "22 км заввишки" },
      },
    ],
    accent: "#ff7a5a",
  },
  {
    id: "jupiter",
    name: { en: "Jupiter", uk: "Юпітер" },
    classification: {
      en: "Gas giant · king of planets",
      uk: "Газовий гігант · володар планет",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    imageAlt: {
      en: "Jupiter and its Great Red Spot captured by Hubble",
      uk: "Юпітер і його Велика червона пляма, знімок «Габбла»",
    },
    tagline: {
      en: "A storm three times wider than Earth, blowing for 350 years.",
      uk: "Буря втричі ширша за Землю, що лютує вже 350 років.",
    },
    fact: {
      en: "Jupiter has 95 confirmed moons. Four of them — Io, Europa, Ganymede, Callisto — are worlds in their own right. Ganymede is bigger than Mercury. Europa likely hides a salty ocean under its icy shell containing more water than all of Earth's oceans combined.",
      uk: "У Юпітера 95 підтверджених супутників. Чотири з них — Іо, Європа, Ганімед, Каллісто — це повноцінні світи. Ганімед більший за Меркурій. Європа під крижаною шкаралупою ймовірно ховає солоний океан, у якому води більше, ніж у всіх океанах Землі разом.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "139,820 km", uk: "139 820 км" },
      },
      {
        label: { en: "Mass", uk: "Маса" },
        value: { en: "318× Earth", uk: "318× земної" },
      },
      {
        label: { en: "Moons", uk: "Супутники" },
        value: { en: "95+", uk: "95+" },
      },
      {
        label: { en: "Great Red Spot age", uk: "Вік Червоної плями" },
        value: { en: "~350 years", uk: "~350 років" },
      },
    ],
    accent: "#e8b87a",
  },
  {
    id: "saturn",
    name: { en: "Saturn", uk: "Сатурн" },
    classification: {
      en: "Gas giant · ringed",
      uk: "Газовий гігант · з кільцями",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1280px-Saturn_during_Equinox.jpg",
    imageAlt: {
      en: "Saturn during equinox by Cassini",
      uk: "Сатурн під час рівнодення, знімок «Кассіні»",
    },
    tagline: {
      en: "Rings 280,000 km wide, less than 30 meters thick.",
      uk: "Кільця завширшки 280 000 км і завтовшки менше за 30 метрів.",
    },
    fact: {
      en: "Saturn's rings would float in a bathtub. The planet's mean density is only 0.687 g/cm³ — less than water. Scientists believe the rings are young, only 100–400 million years old, possibly the shattered remains of a moon that wandered too close.",
      uk: "Сам Сатурн би плавав у ванні. Його середня густина — лише 0,687 г/см³, менша за густину води. Учені вважають, що кільця молоді, їм лише 100–400 мільйонів років — можливо, це уламки супутника, що підійшов надто близько.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "116,460 km", uk: "116 460 км" },
      },
      {
        label: { en: "Density", uk: "Густина" },
        value: { en: "0.687 g/cm³", uk: "0,687 г/см³" },
      },
      {
        label: { en: "Ring width", uk: "Ширина кілець" },
        value: { en: "282,000 km", uk: "282 000 км" },
      },
      {
        label: { en: "Moons", uk: "Супутники" },
        value: { en: "146", uk: "146" },
      },
    ],
    accent: "#f3d8a3",
  },
  {
    id: "uranus",
    name: { en: "Uranus", uk: "Уран" },
    classification: {
      en: "Ice giant · sideways",
      uk: "Крижаний гігант · на боці",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1280px-Uranus2.jpg",
    imageAlt: {
      en: "Uranus photographed by Voyager 2",
      uk: "Уран на знімку Voyager 2",
    },
    tagline: {
      en: "An ice giant tipped 98° — orbiting the Sun on its side.",
      uk: "Крижаний гігант, нахилений на 98° — обертається навколо Сонця на боці.",
    },
    fact: {
      en: "Uranus rolls around the Sun like a barrel. Each pole gets 42 years of continuous sunlight followed by 42 years of darkness. The tilt is thought to come from a colossal impact early in the planet's history. Its blue-green hue comes from methane absorbing red light.",
      uk: "Уран котиться навколо Сонця, мов бочка. Кожен полюс отримує 42 роки безперервного світла, а потім 42 роки темряви. Нахил, імовірно, виник унаслідок колосального зіткнення на ранніх етапах. Синьо-зелений відтінок дає метан, що поглинає червоне світло.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "50,724 km", uk: "50 724 км" },
      },
      {
        label: { en: "Axial tilt", uk: "Нахил осі" },
        value: { en: "97.8°", uk: "97,8°" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "84 yr", uk: "84 роки" },
      },
      {
        label: { en: "Discovered", uk: "Відкрито" },
        value: { en: "1781", uk: "1781" },
      },
    ],
    accent: "#a5e8e0",
  },
  {
    id: "neptune",
    name: { en: "Neptune", uk: "Нептун" },
    classification: {
      en: "Ice giant · outermost",
      uk: "Крижаний гігант · найвіддаленіший",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/1280px-Neptune_Full.jpg",
    imageAlt: {
      en: "Neptune photographed by Voyager 2 in 1989",
      uk: "Нептун на знімку Voyager 2, 1989 рік",
    },
    tagline: {
      en: "Where the wind hits 2,100 km/h — five times any Earth hurricane.",
      uk: "Тут вітер досягає 2 100 км/год — уп’ятеро більше за земний ураган.",
    },
    fact: {
      en: "Neptune was the first planet found by mathematics. Astronomers noticed Uranus was being tugged by an unseen mass, predicted Neptune's position, pointed a telescope, and there it was — within one degree of the calculation. It takes 165 Earth years to orbit the Sun once.",
      uk: "Нептун — перша планета, відкрита математикою. Астрономи помітили, що Уран зміщується під впливом невидимої маси, обчислили положення Нептуна, навели телескоп — і він був там, у межах одного градуса від розрахунку. Один оберт навколо Сонця займає 165 земних років.",
    },
    stats: [
      {
        label: { en: "Diameter", uk: "Діаметр" },
        value: { en: "49,244 km", uk: "49 244 км" },
      },
      {
        label: { en: "Wind speed", uk: "Швидкість вітру" },
        value: { en: "2,100 km/h", uk: "2 100 км/год" },
      },
      {
        label: { en: "Year length", uk: "Тривалість року" },
        value: { en: "165 yr", uk: "165 років" },
      },
      {
        label: { en: "Discovered", uk: "Відкрито" },
        value: { en: "1846", uk: "1846" },
      },
    ],
    accent: "#5b8df5",
  },
] as const;
