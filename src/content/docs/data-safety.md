---
title: Data safety rules for what gets published
summary: Small-cohort suppression, disclosure rules, and how to ask for a correction.
group: trust
order: 1
status: published
updated: '2026-07-31'
related:
  - label: Using our data
    href: /docs/using-our-data
  - label: How to contribute
    href: /docs/contributing
  - label: Source repository
    href: https://github.com/designpayasia/site
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

## What the open dataset contains

One row per response: country, city, job title as written, employer name where the respondent chose to give one, seniority level, years of experience, education, work arrangement, company type and size, design team size, currency, and compensation figures.

The survey has never collected names, email addresses, phone numbers, or any other contact detail. Employer name and job title are optional: a respondent decides whether to give them. DPA is community-built, and knowing where pay data comes from is part of what makes it useful to the next person comparing an offer.

Free-text answers are not part of this dataset. See Free-text responses below.

The suppression rule above governs figures rather than rows. Any statistic DPA publishes comes from a cohort of ten responses or more, and a thinner cohort is suppressed rather than rounded or merged into a larger one. The dataset itself is row-level, so anyone recalculating from it should apply the same floor.

## Free-text responses

Two free-text fields are never published verbatim: "any other comments or feedback" and "other benefits". That is a different rule from the employer name and job title fields described above, which are short, optional, and published as given. Prose is different in kind: what a respondent puts into an open box unprompted often includes specific incidents, other people's names, or detail no structured field asks for.

They are used only in aggregate or as paraphrased themes. No verbatim comment is ever tied to a named company.

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
