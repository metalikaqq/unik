---
id: "PHASE-01"
title: "Design System + Tokens + UI Primitives"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: frontend
dependencies: ["PHASE-00"]
blocked_by: []
deliverables:
  - name: "Token system in src/app/globals.css using Tailwind v4 @theme"
    status: pending
    verification: "Color, type, space, motion CSS vars all referenced; zero hard-coded values in any component."
  - name: "Font loading via next/font (Inter Display + JetBrains Mono with Cyrillic)"
    status: pending
    verification: "Inspect rendered HTML — only used weights ship; Cyrillic glyphs render."
  - name: "UI primitives: Button, Tag, Rule, MarqueeText, Accordion, Sheet"
    status: pending
    verification: "Each demoed at /dev/components in light, all interactions keyboard-reachable."
  - name: "Hooks: useReducedMotion, useEscapeKey, useScrollProgress"
    status: pending
    verification: "Each unit-tested with Vitest; coverage ≥ 80 % on src/hooks/."
  - name: "TDD coverage for primitives + hooks"
    status: pending
    verification: "Component tests for Accordion (arrow-key nav), Sheet (focus trap), MarqueeText (reduced motion); axe-clean on /dev/components."
exit_criteria:
  - criterion: "All primitives render at 375 / 768 / 1280 with no overflow."
    met: false
    evidence: null
  - criterion: "No primitive uses border-radius or box-shadow (Swiss discipline)."
    met: false
    evidence: null
  - criterion: "axe scan on /dev/components returns zero serious/critical violations."
    met: false
    evidence: null
  - criterion: "Coverage ≥ 80 % on src/lib/ + src/hooks/."
    met: false
    evidence: null
tags: ["design-system", "tokens", "primitives"]
estimated_weeks: 0.6
actual_weeks: null
confidence_score: null
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
