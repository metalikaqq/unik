---
id: "ADR-0006"
title: "Test stack: Vitest + Playwright + axe-core + Lighthouse CI"
status: accepted
date: "2026-05-08"
author_type: human
tags: ["testing", "tdd", "quality"]
---

# ADR-0006 — Test stack

## Context

User explicitly requested TDD and E2E driven development. The site is a defense artifact, so test discipline is part of the grade. We need fast unit tests, real browser E2E, accessibility automation, and performance regression gating — all on free tiers.

## Decision

| Concern                  | Tool                                                            | Why                                                                                   |
| ------------------------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Unit / hooks / utilities | **Vitest** + Testing Library                                    | Native ESM, Vite-fast, first-class TS, jsdom env.                                     |
| Component interaction    | Vitest + `@testing-library/react` + `@testing-library/jest-dom` | Same harness as unit tests; no second runner.                                         |
| End-to-end               | **Playwright**                                                  | Real Chromium/Firefox/Webkit; reduced-motion and auth contexts; screenshot artifacts. |
| Accessibility            | `@axe-core/playwright`                                          | Axe rules executed inside Playwright specs; no extra runner.                          |
| Performance regression   | **Lighthouse CI** (`@lhci/cli`)                                 | Per-route budgets fail CI on regression.                                              |
| Coverage                 | Vitest's built-in `v8` provider                                 | Threshold: ≥ 80 % on `lib/`, `hooks/`, `i18n/`, content validators.                   |

**Test layout**:

```
tests/
├── unit/             ← Vitest specs (mirror src/ structure)
└── e2e/              ← Playwright specs (one file per phase)
```

**TDD ladder** (write tests first for):

- Zod schemas, pure utilities, hooks, content invariants, i18n parity.

**E2E coverage** (one spec per critical flow):

- Cold load + nav · locale toggle · CFP form happy + error · keyboard reach · schedule day-tabs · accordion · reduced-motion · mobile no-overflow · 404.

## Rationale

- Vitest + Playwright is the dominant 2026 stack — committee will recognize it; vendor docs are abundant.
- Axe-core as a Playwright plugin avoids running a third tool and keeps a11y assertions next to the user flow that exercises them.
- Lighthouse CI runs on every PR via GitHub Actions and on Vercel preview, gating numerical performance commitments.
- Coverage on visual components is left to E2E rather than markup snapshots — Swiss UI is brittle to snapshot.

## Alternatives considered

| Option                              | Why rejected                                       |
| ----------------------------------- | -------------------------------------------------- |
| Cypress                             | Slower; Playwright has stronger Chromium fidelity. |
| Jest                                | Slower than Vitest with Vite/Next; ESM friction.   |
| Playwright + Lighthouse without axe | Misses a11y regressions silently.                  |
| Manual a11y audits only             | Won't catch regressions during P4–P7.              |

## Consequences

- Phase 0 (Bootstrap) installs and wires every tool above with one trivial test in each.
- CI workflow runs: `lint → typecheck → vitest → playwright → lhci`.
- Failing any step blocks the gate of any phase that touches code.
