---
id: "PHASE-04"
title: "Speakers — Plan"
status: proposed
---

# Phase 04: Execution Plan

## Task Breakdown

| #    | Task                                                                                         | Est. days | Priority | Owner |
| ---- | -------------------------------------------------------------------------------------------- | --------- | -------- | ----- |
| 4.1  | TDD: content invariants test (`tests/unit/content/speakers.test.ts`)                         | 0.2       | P0       | ai    |
| 4.2  | Extend `content/speakers.ts` to 18–24 entries with UA + EN                                   | 0.5       | P0       | ai    |
| 4.3  | Source / generate 24 portraits at 800×800 (AVIF + WebP)                                      | 0.4       | P0       | ai    |
| 4.4  | TDD: `filterByTrack` in `lib/speakers.ts`                                                    | 0.2       | P0       | ai    |
| 4.5  | `SpeakerCard.tsx` with explicit dimensions, hover/focus reveal                               | 0.3       | P0       | ai    |
| 4.6  | `SpeakerGrid.tsx` responsive 2/3/4-col                                                       | 0.3       | P0       | ai    |
| 4.7  | Filter chips with track state                                                                | 0.3       | P0       | ai    |
| 4.8  | `SpeakerSheet.tsx` composing P1 `Sheet` with bio body                                        | 0.4       | P0       | ai    |
| 4.9  | Wire all into `[locale]/speakers/page.tsx`                                                   | 0.2       | P0       | ai    |
| 4.10 | E2E `tests/e2e/speakers.spec.ts` — grid, sheet open/close, focus trap, filter, locale toggle | 0.5       | P0       | ai    |
| 4.11 | Verify CLS < 0.05 on Vercel preview                                                          | 0.1       | P0       | ai    |

**Total estimate**: ~3 working days.

## Risk Register

| #   | Risk                                                         | Probability | Impact | Mitigation                                                                             |
| --- | ------------------------------------------------------------ | ----------- | ------ | -------------------------------------------------------------------------------------- |
| 1   | Portrait generation produces non-diverse / off-style results | medium      | low    | Curate; reject any that look generic.                                                  |
| 2   | Image weight blows bundle                                    | medium      | high   | AVIF first, WebP fallback; lazy-load below-the-fold; explicit dimensions.              |
| 3   | Sheet focus trap breaks on touch devices                     | medium      | medium | Manual test on iPhone simulator; ensure backdrop is touch-tappable.                    |
| 4   | Filter state lost on locale toggle                           | medium      | low    | Filter is purely visual; locale toggle is a fresh navigation; document expected reset. |

## Technical Approach

- Server component for the grid (static), client island only for filter state + sheet open state.
- Sheet content keyed by speaker slug to allow deep linking later if desired.

## Effort Estimate

- **Total**: 3 days. Critical path 4.1 → 4.2 → 4.6 → 4.8 → 4.10.

## Dependencies Check

| Dependency                 | Status | Blocker? |
| -------------------------- | ------ | -------- |
| PHASE-03 vertical slice    | TBD    | yes      |
| PHASE-01 `Sheet` primitive | TBD    | yes      |
