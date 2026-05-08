---
id: "PHASE-03"
title: "Home Page + CFP Form (vertical slice + first deploy)"
status: proposed
author_type: human
ai_model: null
created: "2026-05-08"
started: null
completed: null
component: frontend
dependencies: ["PHASE-02"]
blocked_by: []
deliverables:
  - name: "Home page hero (mega headline, mono caption, dates, accent block)"
    status: pending
    verification: "Renders at /uk and /en at full viewport height; visually approved at 375 / 768 / 1280."
  - name: "MarqueeText hero strip with reduced-motion fallback"
    status: pending
    verification: "Animates by default; static under prefers-reduced-motion."
  - name: "Manifesto section (3-column Swiss block)"
    status: pending
    verification: "Renders with hairline rules; both locales translated."
  - name: "Headline speakers tile section linking to /speakers"
    status: pending
    verification: "4 featured speakers visible; click navigates to /[locale]/speakers."
  - name: "CFPForm with React Hook Form + Zod + Formspree submit"
    status: pending
    verification: "Empty submit shows 4 errors; valid submit lands in Formspree dashboard; mocked failure shows retry."
  - name: "OG image, favicon, route metadata"
    status: pending
    verification: "View-source shows og:image, og:title, og:description, twitter card; favicon visible."
  - name: "Live Vercel preview URL for /uk and /en"
    status: pending
    verification: "Preview URL serves both locales; Lighthouse on /uk: Perf ≥ 95, A11y = 100, BP ≥ 95, SEO = 100."
exit_criteria:
  - criterion: "Real CFP submission lands in Formspree dashboard."
    met: false
    evidence: null
  - criterion: "LCP < 2.5 s on Vercel (PageSpeed Insights, mobile)."
    met: false
    evidence: null
  - criterion: "JS bundle on / < 150 kB gzipped (per global rule)."
    met: false
    evidence: null
  - criterion: "All E2E specs for home + CFP green."
    met: false
    evidence: null
  - criterion: "axe-clean on /uk and /en home."
    met: false
    evidence: null
tags: ["home", "form", "vertical-slice", "deploy"]
estimated_weeks: 1.0
actual_weeks: null
confidence_score: null
---

# Phase 03: Home Page + CFP Form (vertical slice + first deploy)

## Problem Statement

After P0–P2 the site has chrome and routing but no real content. P3 ships the first complete vertical slice — hero, manifesto, lineup teaser, real working CFP form — and **deploys it to a live Vercel URL**. From this phase forward, every subsequent push extends a working site rather than building toward one.

## Goals

1. Demonstrate the strongest UX patterns from Chapters 2 and 3 of the thesis (hero, marquee, scroll-reveal, async form, validation, success/error, retry) on a single page.
2. Reach the first live URL the supervisor and committee can visit.
3. Set the visual tone for P4–P7 — every later page imitates this hero/section rhythm.

## Scope

### In scope

- Home page composition: `Hero`, `MarqueeText`, `Manifesto`, `HeadlineSpeakers`, `CFPForm`.
- 6 mock speakers in `src/content/speakers.ts` (typed; UA + EN bios).
- Zod schema for CFP submission in `src/lib/validators.ts`.
- Slugify helper handling Cyrillic transliteration in `src/lib/format.ts`.
- Formspree integration via `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
- `?mock=1` fallback short-circuiting Formspree for in-class demos.
- `metadata` export with OG image, title, description.
- `public/og-image.png` (1200×630, brutalist composition).
- `public/favicon.svg`.
- Vercel env var configured; production deploy tagged `v0.3.0`.

### Out of scope

- Speakers, schedule, tickets, venue full pages (P4–P7).
- Anything dynamic on the home (live ticket counter, etc.).

## Architecture

```
src/
├── app/[locale]/page.tsx          ← composes Hero → MarqueeText → Manifesto → HeadlineSpeakers → CFPForm
├── components/home/
│   ├── Hero.tsx
│   ├── Manifesto.tsx
│   ├── HeadlineSpeakers.tsx
│   └── CFPForm.tsx
├── content/speakers.ts            ← 6 mock entries
├── lib/
│   ├── validators.ts              ← Zod CFP schema
│   └── format.ts                  ← slugify with Cyrillic
└── i18n/messages/{uk,en}.json     ← + home, manifesto, cfp, error keys
public/
├── og-image.png
└── favicon.svg
tests/
├── unit/lib/{validators,format}.test.ts
├── unit/components/home/CFPForm.test.tsx
└── e2e/home.spec.ts
```

## Test Strategy

**TDD ladder**:

- CFP Zod schema:
  - rejects empty payload
  - rejects bad email
  - rejects abstract < 200 chars or > 800 chars
  - accepts valid payload
- `formatTalkTitle` slugify:
  - `"Привіт, Київ!"` → `"pryvit-kyiv"`
  - English passes through normally
  - removes punctuation, collapses whitespace

**Component test**:

- `CFPForm` empty submit shows 4 errors with `aria-invalid` and `aria-describedby`.
- Submitting valid form calls `fetch` once with the right payload.
- Success state replaces form with confirmation.
- Error path renders retry button which re-submits.

**E2E**:

- Home renders hero, marquee, manifesto, lineup, form at /uk and /en.
- Empty submit → 4 inline errors visible.
- Valid submit (Formspree mocked via Playwright route interception) → success message.
- Network failure simulated → error state with retry.
- Honeypot field filled → submit silently no-ops (server stub records nothing).
- Reduced-motion mode: hero marquee static, no scroll-linked motion.
- Lighthouse on Vercel preview meets the budget.

## Dependencies

### Depends on

- PHASE-02 (shell, layout, locale toggle).
- PHASE-01 (Button, Rule, Tag, MarqueeText primitives).

### Blocks

- PHASE-04, PHASE-05, PHASE-06, PHASE-07 (those pages slot into the vertical-slice mold).

## Open Questions

1. Where to source 6 mock speaker portraits ethically? (Decision: AI-generated placeholders or Unsplash with attribution; final pass at P10.)
2. Honeypot strategy adequate vs reCAPTCHA? (Decision: honeypot only. Free tier + privacy-clean. Document in report.)
