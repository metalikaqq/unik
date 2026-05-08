# Phase Overview — CARPATHIAN.CONF 2026 Diploma Project

**Project**: Bilingual UA/EN landing site for a fictional 3-day design + engineering conference in Uzhhorod, 14–16 May 2026.

**Owner**: Oleksandr Maniak (UzhNU IST, year 4) · **Supervisor**: Mykhailo Klyap

**Thesis topic**: _"Побудова користувацько-центрової взаємодії на прикладі посадкової сайт-сторінки"_ — Building User-Centered Interaction on the Example of a Landing Page.

**Timeline**: Practical chapter (Ch. 4) due March–May 2026. Final defense June 2026.

**Stack**: Next.js 16 (App Router) + TypeScript strict + Tailwind v4 + next-intl + Framer Motion + Formspree. Deploy: Vercel free tier.

---

## Status Board

| ID       | Title                  | Status   | Est. days | Started | Completed | Confidence |
| -------- | ---------------------- | -------- | --------- | ------- | --------- | ---------- |
| PHASE-00 | Bootstrap & infra      | proposed | 2         | --      | --        | --         |
| PHASE-01 | Design system + tokens | proposed | 3         | --      | --        | --         |
| PHASE-02 | Shell, i18n, routing   | proposed | 3         | --      | --        | --         |
| PHASE-03 | Home + CFP form        | proposed | 5         | --      | --        | --         |
| PHASE-04 | Speakers page          | proposed | 3         | --      | --        | --         |
| PHASE-05 | Schedule page          | proposed | 3         | --      | --        | --         |
| PHASE-06 | Tickets + FAQ          | proposed | 2         | --      | --        | --         |
| PHASE-07 | Venue page             | proposed | 2         | --      | --        | --         |
| PHASE-08 | A11y + perf hardening  | proposed | 3         | --      | --        | --         |
| PHASE-09 | Production deploy      | proposed | 2         | --      | --        | --         |
| PHASE-10 | Diploma artifacts      | proposed | 2         | --      | --        | --         |

**Total estimate**: ~30 working days. Buffer assumed inside the March–May window.

Legend: `proposed` → `planned` → `active` → `gate` → `completed` → `retrospected`.

---

## Dependency Graph

```
[00 Bootstrap]
      |
[01 Design System]
      |
[02 Shell + i18n]
      |
[03 Home + CFP] ────── ★ first Vercel deploy
      |
      ├── [04 Speakers]
      ├── [05 Schedule]
      ├── [06 Tickets + FAQ]
      └── [07 Venue]
              |
        [08 A11y + Perf]
              |
        [09 Prod Deploy]
              |
        [10 Diploma Artifacts]
```

P04–P07 can run in parallel after P03 ships. All other phases are strictly sequential.

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
