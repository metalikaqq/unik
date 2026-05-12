import { z } from "zod";

export const SPONSOR_TIERS = ["gold", "silver", "bronze"] as const;
export type SponsorTier = (typeof SPONSOR_TIERS)[number];

export const sponsorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  url: z.url().optional(),
  tier: z.enum(SPONSOR_TIERS),
});

export type Sponsor = z.infer<typeof sponsorSchema>;

const data: Sponsor[] = [
  { id: "polonyna-cloud", name: "POLONYNA CLOUD", url: "https://example.com", tier: "gold" },
  { id: "karpatica", name: "KARPATICA", url: "https://example.com", tier: "gold" },
  { id: "studio-polonyna", name: "STUDIO POLONYNA", url: "https://example.com", tier: "silver" },
  { id: "verkhovyna-coop", name: "VERKHOVYNA CO-OP", url: "https://example.com", tier: "silver" },
  { id: "uzhhorod-open", name: "UZHHOROD OPEN SCHOOL", url: "https://example.com", tier: "silver" },
  { id: "tysa-records", name: "TYSA RECORDS", url: "https://example.com", tier: "bronze" },
  { id: "vorota-press", name: "VOROTA PRESS", url: "https://example.com", tier: "bronze" },
  { id: "rohaty-coffee", name: "ROHATY COFFEE", url: "https://example.com", tier: "bronze" },
];

export const sponsors: ReadonlyArray<Sponsor> = data.map((entry) => sponsorSchema.parse(entry));
