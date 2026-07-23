---
report: "2023"
title: Compensation
summary: Local currency dominates, median compensation varies across markets,
  and annual bonuses remain a significant part of total pay packages.
order: 40
keyFindings:
  - Medical leave, paid time off, and health insurance are the most widely
    held benefits; equipment or home-office budget access sits at 21.1%.
metrics:
  - value: "69.3"
    unit: "%"
    label: of respondents are paid in SGD
    color: workhorse
    evidenceId: evidence:2023-compensation
    sampleSize: 323
    publishMode: published
  - value: "54.8"
    unit: "%"
    label: receive bonuses beyond base salary
    color: workhorse
    evidenceId: evidence:2023-compensation
    sampleSize: 323
    publishMode: published
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
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: SGD
          values: ["224", "69.3"]
        - label: MYR
          values: ["46", "14.2"]
        - label: IDR
          values: ["27", "8.4"]
        - label: PHP
          values: ["7", "2.2"]
        - label: VND
          values: ["6", "1.9"]
        - label: USD
          values: ["5", "1.5"]
        - label: THB
          values: ["3", "0.9"]
        - label: INR
          values: ["2", "0.6"]
        - label: JPY
          values: ["1", "0.3"]
        - label: RON
          values: ["1", "0.3"]
        - label: TWD
          values: ["1", "0.3"]
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
    caption: "Minimum, median, and maximum total compensation by career level,
      Singapore and Malaysia. Cohorts below the minimum safe disclosure
      threshold of 10 respondents are excluded: Singapore Director (N=8) and
      VP (N=2); Malaysia Lead / Staff / Principal IC (N=5), People Manager
      (N=3), and Director (N=2)."
    summary: Compensation ranges widen with seniority in both markets, with
      the broadest spread at Senior IC in Singapore. Select a country to see
      its per-level range.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
    evidenceIds:
      - evidence:2023-compensation
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing median total compensation by career level,
        with a country filter for Singapore and Malaysia."
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
          value: 119,500
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
        value: 85.9
      - label: Lead / Staff / Principal IC
        value: 74.2
        tone: workhorse
      - label: People Manager
        value: 100
        tone: workhorse
    variants:
      - label: Singapore
        summary: "Singapore compensation spans a wide range at every career
          level, with the widest spread at Senior IC, from S$44,200 to
          S$339,927. Director (N=8) and VP (N=2) fall below the
          10-respondent disclosure threshold and are not shown."
        suppressionNote: >-
          Some cohorts here are too small to publish without identifying
          individuals, so we hold those figures back.
        evidenceIds:
          - evidence:2023-compensation
          - evidence:2023-sg-compensation-range
        plot:
          type: range
          xLabel: Total compensation (S$)
          valuePrefix: "S$"
          rows:
            - label: Junior IC (n=63)
              min: 12000
              median: 54000
              max: 157000
              tone: workhorse
            - label: Mid-level IC (n=56)
              min: 34800
              median: 75800
              max: 210000
              tone: workhorse
            - label: Senior IC (n=52)
              min: 44200
              median: 119500
              max: 339927
            - label: Lead / Staff / Principal IC (n=19)
              min: 38400
              median: 103200
              max: 201342
              tone: workhorse
            - label: People Manager (n=23)
              min: 37396
              median: 139100
              max: 235000
              tone: workhorse
          annotations:
            - x: 339927
              y: Senior IC (n=52)
              text: "Tops out at S$339,927"
              anchor: end
        fallbackTable:
          columns:
            - Career level
            - n
            - Minimum (S$)
            - Median (S$)
            - Maximum (S$)
          rows:
            - label: Junior IC
              values: ["63", "12,000", "54,000", "157,000"]
            - label: Mid-level IC
              values: ["56", "34,800", "75,800", "210,000"]
            - label: Senior IC
              values: ["52", "44,200", "119,500", "339,927"]
            - label: Lead / Staff / Principal IC
              values: ["19", "38,400", "103,200", "201,342"]
            - label: People Manager
              values: ["23", "37,396", "139,100", "235,000"]
      - label: Malaysia
        summary: "Malaysia's ranges widen quickly past Junior IC. Junior IC
          (N=13): RM30,000 – RM140,000, median RM55,000. Mid-level IC (N=13):
          RM54,000 – RM233,400, median RM82,000. Senior IC (N=10): RM63,600 –
          RM174,040, median RM94,325. Lead / Staff / Principal IC (N=5),
          People Manager (N=3), and Director (N=2) fall below the
          10-respondent disclosure threshold and are not shown."
        suppressionNote: >-
          Some cohorts here are too small to publish without identifying
          individuals, so we hold those figures back.
        evidenceIds:
          - evidence:2023-compensation-malaysia
          - evidence:2023-my-compensation-range
        plot:
          type: range
          xLabel: Total compensation (RM)
          valuePrefix: "RM"
          rows:
            - label: Junior IC (n=13)
              min: 30000
              median: 55000
              max: 140000
              tone: workhorse
            - label: Mid-level IC (n=13)
              min: 54000
              median: 82000
              max: 233400
              tone: workhorse
            - label: Senior IC (n=10)
              min: 63600
              median: 94325
              max: 174040
        fallbackTable:
          columns:
            - Career level
            - n
            - Minimum (RM)
            - Median (RM)
            - Maximum (RM)
          rows:
            - label: Junior IC
              values: ["13", "30,000", "55,000", "140,000"]
            - label: Mid-level IC
              values: ["13", "54,000", "82,000", "233,400"]
            - label: Senior IC
              values: ["10", "63,600", "94,325", "174,040"]
  - id: chart-compensation-indonesia
    type: bar
    title: Median total compensation, Indonesia (cohort-safe levels only)
    caption: Median annual total compensation in IDR for Indonesia (N=27). Only
      cohorts meeting the minimum safe disclosure threshold of 10 respondents are
      shown, Junior IC (N=15) and the all-respondent median (N=27). Mid-level IC
      (N=3), Senior IC (N=3), Lead / Staff / Principal IC (N=5), and Vice
      President (N=1) fall below that threshold and are not published.
    summary: Junior IC median total compensation is Rp62,000,000, below the
      all-respondent median of Rp84,000,000. Other career levels cannot be
      reported individually because their cohorts are too small.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
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
        - Respondents (of N=323)
        - Share (%)
      rows:
        - label: Paid medical leave
          values: ["269", "83.3"]
        - label: PTO/vacation
          values: ["250", "77.4"]
        - label: Health insurance
          values: ["247", "76.5"]
        - label: Flexible working arrangement
          values: ["222", "68.7"]
        - label: Professional development/training fund
          values: ["150", "46.4"]
        - label: Flexible schedule
          values: ["129", "39.9"]
        - label: Dental
          values: ["127", "39.3"]
        - label: Onsite food/snacks
          values: ["108", "33.4"]
        - label: Equipment/home office budget
          values: ["68", "21.1"]
    bars:
      - label: Paid medical leave
        value: 83.3
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

