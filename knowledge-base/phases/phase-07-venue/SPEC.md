---
id: "PHASE-07"
title: "Venue Page (map, travel, gallery)"
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
  - name: "Venue + travel data in src/content/venue.ts"
    status: pending
    verification: "Type-safe; venue, 3–4 hotels, transit options, restaurants, weather all in UA + EN."
  - name: "VenueMap with OSM iframe + static fallback"
    status: pending
    verification: "Map embed loads; on iframe failure, static image renders with text alt."
  - name: "TravelInfo dl/dt/dd semantic list"
    status: pending
    verification: "Renders as definition list; mono labels; locale-aware copy."
  - name: "Image gallery 6–8 photos with brutalist lightbox"
    status: pending
    verification: "Click opens lightbox; arrow keys cycle; Esc closes; focus returns to thumbnail."
  - name: "All external travel links open with rel='noopener noreferrer'"
    status: pending
    verification: "View-source check on every external href."
exit_criteria:
  - criterion: "axe-clean."
    met: false
    evidence: null
  - criterion: "No third-party tracker scripts (privacy clean for diploma defense)."
    met: false
    evidence: null
  - criterion: "Map fallback verified by blocking iframe domain in test."
    met: false
    evidence: null
  - criterion: "All E2E specs for venue green."
    met: false
    evidence: null
tags: ["venue", "map", "gallery"]
estimated_weeks: 0.4
actual_weeks: null
confidence_score: null
---

# Phase 07: Venue Page

## Problem Statement

The venue page is the practical-information surface. It demonstrates information clarity (Chapter 1), embedded media with graceful fallback (Chapter 2), and one decorative-but-disciplined gallery interaction (lightbox). It also grounds the conference in Uzhhorod with real travel links — strong defense narrative.

## Goals

1. Demonstrate information design with `<dl>` semantics, not divs-as-tables.
2. Show graceful third-party fallback (map iframe → static image).
3. Build a brutalist lightbox that respects keyboard + reduced motion.

## Scope

### In scope

- `src/content/venue.ts` — venue address (Uzhhorod-based), 3–4 hotels with prices/links, transit options (Lviv → Uzhhorod by train, Bratislava/Krakow airports), restaurants, weather note.
- `VenueMap.tsx` — OpenStreetMap iframe (no API key) + static image fallback.
- `TravelInfo.tsx` — `<dl>` of mono `<dt>` labels and `<dd>` body text.
- `Gallery.tsx` + `Lightbox.tsx` — 6–8 photos of Uzhhorod (Unsplash with attribution).
- Unit tests for content invariants + lightbox keyboard logic.
- E2E for map fallback, lightbox cycle, external link rel.

### Out of scope

- Real-time hotel availability.
- Booking integration.
- Mapbox/Google Maps with API keys.

## Architecture

```
src/
├── app/[locale]/venue/page.tsx
├── components/venue/
│   ├── VenueMap.tsx
│   ├── TravelInfo.tsx
│   ├── Gallery.tsx
│   └── Lightbox.tsx
├── content/venue.ts
└── i18n/messages/{uk,en}.json    ← + venue, travel, hotel, gallery
public/venue/{1..8}.{webp,avif}
tests/
├── unit/content/venue.test.ts
└── e2e/venue.spec.ts
```

## Test Strategy

**TDD ladder**:

- Venue / hotels / transit invariants — every entry in both locales.
- Lightbox: arrow keys cycle (loop wraps), Esc closes, focus returns to triggering thumbnail.

**E2E**:

- Map embed loads OR static image fallback renders if blocked.
- Click thumbnail → lightbox opens; ←/→ cycle; Esc closes.
- Every external link has `target="_blank" rel="noopener noreferrer"`.
- axe-clean.

## Dependencies

### Depends on

- PHASE-03 mold; PHASE-01 `Sheet` primitive (lightbox is a specialized Sheet).

## Open Questions

1. Real Uzhhorod venue or fictional? (Decision: real address — Уж­город­ський національ­ний університет, факультет ІТ, конференц-зала. Strongest defense story.)
2. Photo licensing — Unsplash only or also free editorial? (Decision: Unsplash only, with creator attribution in footer of gallery.)
