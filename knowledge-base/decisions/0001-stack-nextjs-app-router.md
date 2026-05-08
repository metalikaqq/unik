---
id: "ADR-0001"
title: "Next.js 16 App Router + TypeScript strict as the project foundation"
status: accepted
date: "2026-05-08"
author_type: human
tags: ["stack", "framework", "frontend"]
---

# ADR-0001 — Next.js 16 App Router + TypeScript strict

## Context

Diploma project requires a public-facing landing site with 5 pages, bilingual UA/EN, deployed to a free hosting tier, and defended in front of an academic committee. The site needs SSR for SEO, modern routing for i18n, and a stack the committee will recognize as industry-standard.

## Decision

- **Framework**: Next.js 16 (App Router).
- **Language**: TypeScript with `strict: true` and `noUncheckedIndexedAccess: true`.
- **Module bundler**: Turbopack (default in Next 16).
- **Package manager**: pnpm.
- **Node version**: 22.x LTS (pinned via `.nvmrc`).

## Rationale

- App Router is the modern Next.js paradigm — `[locale]` segment naturally supports next-intl.
- SSR + RSC give better Lighthouse SEO/Performance scores than pure SPA, which matters for the diploma metrics.
- TypeScript strict catches a class of bugs early, demonstrates engineering discipline at defense.
- Vercel free Hobby plan is built for Next.js — zero-config CD, automatic preview deploys, no payment required.

## Alternatives considered

| Option                            | Why rejected                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Astro                             | Lighter, but committee less likely to recognize; islands architecture overhead doesn't pay off for 5 pages. |
| Vite + React SPA                  | No SSR, weaker SEO story, more wiring for i18n.                                                             |
| Plain HTML/CSS                    | Forfeits the "user-centered information system" framing and modern interaction patterns.                    |
| NestJS server-rendered Handlebars | Originally requested by user, then withdrawn — no backend needed.                                           |

## Consequences

- **Positive**: Strong DX, automatic optimization, excellent docs.
- **Negative**: Adds Next/React runtime cost vs static HTML — must hold ≥ 95 Lighthouse Performance via lazy boundaries.
- **Follow-on**: Tailwind v4 chosen (ADR-0005), test stack chosen (ADR-0006).
