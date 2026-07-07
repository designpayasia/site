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
  - id: chart-negotiate-current-compensation
    type: bars
    title: Negotiated current compensation
    caption: Whether respondents negotiated their current total compensation,
      among 317 answered responses.
    summary: Distribution of answers about negotiating current compensation.
    evidenceIds:
      - evidence:2023-compensation
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing whether respondents negotiated their current total
        compensation. Yes accounts for 57.1% of 317 answered responses."
    fallbackTable:
      columns:
        - Response
        - Share (N=317)
      rows:
        - label: Yes
          value: 181 (57.1%)
        - label: No
          value: 123 (38.8%)
        - label: Not applicable
          value: 13 (4.1%)
    bars:
      - label: Yes
        value: 57.1
        tone: signal
      - label: No
        value: 38.8
        tone: workhorse
      - label: Not applicable
        value: 4.1
        tone: workhorse
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
  - id: chart-pay-increase-distribution
    type: bar
    title: Pay increase vs last year
    caption: Share of respondents by pay increase bracket (N=216, Singapore). One in
      four received a more than 20% increase, likely driven by job changes. One
      in five received no increase at all.
    summary: "Pay increases are bimodal: a quarter received over 20% growth while
      nearly as many received nothing."
    evidenceIds:
      - evidence:2023-sentiments
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing pay increase distribution. No increase: 19.9%,
        0.1–5%: 19.0%, 6–10%: 15.7%, 11–15%: 10.6%, 16–20%: 9.3%, more than 20%:
        25.5%."
    fallbackTable:
      columns:
        - Increase bracket
        - Share (N=216)
      rows:
        - label: No increase
          value: 43 (19.9%)
        - label: 0.1–5%
          value: 41 (19.0%)
        - label: 6–10%
          value: 34 (15.7%)
        - label: 11–15%
          value: 23 (10.6%)
        - label: 16–20%
          value: 20 (9.3%)
        - label: More than 20%
          value: 55 (25.5%)
    bars:
      - label: No increase
        value: 19.9
        tone: signal
      - label: 0.1–5%
        value: 19
        tone: workhorse
      - label: 6–10%
        value: 15.7
        tone: workhorse
      - label: 11–15%
        value: 10.6
        tone: workhorse
      - label: 16–20%
        value: 9.3
        tone: workhorse
      - label: More than 20%
        value: 25.5
        tone: signal
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
---

## Currency and payment

Designers across Southeast Asia are almost universally paid in local currency. Singapore Dollar accounts for 224 respondents, followed by Malaysian Ringgit (46), Indonesian Rupiah (27), Philippine Peso (7), Vietnamese Dong (6), and Thai Baht (3). Only a small handful receive USD or other foreign currencies, suggesting limited remote work for overseas employers at this stage.

::chart{id="chart-currency-drawn-in"}


::chart{id="chart-negotiate-current-compensation"}

::chart{id="chart-compensation-mix"}

::chart{id="chart-benefits-access"}

::chart{id="chart-pay-increase-distribution"}

::chart{id="chart-compensation-by-level"}

## Median annual total compensation

Singapore's median total compensation is S$84,000 (N=223), with robust representation across all career levels. The full range spans from S$12,000 at Junior IC to S$355,000 at Director level. Progression by level: Junior IC S$54,000, Mid-level IC S$75,800, Senior IC S$119,500, Lead / Staff IC S$103,200, People Manager S$139,100, Director S$238,900, VP S$176,500.

Malaysia's median is RM83,000 (N=46), with reasonable confidence for Junior to Senior ICs. The second-largest respondent count trails Singapore significantly, which limits analysis depth at senior levels.

Indonesia's median is Rp84,000,000 (N=27), with reliable signal at the Junior IC level only. Salary trends beyond junior should be interpreted with caution given the smaller sample. Junior IC median: Rp62,000,000; Mid-level IC: Rp84,000,000; Senior IC: Rp348,000,000.

## Compensation mix

Annual bonuses are a significant part of total compensation: 54.8% of respondents receive them. 30.3% receive other annual compensation, and 15.8% receive annual stock grants. Stock-based compensation is notably less common than in Western markets, reflecting the regional prevalence of local companies and enterprises over venture-funded startups.

## Standard benefits

The five non-pay benefits that form the baseline package for designers across the region are paid medical leave (83.3%), paid time off and vacation (77.4%), health insurance (76.5%), flexible working arrangements (68.7%), and a budget for equipment or home office setup (68.7%). Additional common benefits include professional development funds (46.4%), flexible schedule (39.9%), dental insurance (39.3%), and onsite food and snacks (33.4%).
