---
id: SNAP-001
title: "Post-Ralph: Phase 01 — Swiss-rigorous design system: tokens, fonts, hooks, UI primitives, and /dev/components showcase with axe-clean E2E baseline."
date: 2026-05-09
trigger: milestone
previous_snapshot: null
author_type: ai
ai_model: claude-opus-4-7
phase: PHASE-01
phase_status: active (exit criteria met; awaiting GATE)
head_commit: d260adb
branch: ralph/phase-01-design-system
---

# SNAP-001 — Post-Ralph Phase 01 baseline

First architecture snapshot of the CARPATHIAN.CONF 2026 repo. Captures state at
the close of PHASE-01 (design system + tokens + UI primitives), implemented
autonomously through 8 Ralph iterations (US-001 → US-008) on
`ralph/phase-01-design-system`. All 4 phase exit criteria met.

## Module Inventory

| Path                                  | Files | Status | Delta vs prior |
| ------------------------------------- | ----- | ------ | -------------- |
| `knowledge-base/decisions/`           | 6     | stable | baseline       |
| `knowledge-base/changelog/`           | 1     | new    | baseline (`2026-05.md`, 4 entries) |
| `knowledge-base/phases/`              | 25    | new    | baseline (PHASE-OVERVIEW + 11 phase dirs) |
| `knowledge-base/sessions/`            | 1     | stable | baseline (INDEX only) |
| `knowledge-base/snapshots/`           | 1     | new    | this file |
| `src/app/`                            | 6     | new    | baseline (layout + page + dev/components island + favicon + globals.css) |
| `src/components/ui/`                  | 6     | new    | baseline (Button, Tag, Rule, MarqueeText, Accordion, Sheet) |
| `src/hooks/`                          | 3     | new    | baseline (useReducedMotion, useEscapeKey, useScrollProgress) |
| `src/lib/`                            | 2     | new    | baseline (cn, __placeholder) |
| `tests/unit/`                         | 9     | new    | baseline (1 sanity + 1 setup + 4 hook/lib + 3 component) |
| `tests/e2e/`                          | 3     | new    | baseline (sanity, design-system, US-007) |

Absent on this repo (intentionally): `wiki/`, `raw/`, `prompts/`,
`migrations/`, `.claude/skills/`. No vendor docs or n8n workflow snapshots.

## Key Metrics

- **ADRs**: 6 (`ADR-0001` … `ADR-0006`)
- **Changelog entries (May 2026)**: 4 (planning → PHASE-00 GATE → PHASE-01 kickoff → PHASE-01 ship)
- **Phases**: 1 completed (PHASE-00), 1 active w/ exit criteria met (PHASE-01), 9 proposed (PHASE-02..10)
- **UI primitives shipped**: 6 (Button, Tag, Rule, MarqueeText, Accordion, Sheet)
- **Hooks shipped**: 3 (useReducedMotion, useEscapeKey, useScrollProgress)
- **Unit tests**: 65 across `lib/`, `hooks/`, components
- **E2E tests**: 12 in `design-system.spec.ts` (3 viewports × {render, overflow, axe} + tab order + focus ring + Sheet trap) + 5 in `US-007.spec.ts` + 2 sanity
- **Coverage on `src/lib/` + `src/hooks/`**: 98.5 % stmts / 95.83 % branches / 94.73 % funcs / 98.14 % lines (target ≥ 80 %)
- **axe (wcag2a/2aa/21a/21aa) on `/dev/components`**: 0 serious + 0 critical at 375 / 768 / 1280
- **Ralph iterations**: 8 (US-001 → US-008), all green

## Notable Changes

This is the baseline; "changes" are recorded against an empty initial state.

### What landed in PHASE-01

- **Tokens** (`f80fd78` US-001): CSS custom properties for color, type scale,
  spacing, motion durations/easings declared on `:root` in `src/app/globals.css`;
  Tailwind v4 `@theme inline { … }` aliases CSS vars into utility classes;
  `prefers-reduced-motion: reduce` zeroes `--duration-*`. Per **ADR-0005**.
- **Fonts** (`118d902` US-002): `next/font` configured for Inter Display
  (variable `opsz` axis) + JetBrains Mono with Latin + Cyrillic subsets,
  `font-display: swap`; `--font-display` / `--font-mono` aliased on `:root`.
