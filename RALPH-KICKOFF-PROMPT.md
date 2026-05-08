# Ralph Kickoff Prompt — CARPATHIAN.CONF 2026

Paste the block below as the **first message** of a fresh Claude Code chat at `/Users/macuser/Unik/unik`.

It tells Ralph (a) what the project is, (b) where the source of truth lives, (c) which phase to execute first, (d) the rules of engagement, and (e) which guardrails not to cross.

---

```
I'm running Ralph against my diploma project. Read context first; do NOT touch code yet.

## Project

CARPATHIAN.CONF 2026 — bilingual UA/EN landing site for a fictional design + engineering
conference in Uzhhorod, 14–16 May 2026. Built as the practical chapter (Ch. 4) of my
University of Uzhhorod (UzhNU) IST diploma. Defended June 2026 in front of an academic
committee; design discipline + test discipline + Lighthouse numbers count toward the grade.

Repo: /Users/macuser/Unik/unik · GitHub: metalikaqq/unik · Branch: main (zero commits yet).

## Source of truth (READ THESE FIRST in this exact order)

1. knowledge-base/phases/PHASE-OVERVIEW.md          — status board, dep graph, project risks, chapter mapping
2. knowledge-base/decisions/0001..0006-*.md         — all six locked ADRs (stack, visual, i18n, no-backend, tailwind v4, test stack)
3. knowledge-base/phases/phase-00-bootstrap/SPEC.md — the phase you'll execute first
4. knowledge-base/phases/phase-00-bootstrap/PLAN.md — task breakdown with day estimates and owners
5. knowledge-base/changelog/2026-05.md              — what was already done before you arrived
6. /Users/macuser/.gstack/projects/unik/sessions/20260508-153323-carpathian-conf-phase-planning.md
                                                     — last session brief (KB-aware), most accurate state

After reading, summarize in 6–10 lines:
- which phase is active
- what is already on disk (pre-execution state)
- what's blocked on me (the user) vs what you can do now
- the first concrete file you want to touch

## Locked decisions — do NOT relitigate

- Next.js 16 App Router, TypeScript strict, Tailwind v4 CSS-first (no tailwind.config.ts).
- Bilingual UA/EN via next-intl, localePrefix: "always", UA canonical.
- Visual: Swiss-rigorous brutalism. Palette #FAFAF7 / #0A0A0A / #E63946. Type: Inter Display + JetBrains Mono.
- No backend. CFP form posts to Formspree (env: NEXT_PUBLIC_FORMSPREE_ENDPOINT). ?mock=1 short-circuits for demos.
- Test stack: Vitest + Playwright + @axe-core/playwright + @lhci/cli. Coverage ≥ 80% on lib/hooks/i18n/content.
- Pages (5): / Home · /speakers · /schedule · /tickets · /venue.
- Reduced motion respected globally; tokens zero out --duration-* under prefers-reduced-motion: reduce.

## Pre-execution state (already on disk before this chat)

- Next.js 16 scaffold from `create-next-app` (TS, App Router, Tailwind v4, ESLint, src dir, @/ alias, pnpm).
- Runtime deps installed: next-intl, framer-motion, react-hook-form, zod, @hookform/resolvers, clsx, lucide-react.
- Dev deps NOT installed yet: vitest, @vitejs/plugin-react, @testing-library/react, @testing-library/jest-dom,
  jsdom, @playwright/test, @axe-core/playwright, @lhci/cli, prettier.
- No tests, no CI workflow, no Vercel link, no first commit.
- All 11 phases at status: proposed.

## Your scope right now: PHASE-00 only

Execute PHASE-00 per knowledge-base/phases/phase-00-bootstrap/PLAN.md tasks 0.3 → 0.12.
Do NOT start PHASE-01 design system work — even if you finish PHASE-00 fast. Stop at the gate.

Tasks 0.1 and 0.2 are pre-done. Re-verify them by running `pnpm install && pnpm build`
and checking `package.json` matches the dep list in PHASE-00 SPEC.md.

## Rules of engagement

1. **Phase plan is law.** Every task you pick MUST appear in PLAN.md. If you discover a missing
   task, propose it as an amendment to PLAN.md before doing it.
2. **TDD ladder.** For every Zod schema, pure utility, hook, content invariant, or i18n parity rule:
   write the Vitest test BEFORE the implementation. Red → green → refactor. Show the failing test first.
3. **E2E gates.** Every phase has Playwright specs in tests/e2e/. PHASE-00 has the trivial sanity spec only.
4. **Bundle discipline.** Hold the JS bundle ≤ 150 kB gzipped on / and ≤ 80 kB on other landing routes.
   Run `next build` and report sizes whenever they could have changed.
5. **Accessibility floor.** axe-core zero serious/critical violations on every page × locale you touch.
   PHASE-00 only has the default scaffold page — still scan it.
6. **Performance floor.** Lighthouse 95/100/95/100 on every route. PHASE-00 must hit that on the empty home.
7. **Atomic commits.** One conventional-commit per logical step (feat:, fix:, chore:, test:, docs:, ci:).
   Co-authored-by trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.
8. **Status hygiene.** After completing each task, update knowledge-base/phases/phase-00-bootstrap/STATUS.md
   (create it if missing) and append an activity log line.
9. **Risky ops require confirmation.** Never run `git push --force`, `vercel --prod`, `gh release create`,
   `pnpm uninstall`, or anything that mutates the GitHub repo state without me typing OK.
10. **Hard NOs.**
    - No backend. No DB. No API routes beyond what next-intl needs.
    - No new ADRs without proposing them to me first.
    - No moving any other phase to status: active.
    - No editing /Users/macuser/.claude/plans/* (those are session plan files — read-only).

## Output expectations after every task

- Bullet of what changed (paths + 1-line each).
- Test runs: vitest output (counts), playwright output (counts), `pnpm tsc --noEmit` clean, `pnpm lint` clean.
- Bundle size delta if dependencies/configs changed.
- Next planned task per PLAN.md.

## When PHASE-00 GATE.md verdict is PASS

Stop. Tell me you're at the gate. Do not start PHASE-01.

I will:
- Review the PHASE-00 GATE.md and STATUS.md.
- Decide whether to run `/2cb-phase-plan kickoff phase-01`.
- Tell you to proceed.

## First step

Read the 6 source-of-truth files above. Then summarize state per the spec and propose
the *exact* first file edit you want to make (path + 1-line description). Wait for me to say "go".
```

---

## Notes for you (not for Ralph)

- **Where to save this file**: it's already at `/Users/macuser/Unik/unik/RALPH-KICKOFF-PROMPT.md`. You can also `gh issue` it onto the GitHub repo as the project-launch issue if you want a permanent record.
- **What "Ralph" is in this context**: any Claude Code agent in a fresh session. The prompt is harness-agnostic — it works in plain Claude Code, in dmux, in a `/2cb-ralph` autonomous loop, or in `/loop`. If you want to use the formal `/2cb-ralph` skill, run `/2cb-ralph-prd` first against `phase-00-bootstrap/{SPEC,PLAN}.md` to generate `prd.json`, then start the loop. Otherwise paste the block above and step through manually.
- **One phase at a time**: the prompt explicitly forbids Ralph from rolling forward into PHASE-01. Each phase gets its own kickoff round. To launch PHASE-01, copy this file, change `phase-00` references to `phase-01`, update the "pre-execution state" + "first step" sections, and start a fresh chat.
- **Cost guardrails**: PHASE-00 is ~2 days of work. If a single Ralph session burns through more than that without hitting the gate, stop it and inspect — likely a tooling regression in CI/Vercel/Formspree wiring.
