import { describe, expect, it } from "vitest";

import { bilingualSchema, pickLocale, trackSchema } from "@/content/types";

const sample = { uk: "Привіт", en: "Hello" };

describe("bilingualSchema", () => {
  it("accepts a complete bilingual pair", () => {
    expect(bilingualSchema.safeParse(sample).success).toBe(true);
  });

  it("rejects an empty uk value", () => {
    expect(bilingualSchema.safeParse({ uk: "", en: "Hello" }).success).toBe(false);
  });

  it("rejects an empty en value", () => {
    expect(bilingualSchema.safeParse({ uk: "Привіт", en: "" }).success).toBe(false);
  });

  it("rejects a missing en field", () => {
    expect(bilingualSchema.safeParse({ uk: "Привіт" }).success).toBe(false);
  });
});

describe("trackSchema", () => {
  it("accepts each declared track", () => {
    for (const track of ["design", "engineering", "community"] as const) {
      expect(trackSchema.safeParse(track).success).toBe(true);
    }
  });

  it("rejects an unknown track", () => {
    expect(trackSchema.safeParse("marketing").success).toBe(false);
  });
});

describe("pickLocale", () => {
  it("returns the english variant when locale is 'en'", () => {
    expect(pickLocale(sample, "en")).toBe("Hello");
  });

  it("returns the ukrainian variant when locale is 'uk'", () => {
    expect(pickLocale(sample, "uk")).toBe("Привіт");
  });

  it("falls back to ukrainian for any unrecognised locale (UA is canonical)", () => {
    expect(pickLocale(sample, "fr")).toBe("Привіт");
    expect(pickLocale(sample, "")).toBe("Привіт");
  });
});
