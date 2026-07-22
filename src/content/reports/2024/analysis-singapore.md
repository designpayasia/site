---
report: '2024'
title: 'Singapore deep dive'
summary: 'How Singapore''s 17.7% gender pay gap breaks down by seniority level, how compensation scales with experience, and how it varies by company type.'
order: 45
charts:
  - id: sg-2024-gender-pay-gap-by-level
    title: Singapore median pay by gender and seniority level, 2024
    caption: Reported median total compensation by gender at each Singapore seniority level where both gender cohorts meet the n=10 publication threshold, 2024. Lead/Staff/Principal IC, Manager, Director/VP, and Head of department levels are omitted because at least one gender cohort in each falls below n=10. These are gaps between survey medians, not population estimates or matched-role comparisons.
    summary: "Among Singapore seniority levels with both gender cohorts published in 2024: Junior IC, Man S$58,200 (n=10) versus Woman S$60,000 (n=30), women 3.1% higher; Mid-level IC, Man S$59,800 (n=16) versus Woman S$75,650 (n=38), women 26.5% higher; Senior IC, Man S$102,300 (n=16) versus Woman S$103,400 (n=29), women 1.1% higher. At every published level, women's reported median sits at or above men's, the opposite direction from the pooled 17.7% aggregate gap (Man S$92,400 versus Woman S$76,000, n=171). That is because the aggregate reflects seniority mix rather than per-level pay: see the composition note above this chart. Lead/Staff/Principal IC, Manager, Director/VP, and Head of department levels are omitted because at least one gender cohort in each falls below the n=10 publication threshold."
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
    evidenceIds:
      - evidence:2024-sg-gender-pay-gap
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    fallbackTable:
      columns:
        - Seniority level
        - Man median (S$)
        - Man n
        - Woman median (S$)
        - Woman n
      rows:
        - label: Junior IC
          values: ["58,200", "10", "60,000", "30"]
        - label: Mid-level IC
          values: ["59,800", "16", "75,650", "38"]
        - label: Senior IC
          values: ["102,300", "16", "103,400", "29"]
    plot:
      type: groupedBar
      seriesALabel: Man
      seriesBLabel: Woman
      xLabel: Median total compensation (S$)
      valuePrefix: "S$"
      categories:
        - label: Junior IC
          a: 58200
          b: 60000
        - label: Mid-level IC
          a: 59800
          b: 75650
        - label: Senior IC
          a: 102300
          b: 103400
      annotations:
        - x: 75650
          y: Mid-level IC
          text: "Women 26.5% higher here"
          anchor: end
  - id: sg-2024-experience-premium
    title: Singapore total compensation by years of design experience, 2024
    caption: Reported total compensation distribution (25th percentile, median, 75th percentile, and full range) by years of design experience among Singapore survey respondents paid in SGD, 2024. Adjacent experience bands below the n=10 publication threshold are merged. The 16+ band has only n=5 on its own, below that threshold, so it is combined with the adjacent 11–15 band (n=19), which clears the threshold comfortably.
    summary: "Among Singapore survey respondents paid in SGD in 2024: 0–2 years (n=34), median S$60,000, 25th to 75th percentile S$49,700 to S$75,585; 3–5 years (n=64), median S$72,000, S$57,600 to S$94,100; 6–10 years (n=49), median S$105,600, S$74,100 to S$150,000; 11–15 to 16+ years combined (n=24), median S$137,500, S$94,800 to S$173,550. Total compensation rises steadily with experience across every published band."
    evidenceIds:
      - evidence:2024-sg-experience-premium
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    fallbackTable:
      columns:
        - Years of design experience (n)
        - Minimum (S$)
        - Median (S$)
        - Maximum (S$)
      rows:
        - label: 0-2 years (n=34)
          values: ["14,400", "60,000", "190,000"]
        - label: 3-5 years (n=64)
          values: ["6,000", "72,000", "131,600"]
        - label: 6-10 years (n=49)
          values: ["41,880", "105,600", "434,250"]
        - label: 11-15 to 16+ years (n=24)
          values: ["61,200", "137,500", "542,000"]
    plot:
      type: range
      xLabel: Total compensation (S$)
      valuePrefix: "S$"
      rows:
        - label: 0-2 years (n=34)
          min: 14400
          q1: 49700
          median: 60000
          q3: 75585
          max: 190000
          tone: workhorse
        - label: 3-5 years (n=64)
          min: 6000
          q1: 57600
          median: 72000
          q3: 94100
          max: 131600
          tone: workhorse
        - label: 6-10 years (n=49)
          min: 41880
          q1: 74100
          median: 105600
          q3: 150000
          max: 434250
          tone: workhorse
        - label: 11-15 to 16+ years (n=24)
          min: 61200
          q1: 94800
          median: 137500
          q3: 173550
          max: 542000
          tone: workhorse
  - id: sg-2024-company-type-pay
    title: Singapore median pay by company type, 2024
    caption: Reported median total compensation by company type among Singapore survey respondents paid in SGD, 2024, for company types meeting the n=10 publication threshold. Non-profit, academia, bank, and F&B respondents are folded into a merged "Other" bucket that itself falls below n=10 (n=5) and is therefore omitted entirely, not shown as a bar.
    summary: "Among Singapore survey respondents paid in SGD in 2024, published company-type medians ranged from S$59,900 at small/medium enterprises (n=30) to S$126,000 at government employers (n=13). Large enterprise/MNC (n=57) reported S$99,560, start-up (n=37) reported S$78,800, and agency/consulting (n=29) reported S$61,600. A merged 'Other' bucket combining non-profit, academia, bank, and F&B respondents falls below the n=10 threshold itself (n=5) and is omitted."
    suppressionNote: >-
      The merged "Other" bucket (non-profit, academia, bank, and F&B
      respondents, n=5 combined) is too small to publish even after
      merging, so we hold it back entirely rather than show an unreliable bar.
    evidenceIds:
      - evidence:2024-sg-company-pay
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    fallbackTable:
      columns:
        - Company type (n)
        - Median total compensation (S$)
      rows:
        - label: Large enterprise / MNC (n=57)
          value: S$99,560
        - label: Start-up (n=37)
          value: S$78,800
        - label: Small/medium enterprise (n=30)
          value: S$59,900
        - label: Agency / Consulting (n=29)
          value: S$61,600
        - label: Government (n=13)
          value: S$126,000
    bars:
      - label: Large enterprise / MNC (n=57)
        value: 79
        tone: workhorse
        displayValue: S$99,560
      - label: Start-up (n=37)
        value: 63
        tone: workhorse
        displayValue: S$78,800
      - label: Small/medium enterprise (n=30)
        value: 48
        tone: workhorse
        displayValue: S$59,900
      - label: Agency / Consulting (n=29)
        value: 49
        tone: workhorse
        displayValue: S$61,600
      - label: Government (n=13)
        value: 100
        tone: workhorse
        displayValue: S$126,000
