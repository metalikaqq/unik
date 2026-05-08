---
id: "PHASE-07"
title: "Venue — Plan"
status: proposed
---

# Phase 07: Execution Plan

## Task Breakdown

| #   | Task                                                                        | Est. days | Priority | Owner |
| --- | --------------------------------------------------------------------------- | --------- | -------- | ----- |
| 7.1 | TDD: invariants test for `content/venue.ts`                                 | 0.1       | P0       | ai    |
| 7.2 | Author venue + 3–4 hotels + transit + restaurants + weather in both locales | 0.4       | P0       | ai    |
| 7.3 | `VenueMap.tsx` with OSM iframe + static fallback                            | 0.3       | P0       | ai    |
| 7.4 | `TravelInfo.tsx` `<dl>` semantic list                                       | 0.2       | P0       | ai    |
| 7.5 | Source 6–8 Uzhhorod photos (Unsplash) with attribution                      | 0.3       | P0       | ai    |
| 7.6 | `Gallery.tsx` + `Lightbox.tsx` keyboard-cycling                             | 0.5       | P0       | ai    |
| 7.7 | Wire `[locale]/venue/page.tsx`                                              | 0.2       | P0       | ai    |
| 7.8 | E2E `tests/e2e/venue.spec.ts` — map fallback, lightbox, external rel        | 0.4       | P0       | ai    |

**Total estimate**: ~2 working days.

## Risk Register

| #   | Risk                                         | Probability | Impact | Mitigation                                                              |
| --- | -------------------------------------------- | ----------- | ------ | ----------------------------------------------------------------------- |
| 1   | OSM iframe blocked in some networks          | medium      | low    | Static image fallback always preloaded; switch on iframe `onerror`.     |
| 2   | Lightbox keyboard cycle traps focus on close | medium      | high   | Cover by E2E focus assertion; manual keyboard pass.                     |
| 3   | Photo attribution missing → license risk     | low         | medium | Hard-code attributions in `content/venue.ts`; render in gallery footer. |

## Technical Approach

- Server component for static info, client island for `Lightbox` open state.
- Map iframe is a single `<iframe>`; the fallback is a `<picture>` with the same dimensions reserved.

## Effort Estimate

- **Total**: 2 days. Critical path 7.1 → 7.2 → 7.6 → 7.8.
