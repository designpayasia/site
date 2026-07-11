---
report: "2023"
title: "Analysis: gender 🇸🇬"
summary: Reported median total compensation for the gender cohorts among
  Singapore survey respondents that meet the publication threshold, including
  a per-level pay gap breakdown and the experience mix behind the headline
  figure.
order: 90
charts:
  - id: sg-compensation-gender
    title: Median total compensation by gender
    caption: Reported median total compensation in SGD for the published gender cohorts among Singapore survey respondents. These survey medians are not population estimates. Cohorts below n=10 are suppressed.
    summary: Among published gender cohorts in the Singapore survey, Man respondents reported median total compensation of S$123,000 and Woman respondents reported S$71,300. These are survey medians, not population estimates. Other gender cohorts are suppressed because they contain fewer than 10 respondents.
    evidenceIds:
      - evidence:2023-sg-compensation-gender
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-gender/sg-compensation-gender.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Man (n=83)
          value: S$123,000
        - label: Woman (n=138)
          value: S$71,300
  - id: sg-gender-pay-gap-by-level
    title: Pay gap by seniority level, gender
    caption: Reported median total compensation by gender at each Singapore survey seniority level where both gender cohorts meet the n=10 publication threshold. Bars show the size of the gap between the two medians at each level. Lead/Staff/Principal IC and Director levels are omitted because at least one gender cohort in each falls below n=10.
    summary: Among Singapore survey seniority levels with both gender cohorts published, men reported medians 11.85% lower than women at Junior IC. From Mid-level IC upward the direction reverses, women reported medians 11.32% lower at Mid-level IC, 21.1% lower at Senior IC, and 21.22% lower at People Manager. These are gaps between survey medians, not population estimates or matched-role comparisons.
    evidenceIds:
      - evidence:2023-gender-pay-gap
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Seniority level, gender (n)
        - Reported median total compensation (SGD)
      rows:
        - label: Junior IC, Man (n=10)
          value: S$47,600
        - label: Junior IC, Woman (n=53)
          value: S$54,000
        - label: Mid-level IC, Man (n=20)
          value: S$83,900
        - label: Mid-level IC, Woman (n=35)
          value: S$74,400
        - label: Senior IC, Man (n=20)
          value: S$133,150
        - label: Senior IC, Woman (n=32)
          value: S$105,050
        - label: People Manager, Man (n=13)
          value: S$151,380
        - label: People Manager, Woman (n=10)
          value: S$119,250
    bars:
      - label: Junior IC (men earn less)
        value: 11.85
      - label: Mid-level IC (women earn less)
        value: 11.32
      - label: Senior IC (women earn less)
        value: 21.1
      - label: People Manager (women earn less)
        value: 21.22
        tone: signal
keyFindings:
  - Man respondents reported median total compensation of S$123,000.
  - Woman respondents reported median total compensation of S$71,300.
  - Other gender cohorts are omitted because they fall below the minimum safe
    cohort size of 10.
  - Per-level gaps range from 11% to 21% against women at Mid-level IC, Senior
    IC, and People Manager. The gap reverses at Junior IC, where men earned
    11.85% less.
  - Men negotiated current compensation more often than women (61% versus
    51%) and reported more formal levelling progress (62% versus 52%).
---

## Reported medians by gender

Man respondents recorded median total compensation of S$123,000. Woman respondents recorded S$71,300, a 42% gap between the two published cohorts' raw medians. Other gender responses are omitted because each cohort falls below the publication threshold.

This is a cross-sectional, unadjusted comparison of two respondent cohorts, not a population-wide estimate or a matched-role analysis.

::chart{id="sg-compensation-gender"}

## What the headline gap is made of

Much of that 42% reflects who is in each cohort, not unequal pay for the same work. Woman respondents in the Singapore cohort had a median of 3 years of design experience, against 7 years for Man respondents. Women in this survey are, on average, earlier in their careers, and career stage is one of the strongest predictors of pay in this dataset (see the [experience analysis](/reports/2023/analysis-experience)). The per-level breakdown below strips out most of that seniority mix, and it's the closer like-for-like read on the gap.

## Pay gap by seniority level

Comparing medians within each seniority level, restricted to levels where both genders published, sharpens the picture. At Junior IC, men earned 11.85% less than women. From Mid-level IC upward the direction reverses: women earned 11.32% less at Mid-level IC, 21.1% less at Senior IC, and 21.22% less at People Manager.

Lead/Staff/Principal IC and Director levels aren't shown here. The Lead/Staff woman cohort (n=7) falls short of the publication threshold, and there's too little data at the Director level to say anything reliable about it.

::chart{id="sg-gender-pay-gap-by-level"}

## Negotiation and levelling

Men negotiated their current compensation more often than women, 61% against 51%, and reported more formal levelling progress over the past year, 62% against 52%. Both gaps sit alongside the per-level pay differences above, though this survey can't establish how much either behaviour contributes to outcomes.

## Pay rises

The distribution of reported pay rises was broadly similar by gender. In the top bracket, more than 20%, 24.4% of men and 25.2% of women reported an increase: women's share was marginally higher. Rates of no increase at all were also close: 19.5% of men against 20.6% of women. Whatever is driving the per-level gaps above, it isn't a starkly unequal spread of rise sizes.

## Sentiment by gender

The published report also compares sentiment by gender, covering things like perceived fairness of pay and job-search intent. That chart wasn't numerically labelled in the published report, so we don't reproduce specific figures here.

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
