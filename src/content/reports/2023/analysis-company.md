---
report: "2023"
title: "Analysis: company 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents,
  grouped by company type, industry, company size, design team size,
  headquarters location, work arrangement, and weekly extra hours.
order: 110
charts:
  - id: sg-compensation-company-type
    title: Median total compensation by company type
    caption: Reported median total compensation in SGD among Singapore survey respondents in each published company-type subgroup. These survey medians are not population estimates. Subgroups below n=10 are suppressed.
    summary: Among published company-type subgroups in the Singapore survey, reported median total compensation ranged from S$58,300 for Small-medium enterprise respondents to S$114,500 for Large enterprise respondents. These are survey medians, not population estimates.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
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
    bars:
      - label: Agency / Consulting (n=44)
        value: 56
        tone: workhorse
        displayValue: S$63,548
      - label: Government (n=11)
        value: 73
        tone: workhorse
        displayValue: S$84,000
      - label: Large enterprise (MNC) (n=81)
        value: 100
        tone: workhorse
        displayValue: S$114,500
      - label: Small-medium enterprise (n=18)
        value: 51
        tone: workhorse
        displayValue: S$58,300
      - label: Startup (n=61)
        value: 79
        tone: workhorse
        displayValue: S$90,000
  - id: sg-compensation-industry
    title: Median total compensation by industry
    caption: Reported median total compensation in SGD among Singapore survey respondents in each published industry subgroup with at least 10 respondents. These survey medians are not population estimates. Subgroups below n=10, and unspecified industry responses, are suppressed.
    summary: Among industry subgroups with at least 10 Singapore survey respondents, reported median total compensation ranged from S$71,000 for Health Care respondents to S$125,600 for Retail, Wholesale & Distribution respondents. These are survey medians, not population estimates.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
    evidenceIds:
      - evidence:2023-sg-compensation-industry
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Banking & Capital Markets (n=43)
          value: S$85,000
        - label: Consumer Products (n=43)
          value: S$99,000
        - label: Government & Public Services (n=18)
          value: S$72,075
        - label: Health Care (n=10)
          value: S$71,000
        - label: Investment Management (n=11)
          value: S$91,545
        - label: Retail, Wholesale & Distribution (n=11)
          value: S$125,600
        - label: Transportation, Hospitality & Services (n=20)
          value: S$90,000
    bars:
      - label: Banking & Capital Markets
        value: 67.7
        tone: workhorse
      - label: Consumer Products
        value: 78.8
        tone: workhorse
      - label: Government & Public Services
        value: 57.4
        tone: workhorse
      - label: Health Care
        value: 56.5
        tone: workhorse
      - label: Investment Management
        value: 72.9
        tone: workhorse
      - label: Retail, Wholesale & Distribution
        value: 100
      - label: Transportation, Hospitality & Services
        value: 71.7
        tone: workhorse
  - id: sg-compensation-company-size
    title: Median total compensation by company size
    caption: Reported median total compensation in SGD among Singapore survey respondents in each company-size subgroup. These survey medians are not population estimates.
    summary: Reported median total compensation among Singapore survey respondents was S$44,900 at companies with 1–10 employees, S$54,000 at 11–50, S$80,200 at 51–200, S$100,700 at 201–1,000, S$100,550 at 1,001–10,000, and S$112,500 at 10,001 or more. These are survey medians, not population estimates.
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
        - label: 1–10 employees (n=13)
          value: S$44,900
        - label: 11–50 employees (n=37)
          value: S$54,000
        - label: 51–200 employees (n=40)
          value: S$80,200
        - label: 201–1,000 employees (n=38)
          value: S$100,700
        - label: 1,001–10,000 employees (n=44)
          value: S$100,550
        - label: 10,001+ employees (n=51)
          value: S$112,500
    bars:
      - label: 1–10 employees (n=13)
        value: 40
        tone: workhorse
        displayValue: S$44,900
      - label: 11–50 employees (n=37)
        value: 48
        tone: workhorse
        displayValue: S$54,000
      - label: 51–200 employees (n=40)
        value: 71
        tone: workhorse
        displayValue: S$80,200
      - label: 201–1,000 employees (n=38)
        value: 90
        tone: workhorse
        displayValue: S$100,700
      - label: 1,001–10,000 employees (n=44)
        value: 89
        tone: workhorse
        displayValue: S$100,550
      - label: 10,001+ employees (n=51)
        value: 100
        tone: workhorse
        displayValue: S$112,500
  - id: sg-compensation-hq
    title: Median total compensation by headquarters location
    caption: Reported median total compensation in SGD among Singapore survey respondents, grouped by whether they work physically at their company's headquarters. These survey medians are not population estimates.
    summary: Reported median total compensation among Singapore survey respondents was S$72,000 for respondents physically at their company's headquarters, compared with S$120,280 for respondents not at headquarters. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-hq
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: At headquarters (n=139)
          value: S$72,000
        - label: Not at headquarters (n=66)
          value: S$120,280
    bars:
      - label: At headquarters
        value: 59.9
        tone: workhorse
      - label: Not at headquarters
        value: 100
  - id: sg-compensation-work-arrangement
    title: Median total compensation by work arrangement
    caption: Reported median total compensation in SGD among Singapore survey respondents, grouped by work arrangement. These survey medians are not population estimates.
    summary: Reported median total compensation among Singapore survey respondents was S$81,900 for Hybrid, S$52,000 for In-office, and S$143,336 for Remote. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-work-arrangement
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
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
    bars:
      - label: Hybrid
        value: 57.1
        tone: workhorse
      - label: In-office
        value: 36.3
        tone: workhorse
      - label: Remote
        value: 100
        tone: signal
  - id: sg-compensation-extra-hours
    title: Median total compensation by weekly extra hours
    caption: "Reported median total compensation in SGD among Singapore survey respondents, grouped by self-reported extra hours worked per week beyond contracted hours. The source report did not publish respondent counts for each band; these are survey medians for the Singapore SGD cohort (n=223), not population estimates."
    summary: "Among Singapore survey respondents, reported median total compensation was S$78,650 for those working no extra hours, S$78,425 for 1–2 extra hours, S$83,200 for 3–5 extra hours, and S$110,632.50 for 5 or more extra hours per week. Respondent counts for each band were not published in the source report; these are survey medians, not population estimates."
    evidenceIds:
      - evidence:2023-sg-compensation-extra-hours
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Self-reported extra hours per week (Singapore SGD cohort, n=223)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: "0 hours"
          value: S$78,650
        - label: "1–2 hours"
          value: S$78,425
        - label: "3–5 hours"
          value: S$83,200
        - label: "5+ hours"
          value: S$110,632.50
    bars:
      - label: "0 hours"
        value: 71.1
        tone: workhorse
      - label: "1–2 hours"
        value: 70.9
        tone: workhorse
      - label: "3–5 hours"
        value: 75.2
        tone: workhorse
      - label: "5+ hours"
        value: 100
