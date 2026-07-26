---
title: Run a cycle
summary: Survey to publication, and what to do with the site between reports.
group: playbook
order: 1
status: published
updated: '2026-07-26'
related:
  - label: Data safety rules
    href: /docs/data-safety
  - label: How to contribute
    href: /docs/contributing
  - label: Source repository
    href: https://github.com/designpayasia/site
---

One DPA cycle runs from survey design through to a published report. This page is the overview: what each stage is for, and where to raise a hand if you want to help with one.

A new year should cost the project new content entries and new evidence files. It should not cost a new architecture.

The detailed mechanics for each stage (cleaning procedures, the analysis pipeline, the exact publish checklist) live in the [repository](https://github.com/designpayasia/site), not on this page. Read this page for what a cycle involves. Read the repo for how to run one.

## 1. Design the survey

The 2023 survey ran on Tally.so as an anonymous, voluntary online form.

Two decisions made at this stage constrain everything downstream, so they are worth making deliberately:

- **Segment granularity:** every breakdown on offer, whether by market, career level, or company type, is a potential small cohort. Read the [data safety rules](/docs/data-safety) before finalising the question set, rather than after the data comes back.
- **Language and reach:** the survey has run in English only, which limits participation in Indonesia, Vietnam, and Thailand. The resulting skew has to be declared in the report's methodology.

> **Gap:** there is no written survey instrument or question bank in the repo. The 2023 and 2024 question sets live outside it. Anyone running the next cycle will need to reconstruct them from the report sections.

## 2. Distribute

Past cycles reached respondents through design community channels and forums, partnerships with design organisations in Singapore, Malaysia, and Indonesia, social and professional networks, and direct outreach to design leaders.

Which channels get used shapes who answers, and the report's limitations section has to describe that honestly.

## 3. Clean the data

Duplicate and invalid submissions are removed, geography is verified, compensation figures are sanity-checked against the market, and incomplete responses below a minimum threshold are dropped. Free-text answers never reach publication verbatim. They are separated out early and treated as theme material.

> **Gap:** cleaning has always been done by hand. There is no cleaning pipeline in the repo to re-run or audit.

## 4. Analyse

Whatever method is used, every figure that reaches a report needs a sample size attached to it. The publish step rejects any figure that does not have one.

> **Gap:** this is the least documented stage, with no general analysis pipeline and no written record of how cuts were chosen for past reports. The repo has one worked example, for the 2024 Singapore figures, if you want somewhere to start.

## 5. Write the evidence records first

Before any figure appears in a report, it needs an evidence entry: source, methodology, sample size, geography, collection date, and sensitivity. Writing evidence first is the path of least resistance, since the build refuses to publish a report that references evidence which does not exist yet.

## 6. Build the report

Every stat and chart stays wired to its evidence. Where source certainty is weak, a figure is marked as a sample or suppressed rather than published and corrected later. Cohorts under ten are never published as individual figures. They are suppressed, or published only as a marked small sample with a note. The year's methodology, including its limitations, gets written here: distribution skew, language constraints, and sample composition all get declared.

## 7. Publish

Publishing runs the site's full check suite (schema, evidence, redirects, accessibility, and the static build) before anything goes live. Trust-affecting content changes need a human sign-off before they reach the default branch, and that gate is deliberate and stays human. The exact commands live in the repository README.

## 8. Between cycles

- Add redirect updates only when an alias or the latest-report pattern changes.
- Check the homepage featured-report wiring if the public surface moved.
- Leave the architecture alone. If a cycle seems to demand a rebuild, the likelier problem is the content model, and that is a conversation to have before writing any code.

## Get involved

If you want to help run a cycle (surveying, cleaning, writing evidence entries, or reviewing a report before it publishes), start at [/contribute](/contribute). Questions about any stage, including the gaps noted above, are welcome as GitHub issues on the [public repository](https://github.com/designpayasia/site).