keyFindings:
  - The aggregate 17.7% Singapore gender pay gap (Man S$92,400 versus Woman
    S$76,000, n=171) is a seniority-mix effect, not a per-level pay gap.
  - At Junior IC, Mid-level IC, and Senior IC, the only levels where both
    genders publish, women's median sits at or above men's.
  - 60.2% of women in the Singapore sample sit at Junior or Mid-level IC,
    against 44.8% of men; 27.6% of men sit at Lead and above, against
    14.2% of women.
  - Total compensation rises steadily with experience, from a S$60,000
    median at 0-2 years (n=34) to S$137,500 at 11-15-to-16+ years combined
    (n=24).
  - Published company-type medians range from S$59,900 at small/medium
    enterprises (n=30) to S$126,000 at government employers (n=13). A
    merged "Other" bucket (n=5) falls below the publication threshold and
    is omitted.
whatThisMeansIndividuals: |-
  If you're a woman working in an IC track in Singapore, this year's data doesn't show you being paid less than men at your level.
  At Junior IC, Mid-level IC, and Senior IC, women's reported medians in this survey sit at or above men's.
  The gap in this dataset shows up in who reaches Lead and above, not in what each level pays once you're there.
whatThisMeansLeaders: |-
  The 17.7% aggregate gap is a signal to audit your promotion pipeline, not your pay bands.
  Women in this survey are around 1.3 times as likely as men to sit in Junior or Mid-level IC roles, and about half as likely to sit at Lead and above.
  If your own gender pay gap looks like Singapore's 2024 figure, check whether it is a levelling problem before you touch compensation ranges.
