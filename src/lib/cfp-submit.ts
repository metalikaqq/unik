import type { CfpValues } from "@/lib/cfp-schema";

export const CFP_MOCK_DELAY_MS = 1200;
export const CFP_MOCK_FAILURE_RATE = 0.1;

export type CfpSubmitResult = { ok: boolean };

export type CfpSubmitOptions = {
  random?: () => number;
};

/**
 * Mock CFP submit (ADR-0004: no backend for the diploma demo).
 * Fakes a network round-trip so the form's loading state is visible,
 * then resolves either way — never throws. Failures are simulated to
 * exercise the error UI; the threshold and RNG are injectable so the
 * unit test is deterministic.
 */
export function submitCfpMock(
  _values: CfpValues,
  options: CfpSubmitOptions = {}
): Promise<CfpSubmitResult> {
  const random = options.random ?? Math.random;
  return new Promise((resolve) => {
    setTimeout(() => {
      const ok = random() >= CFP_MOCK_FAILURE_RATE;
      resolve({ ok });
    }, CFP_MOCK_DELAY_MS);
  });
}
