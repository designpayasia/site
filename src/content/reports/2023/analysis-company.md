---
report: "2023"
title: "Analysis: company 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents,
  grouped by company type, industry, company size, design team size,
  headquarters location, and work arrangement.
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
  - id: sg-compensation-industry
    title: Median total compensation by industry
    caption: Reported median total compensation in SGD among Singapore survey respondents in each published industry subgroup with at least 10 respondents. These survey medians are not population estimates. Subgroups below n=10, and unspecified industry responses, are suppressed.
    summary: Among industry subgroups with at least 10 Singapore survey respondents, reported median total compensation ranged from S$71,000 for Health Care respondents to S$125,600 for Retail, Wholesale & Distribution respondents. These are survey medians, not population estimates.
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
        tone: signal
      - label: Transportation, Hospitality & Services
        value: 71.7
        tone: workhorse
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
        tone: signal
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
  - Among industries with at least 10 respondents, Retail, Wholesale &
    Distribution recorded the highest reported median at S$125,600.
  - Reported medians ranged from S$44,900 at companies with 1-10 employees to
    S$112,500 at companies with 10,001 or more employees.
  - Non-local companies offered 67.1% more than companies physically
    headquartered in Singapore (S$120,280 vs S$72,000).
  - Remote respondents recorded S$143,336, Hybrid respondents S$81,900, and
    In-office respondents S$52,000.
---

## Company type

Large enterprise respondents recorded a median of S$114,500. Startup respondents recorded S$90,000, Government respondents S$84,000, Agency / Consulting respondents S$63,548, and Small-medium enterprise respondents S$58,300. Company types with fewer than 10 respondents are omitted.

The figures describe the people who answered the survey. Respondent mix varies across company types, and the comparison is unadjusted.

::chart{id="sg-compensation-company-type"}

## Industry

Among industries with at least 10 respondents, Retail, Wholesale & Distribution recorded the highest reported median at S$125,600, ahead of Investment Management at S$91,545 and Consumer Products at S$99,000. Banking & Capital Markets, the largest published industry cohort at 43 respondents, recorded S$85,000. Government & Public Services, Transportation, Hospitality & Services, and Health Care round out the published ranking.

Life Sciences respondents reported the highest raw median of any industry, S$176,900. The data is sparse, just 4 respondents, so we don't treat it as a reliable industry finding.

The figures describe the people who answered the survey. Respondent mix varies across industries, and the comparison is unadjusted.

::chart{id="sg-compensation-industry"}

## Company size

The reported medians were S$44,900 at companies with 1-10 employees and S$112,500 at companies with 10,001 or more. The two adjacent groups from 201 to 10,000 employees recorded similar medians: S$100,700 and S$100,550. The steepest step sits between the 51-200 and 201-1,000 employee bands, a 25.5% jump in reported median pay, from S$80,200 to S$100,700.

Respondent mix may differ across company-size groups. Read these figures as survey descriptions rather than expected pay at a given company.

::chart{id="sg-compensation-company-size"}

## Design team size

Reported medians rise with design team size: S$50,150 for solo designers, S$78,000 for teams of 2 to 10 (n=115), S$108,002 for teams of 11 to 50, S$106,600 for teams of 51 to 200, and S$174,300 for teams of 200 or more.

Respondent counts for team sizes other than 2 to 10 are not disclosed in the source data, so treat these bands as descriptive, not cohort-verified.

## Headquarters location

Respondents not physically based at their company's headquarters recorded a median of S$120,280, against S$72,000 for respondents at headquarters, 67.1% more. Role, seniority, and employer type may matter as much as location itself, so this is an unadjusted comparison.

::chart{id="sg-compensation-hq"}

## Work arrangement

Remote respondents recorded a median of S$143,336. The corresponding medians were S$81,900 for Hybrid respondents and S$52,000 for In-office respondents. Role, seniority, employer, and other characteristics may differ across these groups, so this is an unadjusted comparison.

::chart{id="sg-compensation-work-arrangement"}

## Working hours

Directors and VPs work the most prolonged hours on average of any seniority level. Reported median total compensation also rises with self-reported extra hours worked per week:

| Extra hours per week | Reported median total compensation (SGD) |
| --- | --- |
| 0 | S$78,650 |
| 1-2 | S$78,425 |
| 3-5 | S$83,200 |
| 5+ | S$110,632.50 |

Extra hours and higher pay may both simply track seniority.

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
