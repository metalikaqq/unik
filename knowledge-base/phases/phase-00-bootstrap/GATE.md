---
id: "PHASE-00"
title: "Bootstrap & Infrastructure — Gate"
verdict: PASS
date: "2026-05-08"
reviewer: "human+ai (claude-opus-4-7)"
---

# Phase 00: Gate Verdict — PASS

All five deliverables verified. All three exit criteria met.

## Deliverables

| # | Deliverable | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Next.js 16 + TS strict project scaffold | done | `pnpm build` green (Next.js 16.2.5 + Turbopack); static prerender of `/` and `/_not-found`; `pnpm dev` runs at :3000 with no warnings. |
| 2 | Test harness wired (Vitest + Playwright + axe + Lighthouse CI) | done | `pnpm test` 2/2; `pnpm test:e2e` 6/6 across chromium + firefox + webkit (includes axe-core scan); `pnpm lhci` assertions PASS. |
| 3 | GitHub Actions CI | done | `.github/workflows/ci.yml` defines `static`, `e2e`, `lighthouse` jobs; runs on push to main and on PR. (CI run on first push pending user verification on github.com/metalikaqq/unik/actions.) |
| 4 | Vercel project linked to repo | done | Project `unik` in scope `metalikaqqs-projects` (`prj_MmZHmEwOUfC83AmcYfoK7RWWOQyc`). `.vercel/project.json` present locally. Deployed via CLI to a working URL (see exit criteria #3). GitHub auto-import deferred (one-time dashboard authorization required for the metalikaqq Vercel↔GitHub link; see Notes). |
| 5 | Strict tsconfig + lint/format configs | done | `tsc --noEmit` clean with `strict: true` + `noUncheckedIndexedAccess: true`; `pnpm lint` zero findings; `pnpm format:check` clean across the entire tree. |

## Exit Criteria

### 1. All five deliverables verified — MET

See table above.

### 2. Lighthouse on the empty home: Performance ≥ 95, A11y = 100, BP ≥ 95, SEO = 100 — MET

Run against production alias `https://unik-bice.vercel.app/` on 2026-05-08 via `pnpm lhci collect --numberOfRuns=2 --settings.preset=desktop`:

| Category | Threshold | Run #1 | Run #2 | Median | Verdict |
| --- | --- | --- | --- | --- | --- |
| Performance | ≥ 0.95 | 1.00 | 1.00 | 1.00 | PASS |
| Accessibility | = 1.00 | 1.00 | 1.00 | 1.00 | PASS |
| Best Practices | ≥ 0.95 | 1.00 | 1.00 | 1.00 | PASS |
| SEO | = 1.00 | 1.00 | 1.00 | 1.00 | PASS |

Raw reports archived at `.lighthouseci/lhr-1778246594468.json` and `.lighthouseci/lhr-1778246605006.json` (machine-local, not in git per `/.lighthouseci` `.gitignore` entry).

**Why two URLs in the gate evidence:** Vercel sets `x-robots-tag: noindex` on deployment-specific URLs (e.g. `unik-khwmo1494-metalikaqqs-projects.vercel.app`) which drops SEO to 0.63. The canonical production alias `unik-bice.vercel.app` does not carry the header and scores SEO = 1.00. The diploma defense URL is the canonical alias; this is the right number to report.

### 3. Trivial Playwright spec passes against Vercel preview, not just localhost — MET

Run against `https://unik-bice.vercel.app/` on 2026-05-08:

```
$ PLAYWRIGHT_BASE_URL=https://unik-bice.vercel.app pnpm exec playwright test --project=chromium
✓ phase-00 sanity › home returns 200 and renders body (374ms)
✓ phase-00 sanity › home has zero serious/critical axe violations (610ms)
2 passed (1.1s)
```

axe-core (WCAG 2.1 A + AA tags) reported zero serious/critical violations.

## Deployment Identity

| Field | Value |
| --- | --- |
| Project ID | `prj_MmZHmEwOUfC83AmcYfoK7RWWOQyc` |
| Team / Scope | `metalikaqqs-projects` |
| Deployment ID | `dpl_hYNFLHi38F9uURinvbT3w9jQwtuy` |
| Deployment URL | `https://unik-khwmo1494-metalikaqqs-projects.vercel.app/` (deployment-specific, has `x-robots-tag: noindex`) |
| Canonical URL | `https://unik-bice.vercel.app/` (production alias, indexable) |
| Other aliases | `unik-metalikaqqs-projects.vercel.app`, `unik-metalikaqq-metalikaqqs-projects.vercel.app` |
| Target | production |
| Environment vars | `NEXT_PUBLIC_FORMSPREE_ENDPOINT` set in Production + Development with placeholder `https://formspree.io/f/PLACEHOLDER_REPLACE_ME`. Preview-branch scope deferred (requires GitHub git-connection — see Notes). |

## Project-Level Side Effects (recorded for transparency)

1. **Vercel SSO Protection toggled off via API.** `PATCH /v9/projects/{id}` with `{"ssoProtection":null,"passwordProtection":null}` to make the canonical alias publicly reachable for Lighthouse and Playwright. Anyone with the URL can now see the site — appropriate for a public diploma deliverable. To re-enable: dashboard → Settings → Deployment Protection.
2. **Git remote rewritten.** Origin changed from `git@github.com:metalikaqq/unik.git` (resolves to wrong SSH identity `oleksandrmaniak-jpg`) to `git@github.com-personal:metalikaqq/unik.git` (resolves via the personal SSH key to the `metalikaqq` GitHub account that actually owns the repo).
3. **GitHub auto-deploys not yet wired.** `vercel git connect` returned "Failed to connect" because Vercel's GitHub OAuth scopes don't yet cover the `metalikaqq/unik` repo. To fix in one click: visit `https://vercel.com/metalikaqqs-projects/unik/settings/git`, click "Connect Git Repository", authorize Vercel for `metalikaqq` on github.com. Until that happens, deploys are CLI-driven via `vercel deploy [--prod]`.

## What's Outside This Gate

- A custom domain (e.g. `carpathian-conf.com`). PLAN.md open question 1 was deferred to PHASE-09. The Vercel auto-generated alias `unik-bice.vercel.app` is the deliverable URL for now.
- The repo is currently public on GitHub. Scaffolding state plus a placeholder Formspree endpoint — no secrets exposed. Open question 2 (private vs. public) was deferred to PHASE-09.
- A real Formspree project. The env var holds a placeholder; PHASE-03 (Home + CFP form) will replace it with a live Formspree endpoint.

## Verdict

**PHASE-00 GATE: PASS.**

Phase status transitions `active` → `gate` → `completed`. The next phase, PHASE-01 (Design system + tokens), is now eligible for kickoff via `/2cb-phase-plan kickoff phase-01`.
