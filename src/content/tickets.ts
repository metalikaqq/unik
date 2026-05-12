import { z } from "zod";

import { bilingualSchema } from "@/content/types";

export const ticketTierSchema = z.object({
  id: z.string().min(1),
  name: bilingualSchema,
  tagline: bilingualSchema,
  priceUsd: z.number().int().nonnegative(),
  features: z.array(bilingualSchema).min(1),
  recommended: z.boolean().default(false),
});

export type TicketTier = z.infer<typeof ticketTierSchema>;

const tierData: TicketTier[] = [
  {
    id: "student",
    name: { uk: "Студент", en: "Student" },
    tagline: { uk: "Для тих, хто ще вчиться.", en: "For those still in school." },
    priceUsd: 49,
    features: [
      { uk: "Доступ до всіх трьох днів", en: "Access to all three days" },
      { uk: "Обіди й кава", en: "Lunch and coffee" },
      { uk: "Цифрові матеріали конференції", en: "Digital conference handouts" },
    ],
    recommended: false,
  },
  {
    id: "standard",
    name: { uk: "Стандарт", en: "Standard" },
    tagline: { uk: "Звичайний квиток.", en: "The usual ticket." },
    priceUsd: 199,
    features: [
      { uk: "Усе зі студентського пакету", en: "Everything from the student tier" },
      { uk: "Друкована програма й зін", en: "Printed programme and zine" },
      { uk: "Вечірня вечеря на полонині", en: "Evening dinner on the polonyna" },
      { uk: "Доступ до закритого Slack", en: "Access to the private Slack" },
    ],
    recommended: true,
  },
  {
    id: "patron",
    name: { uk: "Патрон", en: "Patron" },
    tagline: {
      uk: "Підтримайте незалежну конференцію.",
      en: "Support an independent conference.",
    },
    priceUsd: 499,
    features: [
      { uk: "Усе зі стандартного пакету", en: "Everything from the standard tier" },
      { uk: "Перші ряди на всіх кейноутах", en: "Front-row seats at all keynotes" },
      { uk: "Приватний обід зі спікерами", en: "Private dinner with speakers" },
      { uk: "Іменна подяка на сцені", en: "On-stage acknowledgement by name" },
      { uk: "Локальний крафтовий подарунок", en: "Local handcrafted gift" },
    ],
    recommended: false,
  },
];

export const ticketTiers: ReadonlyArray<TicketTier> = tierData.map((t) =>
  ticketTierSchema.parse(t)
);

export const faqEntrySchema = z.object({
  id: z.string().min(1),
  question: bilingualSchema,
  answer: bilingualSchema,
});

export type FaqEntry = z.infer<typeof faqEntrySchema>;

const faqData: FaqEntry[] = [
  {
    id: "refunds",
    question: { uk: "Чи можливе повернення коштів?", en: "Are refunds possible?" },
    answer: {
      uk: "Повне повернення до 1 квітня 2026 року. Після цього — лише передача квитка іншій особі.",
      en: "Full refunds until 1 April 2026. After that, tickets can only be transferred to another person.",
    },
  },
  {
    id: "dietary",
    question: {
      uk: "Чи враховуєте ви дієтичні обмеження?",
      en: "Do you accommodate dietary needs?",
    },
    answer: {
      uk: "Так. Під час реєстрації ви зможете вказати веганські, вегетаріанські та безглютенові опції.",
      en: "Yes. At check-in you can select vegan, vegetarian, and gluten-free options.",
    },
  },
  {
    id: "recording",
    question: { uk: "Чи будуть записи доповідей?", en: "Will talks be recorded?" },
    answer: {
      uk: "Кейноути записуємо й публікуємо за тиждень після конференції. Решта сесій — лише на місці.",
      en: "Keynotes are recorded and published one week after. Everything else stays in the room.",
    },
  },
  {
    id: "code-of-conduct",
    question: { uk: "Чи є кодекс поведінки?", en: "Is there a code of conduct?" },
    answer: {
      uk: "Так — він обов'язковий для всіх учасників і доступний на сайті при оформленні квитка.",
      en: "Yes — it applies to every attendee and is published on the site at checkout.",
    },
  },
  {
    id: "wheelchair",
    question: {
      uk: "Чи доступне місце проведення для людей на візках?",
      en: "Is the venue wheelchair accessible?",
    },
    answer: {
      uk: "Так. Зал, фоє та санвузли на першому поверсі повністю доступні. Деталі — на сторінці локації.",
      en: "Yes. The hall, foyer, and ground-floor restrooms are fully accessible. Details on the venue page.",
    },
  },
  {
    id: "children",
    question: {
      uk: "Чи можна прийти з дітьми?",
      en: "Can I bring children?",
    },
    answer: {
      uk: "Діти до 12 років — безкоштовно з дорослим. У нас є тиха кімната для батьків з немовлятами.",
      en: "Children under 12 are free with an adult. There's a quiet room for parents with infants.",
    },
  },
  {
    id: "wifi",
    question: { uk: "Чи буде Wi-Fi?", en: "Is there Wi-Fi?" },
    answer: {
      uk: "Так, по всій будівлі. Пароль роздаємо на стійці реєстрації.",
      en: "Yes, throughout the building. The password is handed out at registration.",
    },
  },
  {
    id: "travel",
    question: { uk: "Чи допомагаєте з поселенням?", en: "Do you help with accommodation?" },
    answer: {
      uk: "Ми не пропонуємо готелі напряму, але радимо перелік перевірених варіантів у радіусі 15 хвилин ходу.",
      en: "We don't book hotels directly, but we share a curated list of options within a 15-minute walk.",
    },
  },
];

export const faqEntries: ReadonlyArray<FaqEntry> = faqData.map((f) => faqEntrySchema.parse(f));
