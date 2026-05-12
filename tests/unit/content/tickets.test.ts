import { describe, expect, it } from "vitest";

import { faqEntries, faqEntrySchema, ticketTiers, ticketTierSchema } from "@/content/tickets";

const validTier = {
  id: "student",
  name: { uk: "Студент", en: "Student" },
  tagline: { uk: "Для тих, хто вчиться", en: "For students" },
  priceUsd: 49,
  features: [{ uk: "Доступ", en: "Access" }],
  recommended: false,
};

describe("ticketTierSchema", () => {
  it("accepts a valid tier", () => {
    expect(ticketTierSchema.safeParse(validTier).success).toBe(true);
  });

  it("rejects a negative price", () => {
    expect(ticketTierSchema.safeParse({ ...validTier, priceUsd: -1 }).success).toBe(false);
  });

  it("rejects a non-integer price", () => {
    expect(ticketTierSchema.safeParse({ ...validTier, priceUsd: 49.5 }).success).toBe(false);
  });

  it("rejects an empty features array", () => {
    expect(ticketTierSchema.safeParse({ ...validTier, features: [] }).success).toBe(false);
  });

  it("defaults `recommended` to false when omitted", () => {
    const { recommended: _omit, ...rest } = validTier;
    void _omit;
    const result = ticketTierSchema.safeParse(rest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.recommended).toBe(false);
    }
  });
});

describe("ticketTiers data", () => {
  it("has the three diploma tiers in ascending price order", () => {
    expect(ticketTiers.map((t) => t.id)).toEqual(["student", "standard", "patron"]);
    const prices = ticketTiers.map((t) => t.priceUsd);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("marks exactly one tier as recommended", () => {
    const recommended = ticketTiers.filter((t) => t.recommended);
    expect(recommended.length).toBe(1);
    expect(recommended[0]?.id).toBe("standard");
  });
});

describe("faqEntrySchema", () => {
  it("accepts a valid faq entry", () => {
    expect(
      faqEntrySchema.safeParse({
        id: "q1",
        question: { uk: "А?", en: "Q?" },
        answer: { uk: "Б.", en: "A." },
      }).success
    ).toBe(true);
  });
});

describe("faqEntries data", () => {
  it("contains exactly eight Q&A entries (per US-006)", () => {
    expect(faqEntries.length).toBe(8);
  });

  it("has unique ids", () => {
    const ids = faqEntries.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
