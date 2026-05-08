---
id: "ADR-0004"
title: "No backend; CFP form submits to Formspree free tier"
status: accepted
date: "2026-05-08"
author_type: human
tags: ["forms", "backend", "scope"]
---

# ADR-0004 — No backend; Formspree handles CFP submissions

## Context

The thesis subject is "user-centered interaction on a landing page". The user explicitly scoped this as a frontend-only project. However, Chapter 2 of the thesis covers form-interaction patterns (validation, async submit, success/error states) — which need a real submission target to demonstrate honestly.

## Decision

- **No backend, no database, no auth.**
- **CFP submission target**: Formspree free plan endpoint (`NEXT_PUBLIC_FORMSPREE_ENDPOINT`).
- **Mock fallback**: a `?mock=1` query parameter short-circuits the real Formspree call and returns success, for in-class demos that should not consume the 50-submission monthly quota.
- **Honeypot field** (`url` input, hidden, must remain empty) provides minimal spam defense.
- **Validation**: client-side via React Hook Form + Zod; server-side validation is whatever Formspree provides.
- **Tickets / venue CTAs**: link to fictional Tito/Eventbrite/OSM URLs — no real commerce or map auth.

## Rationale

- Stays inside the user's "frontend only" scope.
- Demonstrates the full async-form pattern (loading → success/error → retry) end-to-end, which Chapter 2 needs to evidence.
- Formspree free is sufficient: 50 submissions / month covers all defense demos.
- Removing the backend removes deployment complexity and keeps the diploma artifact a single Vercel free-tier deploy.

## Alternatives considered

| Option                                        | Why rejected                                                                             |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Vercel Serverless function + email via Resend | Adds backend code (Vercel free allows it but doubles ops surface); Formspree is simpler. |
| `mailto:` link only                           | No async UX to demonstrate; weak evidence for Chapter 2.                                 |
| Static-only form mock                         | No real submission; fails "user-centered interaction" defense narrative.                 |
| Full NestJS backend                           | Was original ask, then explicitly withdrawn by user.                                     |

## Consequences

- Add `NEXT_PUBLIC_FORMSPREE_ENDPOINT` to Vercel env vars and document it in the README.
- Document the 50/month quota in the report and the mock fallback for demo days.
- E2E tests intercept the network call and stub Formspree responses; they never hit the real endpoint.
