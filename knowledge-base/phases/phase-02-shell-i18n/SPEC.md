---
id: "PHASE-02"
title: "Shell, i18n, Routing"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: frontend
dependencies: ["PHASE-01"]
blocked_by: []
deliverables:
  - name: "next-intl wired with `[locale]` segment, localePrefix=always"
    status: pending
    verification: "/ redirects to /uk; /en/* and /uk/* both serve content; messages JSON loads."
  - name: "Header + Footer + LocaleToggle + PageHeader components"
    status: pending
    verification: "All five route stubs render header + footer; locale toggle preserves path."
  - name: "Stub pages for all 5 routes"
    status: pending
    verification: "/uk, /uk/speakers, /uk/schedule, /uk/tickets, /uk/venue (and /en/* mirrors) all return 200 with mono page indicator."
  - name: "Custom 404 in correct locale"
    status: pending
    verification: "/uk/no-such-route renders Ukrainian 404; /en mirror in English."
  - name: "Skip-to-main-content link, semantic landmarks"
    status: pending
    verification: "Tab-from-address-bar lands on skip link first; main has `<main>`, nav has `<nav>`."
exit_criteria:
  - criterion: "All 5 routes render their stub at both locales with header + footer."
    met: false
    evidence: null
  - criterion: "No untranslated string visible at /en or /uk."
    met: false
    evidence: null
  - criterion: "Header sticky + responsive verified at 375 / 768 / 1280."
    met: false
    evidence: null
  - criterion: "axe-clean on all 5 stub pages × 2 locales."
    met: false
    evidence: null
  - criterion: "Messages parity unit test green."
    met: false
    evidence: null
tags: ["i18n", "routing", "shell"]
estimated_weeks: 0.6
actual_weeks: null
confidence_score: null
---

# Phase 02: Shell, i18n, Routing

## Problem Statement

The site needs real chrome — header, footer, locale toggle, 404 — and a working bilingual routing pattern before any feature page can be built. Without this, P3 either has to invent its own layout or hand-roll i18n locally.

## Goals

1. Establish `[locale]` routing so all subsequent pages live under `/uk/...` and `/en/...` automatically.
2. Build the shared chrome once, so P3–P7 import it instead of duplicating.
3. Lock in the messages parity test that prevents bilingual drift across the rest of the project.

## Scope

### In scope

- `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/messages/uk.json`, `src/i18n/messages/en.json` (skeleton: nav + footer + 404 + page titles).
- `src/middleware.ts` for locale detection + redirect.
- `next.config.ts` wired with `next-intl/plugin`.
- `src/app/[locale]/layout.tsx` consuming `next/font` from P1 and the locale messages provider.
- `src/components/layout/{Header,Footer,LocaleToggle,PageHeader}.tsx`.
- `src/app/[locale]/{,speakers,schedule,tickets,venue}/page.tsx` stubs.
- `src/app/[locale]/not-found.tsx`.
- `src/lib/locale.ts` with `localePathFor(path, locale)` helper.
- Unit tests: locale path resolver; messages parity.
- E2E: nav between routes, locale toggle, 404 in both locales, keyboard skip-link.

### Out of scope

- Page content beyond a `PageHeader` stub (P3+).
- Speaker / schedule / ticket / venue content data (P3+).

## Architecture

```
src/
├── middleware.ts
├── app/[locale]/
│   ├── layout.tsx          ← header, footer, font vars, NextIntlClientProvider
│   ├── page.tsx            ← stub
│   ├── speakers/page.tsx   ← stub
│   ├── schedule/page.tsx   ← stub
│   ├── tickets/page.tsx    ← stub
│   ├── venue/page.tsx      ← stub
│   └── not-found.tsx
├── components/layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── LocaleToggle.tsx
│   └── PageHeader.tsx
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── messages/{uk.json, en.json}
└── lib/locale.ts
```

## Test Strategy

**TDD ladder**:

- `localePathFor('/en/speakers', 'uk')` returns `/uk/speakers`.
- `localePathFor('/uk', 'en')` returns `/en`.
- Messages parity: `Object.keys(uk)` deep-equals `Object.keys(en)` for every nested level.

**E2E**:

- `/` redirects to `/uk` (or browser-preferred locale).
- Click nav from `/uk` to `/uk/speakers` — shell does not re-mount.
- `LocaleToggle` on `/uk/schedule` lands on `/en/schedule` with same scroll position.
- `/uk/no-such-route` renders Ukrainian 404; `/en/no-such-route` English.
- Tab from address bar reaches skip-to-main-content link first; pressing Enter focuses `<main>`.

## Dependencies

### Depends on

- PHASE-01 (Button + Rule + Tag primitives consumed by Header/Footer).

### Blocks

- PHASE-03 (home composes inside this shell).

## Open Questions

1. Should locale toggle use a `<select>` or two anchor tags? (Decision: two anchors styled as toggle, better for keyboard + SEO.)
2. Auto-detect locale from `Accept-Language` on first visit, or always default to `uk`? (Decision: detect with fallback to `uk`; document in report.)