keyFindings:
  - Large enterprise respondents recorded S$114,500, the highest reported median
    among the published company-type cohorts.
  - Among industries with at least 10 respondents, Retail, Wholesale &
    Distribution recorded the highest reported median at S$125,600.
  - Reported medians ranged from S$44,900 at companies with 1–10 employees to
    S$112,500 at companies with 10,001 or more employees.
  - Non-local companies offered 67.1% more than companies physically
    headquartered in Singapore (S$120,280 vs S$72,000).
  - Remote respondents recorded S$143,336, Hybrid respondents S$81,900, and
    In-office respondents S$52,000; the report puts Remote pay at roughly
    2.7 times the In-office median and 1.8 times the Hybrid median.
  - Reported median total compensation rises with self-reported weekly extra
    hours, from S$78,650 at 0 hours to S$110,632.50 at 5 or more hours; the
    source report did not publish respondent counts for each band.
---

## Company type

Reported median total compensation by company type:

- Large enterprise: S$114,500
- Startup: S$90,000
- Government: S$84,000
- Agency / Consulting: S$63,548
- Small-medium enterprise: S$58,300

Company types with fewer than 10 respondents are omitted.

The figures describe the people who answered the survey. Respondent mix varies across company types, and the comparison is unadjusted.

::chart{id="sg-compensation-company-type"}

## Industry

Among industries with at least 10 respondents, Retail, Wholesale & Distribution recorded the highest reported median at S$125,600, ahead of Investment Management at S$91,545 and Consumer Products at S$99,000. Banking & Capital Markets, the largest published industry cohort at 43 respondents, recorded S$85,000. Government & Public Services, Transportation, Hospitality & Services, and Health Care round out the published ranking.

Life Sciences respondents reported the highest raw median of any industry, S$176,900. The data is sparse, just 4 respondents, so we don't treat it as a reliable industry finding.

The figures describe the people who answered the survey. Respondent mix varies across industries, and the comparison is unadjusted.

::chart{id="sg-compensation-industry"}

## Company size

The reported medians were S$44,900 at companies with 1–10 employees and S$112,500 at companies with 10,001 or more. The two adjacent groups from 201 to 10,000 employees recorded similar medians: S$100,700 and S$100,550. The steepest step sits between the 51–200 and 201–1,000 employee bands, a 25.5% jump in reported median pay, from S$80,200 to S$100,700.

Respondent mix may differ across company-size groups. Read these figures as survey descriptions rather than expected pay at a given company.

::chart{id="sg-compensation-company-size"}

## Design team size

Reported medians rise with design team size:

- Solo designers: S$50,150
- Teams of 2 to 10 (n=115): S$78,000
- Teams of 11 to 50: S$108,002
- Teams of 51 to 200: S$106,600
- Teams of 200 or more: S$174,300

Respondent counts for team sizes other than 2 to 10 are not disclosed in the source data, so treat these bands as descriptive, not cohort-verified.

## Headquarters location

Respondents not physically based at their company's headquarters recorded a median of S$120,280, against S$72,000 for respondents at headquarters, 67.1% more. Role, seniority, and employer type may matter as much as location itself, so this is an unadjusted comparison.

::chart{id="sg-compensation-hq"}

## Work arrangement

Remote respondents recorded a median of S$143,336, roughly 2.7 times the In-office median and 1.8 times the Hybrid median, as reported. The corresponding medians were S$81,900 for Hybrid respondents and S$52,000 for In-office respondents. Role, seniority, employer, and other characteristics may differ across these groups, so this is an unadjusted comparison.

::chart{id="sg-compensation-work-arrangement"}

## Working hours

The published report's only seniority-linked claim here is that directors and VPs work the most prolonged hours on average of any seniority level; the report did not publish an hours-by-seniority breakdown we can independently verify, so this stays as the report's own hedged observation rather than a site-verified figure.

Reported median total compensation does rise with self-reported extra hours worked per week, though the source report did not publish respondent counts for each band, so read these medians as descriptive rather than cohort-verified.

::chart{id="sg-compensation-extra-hours"}

Extra hours and higher pay may both simply track seniority.

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
