---
report: "2023"
title: "Analysis: education 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents
  by design-education pathway, including a matched-cohort comparison by formal
  design education and a profile of respondents without formal design
  education.
order: 120
charts:
  - id: sg-compensation-education-matched-cohort
    title: Median total compensation, formal vs no formal design education (matched cohort)
    caption: Reported median total compensation in SGD for a matched-cohort comparison of Singapore survey respondents with and without formal design education, holding design experience roughly comparable between groups. These survey medians are not population estimates. This comparison is distinct from the overlapping education-pathway medians below, where a respondent may appear in more than one category.
    summary: Singapore respondents with no formal design education reported a median total compensation of S$81,900 (n=41, average design experience 5.59 years), 15.4% higher than respondents with formal design education at S$71,000 (n=90, average design experience 6.31 years), despite slightly less design experience.
    evidenceIds:
      - evidence:2023-sg-education-matched-cohort
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Matched cohort among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Formal design education (n=90)
          value: S$71,000
        - label: No formal design education (n=41)
          value: S$81,900
    bars:
      - label: Formal design education
        value: 86.7
        tone: workhorse
      - label: No formal design education
        value: 100
        tone: signal
  - id: sg-compensation-education-pathways
    title: Median total compensation by education pathway
    caption: Reported median total compensation in SGD among Singapore survey respondents in each design-education pathway. These survey medians are not population estimates. Categories overlap, so they are not exclusive alternatives and do not sum to 100%.
    summary: Reported median total compensation among Singapore survey respondents was S$90,510 for Formal design education, S$91,545 for Online certification, S$87,910.50 for Bootcamp, S$92,500 for In-person certified courses, and S$85,500.50 for No formal design education. Categories overlap, and these are survey medians rather than population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-education-pathways
    sourceLabel: Design Pay Asia 2022-23 education-pathway data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-education/sg-compensation-education-pathways.png
    fallbackTable:
      columns:
        - Overlapping pathway among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Formal design education (n=120)
          value: S$90,510
        - label: Online certification (n=49)
          value: S$91,545
        - label: Bootcamp (n=66)
          value: S$87,910.50
        - label: In-person certified courses (n=25)
          value: S$92,500
        - label: No formal design education (n=48)
          value: S$85,500.50
    bars:
      - label: Formal design education (n=120)
        value: 98
        tone: workhorse
        displayValue: S$90,510
      - label: Online certification (n=49)
        value: 99
        tone: workhorse
        displayValue: S$91,545
      - label: Bootcamp (n=66)
        value: 95
        tone: workhorse
        displayValue: S$87,910.50
      - label: In-person certified courses (n=25)
        value: 100
        tone: workhorse
        displayValue: S$92,500
      - label: No formal design education (n=48)
        value: 92
        tone: workhorse
        displayValue: S$85,500.50
  - id: sg-education-no-formal-levels
    title: Median total compensation by career level, no formal design education
    caption: Reported median total compensation in SGD by career level, within the Singapore no-formal-design-education cohort (n=41). Only levels with at least 10 respondents are shown; Mid-level, Lead/Staff, People Manager, Director, and VP cohorts within this subset are suppressed.
    summary: Within the no-formal-design-education cohort, Junior IC respondents reported a median total compensation of S$63,800 (n=12) and Senior respondents reported S$129,450 (n=10). Other career levels in this subset fall below the minimum safe disclosure threshold and are not shown individually.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
    evidenceIds:
      - evidence:2023-sg-education-no-formal-levels
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Career level, no formal design education cohort (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Junior IC (n=12)
          value: S$63,800
        - label: Senior (n=10)
          value: S$129,450
    bars:
      - label: Junior IC
        value: 49.3
        tone: workhorse
      - label: Senior
        value: 100
  - id: sg-education-no-formal-hq
    title: Median total compensation by headquarters location, no formal design education
    caption: Reported median total compensation in SGD by headquarters location, within the Singapore no-formal-design-education cohort (n=41). These survey medians are not population estimates.
    summary: Within the no-formal-design-education cohort, respondents physically at their company's headquarters reported a median total compensation of S$82,150 (n=26), compared with S$157,000 for respondents not at headquarters (n=13), 91.1% more.
    evidenceIds:
      - evidence:2023-sg-education-no-formal-hq
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Headquarters location, no formal design education cohort (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: At headquarters (n=26)
          value: S$82,150
        - label: Not at headquarters (n=13)
          value: S$157,000
    bars:
      - label: At headquarters
        value: 52.3
        tone: workhorse
      - label: Not at headquarters
        value: 100
keyFindings:
  - The pathway categories overlap. A respondent may appear in more than one
    group, so the counts should not be added or treated as percentages.
  - Reported pathway medians ranged from S$85,500.50 to S$92,500 among the
    Singapore respondents represented in the supplied aggregate CSV.
  - 90.2% of the no-formal-design-education cohort hold tertiary education in
    another field, and 85% work as individual contributors, consistent with
    career switchers rather than unqualified entrants.
  - Within the no-formal-design-education cohort, respondents not at their
    company's headquarters reported 91.1% more than respondents at
    headquarters.
metrics:
  - value: "81,900"
    unit: SGD
    label: median comp, no formal design education (matched cohort)
    color: signal
    evidenceId: evidence:2023-sg-education-matched-cohort
    sampleSize: 41
    publishMode: published
  - value: "71,000"
    unit: SGD
    label: median comp, formal design education (matched cohort)
    color: workhorse
    evidenceId: evidence:2023-sg-education-matched-cohort
    sampleSize: 90
    publishMode: published
---

## Design education and pay: a matched comparison

Singapore respondents with no formal design education reported a median total compensation of S$81,900 (n=41), 15.4% higher than respondents with formal design education at S$71,000 (n=90), despite slightly less average design experience (5.59 years vs 6.31 years). Formal design education is not, on this evidence, the primary driver of pay. Design experience appears more closely linked to outcomes than the education pathway itself.

::chart{id="sg-compensation-education-matched-cohort"}

## Overlapping education pathways

The matched comparison above uses two mutually exclusive cohorts. The five pathway medians below are a separate, broader analysis: a respondent can belong to more than one education-pathway category, so don't read these counts as an exclusive comparison.

The five published pathway medians sit between S$85,500.50 and S$92,500. The source categories overlap. We retain the supplied categories and medians without turning them into exclusive alternatives or percentage shares.

A respondent may have formal design education and also report a bootcamp, online certification, or in-person certified course. The chart is an unadjusted description of those overlapping survey groups.

::chart{id="sg-compensation-education-pathways"}

## Who has no formal design education

90.2% of the 41 Singapore respondents without formal design education hold tertiary education in another field, and 85% work as individual contributors. Read together, this looks like a cohort of career switchers, not unqualified entrants. The group skews younger, with 65.9% below the cohort's median age. Men in this cohort report an average of 8 years of design experience (n=18); women report an average of 3 years (n=23).

Junior IC respondents in this cohort reported a median of S$63,800 (n=12); Senior respondents reported S$129,450 (n=10). Mid-level, Lead/Staff, People Manager, Director, and VP cohorts within this subset fall below the minimum safe disclosure threshold and are not shown individually.

::chart{id="sg-education-no-formal-levels"}

## Headquarters location, without formal design education

Within the no-formal-design-education cohort, respondents not physically based at their company's headquarters reported a median of S$157,000, against S$82,150 for respondents at headquarters, 91.1% more. Global companies pay close to double for designers with similar experience but no formal design credential, though role, seniority, and employer type may differ across these groups.

::chart{id="sg-education-no-formal-hq"}

*Source: Design Pay Asia 2022-23 survey data (matched cohort and no-formal-education profile) and education-pathway data (overlapping pathways). Singapore respondents; some categories overlap.*
