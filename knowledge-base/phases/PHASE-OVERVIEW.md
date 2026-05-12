# Phase Overview — CARPATHIAN.CONF 2026 Diploma Project

**Project**: Bilingual UA/EN landing site for a fictional 3-day design + engineering conference in Uzhhorod, 14–16 May 2026.

**Owner**: Oleksandr Maniak (UzhNU IST, year 4) · **Supervisor**: Mykhailo Klyap

**Thesis topic**: _"Побудова користувацько-центрової взаємодії на прикладі посадкової сайт-сторінки"_ — Building User-Centered Interaction on the Example of a Landing Page.

**Timeline**: Practical chapter (Ch. 4) due March–May 2026. Final defense June 2026.

**Stack**: Next.js 16 (App Router) + TypeScript strict + Tailwind v4 + next-intl + Framer Motion + Formspree. Deploy: Vercel free tier.

---

## Status Board

| ID                | Title                                 | Status     | Est. days | Started    | Completed  | Confidence |
| ----------------- | ------------------------------------- | ---------- | --------- | ---------- | ---------- | ---------- |
| PHASE-00          | Bootstrap & infra                     | completed  | 2         | 2026-05-08 | 2026-05-08 | 9          |
| PHASE-01          | Design system + tokens                | completed  | 3         | 2026-05-08 | 2026-05-09 | 9.5        |
| DIPLOMA-FRONTEND  | Shell + 5 pages + a11y/perf + deploy  | active     | 10        | 2026-05-09 | --         | 8          |
| ~~PHASE-02~~      | ~~Shell, i18n, routing~~              | superseded | --        | --         | --         | --         |
| ~~PHASE-03~~      | ~~Home + CFP form~~                   | superseded | --        | --         | --         | --         |
| ~~PHASE-04~~      | ~~Speakers page~~                     | superseded | --        | --         | --         | --         |
| ~~PHASE-05~~      | ~~Schedule page~~                     | superseded | --        | --         | --         | --         |
| ~~PHASE-06~~      | ~~Tickets + FAQ~~                     | superseded | --        | --         | --         | --         |
| ~~PHASE-07~~      | ~~Venue page~~                        | superseded | --        | --         | --         | --         |
| ~~PHASE-08~~      | ~~A11y + perf hardening~~             | superseded | --        | --         | --         | --         |
| ~~PHASE-09~~      | ~~Production deploy~~                 | superseded | --        | --         | --         | --         |
| ~~PHASE-10~~      | ~~Diploma artifacts~~                 | superseded | --        | --         | --         | --         |

**Consolidation note** — On 2026-05-09, P02 through P10 were folded into a single `DIPLOMA-FRONTEND` mega-phase (see [ADR-0007](../decisions/0007-mega-phase-consolidation.md) and `prd.json` at repo root). The old phase folders (`phase-02-shell-i18n/` … `phase-10-artifacts/`) are retained as historical PLAN/SPEC artifacts but are no longer the active workstream; their exit criteria are absorbed into the mega-phase user stories (US-001 … US-008).

**Mega-phase progress** — 1 / 8 user stories complete: US-001 i18n shell (commit `c95d202`). Remaining: US-002 Home + CFP, US-003 Home below-fold, US-004 Speakers, US-005 Schedule, US-006 Tickets + FAQ, US-007 Venue, US-008 a11y/perf + Vercel deploy.

**Total estimate**: ~15 working days remaining (5 days spent on P00 + P01). Buffer assumed inside the March–May window.

Legend: `proposed` → `planned` → `active` → `gate` → `completed` → `retrospected` · `superseded` = scope absorbed by a later phase.

---

## Dependency Graph

```
[00 Bootstrap]
      |
[01 Design System]
      |
[DIPLOMA-FRONTEND] ── single mega-phase ──┐
   US-001 i18n shell              ✅      │
   US-002 Home + CFP                      │
   US-003 Home below-fold                 │
   US-004 Speakers                        │
   US-005 Schedule          (US-004…007   │
   US-006 Tickets + FAQ      may run in   │
   US-007 Venue              parallel)    │
   US-008 a11y/perf + Vercel deploy ★     │
                                          │
                              ★ first prod deploy
```

