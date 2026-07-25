---
title: Data safety rules for what gets published
summary: Small-cohort suppression, disclosure rules, and how to ask for a correction.
group: trust
order: 1
status: published
updated: '2026-07-25'
related:
  - label: Using our data
    href: /docs/using-our-data
  - label: How to contribute
    href: /docs/contributing
  - label: Ops spine
    href: /ops
---

DPA publishes self-reported survey data. These rules keep small cohorts from becoming individual disclosures. They are enforced in code where possible, and they are the trust floor for any future report or dataset work.

## Small-cohort suppression

`MIN_SAFE_COHORT` is 10, set in `src/lib/evidence.ts`. Any cohort under 10 respondents publishes with `publishMode` of `suppressed` or `sample`, plus a mandatory note explaining why.

The content schema in `src/content.config.ts` enforces both halves: a published metric with a `sampleSize` under 10 fails the build, and a suppressed or sample metric without a note fails the build.

Extremes count as an individual disclosure and are suppressed on the same basis. That covers the minimum or maximum figure within a small cohort. A cohort of one is a person's salary.

## Worked example

From the 2023 Indonesia parity pass. Total compensation by career level had six segments:

| Segment | N | Outcome |
| --- | --- | --- |
| Junior IC | 15 | Published |
| Overall | 27 | Published |
| Mid IC | 3 | Suppressed |
| Senior IC | 3 | Suppressed |
| Lead, Staff, and Principal IC | 5 | Suppressed |
| Vice President | 1 | Suppressed |

The four suppressed medians are recorded in `evidence:2023-compensation-indonesia` with their notes.

## Zero-percentage disclosure

A 0% or 100% figure inside a small cohort is still a disclosure. It confirms that every respondent, or none, chose an option, which can single someone out as surely as a raw number.

Treat it under the same `MIN_SAFE_COHORT` rule as any other statistic from that cohort. It is not exempt because the number looks empty.

## Free-text responses

Open-text answers are never published verbatim. They carry writing style, specific employer or project detail, and other identifying context that a number does not.

They are used only in aggregate or paraphrased theme form, with no attribution back to a respondent.

## The PII audit gate

`pnpm run audit:pii` runs before any content PR that touches evidence or report content. It is a required gate, alongside `pnpm run check` and `pnpm build:site`. Treat a failure as blocking.

One caveat the audit will not catch for you: small-cohort figures can hide in the `summary` field of an evidence JSON file, where they read as prose rather than as data. Check evidence entries by eye when you add them.

## Corrections and redactions

Raise a GitHub issue on the public `designpayasia/site` repository, or use the intake path at [/contribute](/contribute).

DPA is a small, volunteer-run operation with no support desk and no fixed SLA. Correction requests still take priority over new content work. Once actioned, the fix lands as a normal content commit: the affected evidence entry or report figure is corrected in place, and the commit message records what changed and why.

## The evidence sensitivity field

Every entry in `src/content/evidence` carries a `sensitivity` value:

- `public`: data with no small-cohort exposure.
- `small-cohort`: entries that contain or derive from a cohort near or under the `MIN_SAFE_COHORT` line, even where the published figure itself is safe.
- `aggregate-only`: data that must never be broken down further without breaching a cohort.

It defaults to `public`, so any entry touching a small group should set it explicitly.