questions:
  - "Will the seniority mix narrow as more women in the survey progress
    from Mid-level IC into Lead and Manager roles, or will attrition keep
    concentrating women in the earlier tiers?"
  - "Does the reversal at Junior through Senior IC hold up in future
    survey years, or is it an artefact of this year's small per-level
    cohorts?"
  - "What would it take to publish a matched-role, seniority-adjusted
    comparison instead of raw medians?"
references:
  - label: 2023 Singapore gender pay gap analysis
    url: 'https://designpay.asia/reports/2023/analysis-gender'
  - label: 2024 compensation
    url: 'https://designpay.asia/reports/2024/compensation'
---

This section looks in detail at Singapore's 2024 survey data: how the gender pay gap breaks down by seniority level, how total compensation scales with years of experience, and how it varies by company type. The starting point is the headline figure reported in [Compensation](/reports/2024/compensation): among Singapore respondents paid in SGD, women's median total compensation was 17.7% lower than men's (Man S$92,400 versus Woman S$76,000, n=171: 58 men, 113 women).

## Why the aggregate gap doesn't match the per-level story

That 17.7% aggregate gap is a composition effect. It is not a per-level pay gap, and keeping that distinction in mind matters before you read the chart below. Women in the Singapore sample are concentrated in earlier-career tiers: 60.2% of women sit at Junior or Mid-level IC, against 44.8% of men. Men are almost twice as likely to sit at Lead and above: 27.6% of men, against 14.2% of women. Pool those two different seniority mixes into one median each, and the more senior, male-skewed group posts a higher overall number, even though, level for level, women's reported medians are at or above men's everywhere we can publish a comparison.

Hold onto that before looking at the chart: at Junior IC, Mid-level IC, and Senior IC, women's median sits at or above men's. That's the mechanism behind the 17.7% headline, not a contradiction of it. The three levels below are the ones where both gender cohorts clear the minimum safe cohort of 10.

## Pay by seniority level

At Junior IC, women's reported median was 3.1% higher than men's (Man S$58,200, n=10; Woman S$60,000, n=30). At Mid-level IC, the gap was widest in women's favour: 26.5% higher (Man S$59,800, n=16; Woman S$75,650, n=38). At Senior IC, the two medians were close, with women 1.1% higher (Man S$102,300, n=16; Woman S$103,400, n=29). Lead/Staff/Principal IC, Manager, Director/VP, and Head of department levels are omitted here because at least one gender cohort in each falls below the n=10 threshold.

::chart{id="sg-2024-gender-pay-gap-by-level"}

## How 2024 compares with 2023

Design Pay Asia's [2023 Singapore gender pay gap analysis](/reports/2023/analysis-gender) reported a 42% gap that year (Man S$123,000 versus Woman S$71,300, n=223: 83 men, 138 women), computed the same way: unadjusted median total compensation for Man and Woman respondents based in Singapore and paid in SGD, with no adjustment for role or seniority. The 2024 figure of 17.7% is smaller, but the two years aren't a like-for-like read on progress on their own: sample size, seniority mix, and which respondents opted in all changed between survey cycles. Composition has driven most of the headline number in both years; per-level pay has not.

## Compensation by years of experience

Total compensation rises steadily with years of design experience among Singapore respondents paid in SGD. Median total compensation was S$60,000 at 0–2 years (n=34), S$72,000 at 3–5 years (n=64), and S$105,600 at 6–10 years (n=49). The 16+ band alone has only n=5, below the n=10 threshold, so we merge it into the adjacent 11–15 band (n=19), which clears the threshold on its own, and publish a combined 11–15-to-16+ figure at a median of S$137,500 (n=24).

::chart{id="sg-2024-experience-premium"}

## Compensation by company type

Median total compensation by company type ranged from S$59,900 at small/medium enterprises (n=30) to S$126,000 at government employers (n=13), with large enterprise/MNC (n=57, S$99,560), start-up (n=37, S$78,800), and agency/consulting (n=29, S$61,600) in between. Non-profit, academia, bank, and F&B respondents are folded into a merged "Other" bucket, and that merged bucket still falls below the n=10 threshold (n=5), so it's omitted entirely rather than shown as an unreliable bar.

::chart{id="sg-2024-company-type-pay"}

*Source: Design Pay Asia 2024 survey data. Filtered to Singapore respondents paid in SGD (n=171).*