US-004 through US-007 (the four page stories) may run in parallel after US-002 + US-003 ship. US-001 and US-008 are strictly sequential bookends.

> **Historical dependency graph** (pre-consolidation P00 → P10 chain) is preserved in [ADR-0007](../decisions/0007-mega-phase-consolidation.md) for diploma audit-trail purposes.

---

## Cross-Cutting Test Strategy

**Applies to every phase.**

- **Unit (Vitest)**: pure functions, validators (Zod), hooks, content invariants, i18n parity.
- **Component (Vitest + Testing Library)**: keyboard interactions on primitives, ARIA correctness.
- **E2E (Playwright)**: critical flows per phase (specs in `tests/e2e/<phase>.spec.ts`).
- **A11y (`@axe-core/playwright`)**: zero serious/critical violations on every page × locale.
- **Perf (Lighthouse CI)**: budgets enforced per route — Performance ≥ 95, A11y = 100, BP ≥ 95, SEO = 100.
- **Coverage target**: ≥ 80 % on `lib/`, `hooks/`, `i18n/`, content validators.

**Definition of Done per phase** = phase SPEC exit criteria all met + GATE.md verdict PASS.

---

## Cross-Cutting Decisions

See `knowledge-base/decisions/`:

- **ADR-0001** — Next.js 16 App Router + TypeScript strict
- **ADR-0002** — Swiss-rigorous brutalist visual system
- **ADR-0003** — Bilingual UA / EN with next-intl, UA canonical
- **ADR-0004** — No backend; CFP form posts to Formspree free tier
- **ADR-0005** — Tailwind v4 CSS-first config (no `tailwind.config.ts`)
- **ADR-0006** — Test stack: Vitest + Playwright + axe-core + Lighthouse CI
- **ADR-0007** — Consolidate P02–P10 into a single `DIPLOMA-FRONTEND` mega-phase

---

## Risks (project-level)

| #   | Risk                                         | Mitigation                                                                          |
| --- | -------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | Formspree free quota (50/mo)                 | Document mock fallback gated by `?mock=1` query.                                    |
| 2   | UA / EN content drift                        | Parity unit test fails CI when keys diverge.                                        |
| 3   | Cyrillic font subsetting regression          | Pin `next/font` weights, snapshot Lighthouse run after every font change.           |
| 4   | Reduced-motion not honored                   | Dedicated Playwright spec sets `prefers-reduced-motion: reduce` in browser context. |
| 5   | Scope creep into backend / CMS               | Plan + ADR-0004 explicitly forbid; gate any deviation.                              |
| 6   | Vercel free-plan unfamiliar limits           | Stay on standard SSR routes only; document in report.                               |
| 7   | Supervisor review window slips past late-May | Internal soft deadline = early May for first preview link.                          |

---

## Diploma Chapter Mapping

| Page        | Demonstrates patterns from                                                 | Maps to thesis chapter                                |
| ----------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| `/` Home    | Hero, marquee, scroll-reveal, async form, validation, success/error states | Ch. 2 (interactions), Ch. 3 (landing-page conversion) |
| `/speakers` | Filterable grid, hover preview, modal/sheet, focus trap, keyboard nav      | Ch. 1 (UX info-architecture), Ch. 2 (interactions)    |
| `/schedule` | Tabs, expandable rows, anchor deep-links, ICS export                       | Ch. 2 (interactions)                                  |
| `/tickets`  | Comparison table, accordion, sticky CTA, focus management                  | Ch. 2, Ch. 3 (conversion patterns)                    |
| `/venue`    | Map embed + fallback, lightbox gallery, dl semantics, external links       | Ch. 1 (information clarity), Ch. 2                    |
