---
id: "PHASE-05"
title: "Schedule Page (day tabs, expandable rows, deep links, ICS)"
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
  - name: "3-day session dataset (~30 sessions) in src/content/schedule.ts"
    status: pending
    verification: "Type-safe; sorted by start; no overlaps within same track."
  - name: "DayTabs (ARIA tablist, keyboard arrow nav)"
    status: pending
    verification: "Tab from Day 01 → Day 02 via arrow keys; ARIA `selected` reflects state."
  - name: "ScheduleTable + SessionRow with expand/collapse"
    status: pending
    verification: "Expand reveals abstract + speaker; Enter and Space both toggle; no layout shift."
  - name: "Anchor deep-link support for individual sessions"
    status: pending
    verification: "/uk/schedule#talk-keynote scrolls to + auto-expands the keynote row."
  - name: "Track filter (DESIGN / ENGINEERING / RESEARCH / ALL)"
    status: pending
    verification: "Filter hides non-matching across all 3 days."
  - name: "ICS download per session"
    status: pending
    verification: "Click 'Add to calendar' downloads valid RFC-5545 .ics file."
exit_criteria:
  - criterion: "No layout shift when expanding sessions (CLS unchanged)."
    met: false
    evidence: null
  - criterion: "Deep links work after locale switch (e.g., from /uk/schedule#talk-keynote to /en/schedule#talk-keynote)."
    met: false
    evidence: null
  - criterion: "axe-clean."
    met: false
    evidence: null
  - criterion: "Sessions sorted invariant + no-overlap invariant tests green."
    met: false
    evidence: null
tags: ["schedule", "tabs", "deep-links", "ics"]
estimated_weeks: 0.6
actual_weeks: null
confidence_score: null
---

# Phase 05: Schedule Page

## Problem Statement

The schedule page demonstrates the highest density of accessibility-first interaction patterns: ARIA tablist with arrow-key navigation, expandable disclosures with proper ARIA, anchor deep-linking, and a useful side feature (ICS download) that justifies the page beyond decoration. It is the most "system-y" page and showcases data structure as much as interaction.

## Goals

1. Demonstrate ARIA tablist and disclosure patterns to textbook quality.
2. Hold zero CLS on expand — reserved space pre-computed at build.
3. Add a single utility worth defending: per-session ICS download.

## Scope

### In scope

- `src/content/schedule.ts` — 3 days × ~10 sessions; each has start, end, track, speaker slug(s), title, abstract, slug.
- `DayTabs.tsx` (ARIA tablist).
- `ScheduleTable.tsx` (time column + session grid, hairline rules).
- `SessionRow.tsx` (expandable disclosure, anchor `id`, "Add to calendar" link).
- `lib/ics.ts` — RFC-5545 .ics generator.
- Track filter chips (reused pattern from P4).
- Unit tests for invariants + ICS output.
- E2E for keyboard navigation, expand/collapse, anchor deep-links, filter, locale toggle.

### Out of scope

- Full speaker pages from session titles (sheet pattern from P4 can be reused if desired but not required for v1).
- Live "now playing" indicator.

## Architecture

```
src/
├── app/[locale]/schedule/page.tsx
├── components/schedule/
│   ├── DayTabs.tsx
│   ├── ScheduleTable.tsx
│   └── SessionRow.tsx
├── content/schedule.ts
├── lib/
│   ├── ics.ts                       ← .ics generator
│   └── schedule.ts                  ← sortByStart, hasOverlap, filterByTrack
└── i18n/messages/{uk,en}.json       ← + schedule, days, tracks, addToCalendar
tests/
├── unit/lib/{ics,schedule}.test.ts
├── unit/content/schedule.test.ts
└── e2e/schedule.spec.ts
```

## Test Strategy

**TDD ladder**:

- `sortByStart` returns sessions in ascending start order.
- `hasOverlap(sessions, track)` returns false for valid data, true for crafted-overlap fixtures.
- ICS output for one session is valid (parseable) and contains DTSTART, DTEND, SUMMARY, DESCRIPTION, UID.

**E2E**:

- Day 01 → Day 02 via click and via arrow keys; ARIA `selected` reflects state.
- `/uk/schedule#talk-keynote` scrolls + auto-expands.
- Expand/collapse via Enter and Space.
- Filter "ENGINEERING" hides design sessions across all 3 days.
- Click "Add to calendar" triggers download of `.ics` file (Playwright captures download).

## Dependencies

### Depends on

- PHASE-03 mold; PHASE-04 reuses tracks taxonomy.

## Open Questions

1. Time format `14:30` (24h) vs `2:30 PM`? (Decision: 24h — matches Ukrainian + European convention; mono-friendly.)
2. Should ICS contain venue address? (Decision: yes — pulled from `content/venue.ts` once P7 lands; placeholder until then.)
