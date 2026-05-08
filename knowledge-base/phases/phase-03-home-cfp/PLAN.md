---
id: "PHASE-03"
title: "Home + CFP Form — Plan"
status: proposed
---

# Phase 03: Execution Plan

## Task Breakdown

| #    | Task                                                                                                  | Est. days | Priority | Dependencies | Owner |
| ---- | ----------------------------------------------------------------------------------------------------- | --------- | -------- | ------------ | ----- |
| 3.1  | TDD: Zod CFP schema in `lib/validators.ts` (`tests/unit/lib/validators.test.ts`)                      | 0.3       | P0       | --           | ai    |
| 3.2  | TDD: slugify w/ Cyrillic in `lib/format.ts` (`tests/unit/lib/format.test.ts`)                         | 0.3       | P0       | --           | ai    |
| 3.3  | Mock data in `content/speakers.ts` (6 speakers, UA + EN bios, type-safe `Speaker`)                    | 0.3       | P0       | --           | ai    |
| 3.4  | i18n keys for home, manifesto, cfp, errors in `messages/{uk,en}.json`                                 | 0.3       | P0       | --           | ai    |
| 3.5  | `Hero.tsx` composition (mega headline manual line breaks, mono caption, dates, accent block)          | 0.5       | P0       | 3.4          | ai    |
| 3.6  | Wire `MarqueeText` into hero strip                                                                    | 0.2       | P0       | 3.5          | ai    |
| 3.7  | `Manifesto.tsx` 3-column block with hairline rules                                                    | 0.3       | P0       | 3.4          | ai    |
| 3.8  | `HeadlineSpeakers.tsx` 4 featured tiles linking to `/[locale]/speakers`                               | 0.4       | P0       | 3.3          | ai    |
| 3.9  | `CFPForm.tsx` — RHF + Zod + Formspree, success/error states, honeypot, `?mock=1` fallback             | 0.8       | P0       | 3.1          | ai    |
| 3.10 | Compose `[locale]/page.tsx` Home                                                                      | 0.2       | P0       | 3.5-3.9      | ai    |
| 3.11 | OG image (1200×630 brutalist composition) + favicon SVG                                               | 0.3       | P1       | 3.5          | ai    |
| 3.12 | `metadata` export with title / desc / OG / Twitter                                                    | 0.2       | P0       | 3.11         | ai    |
| 3.13 | Component test for `CFPForm` (errors, success, error+retry, honeypot)                                 | 0.4       | P0       | 3.9          | ai    |
| 3.14 | E2E `tests/e2e/home.spec.ts` — render + form happy path + form error path + honeypot + reduced motion | 0.5       | P0       | 3.10         | ai    |
| 3.15 | Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel; deploy preview; manual submit test                    | 0.2       | P0       | human action | human |
| 3.16 | Run Lighthouse against Vercel preview; record numbers; assert budgets met                             | 0.2       | P0       | 3.15         | ai    |

**Total estimate**: ~5 working days (1.0 calendar week).

## Risk Register

| #   | Risk                                                    | Probability | Impact | Mitigation                                                                            |
| --- | ------------------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------- |
| 1   | Hero LCP > 2.5 s due to font swap                       | medium      | high   | `next/font` with `display: swap` + size-adjust fallback; preload primary weight only. |
| 2   | Formspree free quota burned by E2E runs                 | medium      | medium | E2E always mocks `fetch`; never hits real endpoint. Document in README.               |
| 3   | Cyrillic slugify edge cases (apostrophe ʼ, soft sign ь) | medium      | low    | Test cases cover both; iconv-lite-style transliteration table in `format.ts`.         |
| 4   | Manifesto copy not native-quality UA                    | medium      | medium | Hold a 30-min review with a Ukrainian-native reader before P9.                        |
| 5   | Form not visible above the fold on 375 px               | low         | low    | Hero collapses below CFP CTA on mobile; manual responsive check.                      |

## Technical Approach

- **Patterns**: server components for Hero/Manifesto/HeadlineSpeakers (static); `CFPForm` is a client component.
- **Form UX**: pessimistic submit (no optimistic UI — user must see real outcome). Inline validation on blur, error summary on submit.
- **Reduced motion**: hero marquee uses CSS `animation: none` under media query; no Framer Motion variants on the home v1.
- **Bundle discipline**: dynamic-import RHF + Zod in CFPForm only; do not pull them into server tree.

## Effort Estimate

- **Total estimated days**: 5
- **Calendar weeks (with buffer)**: 1.0
- **Critical path**: 3.1 → 3.9 → 3.10 → 3.14 → 3.15 → 3.16

## Dependencies Check

| Dependency                | Status | Blocker?                   |
| ------------------------- | ------ | -------------------------- |
| PHASE-02 shell            | TBD    | yes                        |
| Formspree free account    | TBD    | partial — only blocks 3.15 |
| Vercel env var configured | TBD    | partial — only blocks 3.15 |
