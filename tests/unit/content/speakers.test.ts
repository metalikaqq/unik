import { describe, expect, it } from "vitest";

import { speakerSchema, speakers } from "@/content/speakers";

const validEntry = {
  id: "speaker-1",
  name: { uk: "Олена Шевченко", en: "Olena Shevchenko" },
  role: { uk: "Дизайн-директор у Studio X", en: "Design director at Studio X" },
  talkTitle: { uk: "Карти, які ми малюємо", en: "The maps we draw" },
  talkAbstract: {
    uk: "Про те, як графічні системи стають інструментами для повсякденних рішень — і чому так часто розпадаються.",
    en: "On how graphic systems become tools for everyday decisions — and why they so often fall apart.",
  },
  track: "design" as const,
  social: { twitter: "olena", linkedin: "olenashevchenko" },
};

describe("speakerSchema", () => {
  it("accepts a fully-populated speaker entry", () => {
    expect(speakerSchema.safeParse(validEntry).success).toBe(true);
  });

  it("accepts an entry without optional social links", () => {
    const { social: _omit, ...rest } = validEntry;
    void _omit;
    expect(speakerSchema.safeParse(rest).success).toBe(true);
  });

  it("rejects entries missing the english half of a bilingual field", () => {
    const broken = { ...validEntry, name: { uk: validEntry.name.uk } };
    expect(speakerSchema.safeParse(broken).success).toBe(false);
  });

  it("rejects entries with an unknown track", () => {
    const broken = { ...validEntry, track: "marketing" };
    expect(speakerSchema.safeParse(broken).success).toBe(false);
  });

  it("rejects entries with an empty id", () => {
    const broken = { ...validEntry, id: "" };
    expect(speakerSchema.safeParse(broken).success).toBe(false);
  });
});

describe("speakers data", () => {
  it("contains exactly six entries for the US-003 preview strip", () => {
    expect(speakers.length).toBe(6);
  });

  it("validates every entry against the schema", () => {
    for (const entry of speakers) {
      const result = speakerSchema.safeParse(entry);
      expect(result.success, `${entry.id} failed validation`).toBe(true);
    }
  });

  it("has unique ids across the dataset", () => {
    const ids = speakers.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers all three tracks at least once", () => {
    const tracks = new Set(speakers.map((s) => s.track));
    expect(tracks).toEqual(new Set(["design", "engineering", "community"]));
  });
});