- **Hooks + cn()** (`e12f7df` US-003): TDD-first
  (`useReducedMotion` via `useSyncExternalStore`, `useEscapeKey`,
  `useScrollProgress` via `IntersectionObserver` — no scroll handler);
  `cn()` utility for class composition; 32 unit tests.
- **Primitives v1** (`f32d833` US-004): `Button` (3 sizes × 3 variants, focus
  ring, square corners), `Tag` (mono uppercase), `Rule` (h/v hairline with
  optional Framer-Motion draw-in, gated by `useReducedMotion` + `@media`
  defense-in-depth).
- **MarqueeText** (`729022b` US-005): CSS-only animation via `@keyframes` +
  `--duration-marquee` + `--animate-marquee` inside `@theme`; reduced-motion
  aware via the same dual guard.
- **Accordion** (`41949ec` US-006): compound (`Accordion`/`Item`/`Trigger`/`Content`)
  with 2-context arch, DOM-walk keyboard nav (ArrowUp/Down + Home/End),
  `useId`-scoped ARIA wiring, single-open + multi modes; 13 tests.
- **Sheet** (`3228124` US-007): portal-mounted dialog; focus capture/restore;
  Tab/Shift+Tab focus trap; Esc + backdrop-click close; `inert` on body
  siblings; framer-motion enter w/ reduced-motion duration 0; 12 tests.
  Regression in `useEffect` ordering surfaced and fixed during E2E (inert
  effect declared before focus-restore so cleanup order doesn't strand focus
  on inert trigger — JSDOM gap).
- **Showcase + E2E** (`3e95501` US-008): `src/app/dev/components/page.tsx`
  server-gates the route via `notFound()` when `NODE_ENV === "production"`;
  `showcase.tsx` client island demos all 6 primitives. Playwright suite
  `tests/e2e/design-system.spec.ts` runs 12 tests on chromium + firefox with
  `@axe-core/playwright` (`wcag2a/2aa/21a/21aa`, filtered to
  `impact === serious || critical`). Per-story E2E in
  `tests/e2e/US-007.spec.ts` (5/5 pass).
- **Ralph harness telemetry** (`d260adb`, untracked `.ralph*` files in repo
  root): per-iteration heartbeat / metrics / progress for the autonomous loop.

### Exit criteria verified (PHASE-01 SPEC)

1. All primitives render at 375 / 768 / 1280 with no overflow — Playwright pass.
2. No primitive uses `border-radius` or `box-shadow` (Swiss discipline) — token absence in `globals.css` enforces this; src audit clean.
3. axe scan on `/dev/components` returns zero serious/critical violations.
4. Coverage ≥ 80 % on `src/lib/` + `src/hooks/` — 98.5 % stmts.

### Tech state at HEAD

- **Framework**: Next.js 16 App Router + TypeScript strict (per **ADR-0001**).
- **Styling**: Tailwind v4 CSS-first; no `tailwind.config.ts` (per **ADR-0005**).
- **Test stack**: Vitest + Playwright + `@axe-core/playwright` + Lighthouse CI scaffold (per **ADR-0006**).
- **Visual system**: Swiss-rigorous brutalist; B/W + `#E63946` Carpathian red (per **ADR-0002**).
- **Bilingual**: UA/EN with next-intl planned for PHASE-02; not yet wired (per **ADR-0003**).
- **Backend**: none; CFP via Formspree planned for PHASE-03 (per **ADR-0004**).

### Caveats / open items at this snapshot

- `knowledge-base/phases/PHASE-OVERVIEW.md` still lists PHASE-01 as `active`;
  STATUS.md likewise. Phase exit criteria are met but the formal
  `gate` → `completed` transition has not been written — likely to land in the
  next snapshot (post-GATE).
- No top-level `knowledge-base/INDEX.md` exists (only `sessions/INDEX.md`); the
  snapshot index lives in `knowledge-base/snapshots/` itself for now.
- HEAD commit `d260adb` lives on branch `ralph/phase-01-design-system`, not
  yet merged to `main`.

## Pointers

- **Phase docs**: `knowledge-base/phases/phase-01-design-system/{SPEC,PLAN,STATUS}.md`
- **Decisions**: `knowledge-base/decisions/0001…0006-*.md`
- **Changelog**: `knowledge-base/changelog/2026-05.md`
- **Showcase route**: `src/app/dev/components/` (404s in production)
- **A11y baseline**: `tests/e2e/design-system.spec.ts`
