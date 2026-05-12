import type { I18nString } from "@/i18n/config";

export interface Galaxy {
  id: string;
  name: I18nString;
  classification: I18nString;
  image: string;
  imageAlt: I18nString;
  distance: I18nString;
  diameter: I18nString;
  fact: I18nString;
  body: I18nString;
  accent: string;
}

export const GALAXIES: readonly Galaxy[] = [
  {
    id: "milky-way",
    name: { en: "The Milky Way", uk: "Чумацький шлях" },
    classification: {
      en: "Barred spiral · SBbc",
      uk: "Спіральна з перетинкою · SBbc",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/1280px-ESO-VLT-Laser-phot-33a-07.jpg",
    imageAlt: {
      en: "ESO laser guide star pointing toward the Milky Way center",
      uk: "Лазерна опорна зоря ESO, спрямована до центру Чумацького шляху",
    },
    distance: { en: "0 ly (we live here)", uk: "0 св. років (наш дім)" },
    diameter: { en: "~100,000 ly", uk: "~100 000 св. років" },
    fact: {
      en: "Home. The Sun is one of roughly 200 billion stars.",
      uk: "Дім. Сонце — одна із приблизно 200 мільярдів зір.",
    },
    body: {
      en: "Our galaxy is a barred spiral. From our position on the Orion Arm, two-thirds of the way out from the core, we orbit the galactic center once every 225 million years — a single galactic year. The last time the Sun was in this spot, the first dinosaurs were beginning to walk the Earth.",
      uk: "Наша галактика — спіральна з перетинкою. З нашого місця на Рукаві Оріона, на дві третини шляху від ядра, ми робимо повний оберт навколо центру галактики раз на 225 мільйонів років — це один галактичний рік. Минулого разу Сонце було в цій точці, коли по Землі почали ходити перші динозаври.",
    },
    accent: "#a78bfa",
  },
  {
    id: "andromeda",
    name: { en: "Andromeda (M31)", uk: "Андромеда (M31)" },
    classification: { en: "Spiral · SA(s)b", uk: "Спіральна · SA(s)b" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1280px-Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    imageAlt: {
      en: "Andromeda galaxy in visible light with H-alpha overlay",
      uk: "Галактика Андромеди у видимому світлі з накладенням H-alpha",
    },
    distance: { en: "2.537 million ly", uk: "2,537 млн св. років" },
    diameter: { en: "~220,000 ly", uk: "~220 000 св. років" },
    fact: {
      en: "On a collision course with us. Impact: 4.5 billion years.",
      uk: "Летить на зіткнення з нами. Удар: за 4,5 мільярда років.",
    },
    body: {
      en: "Andromeda is approaching at 110 km/s. In 4.5 billion years it will merge with the Milky Way to form an elliptical galaxy researchers nickname 'Milkomeda'. Despite the violence of the merger, the space between stars is so vast that the chance of any individual collision is essentially zero.",
      uk: "Андромеда наближається зі швидкістю 110 км/с. За 4,5 мільярда років вона зіллється з Чумацьким шляхом, утворивши еліптичну галактику, яку дослідники жартома звуть «Молокомедою». Попри жорстокість злиття, простір між зорями настільки величезний, що ймовірність зіткнення будь-якої окремої зорі практично нульова.",
    },
    accent: "#6dd5ff",
  },
  {
    id: "triangulum",
    name: { en: "Triangulum (M33)", uk: "Трикутник (M33)" },
    classification: { en: "Spiral · SA(s)cd", uk: "Спіральна · SA(s)cd" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Triangulum_Galaxy_M33.jpg/1280px-Triangulum_Galaxy_M33.jpg",
    imageAlt: {
      en: "The Triangulum Galaxy (M33)",
      uk: "Галактика Трикутника (M33)",
    },
    distance: { en: "2.73 million ly", uk: "2,73 млн св. років" },
    diameter: { en: "~60,000 ly", uk: "~60 000 св. років" },
    fact: {
      en: "The third member of our Local Group.",
      uk: "Третій учасник нашої Місцевої групи.",
    },
    body: {
      en: "Triangulum is the smallest of the three large spirals in our Local Group. It contains around 40 billion stars — modest compared to Andromeda's trillion — but it is one of the most distant objects visible to the naked eye from Earth.",
      uk: "Трикутник — найменша з трьох великих спіралей нашої Місцевої групи. У ній близько 40 мільярдів зір — скромно порівняно з трильйоном Андромеди, — але це один із найвіддаленіших об’єктів, які можна побачити з Землі неозброєним оком.",
    },
    accent: "#5eead4",
  },
  {
    id: "sombrero",
    name: { en: "The Sombrero (M104)", uk: "Сомбреро (M104)" },
    classification: { en: "Lenticular · SA(s)a", uk: "Лінзоподібна · SA(s)a" },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/1280px-M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    imageAlt: {
      en: "Hubble image of the Sombrero Galaxy",
      uk: "Знімок галактики Сомбреро від «Габбла»",
    },
    distance: { en: "29.3 million ly", uk: "29,3 млн св. років" },
    diameter: { en: "~50,000 ly", uk: "~50 000 св. років" },
    fact: {
      en: "A bright nucleus wrapped in a dark dust lane.",
      uk: "Яскраве ядро, оперезане темною пиловою смугою.",
    },
    body: {
      en: "The Sombrero's dramatic silhouette comes from a dense, edge-on ring of dust circling a massive bulge of old stars. At its heart lurks a supermassive black hole of around 1 billion solar masses — one of the most massive in the nearby universe.",
      uk: "Виразний силует Сомбреро виникає завдяки щільному кільцю пилу, баченому з ребра, що оперезує велике балджеве скупчення старих зір. У серці галактики криється надмасивна чорна діра з масою близько мільярда сонячних — одна з найбільших у відомому ближньому Всесвіті.",
    },
    accent: "#ffb86b",
  },
  {
    id: "whirlpool",
    name: { en: "The Whirlpool (M51)", uk: "Вертушка (M51)" },
    classification: {
      en: "Interacting spiral · SA(s)bc",
      uk: "Взаємодійна спіральна · SA(s)bc",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Messier51_sRGB.jpg/1280px-Messier51_sRGB.jpg",
    imageAlt: {
      en: "Hubble image of the Whirlpool Galaxy and its companion",
      uk: "Знімок Вертушки та її супутника від «Габбла»",
    },
    distance: { en: "31 million ly", uk: "31 млн св. років" },
    diameter: { en: "~76,000 ly", uk: "~76 000 св. років" },
    fact: {
      en: "Two galaxies caught mid-dance.",
      uk: "Дві галактики, спіймані в середині танцю.",
    },
    body: {
      en: "The Whirlpool is the textbook example of a grand-design spiral, its bright arms drawn out and amplified by gravitational tugging from its smaller companion NGC 5195. The interaction is triggering new star formation along the spiral arms.",
      uk: "Вертушка — хрестоматійний приклад спіралі великого дизайну: її яскраві рукави витягнуті й підсилені гравітаційним смиканням від меншого супутника NGC 5195. Взаємодія запускає народження нових зір уздовж спіральних рукавів.",
    },
    accent: "#ff5edb",
  },
  {
    id: "ngc1300",
    name: { en: "NGC 1300", uk: "NGC 1300" },
    classification: {
      en: "Barred spiral · SB(rs)bc",
      uk: "Спіральна з перетинкою · SB(rs)bc",
    },
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg/1280px-Hubble2005-01-barred-spiral-galaxy-NGC1300.jpg",
    imageAlt: {
      en: "Hubble image of barred spiral galaxy NGC 1300",
      uk: "Знімок спіральної з перетинкою NGC 1300 від «Габбла»",
    },
    distance: { en: "61 million ly", uk: "61 млн св. років" },
    diameter: { en: "~110,000 ly", uk: "~110 000 св. років" },
    fact: {
      en: "A textbook barred spiral.",
      uk: "Хрестоматійна спіраль із перетинкою.",
    },
    body: {
      en: "Two-thirds of all spiral galaxies — including our own — host a central bar of stars. NGC 1300 shows the structure so cleanly it has become the canonical reference image. The bar funnels gas into the core, feeding star formation and the central black hole.",
      uk: "Дві третини всіх спіральних галактик — зокрема й наша — мають центральну перетинку із зір. NGC 1300 демонструє цю структуру настільки чітко, що стала еталонним зображенням. Перетинка спрямовує газ до ядра, підживлюючи зореутворення та центральну чорну діру.",
    },
    accent: "#8b5cff",
  },
] as const;
