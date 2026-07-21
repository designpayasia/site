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
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
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
    bars:
      - label: Man (n=83)
        value: 100
        tone: workhorse
        displayValue: S$123,000
      - label: Woman (n=138)
        value: 58
        tone: workhorse
        displayValue: S$71,300
  - id: sg-gender-pay-gap-by-level
    title: Median pay by level and gender
    caption: Reported median total compensation by gender at each Singapore survey seniority level where both gender cohorts meet the n=10 publication threshold. Grouped bars show each gender's median side by side at each level. Lead/Staff/Principal IC and Director levels are omitted because at least one gender cohort in each falls below n=10.
    summary: "Among Singapore survey seniority levels with both gender cohorts published: Junior IC, Man S$47,600 (n=10) versus Woman S$54,000 (n=53); Mid-level IC, Man S$83,900 (n=20) versus Woman S$74,400 (n=35); Senior IC, Man S$133,150 (n=20) versus Woman S$105,050 (n=32); People Manager, Man S$151,380 (n=13) versus Woman S$119,250 (n=10). The direction reverses above Junior IC: men earn less at Junior IC, then women earn less from Mid-level IC upward. The gap is most pronounced among Senior ICs and People Managers, and the Senior IC cohort (n=52 combined, against n=23 at People Manager) gives the most reliable read at 21.1%. These are gaps between survey medians, not population estimates or matched-role comparisons."
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
    evidenceIds:
      - evidence:2023-gender-pay-gap
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Seniority level
        - Men median (S$)
        - Men n
        - Women median (S$)
        - Women n
      rows:
        - label: Junior IC
          values: ["47,600", "10", "54,000", "53"]
        - label: Mid-level IC
          values: ["83,900", "20", "74,400", "35"]
        - label: Senior IC
          values: ["133,150", "20", "105,050", "32"]
        - label: People Manager
          values: ["151,380", "13", "119,250", "10"]
    plot:
      type: groupedBar
      seriesALabel: Men
      seriesBLabel: Women
      xLabel: Median total compensation (S$)
      valuePrefix: "S$"
      categories:
        - label: Junior IC
          a: 47600
          b: 54000
        - label: Mid-level IC
          a: 83900
          b: 74400
        - label: Senior IC
          a: 133150
          b: 105050
        - label: People Manager
          a: 151380
          b: 119250
      annotations:
        - x: 138000
          y: Senior IC
          text: "Women 21.1% lower"
          anchor: start
  - id: sg-gender-pay-rise-distribution
    title: Pay-rise distribution by gender
    caption: Share of each gender cohort among Singapore survey respondents reporting a pay rise in each bracket over the past year. Men (n=83) and Women (n=138) are each read as a share of their own cohort, not a share of all respondents.
    summary: "Reported pay-rise shares for Singapore survey respondents, Men (n=83) versus Women (n=138): no increase, 19.5% versus 20.6%; 0.1–5%, 19.5% versus 18.3%; 6–10%, 15.9% versus 16.0%; 11–15%, 12.2% versus 9.9%; 16–20%, 8.5% versus 9.9%; more than 20%, 24.4% versus 25.2%. The two distributions track closely bracket for bracket, including at the no-increase and top brackets."
    evidenceIds:
      - evidence:2023-gender-pay-gap
      - evidence:2023-sg-compensation-gender
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Pay-rise bracket, gender (n)
        - Share of cohort reporting this rise
      rows:
        - label: No increase, Men (n=83)
          value: 19.5%
        - label: No increase, Women (n=138)
          value: 20.6%
        - label: 0.1–5%, Men (n=83)
          value: 19.5%
        - label: 0.1–5%, Women (n=138)
          value: 18.3%
        - label: 6–10%, Men (n=83)
          value: 15.9%
        - label: 6–10%, Women (n=138)
          value: 16.0%
        - label: 11–15%, Men (n=83)
          value: 12.2%
        - label: 11–15%, Women (n=138)
          value: 9.9%
        - label: 16–20%, Men (n=83)
          value: 8.5%
        - label: 16–20%, Women (n=138)
          value: 9.9%
        - label: More than 20%, Men (n=83)
          value: 24.4%
        - label: More than 20%, Women (n=138)
          value: 25.2%
    plot:
      type: pairedBar
      seriesALabel: Men
      seriesBLabel: Women
      xLabel: Share of gender cohort reporting this pay rise
      valueSuffix: "%"
      categories:
        - label: No increase
          a: 19.5
          b: 20.6
        - label: 0.1–5%
          a: 19.5
          b: 18.3
        - label: 6–10%
          a: 15.9
          b: 16.0
        - label: 11–15%
          a: 12.2
          b: 9.9
        - label: 16–20%
          a: 8.5
          b: 9.9
        - label: More than 20%
          a: 24.4
          b: 25.2
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

Man respondents recorded median total compensation of S$123,000. Woman respondents recorded S$71,300, a 42% gap between the two published cohorts' raw medians. Other gender responses are omitted because each cohort falls below the publication threshold. See our [data safety rules](/docs/data-safety) for how we handle small cohorts.

This is a cross-sectional, unadjusted comparison of two respondent cohorts, not a population-wide estimate or a matched-role analysis.

::chart{id="sg-compensation-gender"}

## What the headline gap is made of

Much of that 42% reflects who is in each cohort, not unequal pay for the same work. Woman respondents in the Singapore cohort had a median of 3 years of design experience, against 7 years for Man respondents. Women in this survey are, on average, earlier in their careers, and career stage is one of the strongest predictors of pay in this dataset (see the [experience analysis](/reports/2023/analysis-experience)). The per-level breakdown below strips out most of that seniority mix, and it's the closer like-for-like read on the gap.

## Pay gap by seniority level

Comparing medians within each seniority level, restricted to levels where both genders published, sharpens the picture. At Junior IC, men earned 11.85% less than women. From Mid-level IC upward the direction reverses: women earned 11.32% less at Mid-level IC, 21.1% less at Senior IC, and 21.22% less at People Manager. Of the two levels with a gap above 20%, Senior IC has the larger combined cohort (n=52, against n=23 at People Manager), so its 21.1% gap is the more reliable reading of the two.

Lead/Staff/Principal IC and Director levels aren't shown here. The Lead/Staff woman cohort (n=7) falls short of the publication threshold, and there's too little data at the Director level to say anything reliable about it. See our [data safety rules](/docs/data-safety) for how we handle small cohorts.

::chart{id="sg-gender-pay-gap-by-level"}

## Negotiation and levelling

Men negotiated their current compensation more often than women, 61% against 51%, and reported more formal levelling progress over the past year, 62% against 52%. Both gaps sit alongside the per-level pay differences above, though this survey can't establish how much either behaviour contributes to outcomes.

## Pay rises

Reported pay rises were broadly similar by gender across all six brackets (Men n=83, Women n=138). In the top bracket, more than 20%, 24.4% of men and 25.2% of women reported an increase: women's share was marginally higher. Rates of no increase at all were also close: 19.5% of men against 20.6% of women. Whatever is driving the per-level gaps above, it isn't a starkly unequal spread of rise sizes.

::chart{id="sg-gender-pay-rise-distribution"}

## Sentiment by gender

The published report also compares sentiment by gender, covering things like perceived fairness of pay and job-search intent. That chart wasn't numerically labelled in the published report, so we don't reproduce specific figures here.

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
