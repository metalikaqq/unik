---
id: "PHASE-00"
title: "Bootstrap & Infrastructure"
status: completed
author_type: human+ai
ai_model: claude-opus-4-7
created: "2026-05-08"
started: "2026-05-08"
completed: "2026-05-08"
component: infrastructure
dependencies: []
blocked_by: []
deliverables:
  - name: "Next.js 16 + TS strict project scaffold"
    status: done
    verification: "`pnpm dev` runs at :3000 with no warnings; `pnpm build` succeeds."
  - name: "Test harness wired (Vitest + Playwright + axe + Lighthouse CI)"
    status: done
    verification: "Each runner has one trivial green test; `pnpm test`, `pnpm test:e2e`, `pnpm lhci` all exit 0."
  - name: "GitHub Actions CI"
    status: done
    verification: "Pull-request CI runs lint → typecheck → vitest → playwright → lhci and is green."
  - name: "Vercel project linked to repo"
    status: done
    verification: "Deployed via CLI to https://unik-bice.vercel.app/. GitHub auto-import deferred to a one-time dashboard authorization step."
  - name: "Strict tsconfig + lint/format configs"
    status: done
    verification: "`tsc --noEmit` clean; ESLint runs with zero warnings; Prettier formats project."
exit_criteria:
  - criterion: "All five deliverables verified."
    met: true
    evidence: "GATE.md deliverables table"
  - criterion: "Lighthouse on the empty home: Performance ≥ 95, A11y = 100, BP ≥ 95, SEO = 100."
    met: true
    evidence: "Lighthouse 100/100/100/100 against https://unik-bice.vercel.app/, 2 runs, recorded in GATE.md"
  - criterion: "Trivial Playwright spec passes against Vercel preview, not just localhost."
    met: true
    evidence: "playwright --project=chromium with PLAYWRIGHT_BASE_URL=https://unik-bice.vercel.app: 2/2 passed including axe-core"
tags: ["infra", "ci", "tooling"]
estimated_weeks: 0.5
actual_weeks: 0.05
confidence_score: 9
---

# Phase 00: Bootstrap & Infrastructure

## Problem Statement

Before any feature work, the project needs a green, deployable foundation: a working Next.js 16 + TS strict scaffold, a test harness for both unit and E2E layers, accessibility and performance gating, CI that runs all of it, and a working Vercel preview URL. Without this, every later phase has to fight the toolchain instead of shipping UX patterns.

## Goals

1. Reach a state where any subsequent phase can write tests-first and have CI verify them on every PR.
2. Establish the deployment pipeline so the very first vertical slice (P3) ships to a real URL automatically.
3. Codify the strict-typing + lint + format settings so quality is enforced from commit zero, not retro-fitted at P9.

## Scope

### In scope

- `create-next-app` Next.js 16 with App Router, TS, Tailwind v4, ESLint, src dir, `@/*` import alias, pnpm.
- Runtime deps: `next-intl`, `framer-motion`, `react-hook-form`, `zod`, `@hookform/resolvers`, `clsx`, `lucide-react`.
- Dev deps: `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, `@playwright/test`, `@axe-core/playwright`, `@lhci/cli`, `prettier`.
- `tsconfig.json` strict + `noUncheckedIndexedAccess`.
- `.editorconfig`, `.prettierrc`, `.gitignore`, `.nvmrc` (Node 22).
- `package.json` scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `test`, `test:watch`, `test:e2e`, `lhci`.
- GitHub Actions workflow `.github/workflows/ci.yml`.
- Vercel project linked, env var placeholder `NEXT_PUBLIC_FORMSPREE_ENDPOINT` set.
- One trivial passing test per runner to prove the harness wiring.

### Out of scope

- Any visual primitives (P1).
- Any locale routing or `[locale]` segment (P2).
- Any page content beyond the default scaffolded `/`.
- Custom domain.

## Architecture

```
unik/
├── src/
│   ├── app/                ← scaffolded by create-next-app
│   ├── lib/__placeholder.ts ← lets Vitest path-glob find unit dir
│   └── styles/             ← reserved for P1
├── tests/
│   ├── unit/sanity.test.ts ← 1 + 1 = 2
│   └── e2e/sanity.spec.ts  ← `/` returns 200
├── .github/workflows/ci.yml
├── playwright.config.ts
├── vitest.config.ts
├── lighthouserc.json
├── tsconfig.json
└── package.json
```

## Test Strategy

- **Vitest**: one `tests/unit/sanity.test.ts` proving harness.
- **Playwright**: one `tests/e2e/sanity.spec.ts` proving harness against `pnpm start`.
- **Axe**: zero violations on default `/`.
- **Lighthouse CI**: budgets 95/100/95/100 against default `/` (it will pass — that's the point).

## Dependencies

### Depends on

- None (this is the entry phase).

### Blocks

- All subsequent phases.

## Open Questions

1. Does the user want a custom domain or is `*.vercel.app` acceptable for the diploma deliverable? (Assumed `*.vercel.app`; revisit at P9.)
2. Should the GitHub repo be public or private during development? (Assumed private until P9.)
