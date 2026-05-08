---
id: "PHASE-10"
title: "Diploma Artifacts (screenshots, README, slides)"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: documentation
dependencies: ["PHASE-09"]
blocked_by: []
deliverables:
  - name: "1080p screenshots of every page in both locales at 1440 px"
    status: pending
    verification: "/report/screenshots/desktop/{home,speakers,schedule,tickets,venue}-{uk,en}.png all present."
  - name: "Mobile screenshots at 390 px"
    status: pending
    verification: "/report/screenshots/mobile/* mirrors desktop set."
  - name: "30–60s screen recording showing key interactions"
    status: pending
    verification: "/report/demo.webm shows hero, locale toggle, CFP submit, sheet, schedule tabs, FAQ, reduced motion."
  - name: "Lighthouse PDF reports per route"
    status: pending
    verification: "/report/lighthouse/*.pdf exists for each route × locale × form factor."
  - name: "Architecture + component-tree diagrams (Mermaid)"
    status: pending
    verification: "/report/diagrams/{architecture,components}.png + .mmd source."
  - name: "Final README.md with stack, scripts, deploy, accessibility statement"
    status: pending
    verification: "Linked sections; matches actual production state."
  - name: "Defense slide deck (10–12 slides)"
    status: pending
    verification: "/report/slides.pdf with: problem, theory, decisions, walkthrough, metrics, lessons."
  - name: "Page-to-thesis-chapter mapping table in report"
    status: pending
    verification: "/report/chapter-mapping.md mirrors the table in PHASE-OVERVIEW.md."
exit_criteria:
  - criterion: "Supervisor (Mykhailo Klyap) gets preview link + report draft by early May 2026."
    met: false
    evidence: null
  - criterion: "All artifacts committed to /report/ in the repo."
    met: false
    evidence: null
  - criterion: "README accurately reflects the production state."
    met: false
    evidence: null
tags: ["report", "diploma", "documentation"]
estimated_weeks: 0.4
actual_weeks: null
confidence_score: null
---

# Phase 10: Diploma Artifacts

## Problem Statement

The site is the practical chapter of the thesis. The committee will read the thesis text and review the live site, but they will also want figures, screenshots, metrics, and a defense narrative. P10 produces all of that and packages it for submission.

## Goals

1. Produce every figure/screenshot/recording the diploma report needs.
2. Lock the README as a self-contained tour for any reader.
3. Produce a defense slide deck that runs in 10–15 minutes.

## Scope

### In scope

- Screenshot capture (desktop 1440 + mobile 390) for every page × locale via Playwright.
- Demo recording (single take or stitched) of the seven key interactions.
- Lighthouse PDF reports for every route × locale × form factor.
- Mermaid diagrams: architecture, component tree, route map, dependency graph.
- README final form.
- `/report/chapter-mapping.md` mapping pages to thesis chapters.
- Defense slide deck (10–12 slides).
- Submit to supervisor with cover note.

### Out of scope

- Writing the thesis prose itself (that's Oleksandr's work).
- Journal publication / portfolio writeup.

## Architecture

```
report/
├── screenshots/
│   ├── desktop/
│   └── mobile/
├── lighthouse/
├── diagrams/
│   ├── architecture.mmd
│   ├── architecture.png
│   ├── components.mmd
│   └── components.png
├── demo.webm
├── chapter-mapping.md
└── slides.pdf
README.md                    ← final form
```

## Test Strategy

- **Manual**: review each artifact for fidelity to live site.
- **Automated**: Playwright `screenshots.spec.ts` regenerates the screenshot set on demand (so it stays current after any future tweak).

## Dependencies

### Depends on

- PHASE-09 (production stable + final).

## Open Questions

1. Slide deck format — Keynote / Google Slides / PDF only? (Decision: PDF as the canonical deliverable; source can be Keynote.)
2. Demo recording with voiceover or silent? (Decision: silent — committee will watch in their own time; voiceover risks accent/audio issues.)
