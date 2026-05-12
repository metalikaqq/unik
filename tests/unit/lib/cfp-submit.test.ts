import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CFP_MOCK_DELAY_MS, submitCfpMock } from "@/lib/cfp-submit";

const validPayload = {
  name: "Olena",
  email: "olena@example.com",
  title: "Talk",
  abstract: "A".repeat(60),
  track: "design" as const,
};

describe("submitCfpMock", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("resolves to { ok: true } after the mocked delay when random > failure threshold", async () => {
    const promise = submitCfpMock(validPayload, { random: () => 0.99 });
    vi.advanceTimersByTime(CFP_MOCK_DELAY_MS);
    await expect(promise).resolves.toEqual({ ok: true });
  });

  it("resolves to { ok: false } when random falls below the 10% failure threshold", async () => {
    const promise = submitCfpMock(validPayload, { random: () => 0.0 });
    vi.advanceTimersByTime(CFP_MOCK_DELAY_MS);
    await expect(promise).resolves.toEqual({ ok: false });
  });

  it("does not resolve before the mocked delay has elapsed", async () => {
    let settled = false;
    const promise = submitCfpMock(validPayload, { random: () => 0.99 }).then(() => {
      settled = true;
    });
    vi.advanceTimersByTime(CFP_MOCK_DELAY_MS - 1);
    await Promise.resolve();
    expect(settled).toBe(false);
    vi.advanceTimersByTime(1);
    await promise;
    expect(settled).toBe(true);
  });

  it("defaults to Math.random when no random is injected (smoke check)", async () => {
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.99);
    const promise = submitCfpMock(validPayload);
    vi.advanceTimersByTime(CFP_MOCK_DELAY_MS);
    await expect(promise).resolves.toEqual({ ok: true });
    spy.mockRestore();
  });
});
