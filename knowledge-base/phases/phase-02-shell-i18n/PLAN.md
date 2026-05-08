---
id: "PHASE-02"
title: "Shell, i18n, Routing — Plan"
status: proposed
---

# Phase 02: Execution Plan

## Task Breakdown

| #    | Task                                                                                                         | Est. days | Priority | Dependencies | Owner |
| ---- | ------------------------------------------------------------------------------------------------------------ | --------- | -------- | ------------ | ----- |
| 2.1  | Install next-intl was done in P0 — verify; create `src/i18n/routing.ts` with locales, default, prefix=always | 0.1       | P0       | --           | ai    |
| 2.2  | Create `src/i18n/request.ts` with `getRequestConfig` returning the right messages bundle                     | 0.1       | P0       | 2.1          | ai    |
| 2.3  | Wire `next.config.ts` with `createNextIntlPlugin('./src/i18n/request.ts')`                                   | 0.05      | P0       | 2.1          | ai    |
| 2.4  | `src/middleware.ts` calling `createMiddleware(routing)`                                                      | 0.05      | P0       | 2.1          | ai    |
| 2.5  | Skeleton `src/i18n/messages/{uk,en}.json` with nav, footer, page titles, 404                                 | 0.2       | P0       | --           | ai    |
| 2.6  | TDD: `lib/locale.ts` `localePathFor` + tests                                                                 | 0.2       | P0       | 2.1          | ai    |
| 2.7  | TDD: messages parity test (`tests/unit/i18n/parity.test.ts`)                                                 | 0.1       | P0       | 2.5          | ai    |
| 2.8  | `Header.tsx` — logo, nav, mono page indicator, sticky                                                        | 0.3       | P0       | 2.1, 2.5     | ai    |
| 2.9  | `LocaleToggle.tsx` — UA / EN, preserves path                                                                 | 0.2       | P0       | 2.6, 2.8     | ai    |
| 2.10 | `Footer.tsx` — copyright, social, legal                                                                      | 0.2       | P0       | 2.5          | ai    |
| 2.11 | `PageHeader.tsx` — `01 / 05  HOME` Swiss treatment                                                           | 0.2       | P0       | --           | ai    |
| 2.12 | `[locale]/layout.tsx` — fonts, header, footer, NextIntlClientProvider, skip link                             | 0.2       | P0       | 2.8-2.11     | ai    |
| 2.13 | Stub pages for `/`, `/speakers`, `/schedule`, `/tickets`, `/venue` rendering only PageHeader                 | 0.2       | P0       | 2.11         | ai    |
| 2.14 | `[locale]/not-found.tsx` — brutalist 404 with localized message                                              | 0.2       | P0       | 2.5          | ai    |
| 2.15 | E2E: `tests/e2e/shell.spec.ts` — nav, locale toggle, 404, skip link, axe                                     | 0.4       | P0       | 2.13-2.14    | ai    |
| 2.16 | Manual responsive check 375 / 768 / 1280 in both locales                                                     | 0.1       | P0       | 2.13         | ai    |

**Total estimate**: ~3 working days (0.6 calendar weeks).

## Risk Register

| #   | Risk                                           | Probability | Impact | Mitigation                                                                                       |
| --- | ---------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------------------------------------ |
| 1   | next-intl + Next 16 App Router incompatibility | low         | high   | Pin compatible versions in P0; check GitHub issues before P2 starts.                             |
| 2   | Messages parity test slows under nested keys   | low         | low    | Use deep-equal with sorted keys; parity test runs in <50 ms.                                     |
| 3   | Locale toggle loses scroll position            | medium      | low    | `router.replace(localePathFor(pathname, locale))` keeps history; preserves scroll on App Router. |
| 4   | Cyrillic header overflow at 375 px             | medium      | medium | Caught by responsive check 2.16; CSS `text-wrap: balance` on title.                              |

## Technical Approach

- **Patterns**: server components for layout, client component only for `LocaleToggle`. Messages provider wraps client tree.
- **Testing**: every page in both locales via Playwright matrix.
- **A11y**: skip link as the first focusable element; `<main id="main">` target.

## Effort Estimate

- **Total estimated days**: 3
- **Calendar weeks (with buffer)**: 0.6
- **Critical path**: 2.1 → 2.4 → 2.12 → 2.13 → 2.15

## Dependencies Check

| Dependency                                | Status | Blocker? |
| ----------------------------------------- | ------ | -------- |
| PHASE-01 (Button, Rule, Tag, font config) | TBD    | yes      |
| next-intl installed at P0                 | TBD    | yes      |
