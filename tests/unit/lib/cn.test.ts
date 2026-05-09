import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";

describe("cn()", () => {
  it("merges multiple class strings into a single space-separated string", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("removes falsy values (false, null, undefined, 0, empty string)", () => {
    expect(cn("a", false, "b", null, "c", undefined, "d", 0, "e", "")).toBe("a b c d e");
  });

  it("flattens nested arrays of class names", () => {
    expect(cn(["a", "b"], ["c", ["d", "e"]])).toBe("a b c d e");
  });

  it("keeps truthy conditional class names and drops the falsy branch", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe("base active");
  });

  it("handles deeply nested mixed inputs with falsy entries", () => {
    expect(cn("a", [false, "b", [null, "c", [undefined, "d"]]], 0, "e")).toBe("a b c d e");
  });

  it("returns an empty string when given no arguments", () => {
    expect(cn()).toBe("");
  });

  it("returns an empty string when all inputs are falsy", () => {
    expect(cn(false, null, undefined, 0, "")).toBe("");
  });

  it("collapses internal whitespace inside class strings (multiple spaces)", () => {
    expect(cn("a  b", "c")).toBe("a b c");
  });

  it("trims leading/trailing whitespace inside class strings", () => {
    expect(cn("  a  ", " b ")).toBe("a b");
  });

  it("stringifies non-zero numbers (so conditional `count > 0 && countClass` patterns still work)", () => {
    expect(cn("a", 42, "b")).toBe("a 42 b");
    expect(cn("col", [3, "row"])).toBe("col 3 row");
  });
});
