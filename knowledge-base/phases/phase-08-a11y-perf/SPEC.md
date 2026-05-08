---
id: "PHASE-08"
title: "Accessibility + Performance Hardening"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: frontend
dependencies: ["PHASE-04", "PHASE-05", "PHASE-06", "PHASE-07"]
blocked_by: []
deliverables:
  - name: "Full keyboard-only walkthrough on every page × locale"
    status: pending
    verification: "No focus traps; visible focus rings; logical tab order; documented in report."
  - name: "axe scan zero serious/critical on every route × locale"
    status: pending
    verification: "Playwright axe spec gates CI."
  - name: "Color-contrast pass with manual checker (Stark/Polypane)"
    status: pending
    verification: "All foreground/background pairs ≥ AA; report screenshot in /report/."
  - name: "Image audit: AVIF/WebP, dimensions explicit, lazy below-fold"
    status: pending
    verification: "Lighthouse 'Properly size images' = pass on every route."
  - name: "Font subset audit (only used weights ship)"
    status: pending
    verification: "DevTools → Coverage shows < 30 % unused font CSS."
  - name: "Lighthouse CI gating per route on CI"
    status: pending
    verification: "Per-route budgets enforced; CI fails on regression."
  - name: "Reduced-motion path verified end-to-end"
    status: pending
    verification: "Playwright spec with `prefers-reduced-motion: reduce` passes."
  - name: "robots.txt + sitemap.xml (per-locale) + manifest.webmanifest"
    status: pending
    verification: "/robots.txt and /sitemap.xml served; manifest valid."
exit_criteria:
  - criterion: "All routes: Performance ≥ 95, A11y = 100, BP ≥ 95, SEO = 100 (mobile and desktop)."
    met: false
    evidence: null
  - criterion: "axe scan zero serious/critical violations across all routes × locales."
    met: false
    evidence: null
  - criterion: "No console warnings on production build."
    met: false
    evidence: null
  - criterion: "Lighthouse CI green on Vercel preview."
    met: false
    evidence: null
tags: ["a11y", "perf", "lighthouse", "hardening"]
estimated_weeks: 0.6
actual_weeks: null
confidence_score: null
---

# Phase 08: Accessibility + Performance Hardening

## Problem Statement

Diploma defense weighs measurable quality. Lighthouse scores, axe-clean reports, and contrast audits become **figures in the diploma report**. P8 is the dedicated phase for hitting and locking those numbers.

## Goals

1. Reach 95/100/95/100 Lighthouse on every route × locale × form factor (mobile + desktop).
2. Hit zero serious/critical axe violations everywhere.
3. Lock those numbers under CI so they cannot regress before defense.

## Scope

### In scope

- Full keyboard-only walkthrough — fix any focus traps, missing rings, illogical tab orders.
- axe scan + Playwright spec on every route × locale.
- Color contrast audit with Stark/Polypane.
- Image format audit (AVIF/WebP, dimensions, lazy).
- Font subset audit + tightening.
- Lighthouse CI configuration with per-route budgets.
- `robots.txt`, per-locale sitemap, `manifest.webmanifest`, `theme-color`.
- Reduced-motion E2E spec (Playwright context with `prefersReducedMotion: 'reduce'`).
- Add minor `<meta>` polish — author, language, viewport, theme color.

### Out of scope

- Visual redesign (decisions are locked; this phase is hardening only).
- New features.

## Architecture

No new architecture; this is a quality phase. Touches:

```
src/
├── app/[locale]/{,speakers,schedule,tickets,venue}/page.tsx   ← metadata + img audits
├── app/{robots.ts, sitemap.ts}
├── app/manifest.webmanifest
└── styles/                                                     ← contrast tweaks if needed
.github/workflows/ci.yml                                         ← lhci gate
lighthouserc.json
public/og-image.png                                              ← regenerate if needed
tests/e2e/
├── reduced-motion.spec.ts
└── a11y.spec.ts                                                 ← axe across all routes
```

## Test Strategy

**TDD-equivalent**:

- `tests/unit/sitemap.test.ts` — generator lists every route × locale.
- `tests/e2e/a11y.spec.ts` — loop every route × locale × axe scan.
- `tests/e2e/reduced-motion.spec.ts` — verify hero marquee static, no scroll-linked motion.

**Quality gates**:

- Lighthouse CI: configured budgets for each route (Performance ≥ 95, A11y = 100, BP ≥ 95, SEO = 100).
- Bundle analyzer manually run; record sizes in GATE.md.

## Dependencies

### Depends on

- PHASE-04, 05, 06, 07 — all pages must exist before being audited.

### Blocks

- PHASE-09.

## Open Questions

1. Do we ship `manifest.webmanifest` even though the site isn't a PWA? (Decision: yes — it costs nothing and earns the SEO point.)
2. `theme-color` honors light or dark scheme? (Decision: light only, matches `--color-bg`.)
