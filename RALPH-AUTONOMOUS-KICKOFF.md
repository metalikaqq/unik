# Ralph Autonomous Kickoff — CARPATHIAN.CONF 2026 (PHASE-01 → PHASE-10)

This is the **multi-phase** kickoff. Paste the fenced block below as the first message of a fresh Claude Code chat at `/Users/macuser/Unik/unik`. Unlike `RALPH-KICKOFF-PROMPT.md` (which scopes Ralph to one phase), this one drives the project end-to-end.

---

````
I'm running Ralph against my diploma project. PHASE-00 is shipped and live. You will execute PHASE-01 through PHASE-10 to a green production deploy. Read context first; do NOT touch code yet.

## Project

CARPATHIAN.CONF 2026 — bilingual UA/EN landing site for a fictional design + engineering
conference in Uzhhorod, 14–16 May 2026. University of Uzhhorod (UzhNU) IST diploma,
defended June 2026. Design discipline + test discipline + Lighthouse numbers count
toward the grade.

Repo: /Users/macuser/Unik/unik · GitHub: metalikaqq/unik · Branch: main · Live: https://unik-bice.vercel.app/

## Source of truth (READ THESE FIRST in this exact order)

1. knowledge-base/phases/PHASE-OVERVIEW.md          — status board, dep graph, project risks, chapter mapping
2. knowledge-base/decisions/0001..0006-*.md         — six locked ADRs (stack, visual, i18n, no-backend, tailwind v4, test stack)
3. knowledge-base/phases/phase-00-bootstrap/{SPEC,STATUS,GATE}.md
                                                     — what's already done; the operational baseline
4. knowledge-base/phases/phase-01-design-system/{SPEC,PLAN}.md  — the next phase to execute
5. knowledge-base/phases/phase-{02..10}-*/{SPEC,PLAN}.md        — the rest of the queue
6. knowledge-base/changelog/2026-05.md              — what changed and when
7. /Users/macuser/.gstack/projects/unik/sessions/   — most recent session brief (`/2cb-resume-session resume` does this)
8. AGENTS.md                                        — Next.js 16 has breaking changes vs. training data; read node_modules/next/dist/docs/ before any Next-specific code

After reading, summarize in 8–12 lines:
- which phase is next (PHASE-01 unless STATUS.md says otherwise)
- the operational baseline you inherit from PHASE-00
- what's blocked on me (the user) vs. what you can do now
- the first concrete file you want to touch
- which phases (if any) are eligible to run in parallel

## Operational baseline you inherit from PHASE-00

Already done — do not re-do:

- Next.js 16.2.5 + React 19 + TS strict (`noUncheckedIndexedAccess: true`) scaffold builds clean.
- Tailwind v4 CSS-first config wired in `src/app/globals.css`. No `tailwind.config.ts`.
- Test runners green: `pnpm test` (vitest 4), `pnpm test:e2e` (Playwright + axe across chromium/firefox/webkit), `pnpm lhci`.
- `pnpm typecheck`, `pnpm lint`, `pnpm format:check` all clean.
- GitHub Actions CI at `.github/workflows/ci.yml` (static / e2e / lighthouse jobs) — runs on PR + push to main.
- Vercel project `metalikaqqs-projects/unik` linked locally via `.vercel/project.json`. Production alias: https://unik-bice.vercel.app/
- Vercel env var `NEXT_PUBLIC_FORMSPREE_ENDPOINT` set in Production + Development with placeholder `https://formspree.io/f/PLACEHOLDER_REPLACE_ME`.
- Vercel SSO protection is OFF (toggled via API in PHASE-00). Lighthouse + Playwright can hit deployments unauthenticated.
- Git remote uses the `github.com-personal` SSH alias (`git@github.com-personal:metalikaqq/unik.git`) — do NOT switch back to default `github.com` (resolves to wrong identity `oleksandrmaniak-jpg`).
- pnpm postinstall scripts approved for `@parcel/watcher`, `@swc/core`, `sharp`, `unrs-resolver` via `pnpm.onlyBuiltDependencies` + `pnpm approve-builds`.
- pnpm scripts available: dev, build, start, lint, typecheck, format, format:check, test, test:watch, test:coverage, test:e2e, test:e2e:install, lhci.
- Author identity for commits: `Oleksandr Maniak <ai@datawireusa.com>` via `--author` flag (do NOT mutate `git config user.email`).
- Co-author trailer on every commit: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`.

Known not-done — handle when their phase comes up:

- Vercel ↔ GitHub auto-deploys are NOT wired (one-click dashboard step deferred to PHASE-09). Until wired, deploys go through `vercel deploy [--prod]` from the CLI.
- Custom domain not set (PHASE-OVERVIEW open question 1, deferred to PHASE-09). Canonical URL stays `unik-bice.vercel.app` until then.
- Real Formspree project not created. PHASE-03 will replace the placeholder env var with a live endpoint (and `?mock=1` short-circuit per ADR-0004).

## Locked decisions — do NOT relitigate

- Next.js 16 App Router. TypeScript strict + `noUncheckedIndexedAccess`. Tailwind v4 CSS-first (no tailwind.config.ts). No backend.
- Bilingual UA/EN via next-intl, `localePrefix: "always"`, UA canonical, EN secondary.
- Visual: Swiss-rigorous brutalism. Palette `#FAFAF7` / `#0A0A0A` / `#E63946`. Type: Inter Display + JetBrains Mono.
- CFP form posts to Formspree (env: `NEXT_PUBLIC_FORMSPREE_ENDPOINT`). `?mock=1` short-circuits the network call for demos.
- Test stack: Vitest + Playwright + @axe-core/playwright + @lhci/cli. Coverage ≥ 80% on `src/{lib,hooks,i18n,content}/**`.
- Pages (5): `/` Home · `/speakers` · `/schedule` · `/tickets` · `/venue`. (locale prefixed: `/uk/...` and `/en/...` once next-intl lands in PHASE-02.)
- Reduced motion respected globally — design tokens zero out `--duration-*` under `prefers-reduced-motion: reduce`.

