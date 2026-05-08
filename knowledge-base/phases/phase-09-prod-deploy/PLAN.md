---
id: "PHASE-09"
title: "Production Polish + Final Deploy — Plan"
status: proposed
---

# Phase 09: Execution Plan

## Task Breakdown

| #    | Task                                                                                                     | Est. days      | Priority | Owner |
| ---- | -------------------------------------------------------------------------------------------------------- | -------------- | -------- | ----- |
| 9.1  | Native UA copy review with non-author reader                                                             | 0.4            | P0       | human |
| 9.2  | Apply review nits (typography, idiom, comma policy)                                                      | 0.2            | P0       | ai    |
| 9.3  | Security headers in `next.config.ts` (CSP nonce-based, HSTS, X-CTO, Referrer-Policy, Permissions-Policy) | 0.4            | P0       | ai    |
| 9.4  | Manual nav across every route to verify CSP blocks no legitimate asset                                   | 0.2            | P0       | human |
| 9.5  | Promote to production deploy on Vercel from `main`                                                       | 0.1            | P0       | human |
| 9.6  | securityheaders.com check; iterate until ≥ A                                                             | 0.2            | P0       | ai    |
| 9.7  | 24h smoke, watch Vercel logs                                                                             | 0.5 (calendar) | P0       | human |
| 9.8  | Re-run LHCI against production URL                                                                       | 0.1            | P0       | ai    |
| 9.9  | Verify `?mock=1` path on production for in-class demos                                                   | 0.05           | P0       | ai    |
| 9.10 | README final pass                                                                                        | 0.3            | P0       | ai    |
| 9.11 | Tag `v1.0.0`, push, create GitHub release with changelog excerpt                                         | 0.1            | P0       | human |

**Total estimate**: ~2 working days (plus 0.5 calendar day passive smoke).

## Risk Register

| #   | Risk                                     | Probability | Impact | Mitigation                                                                                |
| --- | ---------------------------------------- | ----------- | ------ | ----------------------------------------------------------------------------------------- |
| 1   | CSP blocks Formspree XHR                 | high        | high   | Add Formspree origin to `connect-src` whitelist; manual test.                             |
| 2   | Native UA reviewer unavailable in window | medium      | medium | Identify reviewer at start of P0; book a call before P9.                                  |
| 3   | Security header misconfig breaks fonts   | medium      | medium | Test header output before promote; whitelist `fonts.googleapis.com`, `fonts.gstatic.com`. |
| 4   | 5xx spike during smoke                   | low         | medium | Investigate immediately; rollback via `vercel rollback`.                                  |

## Technical Approach

- CSP uses nonce-based `script-src` per project rules; nonce per request via Next middleware.
- HSTS `max-age=31536000; includeSubDomains; preload` (no preload submission required for diploma).
- `Permissions-Policy` denies camera, microphone, geolocation by default.

## Effort Estimate

- **Total**: 2 days. Critical path 9.1 → 9.3 → 9.5 → 9.6 → 9.10 → 9.11.
