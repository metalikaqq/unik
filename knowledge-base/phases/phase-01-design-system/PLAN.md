---
id: "PHASE-01"
title: "Design System + Tokens — Plan"
status: planned
---

# Phase 01: Execution Plan

## Task Breakdown

| #    | Task                                                                                | Est. days | Priority | Dependencies | Owner |
| ---- | ----------------------------------------------------------------------------------- | --------- | -------- | ------------ | ----- |
| 1.1  | Token declaration on `:root` (color, type, space, motion, z-index)                  | 0.2       | P0       | --           | ai    |
| 1.2  | `@theme inline { ... }` block in `globals.css` aliasing CSS vars to Tailwind        | 0.2       | P0       | 1.1          | ai    |
| 1.3  | Reduced-motion `@media` rule zeroing `--duration-*`                                 | 0.05      | P0       | 1.1          | ai    |
| 1.4  | `next/font` config for Inter Display + JetBrains Mono with Latin + Cyrillic subsets | 0.2       | P0       | --           | ai    |
| 1.5  | TDD: write `cn.test.ts`; implement `lib/cn.ts`                                      | 0.1       | P0       | --           | ai    |
| 1.6  | TDD: write `useReducedMotion.test.ts`; implement hook                               | 0.2       | P0       | 1.5          | ai    |
| 1.7  | TDD: write `useEscapeKey.test.ts`; implement hook                                   | 0.1       | P0       | 1.5          | ai    |
| 1.8  | TDD: write `useScrollProgress.test.ts`; implement hook                              | 0.2       | P1       | 1.5          | ai    |
| 1.9  | Build `Button` primitive (3 sizes × 3 variants, focus ring, square corners)         | 0.2       | P0       | 1.1-1.2      | ai    |
| 1.10 | Build `Tag` primitive (mono uppercase label)                                        | 0.1       | P0       | 1.1-1.2      | ai    |
| 1.11 | Build `Rule` primitive (h/v hairline, optional draw-in via Framer Motion)           | 0.2       | P0       | 1.1-1.2      | ai    |
| 1.12 | Build `MarqueeText` primitive (CSS-only animation, reduced-motion aware)            | 0.3       | P0       | 1.1-1.3, 1.6 | ai    |
| 1.13 | TDD: write `Accordion.test.tsx`; build keyboard-accessible Accordion                | 0.5       | P0       | 1.6, 1.7     | ai    |
| 1.14 | TDD: write `Sheet.test.tsx`; build focus-trapped Sheet                              | 0.5       | P0       | 1.6, 1.7     | ai    |
| 1.15 | `/dev/components` showcase route (gated by NODE_ENV)                                | 0.3       | P0       | 1.9-1.14     | ai    |
| 1.16 | E2E: `tests/e2e/design-system.spec.ts` — render + tab order + axe scan              | 0.3       | P0       | 1.15         | ai    |
| 1.17 | Verify coverage ≥ 80 % on `lib/` + `hooks/`; record numbers                         | 0.1       | P0       | 1.5-1.8      | ai    |

**Total estimate**: ~3 working days (0.6 calendar weeks).

## Risk Register

| #   | Risk                                                   | Probability | Impact | Mitigation                                                                                           |
| --- | ------------------------------------------------------ | ----------- | ------ | ---------------------------------------------------------------------------------------------------- |
| 1   | Cyrillic font subset missing / fallback to system mono | medium      | medium | Verify with a UA test string in `/dev/components`; pin subset configuration.                         |
| 2   | Sheet focus trap leaks on portal mounts                | medium      | high   | Use `inert` attribute on background + manual focus management; cover by E2E with keyboard-only flow. |
| 3   | Tailwind v4 `@theme` regression vs hand-tuned CSS      | low         | medium | Keep token CSS vars as the source of truth; Tailwind classes are ergonomic alias only.               |
| 4   | `useScrollProgress` triggers layout thrash             | medium      | low    | Use `IntersectionObserver` rather than scroll handler; throttle if needed.                           |

## Technical Approach

- **Patterns**: pure-CSS first; Framer Motion only on `Rule` draw-in and `Sheet` enter/exit.
- **Testing**: TDD for every interactive primitive — write the keyboard/ARIA expectations before the component.
- **A11y**: focus ring is `2px solid var(--color-accent)` with `outline-offset: 4px`; visible on every focusable element.
- **Reduced motion**: a single `@media` rule in tokens neutralizes `--duration-*` so primitives that use those tokens become instant automatically.

## Effort Estimate

- **Total estimated days**: 3
- **Calendar weeks (with buffer)**: 0.6
- **Critical path**: 1.1 → 1.4 → 1.6 → (1.13, 1.14 in parallel) → 1.15 → 1.16

## Dependencies Check

| Dependency                                               | Status | Blocker? |
| -------------------------------------------------------- | ------ | -------- |
| PHASE-00 complete (test harness, deps installed)         | TBD    | yes      |
| Inter Display + JetBrains Mono available on Google Fonts | yes    | no       |
