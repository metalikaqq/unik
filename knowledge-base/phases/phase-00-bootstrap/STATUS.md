---
id: "PHASE-00"
title: "Bootstrap & Infrastructure — Status"
status: active
last_updated: "2026-05-08"
---

# Phase 00: Status

## Task Progress

| # | Task | Status | Notes |
| --- | --- | --- | --- |
| 0.1 | `pnpm create next-app` | done | Pre-done before phase planning. Re-verified: `pnpm install --frozen-lockfile` clean; `next build` green. |
| 0.2 | Install runtime deps | done | Pre-done. All 7 runtime deps from SPEC present in `package.json`. |
| 0.3 | Strict `tsconfig.json` + dotfiles | done | Added `noUncheckedIndexedAccess: true`. Wrote `.nvmrc` (`22`), `.prettierrc.json`, `.editorconfig`, `.prettierignore`. `tsc --noEmit` clean. |
| 0.3a | Install dev deps + pnpm allowlist | done (PLAN.md amendment) | Installed vitest 4, @vitejs/plugin-react, @testing-library/{react,jest-dom}, jsdom, @vitest/coverage-v8, @playwright/test, @axe-core/playwright, @lhci/cli, prettier. Added `pnpm.onlyBuiltDependencies` allowlist (`@parcel/watcher`, `@swc/core`, `sharp`, `unrs-resolver`); ran `pnpm approve-builds --all` so `pnpm exec` no longer trips the deps-status check. |
| 0.4 | `vitest.config.ts` | done | jsdom env, React plugin, `@/` alias, coverage v8 with 80% thresholds on lib/hooks/i18n/content. Setup file imports jest-dom matchers. |
| 0.5 | `playwright.config.ts` | done | Chromium + Firefox + WebKit projects (WebKit skipped only on CI per PLAN.md risk #2). webServer runs `pnpm start`. video=retain-on-failure, screenshot=only-on-failure. |
| 0.6 | `lighthouserc.json` | done | Per-route assertions: Performance ≥ 0.95, A11y = 1.0, Best Practices ≥ 0.95, SEO = 1.0. 2 runs, desktop preset. Local `pnpm lhci` against scaffold home: assertions PASSED. |
| 0.7 | npm scripts | done | Added `typecheck`, `format`, `format:check`, `test`, `test:watch`, `test:coverage`, `test:e2e`, `test:e2e:install`, `lhci`. |
| 0.8 | Sanity tests | done | `tests/unit/sanity.test.ts` (2 vitest cases) + `tests/e2e/sanity.spec.ts` (2 cases × 3 browsers = 6 Playwright runs, includes axe-core check). All green locally. |
| 0.9 | GitHub Actions CI | done | `.github/workflows/ci.yml` with three jobs: `static` (lint + typecheck + format:check + vitest+coverage), `e2e` (build + Playwright + axe, with browser cache), `lighthouse` (build + lhci). |
| 0.10 | Vercel link + Formspree env placeholder | blocked on user | Requires Hobby account + `vercel link` from this directory + adding `NEXT_PUBLIC_FORMSPREE_ENDPOINT` placeholder to project env. |
| 0.11 | First commit + push + verify CI/Vercel preview | blocked on user | Local commits made (see git log). Awaiting authorization to `git push -u origin main`. |
| 0.12 | Record Lighthouse on Vercel preview in `GATE.md` | pending | Runs after 0.11. Local LHCI assertions already pass against the scaffold home. |

## Local Verification (2026-05-08)

| Command | Result |
| --- | --- |
| `pnpm install --frozen-lockfile` | up-to-date, no errors |
| `pnpm typecheck` | exit 0 |
| `pnpm lint` | exit 0, zero findings |
| `pnpm format:check` | "All matched files use Prettier code style!" |
| `pnpm test` | 2 / 2 passed, vitest 4.1.5 |
| `pnpm build` | compiled in ~1s, static prerender of `/` and `/_not-found` |
| `pnpm test:e2e` | 6 / 6 passed across chromium + firefox + webkit |
| `pnpm lhci` | "All results processed!" — Perf/A11y/BP/SEO assertions pass against scaffold home |

## Activity Log

- **2026-05-08T15:30Z** — Phase planning complete (separate session). 6 ADRs + 11 phase pairs + PHASE-OVERVIEW + changelog written. PHASE-00 status: proposed.
- **2026-05-08T~16:00Z** — Ralph kickoff. Verified tasks 0.1/0.2 on disk. Phase status proposed → active.
- **2026-05-08T~16:05Z** — Task 0.3 done: tsconfig strict tightened, dotfiles in place. (User-side action: `pre:config-protection` hook in `~/.claude/settings.json` had to be temporarily neutralized for prettier config writes; restored after phase completion.)
- **2026-05-08T~16:10Z** — Task 0.3a (PLAN.md amendment): dev deps installed, `pnpm.onlyBuiltDependencies` allowlist set, `pnpm approve-builds --all` executed.
- **2026-05-08T~16:15Z** — Tasks 0.4/0.5/0.6/0.7/0.8/0.9 batched: vitest + playwright + lhci wired, sanity tests written, CI workflow created.
- **2026-05-08T~16:20Z** — Full local verify pipeline green (table above).
- **Pending user action** — Vercel link (0.10), first push (0.11), Lighthouse on preview URL (0.12).

## PLAN.md Amendments

- **0.3a (new)** — "Install dev dependencies and configure pnpm `onlyBuiltDependencies` allowlist." Justification: PLAN task 0.4 lists vitest config dependencies but does not call out the dev-dep install step (PLAN's task 0.2 only covers runtime deps). Without this task, every later step that uses `pnpm exec` fails on the unapproved-build-scripts gate (`@parcel/watcher`, `@swc/core`, `sharp`, `unrs-resolver`). Marked 0.3a so it sits between 0.3 (configs) and 0.4 (vitest config).

## Next

PHASE-00 is at the gate boundary. Tasks 0.10/0.11/0.12 are externally gated. When the user provides Vercel access and authorizes the first push, this phase moves to status `gate` and `GATE.md` is written with the Lighthouse-on-preview numbers.
