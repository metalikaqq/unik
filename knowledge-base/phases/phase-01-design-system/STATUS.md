---
id: "PHASE-01"
title: "Design System + Tokens + UI Primitives"
status: active
started: "2026-05-08"
last_updated: "2026-05-09T19:19Z"
last_execute_scan: "2026-05-08"
---

# Phase 01: Status

## Progress

| #    | Task                                                                                | Status      | Notes |
| ---- | ----------------------------------------------------------------------------------- | ----------- | ----- |
| 1.1  | Token declaration on `:root` (color, type, space, motion, z-index)                  | done        | US-001 — commit f80fd78 |
| 1.2  | `@theme inline { ... }` block in `globals.css` aliasing CSS vars to Tailwind        | done        | US-001 — commit f80fd78 |
| 1.3  | Reduced-motion `@media` rule zeroing `--duration-*`                                 | done        | US-001 — commit f80fd78 |
| 1.4  | `next/font` config for Inter Display + JetBrains Mono with Latin + Cyrillic subsets | done        | US-002 — commit 118d902 |
| 1.5  | TDD: write `cn.test.ts`; implement `lib/cn.ts`                                      | done        | US-003 — commit e12f7df |
| 1.6  | TDD: write `useReducedMotion.test.ts`; implement hook                               | done        | US-003 — commit e12f7df (useSyncExternalStore) |
| 1.7  | TDD: write `useEscapeKey.test.ts`; implement hook                                   | done        | US-003 — commit e12f7df |
| 1.8  | TDD: write `useScrollProgress.test.ts`; implement hook                              | done        | US-003 — commit e12f7df (IntersectionObserver, no scroll handler) |
| 1.9  | Build `Button` primitive (3 sizes × 3 variants, focus ring, square corners)         | done        | US-004 — commit f32d833 |
| 1.10 | Build `Tag` primitive (mono uppercase label)                                        | done        | US-004 — commit f32d833 |
| 1.11 | Build `Rule` primitive (h/v hairline, optional draw-in via Framer Motion)           | done        | US-004 — commit f32d833 (use client; useReducedMotion guard + @media defense in depth) |
| 1.12 | Build `MarqueeText` primitive (CSS-only animation, reduced-motion aware)            | done        | US-005 — commit 729022b (CSS @keyframes + --duration-marquee + --animate-marquee; defense-in-depth via useReducedMotion + @media zeroing) |
| 1.13 | TDD: write `Accordion.test.tsx`; build keyboard-accessible Accordion                | done        | US-006 — commit 41949ec (compound Accordion/Item/Trigger/Content; 13 tests; ArrowUp/Down + Home/End nav, singleOpen + multi modes, ARIA wiring) |
| 1.14 | TDD: write `Sheet.test.tsx`; build focus-trapped Sheet                              | not-started | --    |
| 1.15 | `/dev/components` showcase route (gated by NODE_ENV)                                | not-started | --    |
| 1.16 | E2E: `tests/e2e/design-system.spec.ts` — render + tab order + axe scan              | not-started | --    |
| 1.17 | Verify coverage ≥ 80 % on `lib/` + `hooks/`; record numbers                         | not-started | --    |

## Deliverables Tracker

| Deliverable                                                                                  | Status  | Evidence |
| -------------------------------------------------------------------------------------------- | ------- | -------- |
| Token system in `src/app/globals.css` using Tailwind v4 `@theme`                             | done    | commit f80fd78 — :root + @theme inline + reduced-motion |
| Font loading via `next/font` (Inter Display + JetBrains Mono with Cyrillic)                  | done    | commit 118d902 — Inter (opsz axis) + JetBrains_Mono, latin+cyrillic subsets, display: swap |
| UI primitives: `Button`, `Tag`, `Rule`, `MarqueeText`, `Accordion`, `Sheet`                  | partial | commit f32d833 (Button + Tag + Rule), 729022b (MarqueeText), 41949ec (Accordion); Sheet pending |
| Hooks: `useReducedMotion`, `useEscapeKey`, `useScrollProgress`                               | done    | commit e12f7df — all three under src/hooks/, 32 tests, 98.5% statements coverage |
| TDD coverage for primitives + hooks                                                          | pending | --       |

## Exit Criteria Tracker

| #   | Criterion                                                                          | Met | Evidence |
| --- | ---------------------------------------------------------------------------------- | --- | -------- |
| 1   | All primitives render at 375 / 768 / 1280 with no overflow.                        | no  | --       |
| 2   | No primitive uses `border-radius` or `box-shadow` (Swiss discipline).              | no  | --       |
| 3   | axe scan on `/dev/components` returns zero serious/critical violations.            | no  | --       |
| 4   | Coverage ≥ 80 % on `src/lib/` + `src/hooks/`.                                      | no  | --       |

## Blockers

None. PHASE-00 is `completed`; all dependencies satisfied.

## Critical Path

`1.1 → 1.4 → 1.6 → (1.13, 1.14 in parallel) → 1.15 → 1.16`

## Activity Log

| Date       | Activity                                              | Author |
| ---------- | ----------------------------------------------------- | ------ |
| 2026-05-08 | PLAN.md promoted `proposed` → `planned`               | ai     |
| 2026-05-08 | Phase kicked off; SPEC.md status `proposed` → `active` | ai    |
| 2026-05-08 | `execute` scan: 0 task-touching commits since kickoff; all 17 tasks remain `not-started`; no `src/components/ui/`, `src/hooks/`, `src/app/(dev)/components/` yet; `globals.css` still create-next-app default (no Swiss tokens) | ai |
| 2026-05-09 | Ralph iter 1 — US-001 complete: tasks 1.1/1.2/1.3 done in `globals.css`; tsc/lint/build/tests green | ai |
| 2026-05-09 | Ralph iter 2 — US-002 complete: task 1.4 done; Inter (opsz) + JetBrains_Mono via next/font, latin+cyrillic, `--font-display`/`--font-mono` aliased at `:root`; tsc/lint/build/tests green | ai |
| 2026-05-09 | Ralph iter 3 — US-003 complete: tasks 1.5/1.6/1.7/1.8 done under strict TDD; cn() + 3 hooks; 32 tests green; coverage 98.5% stmts on src/lib/ + src/hooks/ | ai |
| 2026-05-09 | Ralph iter 4 — US-004 complete: tasks 1.9/1.10/1.11 done; Button (server) + Tag (server) + Rule (client) under src/components/ui/; tsc/lint/build green | ai |
| 2026-05-09 | Ralph iter 5 — US-005 complete: task 1.12 done; MarqueeText (client) under src/components/ui/ with CSS @keyframes + --duration-marquee + --animate-marquee in @theme; 8 new component tests (40 total); tsc/lint/build green | ai |

## PLAN.md Amendments

None yet.
