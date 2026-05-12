import { describe, expect, it } from "vitest";

import { SPONSOR_TIERS, sponsorSchema, sponsors } from "@/content/sponsors";

const validEntry = {
  id: "studio-x",
  name: "STUDIO X",
  url: "https://example.com",
  tier: "gold" as const,
};

describe("sponsorSchema", () => {
  it("accepts a fully-populated sponsor entry", () => {
    expect(sponsorSchema.safeParse(validEntry).success).toBe(true);
  });

  it("accepts every declared tier value", () => {
    for (const tier of SPONSOR_TIERS) {
      const result = sponsorSchema.safeParse({ ...validEntry, tier });
      expect(result.success, `expected tier ${tier} to be accepted`).toBe(true);
    }
  });

  it("rejects entries with an unknown tier", () => {
    expect(sponsorSchema.safeParse({ ...validEntry, tier: "platinum" }).success).toBe(false);
  });

  it("rejects entries with an empty name", () => {
    expect(sponsorSchema.safeParse({ ...validEntry, name: "" }).success).toBe(false);
  });

  it("rejects entries with a malformed url", () => {
    expect(sponsorSchema.safeParse({ ...validEntry, url: "not-a-url" }).success).toBe(false);
  });

  it("allows entries without a url (placeholder sponsors)", () => {
    const { url: _omit, ...rest } = validEntry;
    void _omit;
    expect(sponsorSchema.safeParse(rest).success).toBe(true);
  });
});

describe("sponsors data", () => {
  it("contains exactly eight entries for the strip", () => {
    expect(sponsors.length).toBe(8);
  });

  it("validates every entry against the schema", () => {
    for (const entry of sponsors) {
      const result = sponsorSchema.safeParse(entry);
      expect(result.success, `${entry.id} failed validation`).toBe(true);
    }
  });

  it("has unique ids across the dataset", () => {
    const ids = sponsors.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
