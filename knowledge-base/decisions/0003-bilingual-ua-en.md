---
id: "ADR-0003"
title: "Bilingual UA / EN content with next-intl, UA canonical"
status: accepted
date: "2026-05-08"
author_type: human
tags: ["i18n", "content"]
---

# ADR-0003 — Bilingual UA / EN with next-intl

## Context

The diploma is defended in front of a Ukrainian university committee, but the site should also be a portfolio piece readable internationally. The thesis (Chapter 2) explicitly covers "types of user interactions" — language switching is one of the textbook UX interactions to demonstrate.

## Decision

- Locales: `['uk', 'en']`. Default = `uk`.
- Library: **next-intl**, `localePrefix: 'always'`. URL pattern `/uk/...` and `/en/...`.
- Locale toggle in header preserves the current path.
- Translation messages live in `src/i18n/messages/{uk,en}.json`.
- All speaker bios, schedule entries, FAQ answers, and venue copy must exist in **both** locales.
- A unit test enforces key parity between `uk.json` and `en.json` and fails CI on drift.

## Rationale

- `localePrefix: 'always'` makes the URL self-documenting and prevents "default locale invisibility" SEO issues.
- next-intl is Next 16 / App Router native and lets server components consume messages cleanly.
- UA canonical + EN courtesy is the truthful framing for a Ukrainian author's site; committees prefer it over EN-first.
- Content parity test prevents the most common bug pattern: one locale gets a new key, the other doesn't.

## Alternatives considered

| Option                                | Why rejected                                                    |
| ------------------------------------- | --------------------------------------------------------------- |
| EN only                               | Weaker fit for UzhNU defense.                                   |
| UA only                               | Weaker as portfolio; cuts off non-Ukrainian readers.            |
| Path-less detection (Accept-Language) | Hostile to share-links and SEO.                                 |
| Custom i18n implementation            | Reinvents the wheel; next-intl is well-maintained and standard. |

## Consequences

- Every component that takes user-visible text routes it through `useTranslations()` or accepts text from a locale-aware content module.
- Adds a small client bundle (~20 kB gz for next-intl runtime). Acceptable inside the 150 kB home-page budget.
- Cyrillic font subset must be included in `next/font` config (UA messages will produce Cyrillic glyphs that EN content does not need).
