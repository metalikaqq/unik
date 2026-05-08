---
id: "PHASE-08"
title: "A11y + Perf Hardening — Plan"
status: proposed
---

# Phase 08: Execution Plan

## Task Breakdown

| #    | Task                                                                    | Est. days | Priority | Owner      |
| ---- | ----------------------------------------------------------------------- | --------- | -------- | ---------- |
| 8.1  | Keyboard-only walkthrough on every page × locale; log issues            | 0.5       | P0       | human + ai |
| 8.2  | Fix focus traps + add focus rings where missing                         | 0.3       | P0       | ai         |
| 8.3  | `tests/e2e/a11y.spec.ts` looping every route × locale × axe             | 0.4       | P0       | ai         |
| 8.4  | Fix every serious / critical axe violation                              | 0.4       | P0       | ai         |
| 8.5  | Contrast audit with Stark/Polypane; fix any failure                     | 0.2       | P0       | human      |
| 8.6  | Image audit: convert to AVIF/WebP, set explicit dims, lazy below-fold   | 0.3       | P0       | ai         |
| 8.7  | Font subset audit; trim unused weights from `next/font` config          | 0.2       | P1       | ai         |
| 8.8  | `app/sitemap.ts` per-locale generator + unit test                       | 0.2       | P0       | ai         |
| 8.9  | `app/robots.ts` allowing all, pointing at sitemap                       | 0.05      | P0       | ai         |
| 8.10 | `app/manifest.webmanifest` + theme-color meta                           | 0.1       | P1       | ai         |
| 8.11 | `lighthouserc.json` with per-route budgets                              | 0.2       | P0       | ai         |
| 8.12 | Update CI workflow to run `lhci autorun` after Playwright               | 0.2       | P0       | ai         |
| 8.13 | `tests/e2e/reduced-motion.spec.ts` with Playwright context option       | 0.3       | P0       | ai         |
| 8.14 | Run full Lighthouse on every route on Vercel; record numbers in GATE.md | 0.2       | P0       | ai         |
| 8.15 | Iterate on any route below budget until all pass                        | 0.4       | P0       | ai         |

**Total estimate**: ~3 working days.

## Risk Register

| #   | Risk                                             | Probability | Impact | Mitigation                                                |
| --- | ------------------------------------------------ | ----------- | ------ | --------------------------------------------------------- |
| 1   | Performance regresses on real Vercel network     | medium      | high   | LHCI runs on Vercel preview, not just localhost.          |
| 2   | A11y fix introduces visual regression            | medium      | medium | Re-run Playwright visual smoke + screenshot diff.         |
| 3   | Cyrillic font subset trimming breaks rare glyphs | medium      | medium | Test fixture with full Ukrainian alphabet + apostrophe ʼ. |
| 4   | Lighthouse mobile scores fluctuate               | medium      | medium | Median-of-3; allow ±2 slack on Performance.               |

## Technical Approach

- Audit-driven: every fix references the axe rule ID or Lighthouse audit name in the commit message.
- Hardening commits stay small and atomic.
- LHCI configured both for CI gate and for manual artifact capture (HTML reports for the report).

## Effort Estimate

- **Total**: 3 days. Critical path 8.1–8.4, then 8.11–8.15.
