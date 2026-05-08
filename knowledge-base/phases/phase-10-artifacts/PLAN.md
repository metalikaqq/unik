---
id: "PHASE-10"
title: "Diploma Artifacts — Plan"
status: proposed
---

# Phase 10: Execution Plan

## Task Breakdown

| #     | Task                                                                           | Est. days | Priority | Owner      |
| ----- | ------------------------------------------------------------------------------ | --------- | -------- | ---------- |
| 10.1  | Playwright `screenshots.spec.ts` capturing desktop 1440 × every route × locale | 0.3       | P0       | ai         |
| 10.2  | Playwright capture for mobile 390 mirror                                       | 0.2       | P0       | ai         |
| 10.3  | Record `demo.webm` with screen recorder, single take if possible               | 0.4       | P0       | human      |
| 10.4  | Generate Lighthouse PDF reports per route × locale × form factor               | 0.3       | P0       | ai         |
| 10.5  | Mermaid architecture diagram + export PNG                                      | 0.3       | P0       | ai         |
| 10.6  | Mermaid component-tree diagram + export PNG                                    | 0.2       | P0       | ai         |
| 10.7  | `/report/chapter-mapping.md` finalize                                          | 0.2       | P0       | ai         |
| 10.8  | README final form with installation, scripts, deploy, accessibility statement  | 0.4       | P0       | ai         |
| 10.9  | Defense slide deck draft (10–12 slides)                                        | 0.5       | P0       | human + ai |
| 10.10 | Submit preview link + report draft to supervisor                               | 0.05      | P0       | human      |

**Total estimate**: ~2 working days.

## Risk Register

| #   | Risk                                           | Probability | Impact | Mitigation                                                           |
| --- | ---------------------------------------------- | ----------- | ------ | -------------------------------------------------------------------- |
| 1   | Screenshot-spec drifts when content changes    | medium      | low    | Mark spec to regenerate on demand only; document workflow in README. |
| 2   | Demo recording captures sensitive system tray  | medium      | low    | Use a clean screen recorder profile / hidden tray.                   |
| 3   | Slide deck generic / not defendable            | medium      | medium | Run /plan-ceo-review against the deck before submission.             |
| 4   | Supervisor revision cycle pushes past deadline | high        | high   | Submit by early May to get full revision window.                     |

## Technical Approach

- Playwright `test.use({ viewport: ... })` per spec to capture both viewport sets.
- Lighthouse CLI run with `--output=html` then printed to PDF (Chromium headless).
- Mermaid CLI to render `.mmd` → `.png` for embedding in the thesis.

## Effort Estimate

- **Total**: 2 days. Critical path 10.1 → 10.4 → 10.7 → 10.8 → 10.9 → 10.10.
