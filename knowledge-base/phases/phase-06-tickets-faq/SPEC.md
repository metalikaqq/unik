---
id: "PHASE-06"
title: "Tickets + FAQ"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: frontend
dependencies: ["PHASE-03"]
blocked_by: []
deliverables:
  - name: "Pricing data in src/content/tickets.ts (3 tiers + features + CTAs)"
    status: pending
    verification: "Type-safe; UA + EN feature lists; every tier has ≥ 4 features."
  - name: "PricingGrid (3-col desktop, stacked mobile)"
    status: pending
    verification: "Renders at all breakpoints; 'MOST POPULAR' tag on STANDARD tier."
  - name: "Sticky mobile CTA bar (< 768 px)"
    status: pending
    verification: "Visible only on narrow viewports; respects safe-area insets."
  - name: "FAQ accordion (8–10 Q&As, single-open)"
    status: pending
    verification: "Only one open at a time; arrow keys move; Home/End jump."
  - name: "External CTA links open in new tab with rel='noopener'"
    status: pending
    verification: "View-source on all CTA anchors confirms target + rel."
exit_criteria:
  - criterion: "axe-clean on /uk/tickets and /en/tickets."
    met: false
    evidence: null
  - criterion: "All FAQ answered in both locales — no English placeholders in UA."
    met: false
    evidence: null
  - criterion: "Pricing data invariants test green."
    met: false
    evidence: null
  - criterion: "All E2E specs for tickets green."
    met: false
    evidence: null
tags: ["tickets", "pricing", "faq", "accordion"]
estimated_weeks: 0.4
actual_weeks: null
confidence_score: null
---

# Phase 06: Tickets + FAQ

## Problem Statement

Pricing comparison and FAQ are textbook landing-page conversion patterns from Chapter 3. They are also the smallest discrete page, which makes them a natural mid-project breather between the larger speaker / schedule efforts.

## Goals

1. Demonstrate pricing comparison + sticky CTA + FAQ accordion patterns canonically.
2. Reach a state where every tier links somewhere "real-feeling" (fictional Tito/Eventbrite URLs).

## Scope

### In scope

- `src/content/tickets.ts` — 3 tiers (EARLY-BIRD, STANDARD, STUDENT) with price, currency, feature list (UA + EN), CTA href.
- `PricingGrid.tsx` — 3-col responsive layout.
- Sticky mobile CTA bar.
- `FAQAccordion.tsx` reusing P1 `Accordion` primitive.
- 8–10 FAQ entries in both locales.

### Out of scope

- Real ticket purchase or Stripe integration.
- Dynamic price updates / countdown timers.

## Architecture

```
src/
├── app/[locale]/tickets/page.tsx
├── components/tickets/
│   ├── PricingGrid.tsx
│   ├── PricingTier.tsx
│   └── FAQAccordion.tsx
├── content/tickets.ts            ← tiers + faqs
└── i18n/messages/{uk,en}.json    ← + tickets, faq keys
tests/
├── unit/content/tickets.test.ts
└── e2e/tickets.spec.ts
```

## Test Strategy

**TDD ladder**:

- 3 tiers, each has ≥ 4 features, all i18n keys present in both locales.

**E2E**:

- Click tier CTA opens external URL in new tab with `rel="noopener"`.
- Open FAQ #2 → opens; click FAQ #5 → #2 closes, #5 opens.
- Sticky mobile CTA visible only at < 768 px.
- axe-clean.

## Dependencies

### Depends on

- PHASE-01 `Accordion` primitive.
- PHASE-03 vertical-slice mold.

## Open Questions

1. Pricing currency UAH or EUR? (Decision: show both — primary in UAH for UA visitors, parenthesized EUR for international.)
2. Single STUDENT discount or multiple educational tiers? (Decision: single STUDENT tier with ID-card requirement note.)
