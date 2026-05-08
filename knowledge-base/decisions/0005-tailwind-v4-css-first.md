---
id: "ADR-0005"
title: "Tailwind v4 CSS-first config (no tailwind.config.ts)"
status: accepted
date: "2026-05-08"
author_type: ai
ai_model: "claude-opus-4-7"
tags: ["styling", "tooling"]
---

# ADR-0005 — Tailwind v4 CSS-first configuration

## Context

The original plan (in `/Users/macuser/.claude/plans/now-i-want-to-luminous-ripple.md`) listed a `tailwind.config.ts` file. The Next.js 16 scaffold (`create-next-app`) installs Tailwind v4, which has migrated to CSS-first configuration: there is no `tailwind.config.ts` by default, and theme tokens are declared inside `globals.css` with the `@theme` directive.

## Decision

- Adopt Tailwind v4's CSS-first approach.
- All design tokens (color, type, space, motion) live in `src/app/globals.css` under `@theme inline { ... }`.
- Per-token semantics (e.g., `--color-bg`, `--color-fg`, `--color-accent`) declared as CSS custom properties on `:root`, then aliased into Tailwind via `@theme`.
- No `tailwind.config.ts`. PostCSS config remains the v4 default `@tailwindcss/postcss`.

## Rationale

- Matches what Next 16 + Tailwind 4 actually produces; fighting the default would create unnecessary complexity.
- Single source of truth for tokens: one CSS file rather than CSS + JS config split.
- Reduces moving parts for the diploma report — easier to explain at defense.

## Alternatives considered

| Option                         | Why rejected                                              |
| ------------------------------ | --------------------------------------------------------- |
| Force-add `tailwind.config.ts` | Fights v4 ergonomics for no real win.                     |
| Downgrade to Tailwind v3       | Loses v4 performance + `@theme` simplicity; not worth it. |

## Consequences

- All references to `tailwind.config.ts` in earlier planning docs are obsolete.
- `src/styles/tokens.css` referenced in plan is collapsed into `src/app/globals.css` (or imported from there).
- Phase 01 (Design System) will set up the `@theme` block as its first deliverable.
