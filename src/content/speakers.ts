import { z } from "zod";

import { bilingualSchema, trackSchema } from "@/content/types";

export const speakerSchema = z.object({
  id: z.string().min(1),
  name: bilingualSchema,
  role: bilingualSchema,
  talkTitle: bilingualSchema,
  talkAbstract: bilingualSchema,
  track: trackSchema,
  social: z
    .object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

export type Speaker = z.infer<typeof speakerSchema>;

const data: Speaker[] = [
  {
    id: "olena-shevchenko",
    name: { uk: "Олена Шевченко", en: "Olena Shevchenko" },
    role: { uk: "Дизайн-директор у Studio Polonyna", en: "Design director at Studio Polonyna" },
    talkTitle: { uk: "Карти, які ми малюємо", en: "The maps we draw" },
    talkAbstract: {
      uk: "Як графічні системи стають інструментами повсякденних рішень — і чому так часто розпадаються під вагою власної логіки.",
      en: "How graphic systems become tools for everyday decisions — and why they so often collapse under the weight of their own logic.",
    },
    track: "design",
    social: { twitter: "olena_s", linkedin: "olenashevchenko" },
  },
  {
    id: "andrii-koval",
    name: { uk: "Андрій Коваль", en: "Andrii Koval" },
    role: { uk: "Інженер платформи у Karpatica", en: "Platform engineer at Karpatica" },
    talkTitle: {
      uk: "Один процес, нуль магії: бекенд без героїзму",
      en: "One process, zero magic: a backend without heroics",
    },
    talkAbstract: {
      uk: "Чому невеликі команди виграють, коли свідомо обирають нудний стек — і як ми мігрували з мікросервісів назад у моноліт.",
      en: "Why small teams win by deliberately picking a boring stack — and how we migrated from microservices back to a monolith.",
    },
    track: "engineering",
    social: { github: "andriikoval" },
  },
  {
    id: "mariia-hrytsenko",
    name: { uk: "Марія Гриценко", en: "Mariia Hrytsenko" },
    role: { uk: "Програмна директорка Verkhovyna Co-op", en: "Program director, Verkhovyna Co-op" },
    talkTitle: {
      uk: "Спільнота не масштабується. І це добре.",
      en: "Community doesn't scale. That's the point.",
    },
    talkAbstract: {
      uk: "Локальні групи, ритуали, межі. Поле дослідження — три роки роботи з ремісничими спільнотами в Закарпатті.",
      en: "Local circles, rituals, edges. A three-year field report on working with craft communities across Transcarpathia.",
    },
    track: "community",
    social: { linkedin: "mariiahrytsenko" },
  },
  {
    id: "yurii-bondar",
    name: { uk: "Юрій Бондар", en: "Yurii Bondar" },
    role: { uk: "Незалежний типограф", en: "Independent type designer" },
    talkTitle: {
      uk: "Кирилиця в горах: як локальний контекст формує форму",
      en: "Cyrillic in the mountains: how place shapes letterforms",
    },
    talkAbstract: {
      uk: "Польова робота з рукописами 19-го століття зі Сваляви та Воловця, і як це впливає на сучасні гарнітури.",
      en: "Fieldwork on 19th-century manuscripts from Svalyava and Volovets, and how that work feeds into contemporary typefaces.",
    },
    track: "design",
    social: { twitter: "yurii_type" },
  },
  {
    id: "kateryna-melnyk",
    name: { uk: "Катерина Мельник", en: "Kateryna Melnyk" },
    role: { uk: "SRE у Polonyna Cloud", en: "SRE at Polonyna Cloud" },
    talkTitle: {
      uk: "Інциденти без героїзму: культура чергувань, яка не вигорає",
      en: "Incidents without heroism: an on-call culture that doesn't burn out",
    },
    talkAbstract: {
      uk: "Чотири роки експериментів з ротаціями, runbook-ами і ретроспективами в команді з шести інженерів.",
      en: "Four years of experiments with rotations, runbooks, and blameless retros in a six-engineer team.",
    },
    track: "engineering",
    social: { github: "katmelnyk", linkedin: "katerynamelnyk" },
  },
  {
    id: "ivan-dovhanych",
    name: { uk: "Іван Довганич", en: "Ivan Dovhanych" },
    role: { uk: "Куратор Uzhhorod Open School", en: "Curator, Uzhhorod Open School" },
    talkTitle: {
      uk: "Чому ми перестали робити мітапи",
      en: "Why we stopped running meetups",
    },
    talkAbstract: {
      uk: "Розповідь про те, як шість років мітапів перетворилися на тижневі резиденції — і чому ця зміна врятувала школу.",
      en: "How six years of meetups turned into week-long residencies — and why that shift saved the school.",
    },
    track: "community",
    social: { linkedin: "ivandovhanych" },
  },
];

export const speakers: ReadonlyArray<Speaker> = data.map((entry) => speakerSchema.parse(entry));