## Scope: PHASE-01 through PHASE-10

Execute in this order, respecting the dependency graph in PHASE-OVERVIEW.md:

```
01 Design system → 02 Shell + i18n → 03 Home + CFP (★ first redeploy)
                                          ├── 04 Speakers
                                          ├── 05 Schedule       (these four
                                          ├── 06 Tickets + FAQ   may run in
                                          └── 07 Venue           parallel)
                                                  ↓
                                    08 A11y + Perf hardening
                                                  ↓
                                    09 Production deploy + custom domain
                                                  ↓
                                    10 Diploma artifacts
```

Strictly sequential: 01 → 02 → 03. After 03 ships, P04/05/06/07 may be batched
into a single working block. After they all land, 08 → 09 → 10 sequentially.

## Per-phase rhythm (this is the inner loop — execute it 10 times)

For each phase NN (01..10):

1. **Kickoff.** Set `knowledge-base/phases/phase-NN-*/SPEC.md` frontmatter
   `status: proposed → active`, `started: <today>`. Create `STATUS.md` in
   the phase directory if missing. Confirm dependencies from prior phases
   are `completed`.
2. **Read carefully.** SPEC.md exit criteria + PLAN.md task table. Treat
   PLAN.md as law (rule of engagement #1).
3. **TDD ladder for code work.** For every Zod schema, pure utility, hook,
   content invariant, i18n parity rule, or content reducer: write the
   Vitest test BEFORE the implementation. Show the failing test, then
   make it pass. Components without behavior get visual / E2E coverage
   instead of brittle markup snapshots (see `~/Projects/claude-config/shared/rules/web/testing.md`).
4. **E2E gates.** Add Playwright spec(s) per phase under `tests/e2e/<phase>.spec.ts`.
   Every page × locale gets an axe-core scan. Reduced-motion behaviour
   is asserted in PHASE-08 explicitly (and respected throughout).
5. **Local verify after every task.** `pnpm typecheck && pnpm lint &&
   pnpm format:check && pnpm test && pnpm test:e2e && pnpm build`. Bundle
   budgets: ≤ 150 kB gz on `/`, ≤ 80 kB on other landing routes — report
   sizes from `next build` whenever they could have changed.
6. **Atomic commits.** One conventional-commit per logical step
   (`feat:`, `fix:`, `refactor:`, `chore:`, `test:`, `docs:`, `ci:`,
   `perf:`, `style:`). Every commit:
   - Author: `--author "Oleksandr Maniak <ai@datawireusa.com>"`
   - Trailer: `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>`
   - Pushes to `origin main` after each phase's STATUS.md update.
7. **STATUS.md hygiene.** After each completed task, append an activity
   log line and update the task progress matrix.
8. **Phase gate.** When all SPEC.md exit criteria are met:
   a. Run `vercel deploy --prod` (so the canonical alias points at the
      latest build) and verify https://unik-bice.vercel.app/ serves the
      new content.
   b. Run Lighthouse against the canonical alias for every route this
      phase touched. Target: Performance ≥ 95, A11y = 100, BP ≥ 95,
      SEO = 100. Use `--collect.url=<url>` per route. Capture two runs
      per route, take the median.
   c. Run Playwright + axe against the canonical alias for every route
      this phase touched.
   d. Write `knowledge-base/phases/phase-NN-*/GATE.md` with: deliverables
      table, exit-criteria evidence, deployment identity, and any
      side-effects (recorded for transparency, like PHASE-00 GATE.md).
   e. SPEC.md frontmatter: `status: active → completed`, fill `completed`,
      `actual_weeks`, `confidence_score`, mark exit criteria `met: true`.
   f. Append a milestone entry to `knowledge-base/changelog/<YYYY-MM>.md`.
   g. Update `PHASE-OVERVIEW.md` status board row.
9. **Session checkpoint.** Run `/2cb-resume-session save "phase-NN gate
   PASS"` so the next session resumes cleanly.
10. **Advance.** Move to phase NN+1 (or to the parallel batch P04–P07).

## Phase-specific guidance

- **PHASE-01 Design system + tokens.** Define palette + type + spacing + motion
  in `src/app/globals.css` via Tailwind v4 `@theme` directive (NOT `tailwind.config.ts`).
  Build atomic primitives (Button, Surface, AnimatedText, etc.) under `src/components/ui/`.
  Read AGENTS.md and `node_modules/next/dist/docs/` before reaching for fonts —
  Next 16 changed `next/font` ergonomics. Inter Display + JetBrains Mono via `next/font/google`.
- **PHASE-02 Shell + i18n.** Wire `next-intl` with `[locale]` segment.
  `localePrefix: "always"`. UA canonical, EN secondary. Add a parity test
  that fails CI when a key exists in `uk/*.json` but not `en/*.json` (or vice versa).
- **PHASE-03 Home + CFP.** First redeploy. CFP form via `react-hook-form` + `zod`;
  posts to `NEXT_PUBLIC_FORMSPREE_ENDPOINT` unless `?mock=1`. **Set up the real
  Formspree project at this point** — ask me before changing the env var to a
  real endpoint (it goes through `vercel env rm` then `vercel env add`).
- **PHASE-04..07.** May run in parallel after 03 ships. If you choose to
  parallelize, do it at the commit / branch level — separate feature branches,
  separate PRs to main, separate gate verifications. Or if you stay on main,
  keep commits cleanly scoped per phase so a revert is surgical.
- **PHASE-08 A11y + Perf hardening.** Don't skimp. This is where the diploma
  defense lives or dies. Add a dedicated Playwright spec for `prefers-reduced-motion`.
  Add a bundle-size assertion (e.g., size-limit) if not already in place.
- **PHASE-09 Production deploy.**
  - Wire Vercel ↔ GitHub: visit https://vercel.com/metalikaqqs-projects/unik/settings/git
    and authorize. Ask me to do that step — it's a dashboard click I can't automate.
  - Decide on a custom domain. Default assumption: I'll register it and
    point it at Vercel. Ask me before assuming any domain name.
  - Once GitHub auto-deploys are wired, every push to a feature branch
    creates a unique preview URL.
- **PHASE-10 Diploma artifacts.** README polish, architecture diagrams,
  the practical-chapter section of the diploma write-up referencing
  the live URL + GitHub repo + KB. Output goes to `knowledge-base/diploma/`.

## Cost & context guardrails (THIS IS LOAD-BEARING)

A single Claude Code session degrades after enough back-and-forth — context
fills, prompt cache misses pile up, output quality drops. You will hit
this wall well before all 10 phases finish.

Rules:

- After every phase gate PASS, run `/2cb-resume-session save "phase-NN gate"` and
  ask yourself: am I more than ~60% through context? If yes, stop and tell
  me to open a fresh chat. Do NOT push through.
- If a single phase exceeds **2× its PLAN.md estimated days** of work in
  this session, stop and tell me. Likely a tooling regression, a bad
  abstraction, or a misread spec — better to debug fresh.
- If three consecutive task attempts fail (test won't pass, build won't
  build, deploy keeps regressing), stop. Don't loop. Save STATUS.md, save
  a session checkpoint, hand off.

When you hand off:
1. Commit and push everything stable. Leave the working tree clean.
2. Update STATUS.md of the in-progress phase with the exact next file +
   line you'd touch.
3. Run `/2cb-resume-session save "phase-NN handoff: <one-line reason>"`.
4. Tell me: where you stopped, what's left, what blocked you, and which
   phase to resume in the next chat.

## Risky ops requiring user confirmation (rule 9)

You may NEVER do any of these without me typing "OK <op>":

- `git push --force` (or `--force-with-lease`)
- `git reset --hard` against pushed commits
- `vercel project rm` / deleting any deployment
- `gh release create` / `gh repo delete`
- `pnpm uninstall` of any runtime dep listed in PHASE-00 SPEC.md
- Editing `~/.claude/settings.json` (the PHASE-00 prettier-config detour
  was a one-time exception — do not repeat it)
- Disabling Vercel SSO again (already disabled; if you find it re-enabled,
  ask before toggling)
- Adding a new ADR
- Moving a non-active phase to `status: active` outside the per-phase
  rhythm above

Regular `git push` (non-force) is fine — you authorized that pattern in
PHASE-00 and it stays authorized for this multi-phase run.

## Hard NOs

- No backend. No DB. No API routes beyond what next-intl needs.
- No new ADRs without proposing them to me first (write a proposal in
  the phase's STATUS.md → "Proposed ADRs", await my OK).
- No moving more than one phase to `active` at the same time, EXCEPT
  the sanctioned P04–P07 parallel batch.
- No editing `/Users/macuser/.claude/plans/*` (read-only session plans).
- No reformatting `knowledge-base/`, `pnpm-lock.yaml`, `AGENTS.md`,
  `CLAUDE.md`, `RALPH-*.md`, `public/` — they're in `.prettierignore`
  for a reason.
- No `--no-verify` on commits. Hooks fail = root-cause fix, not bypass.
- No introducing `any` types. Use `unknown` + narrowing or define the
  shape.
- No mock-only tests for production logic. If something is mocked,
  there must also be a real-network test (or `?mock=1` short-circuit
  with a clear toggle).
- No emojis in code, comments, commit messages, or KB docs unless I
  explicitly add them. The visual system is brutalist; emojis fight it.

## Output expectations after every task

Short report. No prose dumps:

- 1–3 bullets of what changed (file path + 1-line each)
- Test runs: vitest counts, playwright counts, `pnpm tsc --noEmit` clean,
  `pnpm lint` clean, `pnpm format:check` clean
- Bundle size delta from `next build` if deps/configs changed (per route)
- Lighthouse score if a deploy happened
- Next planned task per PLAN.md

## When all 10 phases are at `completed`

Stop. Tell me you're done. The deliverable URL is whatever PHASE-09 set
as the canonical (`unik-bice.vercel.app` until then). Final summary: total
commits, total LOC, total Lighthouse pass count, total Playwright pass
count, total time elapsed. Then run `/2cb-resume-session save "all phases
completed"` so the milestone is archived.

## Open questions where you may assume the default (otherwise ask me)

- **Repo visibility**: stays public. (already public on github.com)
- **Custom domain**: assume `unik-bice.vercel.app` until PHASE-09. If
  PHASE-09 needs a real domain, ask me.
- **Formspree real endpoint**: ask me at PHASE-03. Do NOT replace the
  placeholder unilaterally.
- **A second locale beyond UA/EN**: don't add. Out of scope.
- **Analytics / cookie banner**: don't add unless I bring it up.
- **CMS / Sanity / contentlayer**: don't add. Content lives in
  TypeScript files under `src/content/`.

## First step

Read the 8 source-of-truth files above. Then summarize state per the spec
above and propose:
- the *exact* first file edit you want to make for PHASE-01 (path + 1-line description)
- a per-phase budget (your estimate of how many sessions we'll need to
  reach PHASE-10 done, given the cost guardrails)

Wait for me to say "go".
````

---

## Notes for you (not for Ralph)

- **Where to paste**: open a fresh Claude Code chat at `/Users/macuser/Unik/unik`. Paste the fenced block above as the very first message. Don't add anything else — Ralph reads context first, then waits for your `go`.
- **What you'll do at every phase gate**: not much. Ralph drives. You answer the 3–4 questions per phase that the prompt explicitly says require your OK (Formspree real endpoint, custom domain at PHASE-09, Vercel ↔ GitHub authorization, any new ADRs). Each question is one word from you (`OK formspree`, `OK domain carpathian-conf.com`, etc.).
- **Session pacing**: the prompt tells Ralph to **stop and hand off** when context gets crowded or a phase blows its budget. That's intentional — pushing past 60% context burn produces sloppy work, and a single chat won't carry 10 phases. Expect to open 2–4 fresh chats. Each new chat: paste the same prompt; Ralph reads STATUS.md and resumes.
- **If Ralph drifts from the spec**: the prompt locks the 6 ADRs and 5 pages and the test/perf/a11y floors. If Ralph proposes a 6th page, a new ADR, a backend, an emoji in the design, or a `--force` push — say no, point at the relevant rule, and Ralph backs off.
- **Cost ceiling**: per the original kickoff prompt, ~30 working days of estimated effort. Keep an eye on real-world pacing — if a phase is taking 3× longer than its PLAN estimate, that's a sign to pause and re-spec, not to push through.
- **One last check before you paste**: re-read the "Operational baseline" section in the prompt and confirm everything is still true (in particular: Vercel SSO still off, git remote still pointing at `github.com-personal`, env vars still set). If anything drifted, edit the prompt before pasting.

Want me to also commit this file to the repo so it travels with the project?