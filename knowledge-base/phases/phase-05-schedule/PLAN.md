---
id: "PHASE-05"
title: "Schedule — Plan"
status: proposed
---

# Phase 05: Execution Plan

## Task Breakdown

| #    | Task                                                                             | Est. days | Priority | Owner |
| ---- | -------------------------------------------------------------------------------- | --------- | -------- | ----- |
| 5.1  | Schema + invariants test for `content/schedule.ts`                               | 0.2       | P0       | ai    |
| 5.2  | Author 30 mock sessions across 3 days × 3 tracks (UA + EN)                       | 0.6       | P0       | ai    |
| 5.3  | TDD: `sortByStart`, `hasOverlap`, `filterByTrack` in `lib/schedule.ts`           | 0.3       | P0       | ai    |
| 5.4  | TDD: `lib/ics.ts` RFC-5545 generator with one-session test                       | 0.4       | P0       | ai    |
| 5.5  | `DayTabs.tsx` ARIA tablist with arrow-key nav                                    | 0.4       | P0       | ai    |
| 5.6  | `ScheduleTable.tsx` time-column grid with hairline rules                         | 0.4       | P0       | ai    |
| 5.7  | `SessionRow.tsx` expandable disclosure with anchor `id` and ICS link             | 0.4       | P0       | ai    |
| 5.8  | Track filter chips wired                                                         | 0.2       | P1       | ai    |
| 5.9  | Compose `[locale]/schedule/page.tsx`                                             | 0.2       | P0       | ai    |
| 5.10 | E2E `tests/e2e/schedule.spec.ts` — tabs, expand, deep-link, filter, ICS download | 0.5       | P0       | ai    |

**Total estimate**: ~3 working days.

## Risk Register

| #   | Risk                                                    | Probability | Impact | Mitigation                                                                                                                     |
| --- | ------------------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 1   | ICS encoding issues on Cyrillic SUMMARY                 | medium      | low    | UTF-8 + line-folding per RFC-5545 §3.1; test fixture with Cyrillic title.                                                      |
| 2   | Layout shift on expand                                  | medium      | high   | Pre-render abstract content with `display: grid; grid-template-rows: 0fr` ↔ `1fr` trick (or `details/summary`); CLS unchanged. |
| 3   | Anchor deep-link doesn't auto-expand on first paint     | medium      | medium | On mount, read `window.location.hash` and call `setOpen(slug)` before next paint.                                              |
| 4   | Tablist arrow keys conflict with filter chip navigation | medium      | low    | Different roving tabindex groups; manual tab order test.                                                                       |

## Technical Approach

- Static data, server component for the table, client-only state for selected day + open rows + filter.
- Anchor deep-links restored via `useEffect` reading `location.hash` on mount.
- ICS generation purely client-side (`Blob` + `URL.createObjectURL`).

## Effort Estimate

- **Total**: 3 days. Critical path 5.1 → 5.2 → 5.6 → 5.7 → 5.10.
