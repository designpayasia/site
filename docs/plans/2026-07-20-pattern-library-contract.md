# Pattern library contract implementation plan

> **For Hermes:** Use the `subagent-driven-development` skill to implement this plan task by task, with separate maker and checker agents.

**Goal:** Make the existing pattern library discoverable and authoritative for people and coding agents, while bringing `DESIGN.md`, `AGENTS.md`, and `/docs/patterns` back into alignment.

**Architecture:** Keep responsibilities separate rather than copying component APIs across documents. `DESIGN.md` owns principles, tokens, and durable guardrails; `/docs/patterns` owns pattern selection and rendered examples; component `Props` interfaces own exact runtime APIs; `src/content.config.ts` owns report frontmatter; and `AGENTS.md` owns the reuse and verification workflow.

**Tech stack:** Markdown, Astro, TypeScript, Google `design.md` CLI, pnpm, and git.

**Release convention:** Use a `feat/` branch and Conventional Commit `feat` changes. This is a minor semver change from 0.13.0 to 0.14.0. Add the release bump only after implementation and verification.

**Out of scope:** New UI patterns, component API changes, CSS changes, and a new automated pattern-registry architecture. A drift audit can be considered separately after the documentation contract is established.

---

## Acceptance criteria

- `DESIGN.md` names the source-of-truth hierarchy and points to `/docs/patterns` and `src/pages/docs/patterns.astro`.
- `DESIGN.md` describes the current stable pattern families without duplicating volatile prop interfaces.
- Known stale guidance for dark sections, big stats, pull quotes, charts, Observable Plot, and the footer is corrected.
- The machine-readable `design.md` frontmatter remains valid and its avoidable warnings are reduced without changing implementation tokens.
- `AGENTS.md` includes a mandatory pattern-reuse runbook for new or substantially restyled report UI.
- `AGENTS.md` directs agents to inspect component `Props` and `src/content.config.ts` rather than trusting copied examples.
- The chart runbook reflects the current 2 to 6-column fallback schema, build-time Plot support, range charts, segments, and variants.
- `/docs/patterns` makes source paths and production status or examples discoverable, without adding a new metadata layer or redesigning the gallery.
- Public prose uses British English, sentence-case headings, the Oxford comma, and no em dashes.
- `pnpm run check`, `pnpm run build`, and `npx -y @google/design.md lint DESIGN.md` complete successfully.

---

### Task 1: Extract the gallery-to-source reference map

**Tier:** T1 extractor

**Objective:** Produce a verified map of each gallery specimen to its component file and, where available, an existing production route or usage location.

**Files:**
- Read: `src/pages/docs/patterns.astro`
- Read: `src/components/*.astro`
- Read: `src/pages/**/*.astro`
- Do not modify files.

**Steps:**

1. Enumerate every component imported by `src/pages/docs/patterns.astro`.
2. Verify the exact source file for each imported component.
3. Search `src/pages/` for real usage of each component.
4. Classify each entry as `production`, `specialised`, `internal partial`, or `docs-only`, using only evidence found in the repository.
5. Return a concise table that the Task 4 maker can use. Do not guess missing routes.

**Verification:** Every listed source path exists, and every production example cites an observed usage path.

---

### Task 2: Align `DESIGN.md` with the established patterns

**Tier:** T2 maker

**Objective:** Turn `DESIGN.md` into a durable design contract that references the live gallery and accurately describes the current implementation.

**Files:**
- Modify: `DESIGN.md`
- Read: `src/pages/docs/patterns.astro`
- Read: relevant files under `src/components/`
- Read: `src/content.config.ts`

**Steps:**

1. Add a short source-of-truth section explaining the responsibilities of `DESIGN.md`, `/docs/patterns`, component `Props`, `src/content.config.ts`, and `AGENTS.md`.
2. Add a compact pattern-selection registry covering the current pattern families. Describe intent and guardrails, but do not copy full prop interfaces.
3. Correct stale statements about `DarkBeat`, `BigStat`, `PullQuote`, chart fallback props, build-time Observable Plot, range and filtered charts, and `SiteFooter`.
4. Preserve the existing design voice and locked constraints.
5. Fix avoidable machine-readable warnings where the fix is truthful and does not change CSS or runtime behaviour. In particular, move unsupported big-stat label font sub-tokens into a valid typography token and add a documented compatibility alias if required by the CLI.
6. Run the humanizer checklist on new prose. Keep it direct and technical.

