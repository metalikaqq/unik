---
id: "ADR-0007"
title: "Consolidate P02–P10 into a single DIPLOMA-FRONTEND mega-phase"
status: accepted
date: "2026-05-09"
author_type: human
ai_model: null
tags: ["process", "phases", "scope", "diploma"]
supersedes: []
superseded_by: []
---

# ADR-0007 — Mega-phase consolidation

## Context

The original phase plan (see `PHASE-OVERVIEW.md` prior to 2026-05-09) decomposed
the diploma frontend work into nine sequential phases:

```
P02 Shell + i18n
P03 Home + CFP (★ first Vercel deploy)
P04 Speakers
P05 Schedule
P06 Tickets + FAQ
P07 Venue
P08 A11y + Perf hardening
P09 Production deploy
P10 Diploma artifacts
```

That decomposition was correct as a planning artifact but produced unnecessary
overhead when running the Ralph autonomous loop:

1. **Per-phase gate ceremony** (SPEC + PLAN + STATUS + GATE.md × 9) costs
   roughly half a day per phase in document maintenance, with no defense
   value beyond the existing PRD + commit history + ADRs.
2. **Inter-phase boundaries were artificial.** P02 (i18n shell) is one
   ~one-day story. P08 (a11y/perf) is a sweep over all pages, not a
   sequential prerequisite. P09 (deploy) is a one-line `vercel --prod`.
   P10 (diploma artifacts) is supervisor-facing prose, not code.
3. **The diploma defense judges the final site + thesis chapter**, not the
   internal phase structure. Granular phases were optimised for a process
   audience that does not exist for this project.
4. **PHASE-01 (design system) already produced all reusable primitives.**
   The remaining work is content + composition + a11y polish + deploy —
   genuinely one continuous workstream.

After PHASE-01 completed on 2026-05-09 (quality 9.5/10), we re-planned the
remaining work as a single mega-phase driven by one `prd.json` with eight
user stories.

## Decision

Replace P02 → P10 with a single phase named **`DIPLOMA-FRONTEND`**, owned by
`prd.json` at the repo root and executed by the Ralph autonomous loop.

The eight user stories are:

| ID    | Title                                                | Maps to original phase |
| ----- | ---------------------------------------------------- | ---------------------- |
| US-001 | i18n shell — next-intl + `[locale]` + Header/Footer | P02                    |
| US-002 | Home — hero + marquee + mock CFP form               | P03 (upper half)       |
| US-003 | Home — speaker preview, sponsor strip, what-to-expect | P03 (lower half)     |
| US-004 | Speakers page — filter grid + speaker detail Sheet   | P04                    |
| US-005 | Schedule page — tabs + expandable rows + ICS export  | P05                    |
| US-006 | Tickets + FAQ — comparison table + Accordion         | P06                    |
| US-007 | Venue page — map embed + lightbox gallery            | P07                    |
| US-008 | A11y + perf pass + Vercel deploy                     | P08 + P09              |

P10 (diploma artifacts — Ch. 4 prose + screenshots) is **out of scope** for
the code repo. It will live in the thesis document, not in `knowledge-base/`.

## Consequences

### Kept

- `knowledge-base/phases/phase-02-shell-i18n/` … `phase-10-artifacts/`
  folders are retained as-is. Their SPEC + PLAN files remain valid
  references for what each scope intended to cover, and the diploma
  defense can show them as evidence of upfront planning discipline.
- The cross-cutting test strategy, exit criteria, and quality bar from
  the original PHASE-OVERVIEW continue to apply unchanged to the
  mega-phase (≥ 80 % coverage on `lib/` + `hooks/` + `i18n/`, axe-clean,
  Lighthouse budgets, etc.).

### Changed

- `PHASE-OVERVIEW.md` Status Board marks P02–P10 as `superseded` and
  adds a single `DIPLOMA-FRONTEND` row.
- The dependency graph collapses nine sequential nodes into one mega-node
  with eight user stories inside.
- Ralph metrics in `ralph-metrics.json` now track stories under
  `currentPhase: "diploma-frontend"` (started 2026-05-09T20:30Z).

### Risks accepted

- **Audit-trail readability** — A reader skimming `phases/` may be confused
  by nine "completed-looking" folders that never actually transitioned to
  `active`. Mitigated by the consolidation note at the top of
  `PHASE-OVERVIEW.md` and by this ADR.
- **Gate granularity** — A single gate at the end of `DIPLOMA-FRONTEND`
  is coarser than nine sequential gates. Mitigated by the per-story
  Ralph quality bar (Tier 3 pipeline per story, `passes: true` only on
  green build + tests + a11y) so quality is sampled eight times along
  the way regardless.

## Historical dependency graph

Preserved here for diploma audit-trail purposes:

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

## Status

Accepted 2026-05-09 by Oleksandr Maniak. PRD `branchName: ralph/diploma-frontend`
is the operative plan. PHASE-01 remains gated and untouched; PHASE-00 remains
gated and untouched.
