import { z } from "zod";

import { bilingualSchema, trackSchema } from "@/content/types";

export const SESSION_KINDS = ["keynote", "talk", "panel"] as const;
export type SessionKind = (typeof SESSION_KINDS)[number];

export const DAY_NUMBERS = [1, 2, 3] as const;
export type DayNumber = (typeof DAY_NUMBERS)[number];

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const sessionSchema = z
  .object({
    id: z.string().min(1),
    day: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    start: z.string().regex(timeRegex),
    end: z.string().regex(timeRegex),
    room: z.string().min(1),
    title: bilingualSchema,
    abstract: bilingualSchema,
    track: trackSchema,
    kind: z.enum(SESSION_KINDS),
    speakerIds: z.array(z.string().min(1)).min(1),
  })
  .refine((s) => s.start < s.end, "session start must precede end");

export type Session = z.infer<typeof sessionSchema>;

export const DAY_DATES: Record<DayNumber, string> = {
  1: "2026-05-14",
  2: "2026-05-15",
  3: "2026-05-16",
};

const data: Session[] = [
  {
    id: "d1-keynote",
    day: 1,
    start: "10:00",
    end: "10:45",
    room: "Polonyna Hall",
    title: {
      uk: "Карти, які ми малюємо",
      en: "The maps we draw",
    },
    abstract: {
      uk: "Відкриваюча доповідь конференції — про мову графічних систем у часи невизначеності.",
      en: "Opening keynote — on the language of graphic systems in times of uncertainty.",
    },
    track: "design",
    kind: "keynote",
    speakerIds: ["olena-shevchenko"],
  },
  {
    id: "d1-postgres",
    day: 1,
    start: "11:15",
    end: "11:45",
    room: "Tysa Room",
    title: {
      uk: "Postgres достатньо. Майже завжди.",
      en: "Postgres is enough. Almost always.",
    },
    abstract: {
      uk: "Прагматичний розбір: чому 9 з 10 стартапів не потребують спеціалізованих БД — і коли все ж потребують.",
      en: "A pragmatic breakdown of why 9 in 10 startups don't need a specialty database — and when they actually do.",
    },
    track: "engineering",
    kind: "talk",
    speakerIds: ["dmytro-bilyk"],
  },
  {
    id: "d1-meetups",
    day: 1,
    start: "12:00",
    end: "12:30",
    room: "Verkhovyna Room",
    title: {
      uk: "Чому ми перестали робити мітапи",
      en: "Why we stopped running meetups",
    },
    abstract: {
      uk: "Як шість років мітапів перетворилися на тижневі резиденції — і чому ця зміна врятувала школу.",
      en: "How six years of meetups turned into week-long residencies — and why that shift saved the school.",
    },
    track: "community",
    kind: "talk",
    speakerIds: ["ivan-dovhanych"],
  },
  {
    id: "d1-typography",
    day: 1,
    start: "14:00",
    end: "14:30",
    room: "Tysa Room",
    title: {
      uk: "Кирилиця в горах: як локальний контекст формує форму",
      en: "Cyrillic in the mountains: how place shapes letterforms",
    },
    abstract: {
      uk: "Польова робота з рукописами 19-го століття зі Сваляви та Воловця, і як це впливає на сучасні гарнітури.",
      en: "Fieldwork on 19th-century manuscripts and how it feeds contemporary typefaces.",
    },
    track: "design",
    kind: "talk",
    speakerIds: ["yurii-bondar"],
  },
  {
    id: "d1-panel-onboarding",
    day: 1,
    start: "15:00",
    end: "15:45",
    room: "Polonyna Hall",
    title: {
      uk: "Панель: онбординг у малих командах",
      en: "Panel: onboarding in small teams",
    },
    abstract: {
      uk: "Три практики онбордингу: дизайн-студія, інженерна команда, кооператив. Що працює, що ні, що ми перестали робити.",
      en: "Three onboarding practices: a design studio, an engineering team, a co-op. What works, what doesn't, what we stopped doing.",
    },
    track: "community",
    kind: "panel",
    speakerIds: ["mariia-hrytsenko", "kateryna-melnyk", "roman-liutyi"],
  },
  {
    id: "d1-listening",
    day: 1,
    start: "16:30",
    end: "17:00",
    room: "Verkhovyna Room",
    title: {
      uk: "Як слухати свою спільноту",
      en: "How to listen to your community",
    },
    abstract: {
      uk: "Чотири роки інтерв'ю — практики глибокого слухання, які я переніс у продукт.",
      en: "Four years of interviews — deep-listening practices carried into product work.",
    },
    track: "community",
    kind: "talk",
    speakerIds: ["maksym-voloshyn"],
  },
  {
    id: "d2-monolith",
    day: 2,
    start: "09:30",
    end: "10:00",
    room: "Tysa Room",
    title: {
      uk: "Один процес, нуль магії: бекенд без героїзму",
      en: "One process, zero magic: a backend without heroics",
    },
    abstract: {
      uk: "Чому невеликі команди виграють, коли свідомо обирають нудний стек — і як ми мігрували з мікросервісів назад у моноліт.",
      en: "Why small teams win by picking a boring stack — and how we migrated from microservices back to a monolith.",
    },
    track: "engineering",
    kind: "talk",
    speakerIds: ["andrii-koval"],
  },
  {
    id: "d2-motion",
    day: 2,
    start: "10:15",
    end: "10:45",
    room: "Polonyna Hall",
    title: {
      uk: "Анімація як форма редагування",
      en: "Animation as a form of editing",
    },
    abstract: {
      uk: "Як 0.3 секунди руху можуть змінити сенс кадру — і чому motion-дизайнерам потрібен редакторський інстинкт.",
      en: "How a third of a second of movement can change a frame's meaning.",
    },
    track: "design",
    kind: "talk",
    speakerIds: ["sofiia-hnatyshyn"],
  },
  {
    id: "d2-incidents",
    day: 2,
    start: "11:30",
    end: "12:00",
    room: "Tysa Room",
    title: {
      uk: "Інциденти без героїзму",
      en: "Incidents without heroism",
    },
    abstract: {
      uk: "Культура чергувань, яка не вигорає — практики з шестилюдної команди.",
      en: "An on-call culture that doesn't burn out — from a six-engineer team.",
    },
    track: "engineering",
    kind: "talk",
    speakerIds: ["kateryna-melnyk"],
  },
  {
    id: "d2-brands",
    day: 2,
    start: "14:00",
    end: "14:30",
    room: "Polonyna Hall",
    title: {
      uk: "Маленькі бренди роблять великі ставки",
      en: "Small brands placing big bets",
    },
    abstract: {
      uk: "Сім міні-кейсів локальних виробників, які перетворили обмежений бюджет на впізнаваний голос.",
      en: "Seven mini-cases of small makers who turned a tight budget into a recognisable voice.",
    },
    track: "design",
    kind: "talk",
    speakerIds: ["roman-liutyi"],
  },
  {
    id: "d2-zines",
    day: 2,
    start: "15:00",
    end: "15:30",
    room: "Verkhovyna Room",
    title: {
      uk: "Друк на 200 примірників як практика участі",
      en: "Printing 200 copies as a practice of participation",
    },
    abstract: {
      uk: "Як невеликий тираж формує близькість зі спільнотою, якої не дає вебсайт.",
      en: "How a small print run builds closeness with community that a website cannot.",
    },
    track: "community",
    kind: "talk",
    speakerIds: ["lesia-khoma"],
  },
  {
    id: "d2-community-keynote",
    day: 2,
    start: "16:30",
    end: "17:15",
    room: "Polonyna Hall",
    title: {
      uk: "Спільнота не масштабується. І це добре.",
      en: "Community doesn't scale. That's the point.",
    },
    abstract: {
      uk: "Локальні групи, ритуали, межі. Поле дослідження — три роки роботи з ремісничими спільнотами в Закарпатті.",
      en: "Local circles, rituals, edges. Three years of fieldwork with craft communities in Transcarpathia.",
    },
    track: "community",
    kind: "keynote",
    speakerIds: ["mariia-hrytsenko"],
  },
  {
    id: "d3-inp",
    day: 3,
    start: "09:30",
    end: "10:00",
    room: "Tysa Room",
    title: {
      uk: "INP — це новий LCP",
      en: "INP is the new LCP",
    },
    abstract: {
      uk: "Як ми скоротили INP з 480 мс до 110 мс на застарілому React-додатку без переписування.",
      en: "How we cut INP from 480ms to 110ms on a legacy React app without a rewrite.",
    },
    track: "engineering",
    kind: "talk",
    speakerIds: ["olha-tkachuk"],
  },
  {
    id: "d3-panel-craft",
    day: 3,
    start: "10:30",
    end: "11:15",
    room: "Polonyna Hall",
    title: {
      uk: "Панель: ремесло як методологія",
      en: "Panel: craft as method",
    },
    abstract: {
      uk: "Дизайн, типографія і друк — троє практиків про спільне коріння їхньої роботи.",
      en: "Design, typography, and print — three practitioners on the shared roots of their work.",
    },
    track: "design",
    kind: "panel",
    speakerIds: ["olena-shevchenko", "yurii-bondar", "lesia-khoma"],
  },
  {
    id: "d3-postgres-deep",
    day: 3,
    start: "12:00",
    end: "12:30",
    room: "Tysa Room",
    title: {
      uk: "Замки, MVCC і реальні дедлоки",
      en: "Locks, MVCC, and real-world deadlocks",
    },
    abstract: {
      uk: "Глибокий зріз Postgres-інтерналів через призму інцидентів продакшну.",
      en: "A deep cut on Postgres internals through the lens of production incidents.",
    },
    track: "engineering",
    kind: "talk",
    speakerIds: ["dmytro-bilyk"],
  },
  {
    id: "d3-residencies",
    day: 3,
    start: "14:00",
    end: "14:30",
    room: "Verkhovyna Room",
    title: {
      uk: "Резиденції як формат спільної роботи",
      en: "Residencies as a format for shared work",
    },
    abstract: {
      uk: "Як шість тижневих резиденцій змінили саму школу більше, ніж учасників.",
      en: "How six week-long residencies changed the school itself more than the participants.",
    },
    track: "community",
    kind: "talk",
    speakerIds: ["ivan-dovhanych"],
  },
  {
    id: "d3-listening-closer",
    day: 3,
    start: "15:00",
    end: "15:30",
    room: "Polonyna Hall",
    title: {
      uk: "Закриваючий діалог: чотири роки слухання",
      en: "Closing dialogue: four years of listening",
    },
    abstract: {
      uk: "Закриваюча сесія: ведучий подкасту в розмові з тими, кого слухав найдовше.",
      en: "A closing session: a podcast host in dialogue with those he listened to longest.",
    },
    track: "community",
    kind: "talk",
    speakerIds: ["maksym-voloshyn", "mariia-hrytsenko"],
  },
  {
    id: "d3-closing",
    day: 3,
    start: "16:00",
    end: "16:30",
    room: "Polonyna Hall",
    title: {
      uk: "Заключна доповідь: до наступного року",
      en: "Closing keynote: until next year",
    },
    abstract: {
      uk: "Програмні директорки конференції закривають триденну розмову.",
      en: "The conference programme directors close out a three-day conversation.",
    },
    track: "community",
    kind: "keynote",
    speakerIds: ["mariia-hrytsenko", "olena-shevchenko"],
  },
];

export const schedule: ReadonlyArray<Session> = data.map((entry) => sessionSchema.parse(entry));

export function sessionsForDay(day: DayNumber): ReadonlyArray<Session> {
  return schedule.filter((s) => s.day === day);
}

/**
 * Format a Kyiv conference day as a locale-aware date string
 * (e.g. "14 травня" / "14 May"). The timeZone option pins the
 * day so SSR rendering doesn't shift around the request region.
 */
export function formatDayDate(day: DayNumber, locale: string): string {
  const date = new Date(`${DAY_DATES[day]}T09:00:00+03:00`);
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Kyiv",
  }).format(date);
}
