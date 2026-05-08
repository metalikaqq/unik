---
id: "PHASE-04"
title: "Speakers Page (grid, sheet, filters)"
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
  - name: "Full speaker dataset (18–24 entries) in src/content/speakers.ts"
    status: pending
    verification: "Type-safe; every speaker has UA + EN name, role, company, bio, talk title, slug, track."
  - name: "Responsive 2/3/4-column SpeakerGrid"
    status: pending
    verification: "Renders at 375 / 768 / 1280 with no overflow; CLS < 0.05."
  - name: "Track filter chips (ALL / DESIGN / ENGINEERING / RESEARCH)"
    status: pending
    verification: "Selecting DESIGN reduces grid to design speakers only; URL stays clean (no querystring v1)."
  - name: "SpeakerSheet — focus-trapped bio panel"
    status: pending
    verification: "Click card opens sheet; Esc / backdrop / ✕ close; focus returns to card; tab cycles inside sheet."
  - name: "All speaker images have explicit dimensions and locale-aware alt text"
    status: pending
    verification: "View-source shows width/height attrs and translated alt."
exit_criteria:
  - criterion: "Content invariants test green: every speaker has all required UA + EN fields, no dup slugs."
    met: false
    evidence: null
  - criterion: "CLS < 0.05 on /uk/speakers per PageSpeed Insights."
    met: false
    evidence: null
  - criterion: "axe-clean both with sheet closed and open."
    met: false
    evidence: null
  - criterion: "All E2E specs for speakers green at /uk and /en."
    met: false
    evidence: null
tags: ["speakers", "grid", "sheet"]
estimated_weeks: 0.6
actual_weeks: null
confidence_score: null
---

# Phase 04: Speakers Page

## Problem Statement

The speakers page is the densest information surface and the strongest demonstration of grid layout, hover preview, modal focus management, and keyboard navigation — all required by Chapter 2 of the thesis. It is also the page where image-loading discipline most directly affects Lighthouse CLS.

## Goals

1. Demonstrate filterable list + modal interaction patterns end-to-end.
2. Hold CLS < 0.05 by using explicit image dimensions and aspect-ratio reservations.
3. Provide enough mock content (18–24 speakers) to feel like a real conference.

## Scope

### In scope

- `src/content/speakers.ts` extended to 18–24 entries; type `Speaker` enforces presence of UA + EN fields, slug, track, social links.
- `SpeakerGrid` component — 2-col mobile, 3-col tablet, 4-col desktop.
- `SpeakerCard` — portrait, name, role, company, mono "TRACK 0X" tag, hover reveals talk title.
- `SpeakerSheet` — built on top of P1 `Sheet` primitive; full bio + talk + socials.
- Track filter chips (client-side state only).
- Locale-aware alt text per image.
- Unit tests for content invariants and filter logic.
- E2E for click-to-sheet, Esc-close, focus return, tab trap, filter reduction, locale-toggle preserves selection.

### Out of scope

- URL state for filters (deferred to a possible v2).
- Search by name (deferred).
- Speaker pages (`/speakers/[slug]`) — sheet is enough for the thesis demo.

## Architecture

```
src/
├── app/[locale]/speakers/page.tsx
├── components/speakers/
│   ├── SpeakerGrid.tsx
│   ├── SpeakerCard.tsx
│   └── SpeakerSheet.tsx
├── content/speakers.ts             ← extended dataset
├── lib/speakers.ts                 ← filterByTrack helper
└── i18n/messages/{uk,en}.json      ← + speakers, tracks, filter labels
public/speakers/{slug}.{webp,avif}  ← portraits 800×800
tests/
├── unit/content/speakers.test.ts
├── unit/lib/speakers.test.ts
└── e2e/speakers.spec.ts
```

## Test Strategy

**TDD ladder**:

- Content invariants: every entry has both locales' fields, no duplicate slugs, every track value is in `['design','engineering','research']`.
- `filterByTrack(speakers, 'design')` returns only design speakers; `'all'` returns full list.

**E2E**:

- Grid renders 18–24 cards.
- Click card → sheet opens, focus moves into sheet, bio visible.
- Esc closes sheet; focus returns to triggering card.
- Tab navigation cycles inside open sheet (focus trap).
- Filter "DESIGN" reduces grid; switching to "ALL" restores.
- Locale toggle on `/uk/speakers` lands on `/en/speakers`; if a sheet was open, it stays open with translated content.

## Dependencies

### Depends on

- PHASE-03 (vertical-slice mold).
- PHASE-01 `Sheet` primitive.

### Blocks

- None (P5/P6/P7 can run in parallel after P03).

## Open Questions

1. Speaker portraits — AI-generated or Unsplash with attribution? (Decision: AI-generated for quick iteration; swap to real or properly attributed photos at P10.)
2. Is hover-to-reveal-talk-title accessible to keyboard users? (Decision: also reveal on focus; expose talk title in the card text on touch devices.)
