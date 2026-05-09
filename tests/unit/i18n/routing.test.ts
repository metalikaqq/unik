import { describe, expect, it } from "vitest";

import { isLocale, routing } from "@/i18n/routing";

describe("routing config", () => {
  it("declares uk as the default locale and en as a peer", () => {
    expect(routing.defaultLocale).toBe("uk");
    expect(routing.locales).toContain("uk");
    expect(routing.locales).toContain("en");
  });

  it("uses always-prefixed paths so /uk and /en are canonical", () => {
    expect(routing.localePrefix).toBe("always");
  });
});

describe("isLocale", () => {
  it("returns true for declared locales", () => {
    expect(isLocale("uk")).toBe(true);
    expect(isLocale("en")).toBe(true);
  });

  it("returns false for unsupported strings", () => {
    expect(isLocale("fr")).toBe(false);
    expect(isLocale("")).toBe(false);
    expect(isLocale("UK")).toBe(false);
  });
});
