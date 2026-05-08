---
id: "PHASE-06"
title: "Tickets + FAQ — Plan"
status: proposed
---

# Phase 06: Execution Plan

## Task Breakdown

| #   | Task                                                                                        | Est. days | Priority | Owner |
| --- | ------------------------------------------------------------------------------------------- | --------- | -------- | ----- |
| 6.1 | TDD: invariants test for `content/tickets.ts`                                               | 0.1       | P0       | ai    |
| 6.2 | Author 3 tiers with features + 8–10 FAQ entries (UA + EN)                                   | 0.4       | P0       | ai    |
| 6.3 | `PricingGrid.tsx` 3-col layout with `MOST POPULAR` tag on STANDARD                          | 0.3       | P0       | ai    |
| 6.4 | Sticky mobile CTA bar                                                                       | 0.2       | P0       | ai    |
| 6.5 | `FAQAccordion.tsx` composing P1 `Accordion` (single-open)                                   | 0.2       | P0       | ai    |
| 6.6 | Wire `[locale]/tickets/page.tsx`                                                            | 0.2       | P0       | ai    |
| 6.7 | E2E `tests/e2e/tickets.spec.ts` — CTA target/rel, accordion behavior, sticky CTA breakpoint | 0.3       | P0       | ai    |

**Total estimate**: ~2 working days.

## Risk Register

| #   | Risk                               | Probability | Impact | Mitigation                                                            |
| --- | ---------------------------------- | ----------- | ------ | --------------------------------------------------------------------- |
| 1   | Sticky CTA covers form/footer      | medium      | low    | `position: sticky; bottom: 0; z-index: 50;`; manual responsive check. |
| 2   | UAH formatting differs UA vs EN    | medium      | low    | Use `Intl.NumberFormat` keyed on locale.                              |
| 3   | FAQ content shallow / not credible | medium      | medium | Sample real conference FAQ pages for canonical questions.             |

## Technical Approach

- Server component for the grid + FAQ static data; client island only for accordion open state.
- Sticky CTA is a client component reading `useMediaQuery` to render only on narrow viewports.

## Effort Estimate

- **Total**: 2 days. Critical path 6.1 → 6.2 → 6.3 → 6.5 → 6.7.
