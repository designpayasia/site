---
report: '2024'
title: 'Compensation'
summary: 'Median annual compensation across five Southeast Asian markets.'
order: 40
charts:
  - id: 'currency-distribution'
    title: Currency distribution for pay
    caption: Breakdown of currencies used to report compensation across 13 currencies; the smallest three (AUD, AED, BND) each round to 0.06%.
    summary: '76.18% of pay is reported in Indonesian Rupiah, followed by SGD (10.02%) and MYR (5.23%); the remaining ten currencies each account for under 3%.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/01-currency-distribution.png
    fallbackTable:
      columns: [Currency, Share of total payments]
      rows:
        - label: IDR (Indonesian Rupiah)
          value: '76.18%'
        - label: SGD (Singapore Dollar)
          value: '10.02%'
        - label: MYR (Malaysian Ringgit)
          value: '5.23%'
        - label: VND (Vietnamese Dong)
          value: '2.62%'
        - label: THB (Thai Baht)
          value: '2.45%'
        - label: USD
          value: '2.17%'
        - label: PHP (Philippine Peso)
          value: '0.39%'
        - label: EUR
          value: '0.39%'
        - label: JPY
          value: '0.22%'
        - label: GBP
          value: '0.17%'
        - label: AUD
          value: '0.06%'
        - label: AED
          value: '0.06%'
        - label: BND
          value: '0.06%'
    bars:
      - label: IDR
        value: 76.18
      - label: SGD
        value: 10.02
        tone: workhorse
      - label: MYR
        value: 5.23
        tone: workhorse
      - label: VND
        value: 2.62
        tone: workhorse
      - label: THB
        value: 2.45
        tone: workhorse
      - label: USD
        value: 2.17
        tone: workhorse
      - label: PHP
        value: 0.39
        tone: workhorse
      - label: EUR
        value: 0.39
        tone: workhorse
      - label: JPY
        value: 0.22
        tone: workhorse
      - label: GBP
        value: 0.17
        tone: workhorse
      - label: AUD
        value: 0.06
        tone: workhorse
      - label: AED
        value: 0.06
        tone: workhorse
      - label: BND
        value: 0.06
        tone: workhorse
  - id: 'salary-sharing-preference'
    title: Base salary sharing preferences
    caption: Preference for monthly versus annual pay reporting across all respondents.
    summary: '94.55% of designers report pay on a monthly basis, reflecting the standard Southeast Asian compensation practice.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/02-base-salary-sharing-preference.png
    fallbackTable:
      columns: [Reporting format, Proportion]
      rows:
        - label: Monthly
          value: '94.55%'
        - label: Annual
          value: '5.45%'
    bars:
      - label: Monthly
        value: 94.55
      - label: Annual
        value: 5.45
        tone: workhorse
  - id: compensation-trends-by-level
    type: bar
    title: Annual total compensation by level of seniority
    caption: "Minimum, median, and maximum annual total compensation by career
      level, Indonesia, Singapore, and Malaysia. Cohorts below the minimum safe
      disclosure threshold of 10 respondents are excluded: Indonesia
      Director/VP (N=6); Singapore Director/VP (N=2) and Head of department /
      Senior leadership (N=5); Malaysia Manager (N=4), Director/VP (N=6), and
      Head of department / Senior leadership (N=2)."
    summary: Compensation ranges widen sharply with seniority in all three
      markets. Indonesia and Singapore show the widest spreads at Senior IC
      and above; Malaysia's ranges stay comparatively tight up to Lead / Staff
      / Principal IC, the highest level with a publishable cohort. Select a
      country to see its per-level range.
    evidenceIds:
      - evidence:2024-median-compensation
      - evidence:2024-sg-compensation
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    fallbackTable:
      columns:
        - Career level
        - Median total comp (S$)
      rows:
        - label: Junior IC
          value: '60,000'
        - label: Mid-level IC
          value: '72,000'
        - label: Senior IC
          value: '103,000'
        - label: Lead / Staff / Principal IC
          value: '120,000'
        - label: Manager
          value: '133,000'
    bars:
      - label: Junior IC
        value: 45.1
        tone: workhorse
      - label: Mid-level IC
        value: 54.1
        tone: workhorse
      - label: Senior IC
        value: 77.4
        tone: workhorse
      - label: Lead / Staff / Principal IC
        value: 90.2
        tone: workhorse
      - label: Manager
        value: 100
        tone: workhorse
    variants:
      - label: Indonesia
        summary: "Indonesia's ranges are the widest in the region. Junior IC
          (N=296): Rp6M – Rp240M, median Rp66M. Mid-level IC (N=611): Rp4M –
          Rp768M, median Rp90M, the widest spread in the dataset. Senior IC
          (N=262): Rp10M – Rp1,440M, median Rp130M. Lead / Staff / Principal
          IC (N=136): Rp22M – Rp686M, median Rp133M. Manager (N=40): Rp23M –
          Rp632M, median Rp256M. Head of department / Senior leadership
          (N=15): Rp19M – Rp1,420M, median Rp195M. Director/VP (N=6) falls
          below the 10-respondent disclosure threshold and is not shown."
        evidenceIds:
          - evidence:2024-median-compensation
          - evidence:2024-geographic-distribution
        plot:
          type: range
          xLabel: Total compensation (Rp)
          valuePrefix: "Rp"
          rows:
            - label: Junior IC (n=296)
              min: 6000000
              median: 66000000
              max: 240000000
              tone: workhorse
            - label: Mid-level IC (n=611)
              min: 4000000
              median: 90000000
              max: 768000000
              tone: workhorse
            - label: Senior IC (n=262)
              min: 10000000
              median: 130000000
              max: 1440000000
            - label: Lead / Staff / Principal IC (n=136)
              min: 22000000
              median: 133000000
              max: 686000000
              tone: workhorse
            - label: Manager (n=40)
              min: 23000000
              median: 256000000
              max: 632000000
              tone: workhorse
            - label: Head of department / Senior leadership (n=15)
              min: 19000000
              median: 195000000
              max: 1420000000
              tone: workhorse
          annotations:
            - x: 1440000000
              y: Senior IC (n=262)
              text: "Outlier tops out at Rp1,440M"
              anchor: end
        fallbackTable:
          columns:
            - Career level
            - n
            - Minimum (Rp)
            - Median (Rp)
            - Maximum (Rp)
          rows:
            - label: Junior IC
              values: ["296", "6,000,000", "66,000,000", "240,000,000"]
            - label: Mid-level IC
              values: ["611", "4,000,000", "90,000,000", "768,000,000"]
            - label: Senior IC
              values: ["262", "10,000,000", "130,000,000", "1,440,000,000"]
            - label: Lead / Staff / Principal IC
              values: ["136", "22,000,000", "133,000,000", "686,000,000"]
            - label: Manager
              values: ["40", "23,000,000", "256,000,000", "632,000,000"]
            - label: Head of department / Senior leadership
              values: ["15", "19,000,000", "195,000,000", "1,420,000,000"]
      - label: Singapore
        summary: "Singapore's progression is more even than Indonesia's up to
          Senior IC, where variance widens. Junior IC (N=40): S$6,000 –
          S$190,000, median S$60,000. Mid-level IC (N=54): S$30,000 –
          S$165,000, median S$72,000. Senior IC (N=45): S$44,000 – S$434,000,
          median S$103,000, the widest spread in the dataset. Lead / Staff /
          Principal IC (N=12): S$39,000 – S$246,000, median S$120,000.
          Manager (N=13): S$54,000 – S$267,000, median S$133,000.
          Director/VP (N=2) and Head of department / Senior leadership (N=5)
          fall below the 10-respondent disclosure threshold and are not
          shown."
        evidenceIds:
          - evidence:2024-median-compensation
          - evidence:2024-sg-compensation
        plot:
          type: range
          xLabel: Total compensation (S$)
          valuePrefix: "S$"
          rows:
            - label: Junior IC (n=40)
              min: 6000
              median: 60000
              max: 190000
              tone: workhorse
            - label: Mid-level IC (n=54)
              min: 30000
              median: 72000
              max: 165000
              tone: workhorse
            - label: Senior IC (n=45)
              min: 44000
              median: 103000
              max: 434000
            - label: Lead / Staff / Principal IC (n=12)
              min: 39000
              median: 120000
              max: 246000
              tone: workhorse
            - label: Manager (n=13)
              min: 54000
              median: 133000
              max: 267000
              tone: workhorse
          annotations:
            - x: 434000
              y: Senior IC (n=45)
              text: "Outlier reaches S$434K"
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
              values: ["40", "6,000", "60,000", "190,000"]
            - label: Mid-level IC
              values: ["54", "30,000", "72,000", "165,000"]
            - label: Senior IC
              values: ["45", "44,000", "103,000", "434,000"]
            - label: Lead / Staff / Principal IC
              values: ["12", "39,000", "120,000", "246,000"]
            - label: Manager
              values: ["13", "54,000", "133,000", "267,000"]
      - label: Malaysia
        summary: "Malaysia's publishable cohorts thin out earlier than
          Indonesia's or Singapore's. Junior IC (N=15): RM24,000 – RM72,000,
          median RM42,000. Mid-level IC (N=26): RM40,000 – RM180,000, median
          RM76,000. Senior IC (N=22): RM68,000 – RM240,000, median RM108,000.
          Lead / Staff / Principal IC (N=16): RM46,000 – RM317,000, median
          RM154,000. Manager (N=4), Director/VP (N=6), and Head of department
          / Senior leadership (N=2) fall below the 10-respondent disclosure
          threshold and are not shown, despite Director/VP carrying the
          highest published median in the region (RM353,000) before
          suppression."
        evidenceIds:
          - evidence:2024-median-compensation
          - evidence:2024-geographic-distribution
        plot:
          type: range
          xLabel: Total compensation (RM)
          valuePrefix: "RM"
          rows:
            - label: Junior IC (n=15)
              min: 24000
              median: 42000
              max: 72000
              tone: workhorse
            - label: Mid-level IC (n=26)
              min: 40000
              median: 76000
              max: 180000
              tone: workhorse
            - label: Senior IC (n=22)
              min: 68000
              median: 108000
              max: 240000
            - label: Lead / Staff / Principal IC (n=16)
              min: 46000
              median: 154000
              max: 317000
              tone: workhorse
          annotations:
            - x: 317000
              y: Lead / Staff / Principal IC (n=16)
              text: "Outlier reaches RM317K"
              anchor: end
        fallbackTable:
          columns:
            - Career level
            - n
            - Minimum (RM)
            - Median (RM)
            - Maximum (RM)
          rows:
            - label: Junior IC
              values: ["15", "24,000", "42,000", "72,000"]
            - label: Mid-level IC
              values: ["26", "40,000", "76,000", "180,000"]
            - label: Senior IC
              values: ["22", "68,000", "108,000", "240,000"]
            - label: Lead / Staff / Principal IC
              values: ["16", "46,000", "154,000", "317,000"]
  - id: 'compensation-trends-vn'
    title: Annual total compensation by level of seniority in Vietnam
    caption: Bar/distribution plot of annual compensation (VND) by seniority level among Vietnamese designers.
    summary: 'Manager roles in Vietnam command a near-double premium over Senior IC (VND 780M vs 420M), based on 47 respondents.'
    evidenceIds: ['evidence:2024-median-compensation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/06-compensation-trends-in-vietnam.png
    fallbackTable:
      columns: [Level, Median (VND)]
      rows:
        - label: Junior IC
          value: 122M
        - label: Mid-level IC
          value: 260M
        - label: Senior IC
          value: 420M
        - label: Manager
          value: 780M
        - label: Head/Senior Leadership
          value: 804M
  - id: 'compensation-trends-th'
    title: Annual total compensation by level of seniority in Thailand
    caption: Bar/distribution plot of annual compensation (THB) by seniority level among Thai designers.
    summary: 'Thai IC roles are tightly concentrated (95.46% of respondents), with clear steps from Junior IC (360K THB) to Senior IC (732K THB), based on 44 respondents.'
    evidenceIds: ['evidence:2024-median-compensation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/07-compensation-trends-in-thailand.png
    fallbackTable:
      columns: [Level, Median (THB)]
      rows:
        - label: Junior IC
          value: 360K
        - label: Mid-level IC
          value: 654K
        - label: Senior IC
          value: 732K
        - label: Lead/Staff
          value: 2M
        - label: Manager
          value: 3M
  - id: 'compensation-mix'
    title: 'Base salary share by seniority level'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Base salary as a percentage of total compensation across seniority levels, showing the shift toward variable pay at higher levels."
    summary: "Base salary declines from 90.5% for junior ICs to 83.7% for heads of design, with the sharpest drop at manager level (84.3%). Stock grants rise to 4.3% at head level, and bonuses peak at 11.3% for senior leadership."
    evidenceIds: ["evidence:2024-currency-compensation-structure"]
    columns:
    - 'Seniority Level'
    - 'Base Salary %'
    bars:
    - label: 'Junior IC'
      value: 90.5
      tone: workhorse
    - label: 'Mid-level IC'
      value: 90.2
      tone: workhorse
    - label: 'Senior IC'
      value: 88.4
      tone: workhorse
    - label: 'Lead/Staff IC'
      value: 85.6
      tone: workhorse
    - label: 'Manager'
      value: 84.3
    - label: 'Director/VP'
      value: 85.1
      tone: workhorse
    - label: 'Head of Design'
      value: 83.7
      tone: signal
    fallbackTable:
      columns:
      - 'Seniority Level'
      - 'Base Salary %'
      rows:
      - label: 'Junior IC'
        value: '90.5%'
      - label: 'Mid-level IC'
        value: '90.2%'
      - label: 'Senior IC'
        value: '88.4%'
      - label: 'Lead/Staff IC'
        value: '85.6%'
      - label: 'Manager'
        value: '84.3%'
      - label: 'Director/VP'
        value: '85.1%'
      - label: 'Head of Design'
        value: '83.7%'
  - id: 'other-benefits'
    title: Breakdown of other benefits
    caption: Distribution of non-salary benefits offered across Southeast Asian design roles (N=1,797).
    summary: 'Health insurance leads at 52.0%, followed by paid time off (32.4%) and paid medical leave (28.4%). Professional development funds and dental insurance sit close together around 23%, and flexibility benefits (schedule and remote/co-working) run 20–22%. Equipment or home-office budget support is modest at 10.7%, and flexible spending accounts are rare at 3.6%.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/09-other-benefits-breakdown.png
    fallbackTable:
      columns: [Benefit, Proportion]
      rows:
        - label: Health insurance
          value: '52.0%'
        - label: Paid time off / vacation time
          value: '32.4%'
        - label: Paid medical leave
          value: '28.4%'
        - label: Professional development, training, or learning fund
          value: '23.5%'
        - label: Dental insurance
          value: '23.3%'
        - label: Flexible schedule
          value: '22.1%'
        - label: Allowance for flexible working arrangement (remote/co-working space)
          value: '20.8%'
        - label: Onsite food / snacks
          value: '19.5%'
        - label: Transport subsidies
          value: '12.6%'
        - label: Meal subsidies
          value: '12.1%'
        - label: Internet / mobile phone subsidies
          value: '12.1%'
        - label: Budget for equipment or home office setup
          value: '10.7%'
        - label: Wellness (gym, fitness, etc.)
          value: '9.2%'
        - label: Flexible spending account
          value: '3.6%'
        - label: Other
          value: '1.8%'
    bars:
      - label: Health insurance
        value: 52.0
      - label: Paid time off
        value: 32.4
        tone: workhorse
      - label: Paid medical leave
        value: 28.4
        tone: workhorse
      - label: Professional development
        value: 23.5
        tone: workhorse
      - label: Dental insurance
        value: 23.3
        tone: workhorse
      - label: Flexible schedule
        value: 22.1
        tone: workhorse
      - label: Flexible working allowance
        value: 20.8
        tone: workhorse
      - label: Onsite food / snacks
        value: 19.5
        tone: workhorse
      - label: Transport subsidies
        value: 12.6
        tone: workhorse
      - label: Meal subsidies
        value: 12.1
        tone: workhorse
      - label: Internet / mobile subsidies
        value: 12.1
        tone: workhorse
      - label: Equipment / home office budget
        value: 10.7
        tone: workhorse
      - label: Wellness
        value: 9.2
        tone: workhorse
      - label: Flexible spending account
        value: 3.6
        tone: workhorse
      - label: Other
        value: 1.8
        tone: workhorse
keyFindings:
  - 'Regional currency dominance (96.9%) suggesting primarily local market focus'
  - 'Wide compensation variances, particularly at leadership levels'
  - 'Notable compensation jumps between IC and management tracks'
  - 'Compensation structures vary across markets: Indonesia widest ranges, Singapore more predictable, Malaysia distinct director-level'
  - 'Consistent outliers across markets, particularly in mid to senior IC roles'
commentary: |-
  When it comes to pay and benefits, design salaries vary widely across the region.

  In Indonesia, salary ranges are the broadest, often shaped by how much individual companies value design and by the common practice of basing offers on previous pay.

  Managers typically earn more than individual contributors, unlike Western companies that often have dedicated senior IC tracks. There are consistent outliers across markets, particularly in mid-to-senior IC roles, suggesting some companies are willing to pay a premium to attract top talent.
  Office return policies are affecting what benefits companies offer.
  While remote work is growing, most people (97%) are still paid in their local currency.
hubCommentary: |-
  Pay structures look different across Southeast Asia, so companies need to understand what's typical in each market to create fair and competitive compensation packages. Some designers are earning significantly more than others in similar roles, which could mean that companies willing to pay more might attract top talent.
whatThisMeansIndividuals: |-
  Understand how your company rewards deep design expertise versus management skills.
  Consider how you plan your career path based on impact as compared to just going up the career ladder.
whatThisMeansLeaders: |-
  Think about creating career paths for designers who want to stay hands-on rather than manage.
  Be ready to show how your design team adds value to justify good pay.
  Check if your design team structure and pay matches how important design is to your business.
  Review if your pay ranges help you keep good designers.
questions:
  - 'Will we keep paying managers much more, or will we create better-paid roles for senior designers?'
  - 'How does basing new job offers on previous salary (plus 20%) affect the industry long term?'
  - 'What happens when managers must both lead and do design work themselves?'
  - 'How can companies pay fairly across different countries when teams work remotely?'
references:
  - label: 'Indonesia design manager salaries range from Rp 13.5M to Rp 16.5M monthly'
    url: 'https://id.jobstreet.com/career-advice/role/design-manager/salary'
  - label: 'Southeast Asian salary increases projected for 2025: Vietnam 6.7%, Indonesia 6.3%'
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2024/salaries-in-southeast-asia-expected-to-rise-in-2025'
  - label: 'Technology and manufacturing sectors in SEA budgeting highest salary increases at 5.8%'
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2024/salaries-in-southeast-asia-expected-to-rise-in-2025'
---

Median annual compensation varies dramatically across the five surveyed markets, reflecting differences in cost of living, market maturity, and demand for design talent. In local currency terms, the medians are: Indonesia at IDR 92.35 million, Singapore at SGD 79,200, Malaysia at MYR 97,200, Vietnam at VND 260 million, and Thailand at THB 652,000. Indonesia, Singapore, and Malaysia have per-level cohorts deep enough to break out a compensation range by career level; Vietnam and Thailand's cohorts thin out beyond Senior IC and remain published as distribution charts below.

::chart{id="currency-distribution"}

::chart{id="salary-sharing-preference"}

::chart{id="compensation-trends-by-level"}

::chart{id="compensation-trends-vn"}

::chart{id="compensation-trends-th"}

::chart{id="compensation-mix"}

::chart{id="other-benefits"}

When adjusted for purchasing power parity, Singapore predictably leads, but the gap narrows considerably. Indonesian designers, despite lower nominal salaries, benefit from a rapidly growing tech ecosystem that has driven year-on-year increases. Regional designers in markets like Vietnam and Thailand report the fastest relative growth in compensation, albeit from a lower base.

The survey also reveals significant compensation variation within markets based on company type. Designers at multinational corporations and well-funded startups consistently out-earn peers at local agencies and small businesses. Experience level remains the strongest predictor of compensation, with senior designers earning 2-3x the median of junior practitioners across all markets.

Compensation transparency remains low: fewer than 30% of respondents report that their organisations openly share salary bands or pay ranges. This opacity is a key driver of pay inequity and a recurring theme in qualitative feedback from survey participants.
