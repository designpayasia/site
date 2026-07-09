---
report: "2023"
title: Compensation
summary: Local currency dominates, median compensation varies across markets,
  and annual bonuses remain a significant part of total pay packages.
order: 40
charts:
  - id: chart-currency-drawn-in
    type: bars
    title: Currency respondents are paid in
    caption: Share of respondents paid in each currency, based on 323 responses.
    summary: Distribution of salary currency responses.
    evidenceIds:
      - evidence:2023-compensation
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing the share of respondents paid in each currency.
        SGD accounts for 69.3% of 323 responses."
    fallbackTable:
      columns:
        - Currency
        - Share (N=323)
      rows:
        - label: SGD
          value: 224 (69.3%)
        - label: MYR
          value: 46 (14.2%)
        - label: IDR
          value: 27 (8.4%)
        - label: PHP
          value: 7 (2.2%)
        - label: VND
          value: 6 (1.9%)
        - label: USD
          value: 5 (1.5%)
        - label: THB
          value: 3 (0.9%)
        - label: INR
          value: 2 (0.6%)
        - label: JPY
          value: 1 (0.3%)
        - label: RON
          value: 1 (0.3%)
        - label: TWD
          value: 1 (0.3%)
    bars:
      - label: SGD
        value: 69.3
        tone: signal
      - label: MYR
        value: 14.2
        tone: workhorse
      - label: IDR
        value: 8.4
        tone: workhorse
      - label: PHP
        value: 2.2
        tone: workhorse
      - label: VND
        value: 1.9
        tone: workhorse
      - label: USD
        value: 1.5
        tone: workhorse
      - label: THB
        value: 0.9
        tone: workhorse
      - label: INR
        value: 0.6
        tone: workhorse
      - label: JPY
        value: 0.3
        tone: workhorse
      - label: RON
        value: 0.3
        tone: workhorse
      - label: TWD
        value: 0.3
        tone: workhorse
  - id: chart-compensation-by-level
    type: bar
    title: Median total compensation by career level
    caption: Median total compensation in SGD by career level (N=211, Singapore).
      Director and VP cohorts fall below minimum safe disclosure threshold
      (N<10) and are excluded.
    summary: Compensation scales with seniority, with a step-change at Senior IC.
      People Managers earn the highest median at SGD 139,100.
    evidenceIds:
      - evidence:2023-compensation
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing median total compensation by career level in
        Singapore. Junior IC: SGD 54,000, Mid-level IC: SGD 75,800, Senior IC:
        SGD 119,000, Lead/Staff/Principal IC: SGD 103,200, People Manager: SGD
        139,100. Director and VP excluded (N<10)."
    fallbackTable:
      columns:
        - Career level
        - Median total comp (SGD)
      rows:
        - label: Junior IC
          value: 54,000
        - label: Mid-level IC
          value: 75,800
        - label: Senior IC
          value: 119,000
        - label: Lead / Staff / Principal IC
          value: 103,200
        - label: People Manager
          value: 139,100
    bars:
      - label: Junior IC
        value: 38.8
        tone: workhorse
      - label: Mid-level IC
        value: 54.5
        tone: workhorse
      - label: Senior IC
        value: 85.6
        tone: signal
      - label: Lead / Staff / Principal IC
        value: 74.2
        tone: workhorse
      - label: People Manager
        value: 100
        tone: signal
  - id: chart-compensation-indonesia
    type: bar
    title: Median total compensation, Indonesia (cohort-safe levels only)
    caption: Median annual total compensation in IDR for Indonesia (N=27). Only
      cohorts meeting the minimum safe disclosure threshold of 10 respondents are
      shown — Junior IC (N=15) and the all-respondent median (N=27). Mid-level IC
      (N=3), Senior IC (N=3), Lead / Staff / Principal IC (N=5), and Vice
      President (N=1) fall below that threshold and are not published.
    summary: Junior IC median total compensation is Rp62,000,000, below the
      all-respondent median of Rp84,000,000. Other career levels cannot be
      reported individually because their cohorts are too small.
    evidenceIds:
      - evidence:2023-compensation-indonesia
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing median total compensation in Indonesia for
        cohort-safe levels only. Junior IC (N=15): Rp62,000,000. All respondents
        (N=27): Rp84,000,000. Other career levels are suppressed because their
        cohorts fall below the 10-respondent safety threshold."
    fallbackTable:
      columns:
        - Career level
        - Median total comp (IDR)
      rows:
        - label: Junior IC (N=15)
          value: Rp62,000,000
        - label: All respondents (N=27)
          value: Rp84,000,000
    bars:
      - label: Junior IC
        value: 73.8
        tone: workhorse
      - label: All respondents
        value: 100
        tone: signal
  - id: chart-compensation-mix
    type: bar
    title: Compensation mix
    caption: Share of respondents receiving each compensation type beyond base
      salary (N=323, all markets)
    summary: More than half receive bonuses (54.8%). Fewer than a third receive
      other annual compensation, and fewer than one in six hold stock grants.
    evidenceIds:
      - evidence:2023-compensation
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing compensation mix beyond base salary. Bonuses 54.8%,
        other annual compensation 30.3%, annual stock grants 15.8%.
    fallbackTable:
      columns:
        - Compensation type
        - Respondents receiving
      rows:
        - label: Bonuses
          value: 54.8%
        - label: Other annual compensation
          value: 30.3%
        - label: Annual stock grants
          value: 15.8%
    bars:
      - label: Bonuses
        value: 54.8
        tone: signal
      - label: Other annual compensation
        value: 30.3
        tone: workhorse
      - label: Annual stock grants
        value: 15.8
        tone: workhorse
  - id: chart-benefits-access
    type: bar
    title: Benefits access
    caption: Share of respondents with access to each benefit (N=323, all markets)
    summary: Medical leave, PTO, and health insurance top the list, each above 76%.
      Flexible working arrangements are near-universal at 68.7%. Equipment/home
      office budget access is modest at 21.1%.
    evidenceIds:
      - evidence:2023-compensation
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing benefits access. Paid medical leave 83.3%, PTO 77.4%,
        health insurance 76.5%, flexible working arrangement 68.7%, professional
        development 46.4%, flexible schedule 39.9%, dental 39.3%, onsite food
        33.4%, equipment/home office budget 21.1%.
    fallbackTable:
      columns:
        - Benefit
        - Access (N=323)
      rows:
        - label: Paid medical leave
          value: 269 (83.3%)
        - label: PTO/vacation
          value: 250 (77.4%)
        - label: Health insurance
          value: 247 (76.5%)
        - label: Flexible working arrangement
          value: 222 (68.7%)
        - label: Professional development/training fund
          value: 150 (46.4%)
        - label: Flexible schedule
          value: 129 (39.9%)
        - label: Dental
          value: 127 (39.3%)
        - label: Onsite food/snacks
          value: 108 (33.4%)
        - label: Equipment/home office budget
          value: 68 (21.1%)
    bars:
      - label: Paid medical leave
        value: 83.3
        tone: signal
      - label: PTO/vacation
        value: 77.4
        tone: workhorse
      - label: Health insurance
        value: 76.5
        tone: workhorse
      - label: Flexible working arrangement
        value: 68.7
        tone: workhorse
      - label: Professional development
        value: 46.4
        tone: workhorse
      - label: Flexible schedule
        value: 39.9
        tone: workhorse
      - label: Dental
        value: 39.3
        tone: workhorse
      - label: Onsite food/snacks
        value: 33.4
        tone: workhorse
      - label: Equipment/home office budget
        value: 21.1
        tone: workhorse
