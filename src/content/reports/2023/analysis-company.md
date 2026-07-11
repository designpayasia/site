---
report: "2023"
title: "Analysis: company 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents,
  grouped by company type, company size, and work arrangement.
order: 110
charts:
  - id: sg-compensation-company-type
    title: Median total compensation by company type
    caption: Reported median total compensation in SGD among Singapore survey respondents in each published company-type subgroup. These survey medians are not population estimates. Subgroups below n=10 are suppressed.
    summary: Among published company-type subgroups in the Singapore survey, reported median total compensation ranged from S$58,300 for Small-medium enterprise respondents to S$114,500 for Large enterprise respondents. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-company-type
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-company/sg-compensation-company-type.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Agency / Consulting (n=44)
          value: S$63,548
        - label: Government (n=11)
          value: S$84,000
        - label: Large enterprise (MNC) (n=81)
          value: S$114,500
        - label: Small-medium enterprise (n=18)
          value: S$58,300
        - label: Startup (n=61)
          value: S$90,000
  - id: sg-compensation-company-size
    title: Median total compensation by company size
    caption: Reported median total compensation in SGD among Singapore survey respondents in each company-size subgroup. These survey medians are not population estimates.
    summary: Reported median total compensation among Singapore survey respondents was S$44,900 at companies with 1-10 employees, S$54,000 at 11-50, S$80,200 at 51-200, S$100,700 at 201-1,000, S$100,550 at 1,001-10,000, and S$112,500 at 10,001 or more. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-company-size
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-company/sg-compensation-company-size.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: 1-10 employees (n=13)
          value: S$44,900
        - label: 11-50 employees (n=37)
          value: S$54,000
        - label: 51-200 employees (n=40)
          value: S$80,200
        - label: 201-1,000 employees (n=38)
          value: S$100,700
        - label: 1,001-10,000 employees (n=44)
          value: S$100,550
        - label: 10,001+ employees (n=51)
          value: S$112,500
  - id: sg-compensation-work-arrangement
    title: Median total compensation by work arrangement
    caption: Reported median total compensation in SGD among Singapore survey respondents, grouped by work arrangement. These survey medians are not population estimates.
    summary: Reported median total compensation among Singapore survey respondents was S$81,900 for Hybrid, S$52,000 for In-office, and S$143,336 for Remote. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-work-arrangement
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-company/sg-compensation-work-arrangement.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Hybrid (n=179)
          value: S$81,900
        - label: In-office (n=21)
          value: S$52,000
        - label: Remote (n=23)
          value: S$143,336
keyFindings:
  - Large enterprise respondents recorded S$114,500, the highest reported median
    among the published company-type cohorts.
  - Reported medians ranged from S$44,900 at companies with 1-10 employees to
    S$112,500 at companies with 10,001 or more employees.
  - Remote respondents recorded S$143,336, Hybrid respondents S$81,900, and
    In-office respondents S$52,000.
---

## Company type

Large enterprise respondents recorded a median of S$114,500. Startup respondents recorded S$90,000, Government respondents S$84,000, Agency / Consulting respondents S$63,548, and Small-medium enterprise respondents S$58,300. Company types with fewer than 10 respondents are omitted.

The figures describe the people who answered the survey. Respondent mix varies across company types, and the comparison is unadjusted.

::chart{id="sg-compensation-company-type"}

## Company size

The reported medians were S$44,900 at companies with 1-10 employees and S$112,500 at companies with 10,001 or more. The two adjacent groups from 201 to 10,000 employees recorded similar medians: S$100,700 and S$100,550.

Respondent mix may differ across company-size groups. Read these figures as survey descriptions rather than expected pay at a given company.

::chart{id="sg-compensation-company-size"}

## Work arrangement

Remote respondents recorded a median of S$143,336. The corresponding medians were S$81,900 for Hybrid respondents and S$52,000 for In-office respondents. Role, seniority, employer, and other characteristics may differ across these groups, so this is an unadjusted comparison.

::chart{id="sg-compensation-work-arrangement"}

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
