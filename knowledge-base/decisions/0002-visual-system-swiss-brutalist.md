---
id: "ADR-0002"
title: "Swiss-rigorous brutalist visual system"
status: accepted
date: "2026-05-08"
author_type: human
tags: ["design", "visual", "tokens"]
---

# ADR-0002 — Swiss-rigorous brutalist visual system

## Context

The diploma site must visibly demonstrate user-centered design principles and avoid looking like a generic Tailwind/shadcn template. The committee is academic — it favours discipline and intentionality over decorative flourish. The site also needs full Cyrillic typography support.

## Decision

**Style direction**: Swiss-rigorous brutalism.

**Palette** (B/W + 1 accent only):

- `--color-bg: #FAFAF7` — warm off-white
- `--color-fg: #0A0A0A` — near-black
- `--color-accent: #E63946` — Carpathian red (single accent; no second decorative color)
- `--color-muted: #6B6B6B` — secondary text only

**Type**:

- **Inter Display** for display + body (free, full Cyrillic, modern Swiss-grotesque)
- **JetBrains Mono** for labels, timestamps, captions, page indicators (free, full Cyrillic, "tech conference" signal)

**Layout primitives**:

- 12-column grid · 24 px gutters desktop / 16 px mobile · 1440 px max width.
- Hairline rules (1 px `--color-fg`) instead of shadows.
- Square corners (no `border-radius`).
- Generous whitespace; no decorative gradients.

## Rationale

- Swiss canon is the most defensible academic style: rigor, hierarchy, semantic typography, restraint.
- Single-accent palette enforces discipline and prevents template-grade output.
- Inter + JetBrains Mono are both libre, both have first-class Cyrillic, both load via `next/font` with no licensing risk.
- Carpathian red ties geographically to Uzhhorod and historically to Ukrainian textile/embroidery — defensible at defense, not arbitrary.

## Alternatives considered

| Option                   | Why rejected                                                       |
| ------------------------ | ------------------------------------------------------------------ |
| Raw maximalist brutalism | Too risky for academic taste; harder to defend as "user-centered". |
| Glassmorphism            | Generic; risk of looking like a stock template.                    |
| Bento + scrollytelling   | Visually loud; less defensible as "discipline".                    |
| Editorial dark luxury    | Strong, but Swiss is purer for the thesis chapter on grid systems. |

## Consequences

- Every primitive must respect `border-radius: 0` and `box-shadow: none` (enforced by review of P1).
- Reduced-motion variants are easier to author because there is less decorative motion to disable.
- Full token scale lives in `src/styles/tokens.css` and is consumed via Tailwind v4 `@theme` directive.
