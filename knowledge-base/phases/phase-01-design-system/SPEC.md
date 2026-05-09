---
id: "PHASE-01"
title: "Design System + Tokens + UI Primitives"
status: completed
author_type: ai
ai_model: claude-opus-4-7
created: "2026-05-08"
started: "2026-05-08"
completed: "2026-05-09"
component: frontend
dependencies: ["PHASE-00"]
blocked_by: []
deliverables:
  - name: "Token system in src/app/globals.css using Tailwind v4 @theme"
    status: done
    verification: "commit f80fd78 — :root + @theme inline + reduced-motion @media zeroing --duration-*."
  - name: "Font loading via next/font (Inter Display + JetBrains Mono with Cyrillic)"
    status: done
    verification: "commit 118d902 — Inter (opsz axis) + JetBrains_Mono via next/font/google, latin+cyrillic subsets, display: swap, --font-display/--font-mono aliased at :root."
  - name: "UI primitives: Button, Tag, Rule, MarqueeText, Accordion, Sheet"
    status: done
    verification: "commits f32d833 (Button + Tag + Rule), 729022b (MarqueeText), 41949ec (Accordion compound), 3228124 (Sheet portal). All demoed at /dev/components, keyboard-reachable, axe-clean."
  - name: "Hooks: useReducedMotion, useEscapeKey, useScrollProgress"
    status: done
    verification: "commit e12f7df — all three under src/hooks/, 32 unit tests, 98.5% statements coverage on src/hooks/."
  - name: "TDD coverage for primitives + hooks"
    status: done
    verification: "65 unit tests (Accordion 13, Sheet 12, MarqueeText 8, hooks 32) + 12 Playwright E2E (3 viewports × {render, overflow, axe} + tab order + focus ring + Sheet trap)."
exit_criteria:
  - criterion: "All primitives render at 375 / 768 / 1280 with no overflow."
    met: true
    evidence: "US-008 commit 3e95501 — tests/e2e/design-system.spec.ts asserts scrollWidth − innerWidth ≤ 0 at mobile-375/tablet-768/desktop-1280; PASS on chromium + firefox."
  - criterion: "No primitive uses border-radius or box-shadow (Swiss discipline)."
    met: true
    evidence: "Audit of src/components/ui/* — no rounded-*, shadow-*, border-radius, or box-shadow declarations. Enforced via token absence (no --radius / --shadow defined in globals.css)."
  - criterion: "axe scan on /dev/components returns zero serious/critical violations."
    met: true
    evidence: "US-008 commit 3e95501 — @axe-core/playwright with tags wcag2a/2aa/21a/21aa, filtered to impact serious|critical, zero violations across mobile-375/tablet-768/desktop-1280."
  - criterion: "Coverage ≥ 80 % on src/lib/ + src/hooks/."
    met: true
    evidence: "vitest --coverage: 98.5% statements / 95.83% branches / 94.73% functions / 98.14% lines on src/lib + src/hooks (recorded in ralph-metrics.json)."
tags: ["design-system", "tokens", "primitives"]
estimated_weeks: 0.6
actual_weeks: 0.2
confidence_score: 9.5
---

# Phase 01: Design System + Tokens + UI Primitives

## Problem Statement

The visual spine must exist before any page is built; otherwise pages drift visually and the late-stage cleanup is 2× the work. P1 produces every primitive that P3–P7 consume, with a `/dev/components` showcase route for visual eyeballing and an axe-clean baseline.

## Goals

1. Codify the Swiss-rigorous token system (per ADR-0002) in code.
2. Build the small set of primitives every page needs, with TDD on every interactive one.
3. Establish the accessibility floor (focus rings, focus traps, ARIA, reduced motion) before any feature work.

## Scope

### In scope

- CSS variables for all design tokens declared on `:root`, surfaced via Tailwind v4 `@theme inline`.
- `next/font/google` import for Inter + JetBrains Mono with `display: swap` and Latin + Cyrillic subsets.
- Primitives in `src/components/ui/`: `Button`, `Tag`, `Rule`, `MarqueeText`, `Accordion`, `Sheet`.
- Hooks in `src/hooks/`: `useReducedMotion`, `useEscapeKey`, `useScrollProgress`.
- Utilities in `src/lib/`: `cn()`.
- Storybook-lite at `/dev/components` (gated by `process.env.NODE_ENV !== 'production'`).
- Unit tests + Vitest component tests for everything interactive.
- Reduced-motion fallback in tokens (`@media (prefers-reduced-motion: reduce)` zeroes `--duration-*`).

### Out of scope

- Locale routing or `[locale]` segment (P2).
- Page-specific compositions (P3+).
- Animations beyond the primitives' baseline behavior.

## Architecture

```
src/
├── app/
│   ├── globals.css                ← :root tokens + @theme + reduced-motion
│   └── (dev)/components/page.tsx  ← gated showcase
├── components/ui/
│   ├── Button.tsx
│   ├── Tag.tsx
│   ├── Rule.tsx
│   ├── MarqueeText.tsx
│   ├── Accordion.tsx
│   └── Sheet.tsx
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useEscapeKey.ts
│   └── useScrollProgress.ts
└── lib/
    └── cn.ts
tests/unit/
├── components/ui/{Accordion,Sheet,MarqueeText}.test.tsx
├── hooks/{useReducedMotion,useEscapeKey}.test.ts
└── lib/cn.test.ts
tests/e2e/
└── design-system.spec.ts
```

## Test Strategy

**TDD ladder**:

- `cn()` merges class names, removes falsy, passes through arrays.
- `Accordion`: arrow keys move between triggers; Home/End jump; Enter/Space toggles; ARIA `expanded` reflects state; only one open in single-mode.
- `Sheet`: opens with focus moved into panel, returns focus on close, traps focus inside, Esc closes, backdrop click closes.
- `MarqueeText`: animates by default; with `prefers-reduced-motion: reduce` is static.
- `useReducedMotion`: returns true when matchMedia matches; updates on change; cleans up listener.
- `useEscapeKey`: fires only on Esc; cleans up listener.

**E2E**:

- `/dev/components` renders without console errors at 375 / 768 / 1280.
- Tab order through every primitive is logical; focus rings visible.
- axe scan zero violations.

## Dependencies

### Depends on

- PHASE-00 (test harness + scaffold).

### Blocks

- PHASE-02 (uses Button + Rule in header), PHASE-03 (uses Sheet, Accordion, MarqueeText), PHASE-04 (uses Sheet), PHASE-06 (uses Accordion).

## Open Questions

1. Single-open vs multi-open Accordion default? (Decision: single-open per ADR-0002 discipline; multi-open available via prop if a future need appears.)
2. Should `MarqueeText` use CSS `animation` or Framer Motion? (Decision: CSS-only — better perf, simpler reduced-motion story, matches Swiss restraint.)
