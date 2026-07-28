---
title: How to contribute
summary: How to add your pay data, what stays anonymous, and how to cite or reuse a published figure.
group: playbook
order: 2
status: published
updated: '2026-07-28'
related:
  - label: Data safety rules
    href: /docs/data-safety
  - label: Run a cycle
    href: /docs/run-a-cycle
  - label: Using our data
    href: /docs/using-our-data
---

There are two ways to contribute to DPA: add your own pay data to the next cycle, or flag a problem with something already published.

## Add your pay

The survey lives at [/contribute](/contribute), currently run through Tally.so. It takes about five minutes.

It asks for no name and no email, and it does not require an account. Your answer joins the pool for the next report. Reports never publish it as an individual figure, and the suppression rules below apply to your answer the same way they apply to everyone else's. The cleaned, anonymised pool is itself public in the community submissions tracker, with an employer name appearing only where a contributor chose to disclose one.

## What never gets published

A handful of rules protect anyone who answers:

- Any cohort under 10 respondents, the `MIN_SAFE_COHORT`, publishes only as a suppressed or sampled figure, with a note explaining why. A cohort of one is a person's salary.
- The minimum or maximum figure inside a small cohort is suppressed on the same basis, even when the cohort as a whole is large enough to publish.
- A 0% or 100% result inside a small cohort is suppressed too. It can single someone out as surely as a raw number.
- Free-text answers are never published verbatim. They are used only in aggregate or paraphrased theme form.

The full rules, including a worked example from the 2023 cycle, are in [data safety rules](/docs/data-safety).

## How your answer becomes a report

Each cycle runs from survey design through distribution, data cleaning, analysis, evidence records, and the report build. [Run a cycle](/docs/run-a-cycle) documents every stage, including the ones that are not scripted yet.

## Citing or reusing a number

Report content is licensed under Creative Commons Attribution 4.0 International, so you can quote, adapt, or build on a published figure with attribution. [Using our data](/docs/using-our-data) has the citation format, the full licence detail, and what the numbers will not support. Every figure is also tied to an evidence record naming its sample size, geography, and collection date.

## Something looks wrong, or you want to change the site

Raise a GitHub issue on the public `designpayasia/site` repository, or use the intake path at [/contribute](/contribute). Corrections take priority over new content.

To change the site's code or copy, open a pull request on the same repository.

> **Gap:** beyond standard GitHub review, this repo does not document who approves a pull request, how a disagreement gets settled, or what a market chapter would need to run its own cycle. Treat that as undecided, not as a process that already exists.
