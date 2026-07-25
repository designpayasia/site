---
title: Run a cycle
summary: Survey to publication, and what to do with the site between reports.
group: playbook
order: 1
status: published
updated: '2026-07-25'
related:
  - label: Data safety rules
    href: /docs/data-safety
  - label: How to contribute
    href: /docs/contributing
  - label: Ops spine
    href: /ops
---

One DPA cycle runs from survey design through to a published report. This page covers the whole of it, including the parts that are not written down yet.

A new year should cost you new content entries and new evidence files. It should not cost you a new architecture.

## 1. Design the survey

The 2023 survey ran on Tally.so as an anonymous, voluntary online form, collecting between December 2022 and February 2023.

Two decisions made at this stage constrain everything downstream, so make them deliberately:

- **Segment granularity:** every breakdown you offer, whether by market, career level, or company type, is a potential small cohort. A question that splits 300 responses six ways will produce cells you cannot publish. Read the [data safety rules](/docs/data-safety) before finalising the question set, rather than after the data comes back.
- **Language and reach:** the survey has run in English only. That limits participation in Indonesia, Vietnam, and Thailand, and the resulting skew has to be declared in the report's methodology.

> **Gap:** there is no written survey instrument or question bank in this repo. The 2023 and 2024 question sets live outside it. Anyone running the next cycle will need to reconstruct them from the report sections.

## 2. Distribute

Past cycles reached respondents through design community channels and forums, partnerships with design organisations in Singapore, Malaysia, and Indonesia, social and professional networks, and direct outreach to design leaders.

Record which channels you used. Distribution shapes who answers, and the report's limitations section has to describe it honestly.

## 3. Clean the data

The 2023 cycle retained 323 valid responses after cleaning. The procedures were:

- Remove duplicate submissions.
- Exclude invalid or inconsistent responses.
- Verify geographic consistency.
- Sanity-check compensation figures against the market.
- Drop incomplete responses below a minimum threshold.

Free-text answers never make it to publication verbatim. Separate them early and treat them as theme material.

> **Gap:** cleaning was done by hand and is not scripted. There is no cleaning pipeline in this repo to re-run or audit.

## 4. Analyse

> **Gap:** this is the least documented stage. Aggregation for the 2024 Singapore figures exists as `scripts/aggregate-2024-sg.mjs`, but there is no general analysis pipeline, and no written record of how cuts were chosen for previous reports. If you are rebuilding this stage, that script is the only worked example in the repo.

Whatever method you use, every figure that reaches a report needs a sample size attached to it. The publish step will reject figures that do not have one.

## 5. Write the evidence records first

Before any figure appears in a report, it needs an evidence entry in `src/content/evidence`. One JSON file per `evidenceId`, carrying its source, methodology, sample size, geography, collection date, and sensitivity.

This ordering exists because the build crashes with `Missing evidence entry` when a report references an `evidenceId` that has not been created yet. Writing evidence first is the path of least resistance.

## 6. Build the report

Create the report content entries under `src/content/reports/<year>/`, keeping the year-namespaced canonical path.

- Every stat and chart stays wired to its `evidenceIds`.
- Where source certainty is weak, mark the figure as `sample` or suppress it rather than publishing and correcting later.
- Cohorts under 10 must be `suppressed` or `sample` with a note. The schema enforces this and the build will fail otherwise.
- Write the year's methodology section, including its limitations. This is where distribution skew, language constraints, and sample composition get declared.

Run `pnpm run check` and `pnpm build:site` as you go, so schema and route problems surface early.

## 7. Publish

Publishing should prove the route contract, evidence layer, redirects, and static build before anything goes live.

```bash
nvm use                      # Node 22 via .nvmrc
pnpm install                 # if dependencies changed
pnpm run audit:pii           # required for any content change
pnpm run redirects:check
pnpm run audit:tokens
pnpm run audit:ops
pnpm build
pnpm run check-links
pnpm run check
```

Review the generated `public/_redirects` and the `dist` output for any route-contract change before pushing. Bump the version in `package.json` per the SemVer mapping (`feat` is minor, `fix` is patch) so releases stay traceable.

Trust-affecting content changes need manual approval before they reach the default branch. That gate is deliberate and stays human.

## 8. Between cycles

- Add redirect updates only when an alias or the latest-report pattern changes.
- Check the homepage featured-report wiring if the public surface moved.
- Leave the architecture alone. If a cycle seems to demand a rebuild, the likelier problem is the content model, and that is a conversation to have before writing any code.