Designers across Southeast Asia are almost universally paid in local currency. Only a small handful receive USD or other foreign currencies, suggesting limited remote work for overseas employers at this stage.

::chart{id="chart-currency-drawn-in"}

## Median annual total compensation

Singapore's median total compensation is S$84,000 (N=223), with strong representation across individual contributor and manager levels. Progression by level:

- Junior IC: S$54,000
- Mid-level IC: S$75,800
- Senior IC: S$119,500
- Lead / Staff IC: S$103,200
- People Manager: S$139,100

Director and VP cohorts fall below the minimum safe disclosure threshold of 10 respondents and are not reported individually. Pay varies widely within each level too: Senior IC alone ranges from S$44,200 to S$339,927, the widest spread in the dataset.

::chart{id="chart-compensation-by-level"}

## Malaysia

Malaysia's median annual total compensation is RM83,000, based on 46 respondents. This carries medium confidence for Junior to Senior IC levels: Malaysia has the second-highest respondent count in the survey, but trails Singapore significantly, which limits how far the analysis can be pushed into senior and leadership levels. By career level:

- Junior IC: RM55,000 (N=13)
- Mid-level IC: RM82,000 (N=13)
- Senior IC: RM94,325 (N=10)

Lead / Staff / Principal IC (N=5), People Manager (N=3), and Director (N=2) fall below the minimum safe disclosure threshold and are not reported individually. Ranges widen quickly past Junior IC: Mid-level IC alone spans RM54,000 – RM233,400.

## Indonesia

Indonesia's median annual total compensation is Rp84,000,000, based on 27 respondents. Only the Junior IC cohort (N=15, median Rp62,000,000) meets the minimum safe disclosure threshold of 10 respondents. The published report gives medium confidence for Junior IC salary trends only, noting that more data points are needed before other levels can be reported with confidence.

::chart{id="chart-compensation-indonesia"}

## Compensation mix

Bonuses are the main way pay reaches beyond base salary; other annual compensation and stock grants are less common. Stock grants in particular remain rare, likely because most respondents work at local companies and established enterprises rather than venture-funded startups.

::chart{id="chart-compensation-mix"}

## Standard benefits

Four benefits form the baseline package for designers across the region: paid medical leave, paid time off, health insurance, and flexible working arrangements, each reaching more than two-thirds of respondents. Past that baseline, access thins out, from professional development funds down to a budget for equipment or a home-office setup, the least common benefit on the list.

::chart{id="chart-benefits-access"}
