import { z } from "zod";

import { bilingualSchema } from "@/content/types";

export const TRANSPORT_MODES = ["plane", "train", "car"] as const;
export type TransportMode = (typeof TRANSPORT_MODES)[number];

export const venuePhotoSchema = z.object({
  id: z.string().min(1),
  caption: bilingualSchema,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  // Hue 0-360 for the placeholder block — keeps the gallery looking varied
  // without shipping external images during the diploma demo.
  hue: z.number().min(0).max(360),
});

export type VenuePhoto = z.infer<typeof venuePhotoSchema>;

export const transportEntrySchema = z.object({
  mode: z.enum(TRANSPORT_MODES),
  title: bilingualSchema,
  body: bilingualSchema,
});

export type TransportEntry = z.infer<typeof transportEntrySchema>;

export const venueSchema = z.object({
  name: bilingualSchema,
  address: bilingualSchema,
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  capacity: z.number().int().positive(),
  amenities: z.array(bilingualSchema).min(1),
  mapsUrl: z.url(),
  gettingThere: z.array(transportEntrySchema).length(TRANSPORT_MODES.length),
  photos: z.array(venuePhotoSchema).length(6),
});

export type Venue = z.infer<typeof venueSchema>;

const data: Venue = {
  name: {
    uk: "Будинок Корзо",
    en: "Korzo House",
  },
  address: {
    uk: "пл. Корятовича 1, Ужгород, Закарпатська обл., 88000",
    en: "1 Koryatovycha Square, Uzhhorod, Zakarpattia Oblast, 88000",
  },
  coords: { lat: 48.6208, lng: 22.2879 },
  capacity: 350,
  amenities: [
    { uk: "Три зали (180 / 90 / 60 місць)", en: "Three halls (180 / 90 / 60 seats)" },
    { uk: "Тиха кімната для батьків з дітьми", en: "Quiet room for parents with infants" },
    { uk: "Безбар'єрний доступ на першому поверсі", en: "Step-free access on the ground floor" },
    { uk: "Wi-Fi у всій будівлі", en: "Building-wide Wi-Fi" },
    { uk: "Кав'ярня й книгарня поруч", en: "Café and bookshop adjacent" },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=48.6208,22.2879",
  gettingThere: [
    {
      mode: "plane",
      title: { uk: "Літаком", en: "By plane" },
      body: {
        uk: "Найближчі робочі аеропорти — Краків (380 км) і Будапешт (430 км). Звідти прямі автобуси та потяги.",
        en: "Closest working airports are Kraków (380 km) and Budapest (430 km). Direct buses and trains run from both.",
      },
    },
    {
      mode: "train",
      title: { uk: "Потягом", en: "By train" },
      body: {
        uk: "Нічний потяг з Києва прибуває о 07:30. З Львова — щодвогодинні денні рейси, у дорозі 4 години.",
        en: "Overnight train from Kyiv arrives at 07:30. From Lviv: bi-hourly day trains, ~4 hours.",
      },
    },
    {
      mode: "car",
      title: { uk: "Машиною", en: "By car" },
      body: {
        uk: "Парковка біля будівлі обмежена (8 місць). Безкоштовна муніципальна парковка — 5 хвилин пішки.",
        en: "Parking by the building is limited (8 spaces). Free municipal parking is a 5-minute walk away.",
      },
    },
  ],
  photos: [
    {
      id: "facade",
      caption: { uk: "Головний фасад на пл. Корятовича", en: "Main façade on Koryatovycha Square" },
      width: 1200,
      height: 800,
      hue: 12,
    },
    {
      id: "foyer",
      caption: { uk: "Фоє з кав'ярнею", en: "Foyer with café counter" },
      width: 1200,
      height: 800,
      hue: 48,
    },
    {
      id: "main-hall",
      caption: { uk: "Великий зал на 180 місць", en: "Main hall, 180 seats" },
      width: 1200,
      height: 800,
      hue: 200,
    },
    {
      id: "side-hall",
      caption: { uk: "Бічний зал на 90 місць", en: "Side hall, 90 seats" },
      width: 1200,
      height: 800,
      hue: 260,
    },
    {
      id: "garden",
      caption: { uk: "Внутрішній сад", en: "Inner garden" },
      width: 1200,
      height: 800,
      hue: 100,
    },
    {
      id: "river",
      caption: { uk: "Вид на Уж з даху", en: "View of the Uzh river from the roof" },
      width: 1200,
      height: 800,
      hue: 180,
    },
  ],
};

export const venue: Venue = venueSchema.parse(data);
