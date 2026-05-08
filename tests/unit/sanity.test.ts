import { describe, expect, it } from "vitest";
import { PHASE_00_BOOTSTRAP_OK } from "@/lib/__placeholder";

describe("phase-00 sanity", () => {
  it("vitest harness is alive", () => {
    expect(1 + 1).toBe(2);
  });

  it("path alias @/ resolves and placeholder loads", () => {
    expect(PHASE_00_BOOTSTRAP_OK).toBe(true);
  });
});
