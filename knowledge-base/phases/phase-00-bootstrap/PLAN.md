---
id: "PHASE-00"
title: "Bootstrap & Infrastructure — Plan"
status: proposed
---

# Phase 00: Execution Plan

## Task Breakdown

| #    | Task                                                                                                                                                                                                 | Est. days | Priority | Dependencies | Owner |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- | ------------ | ----- |
| 0.1  | `pnpm create next-app` with TS, App Router, Tailwind, ESLint, `src` dir, `@/*` alias, pnpm                                                                                                           | 0.1       | P0       | --           | ai    |
| 0.2  | Install runtime + dev deps (next-intl, framer-motion, react-hook-form, zod, hookform/resolvers, clsx, lucide-react, vitest, testing-library, jsdom, playwright, axe-core/playwright, lhci, prettier) | 0.1       | P0       | 0.1          | ai    |
| 0.3  | Tighten `tsconfig.json` (`strict`, `noUncheckedIndexedAccess`); `.nvmrc` 22; `.prettierrc`; `.editorconfig`                                                                                          | 0.1       | P0       | 0.1          | ai    |
| 0.4  | `vitest.config.ts` with React plugin, jsdom env, coverage threshold = 80 % on `lib/`, `hooks/`, `i18n/`, `content/`                                                                                  | 0.2       | P0       | 0.2          | ai    |
| 0.5  | `playwright.config.ts` with Chromium + Firefox + Webkit projects, `webServer` running `pnpm start`, `tests/e2e` testDir, video on retain-on-failure, screenshot on failure                           | 0.2       | P0       | 0.2          | ai    |
| 0.6  | `lighthouserc.json` with per-route budgets (Perf ≥ 95, A11y = 100, BP ≥ 95, SEO = 100)                                                                                                               | 0.2       | P0       | 0.2          | ai    |
| 0.7  | Add npm scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test`, `test:watch`, `test:e2e`, `lhci`                                                                                    | 0.1       | P0       | 0.4-0.6      | ai    |
| 0.8  | Trivial sanity tests (one Vitest, one Playwright) — TDD demonstrates harness alive                                                                                                                   | 0.2       | P0       | 0.4-0.5      | ai    |
| 0.9  | `.github/workflows/ci.yml` running pnpm install → lint → typecheck → vitest → playwright → lhci on PRs and pushes to `main`                                                                          | 0.3       | P0       | 0.7-0.8      | ai    |
| 0.10 | Link repo to Vercel project; configure pnpm build, Node 22, `NEXT_PUBLIC_FORMSPREE_ENDPOINT` placeholder                                                                                             | 0.2       | P0       | 0.1          | human |
| 0.11 | Push branch, verify CI green, verify Vercel preview URL serves default page                                                                                                                          | 0.2       | P0       | 0.9-0.10     | human |
| 0.12 | Run Lighthouse against the Vercel preview URL; record numbers in GATE.md                                                                                                                             | 0.1       | P0       | 0.11         | ai    |

**Total estimate**: ~2 working days (0.5 calendar weeks with buffer).

## Risk Register

| #   | Risk                                              | Probability | Impact | Mitigation                                                                             |
| --- | ------------------------------------------------- | ----------- | ------ | -------------------------------------------------------------------------------------- |
| 1   | Tailwind v4 + Next 16 surprise interactions in CI | low         | medium | Pin major versions in `package.json`; CI catches regression on first PR.               |
| 2   | Playwright browser download on CI bloats minutes  | medium      | low    | Cache `~/.cache/ms-playwright` in Actions; skip Webkit on CI if needed (keep locally). |
| 3   | LHCI flakes on cold-start LCP                     | medium      | medium | Run twice and take median; allow ±2 points slack on Performance.                       |
| 4   | Vercel free-tier build limits                     | low         | medium | Stay on default Node 22, single function size; document in report.                     |

## Technical Approach

- **Architecture**: pure Next.js 16 default + minimal harness around it. No custom abstractions until they earn their place in P1+.
- **Patterns**: pnpm scripts as the single entry point; CI mirrors local exactly.
- **Testing strategy**: TDD ladder starts at P1 — P0 only proves the harness, no production-code tests yet.

## Effort Estimate

- **Total estimated days**: 2
- **Calendar weeks (with buffer)**: 0.5
- **Critical path tasks**: 0.1 → 0.2 → 0.4 → 0.5 → 0.8 → 0.9 → 0.10 → 0.11 → 0.12

## Dependencies Check

| Dependency                    | Status           | Blocker?                                    |
| ----------------------------- | ---------------- | ------------------------------------------- |
| Node 22 installed             | available (mise) | no                                          |
| pnpm 11 installed             | available        | no                                          |
| GitHub repo `metalikaqq/unik` | available        | no                                          |
| Vercel free Hobby account     | TBD by user      | possibly — required by 0.10                 |
| Formspree free account        | TBD by user      | no — placeholder env var only at this phase |