**Verification:**

- Run `npx -y @google/design.md lint DESIGN.md`.
- Confirm zero errors.
- Report any remaining warnings and why they are intentionally retained.
- Search the document for obsolete claims identified above.

**Commit after approval:** `docs: align design contract with patterns`

---

### Task 3: Add the pattern-reuse workflow to `AGENTS.md`

**Tier:** T2 maker

**Objective:** Make checking and reusing established patterns a required agent workflow.

**Files:**
- Modify: `AGENTS.md`
- Read: `DESIGN.md`
- Read: `src/pages/docs/patterns.astro`
- Read: `src/content.config.ts`
- Read: `src/components/ChartBlock.astro`

**Steps:**

1. Add a self-contained runbook for adding or substantially restyling report UI.
2. Require agents to read `DESIGN.md`, inspect `/docs/patterns` or its source, prefer reuse or composition, inspect the selected component's `Props`, and update the gallery when reusable intent changes.
3. State the same source-of-truth hierarchy used in `DESIGN.md`.
4. Update the chart runbook to reflect the current frontmatter schema: 2 to 6 fallback columns, bars or build-time Plot, range rows, segments, variants, and their mutual-exclusion rules.
5. Keep existing runbooks intact unless a statement is demonstrably stale.
6. Keep shell examples consistent with the repository's `rtk` instruction where commands run in the agent environment.
7. Run the humanizer checklist on new prose.

**Verification:**

- Search `AGENTS.md` for `/docs/patterns`, `Props`, `src/content.config.ts`, and the new runbook heading.
- Compare chart claims against `src/content.config.ts`.
- Confirm no existing mandatory audit step was removed.

**Commit after approval:** `docs: require established pattern reuse`

---

### Task 4: Strengthen `/docs/patterns` as a reference

**Tier:** T2 maker, using Task 1's verified map

**Objective:** Make the gallery easier to use as an implementation reference without introducing a new registry or changing pattern behaviour.

**Files:**
- Modify: `src/pages/docs/patterns.astro`
- Read: Task 1 reference map
- Read: relevant `src/components/*.astro` files

**Steps:**

1. Adjust the introduction so it accurately distinguishes isolated specimens from page-scoped patterns that are linked to production examples.
2. Add a concise reference convention that exposes the component source path and production status or example where verified.
3. Apply the convention consistently across the existing specimens, or at the section level where repeating it on every specimen would reduce readability.
4. Add missing page-scoped references for `ChapterRail`, `ConversationBlock`, and `TeamGrid`, or explicitly state why they are represented by live production links rather than isolated specimens.
5. Do not change component props, styles, or production report pages.
6. Run the humanizer checklist on new prose.

**Verification:**

- Run `pnpm run check`.
- Confirm every new path or route reference exists.
- Visually inspect `/docs/patterns` if a local server is available.

**Commit after approval:** `docs: strengthen pattern gallery references`

---

### Task 5: Independent integration review and final verification

**Tier:** T2 checker, fresh context

**Objective:** Confirm that the three edited surfaces agree, stay within scope, and pass the repository gates.

**Files:**
- Review: `DESIGN.md`
- Review: `AGENTS.md`
- Review: `src/pages/docs/patterns.astro`
- Review: the complete git diff from the branch base

**Steps:**

1. Run a spec-compliance review against every acceptance criterion.
2. Run a separate quality review for contradictions, duplicated authority, stale API details, awkward prose, and scope creep.
3. Resolve all critical and important findings through a fresh fix agent, then repeat the relevant review.
4. Run:
   - `rtk pnpm run check`
   - `rtk pnpm run build`
   - `rtk npx -y @google/design.md lint DESIGN.md`
5. Review `rtk git diff --check`, `rtk git diff --stat`, and `rtk git status --short`.
6. Commit any final reviewed integration fix separately if needed.

**Expected result:** The branch contains a tracked plan plus focused, independently reviewed commits for the design contract, agent workflow, and pattern gallery. The branch is not pushed unless explicitly requested.