---

## Currency and payment

Designers across Southeast Asia are almost universally paid in local currency. Singapore Dollar accounts for 224 respondents, followed by Malaysian Ringgit (46), Indonesian Rupiah (27), Philippine Peso (7), Vietnamese Dong (6), and Thai Baht (3). Only a small handful receive USD or other foreign currencies, suggesting limited remote work for overseas employers at this stage.

::chart{id="chart-currency-drawn-in"}

## Median annual total compensation

Singapore's median total compensation is S$84,000 (N=223), with strong representation across individual contributor and manager levels. Progression by level: Junior IC S$54,000, Mid-level IC S$75,800, Senior IC S$119,000, Lead / Staff IC S$103,200, People Manager S$139,100. Director and VP cohorts fall below the minimum safe disclosure threshold of 10 respondents and are not reported individually.

::chart{id="chart-compensation-by-level"}

## Malaysia

Malaysia's median annual total compensation is RM83,000, based on 46 respondents. This carries medium confidence for Junior to Senior IC levels: Malaysia has the second-highest respondent count in the survey, but trails Singapore significantly, which limits how far the analysis can be pushed into senior and leadership levels.

## Indonesia

Indonesia's median annual total compensation is Rp84,000,000, based on 27 respondents. Only the Junior IC cohort (N=15) meets the minimum safe disclosure threshold of 10 respondents, so it is the only career level reported individually below; other levels are too small a sample to publish with confidence.

::chart{id="chart-compensation-indonesia"}

## Compensation mix

Annual bonuses are a significant part of total compensation: 54.8% of respondents receive them. 30.3% receive other annual compensation, and 15.8% receive annual stock grants. Stock-based compensation is notably less common than in Western markets, reflecting the regional prevalence of local companies and enterprises over venture-funded startups.

::chart{id="chart-compensation-mix"}

## Standard benefits

The five non-pay benefits that form the baseline package for designers across the region are paid medical leave (83.3%), paid time off and vacation (77.4%), health insurance (76.5%), flexible working arrangements (68.7%), and a budget for equipment or home office setup (68.7%). Additional common benefits include professional development funds (46.4%), flexible schedule (39.9%), dental insurance (39.3%), and onsite food and snacks (33.4%).

::chart{id="chart-benefits-access"}
