---
id: "PHASE-09"
title: "Production Polish + Final Deploy"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: infrastructure
dependencies: ["PHASE-08"]
blocked_by: []
deliverables:
  - name: "Final UA + EN copy pass (native UA review by a Ukrainian-native reader)"
    status: pending
    verification: "Reviewer's name + date logged in /report/.; remaining nits committed."
  - name: "Security headers via next.config.ts (CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)"
    status: pending
    verification: "Output of securityheaders.com on production URL ≥ A grade."
  - name: "Production deploy from main on Vercel"
    status: pending
    verification: "Production URL stable, no 5xx for 24h smoke."
  - name: "v1.0.0 git tag + GitHub release"
    status: pending
    verification: "Tag pushed; release notes mirror changelog/2026-05.md."
  - name: "Formspree quota documented + mock fallback path verified"
    status: pending
    verification: "/uk?mock=1 success path manually confirmed; quota note in README."
exit_criteria:
  - criterion: "Production URL stable for 24h with zero 5xx (Vercel logs reviewed)."
    met: false
    evidence: null
  - criterion: "securityheaders.com grade ≥ A."
    met: false
    evidence: null
  - criterion: "CSP doesn't block any legitimate asset (Lighthouse + manual nav)."
    met: false
    evidence: null
  - criterion: "All Lighthouse routes still meet P8 budgets on production URL."
    met: false
    evidence: null
tags: ["deploy", "security", "release"]
estimated_weeks: 0.4
actual_weeks: null
confidence_score: null
---

# Phase 09: Production Polish + Final Deploy

## Problem Statement

P0–P8 produce a production-ready Vercel preview. P9 promotes to a stable production URL the supervisor can defend, hardens security headers, and tags v1.0.0 so the diploma artifact has a permanent reference point.

## Goals

1. Promote the site to a stable production URL.
2. Security-headers grade ≥ A on `securityheaders.com`.
3. Tag and document v1.0.0 as the diploma artifact.

## Scope

### In scope

- Native UA copy review with a reader who is not the author.
- `next.config.ts` `headers()` returning CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Vercel production deploy from `main`; preview from PRs unchanged.
- `v1.0.0` git tag + GitHub release.
- README final pass: stack, scripts, deploy, accessibility statement, screenshots.
- Confirm Formspree mock fallback path (`?mock=1`) works in production.

### Out of scope

- New features.
- Custom domain (using `*.vercel.app`).

## Architecture

```
next.config.ts                                        ← headers()
.github/workflows/release.yml                         ← optional tag-on-merge
README.md                                             ← final pass
```

## Test Strategy

- Manual: `securityheaders.com` against production URL.
- Manual: 24h smoke, watch Vercel logs for any 5xx.
- Re-run LHCI from P8 against production URL — must still pass.
- Manual `?mock=1` test on production for demo readiness.

## Dependencies

### Depends on

- PHASE-08 (numbers locked).

## Open Questions

1. Should we add a `Cache-Control: public, max-age=*` policy beyond Vercel defaults? (Decision: trust Vercel defaults; document in report.)
2. Add a tiny analytics (Plausible / Simple Analytics)? (Decision: no — privacy-clean for Ukrainian academic context; defense narrative is "user-centered, not user-tracked".)
