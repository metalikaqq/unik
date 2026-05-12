import { describe, expect, it } from "vitest";

import { FILTER_VALUES, isFilterValue } from "@/lib/track-filter";

describe("isFilterValue", () => {
  it("accepts 'all'", () => {
    expect(isFilterValue("all")).toBe(true);
  });

  it("accepts every declared track", () => {
    for (const track of ["design", "engineering", "community"]) {
      expect(isFilterValue(track)).toBe(true);
    }
  });

  it("rejects unknown strings", () => {
    expect(isFilterValue("marketing")).toBe(false);
    expect(isFilterValue("")).toBe(false);
  });

  it("rejects undefined", () => {
    expect(isFilterValue(undefined)).toBe(false);
  });
});

describe("FILTER_VALUES", () => {
  it("starts with 'all' and includes every track exactly once", () => {
    expect(FILTER_VALUES).toEqual(["all", "design", "engineering", "community"]);
  });
});
