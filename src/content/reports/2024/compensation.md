---
report: '2024'
title: 'Compensation'
summary: 'Median annual compensation across five Southeast Asian markets.'
order: 40
metrics:
  - value: '76.18'
    unit: '%'
    label: of pay is reported in Indonesian Rupiah
    color: workhorse
    evidenceId: evidence:2024-currency-compensation-structure
    sampleSize: 1797
    publishMode: published
  - value: '94.55'
    unit: '%'
    label: of designers report pay on a monthly basis
    color: workhorse
    evidenceId: evidence:2024-currency-compensation-structure
    sampleSize: 1797
    publishMode: published
charts:
  - id: 'currency-distribution'
    title: Currency distribution for pay
    caption: Breakdown of currencies used to report compensation across 13 currencies; the smallest three (AUD, AED, BND) each round to 0.06%. Based on N=1,797 responses.
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
    caption: Preference for monthly versus annual pay reporting across all respondents (N=1,797).
    summary: '94.55% of designers report pay on a monthly basis, reflecting the standard Southeast Asian compensation practice.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/02-base-salary-sharing-preference.png
    fallbackTable:
      columns: [Reporting format, Respondents (n), Proportion]
      rows:
        - label: Monthly
          values: ['1,699', '94.55%']
        - label: Annual
          values: ['98', '5.45%']
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
    summary: Compensation ranges widen sharply with seniority across all
      three published markets. Select a country to see its per-level range.
    suppressionNote: >-
      Some cohorts here are too small to publish without identifying
      individuals, so we hold those figures back.
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
        summary: "Indonesia's ranges are the widest in the region, and they
          broaden sharply with seniority. Director/VP (n=6) falls below the
          10-respondent disclosure threshold and is not shown."
        suppressionNote: >-
          Some cohorts here are too small to publish without identifying
          individuals, so we hold those figures back.
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
              q1: 42000000
              q3: 84000000
              max: 240000000
              tone: workhorse
            - label: Mid-level IC (n=611)
              min: 4000000
              median: 90000000
              q1: 66000000
              q3: 120508000
              max: 768000000
              tone: workhorse
            - label: Senior IC (n=262)
              min: 10000000
              median: 130000000
              q1: 84000000
              q3: 205500000
              max: 1440000000
            - label: Lead / Staff / Principal IC (n=136)
              min: 22000000
              median: 133000000
              q1: 90000000
              q3: 210750000
              max: 686000000
              tone: workhorse
            - label: Manager (n=40)
              min: 23000000
              median: 256000000
              q1: 135600000
              q3: 410000000
              max: 632000000
              tone: workhorse
            - label: Head of department / Senior leadership (n=15)
              min: 19000000
              median: 195000000
              q1: 114000000
              q3: 708000000
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
          Senior IC, where variance widens. Director/VP (n=2) and Head of
          department / Senior leadership (n=5) fall below the 10-respondent
          disclosure threshold and are not shown."
        suppressionNote: >-
          Some cohorts here are too small to publish without identifying
          individuals, so we hold those figures back.
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
              q1: 52200
              q3: 68562
              max: 190000
              tone: workhorse
            - label: Mid-level IC (n=54)
              min: 30000
              median: 72000
              q1: 53425
              q3: 98430
              max: 165000
              tone: workhorse
            - label: Senior IC (n=45)
              min: 44000
              median: 103000
              q1: 78000
              q3: 131800
              max: 434000
            - label: Lead / Staff / Principal IC (n=12)
              min: 39000
              median: 120000
              q1: 88550
              q3: 165000
              max: 246000
              tone: workhorse
            - label: Manager (n=13)
              min: 54000
              median: 133000
              q1: 72000
              q3: 153100
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
          Indonesia's or Singapore's. Manager (n=4), Director/VP (n=6), and
          Head of department / Senior leadership (n=2) fall below the
          10-respondent disclosure threshold and are not shown, despite
          Director/VP carrying the highest published median in the region
          (RM353,000) before suppression."
        suppressionNote: >-
          Some cohorts here are too small to publish without identifying
          individuals, so we hold those figures back.
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
              q1: 38700
              q3: 52000
              max: 72000
              tone: workhorse
            - label: Mid-level IC (n=26)
              min: 40000
              median: 76000
              q1: 56400
              q3: 101225
              max: 180000
              tone: workhorse
            - label: Senior IC (n=22)
              min: 68000
              median: 108000
              q1: 84000
              q3: 136658
              max: 240000
            - label: Lead / Staff / Principal IC (n=16)
              min: 46000
              median: 154000
              q1: 93400
              q3: 168952
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
  - id: 'employment-type-comp'
    title: Compensation by employment type
    caption: "Median annual-equivalent compensation, full-time employees versus
      contractors and freelancers (n=337 combined: 247 fixed-term contractors
      plus 90 self-employed freelancers), within each market's own currency,
      at an all-levels aggregate grain rather than broken out by seniority.
      Figures are total annual compensation as reported; for contractors and
      freelancers the annual total assumes a full year of engagements, so it
      may overstate for those with unpaid gaps. Interns (n=35) are excluded.
      Cohorts below the 10-respondent disclosure threshold are not shown;
      Malaysia, Thailand, Vietnam, Japan, and the Philippines are named in the
      accompanying text rather than charted. Select a market to view its
      comparison."
    summary: Where both cohorts cleared 10 respondents, contractors and
      freelancers' median annual-equivalent pay sits below full-time pay in
      both Indonesia and Singapore. This is an all-levels aggregate, not a
      per-seniority-level comparison. Select a market to see its figures.
    suppressionNote: >-
      Malaysia, Thailand, Vietnam, Japan, and the Philippines are not shown:
      their contractor/freelancer cohorts fell below the 10-respondent
      disclosure threshold.
    evidenceIds:
      - evidence:2024-employment-type-compensation
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    fallbackTable:
      columns: [Employment type, Median annual-equivalent comp]
      rows:
        - label: Full-time
          value: 'Rp 97,200,000'
        - label: Contractors and freelancers
          value: 'Rp 80,620,000'
    bars:
      - label: Full-time
        value: 100
        tone: workhorse
      - label: Contractors and freelancers
        value: 83
        tone: signal
    variants:
      - label: Indonesia
        summary: "Indonesia full-time (n=1,050) versus contractors and
          freelancers (n=286) median annual-equivalent compensation, all
          levels combined, in Indonesian Rupiah: contractors and freelancers
          earn a median of Rp80,620,000 against Rp97,200,000 for full-time
          employees. This is an all-levels aggregate, not a per-seniority-level
          comparison."
        evidenceIds:
          - evidence:2024-employment-type-compensation
          - evidence:2024-geographic-distribution
        plot:
          type: range
          xLabel: Annual-equivalent compensation (Rp)
          valuePrefix: "Rp"
          rows:
            - label: Full-time (n=1,050)
              min: 8400000
              median: 97200000
              q1: 68535000
              q3: 150000000
              max: 1440000000
              tone: workhorse
            - label: Contractors and freelancers (n=286)
              min: 3600000
              median: 80620000
              q1: 54000000
              q3: 117750000
              max: 532000000
              tone: signal
        fallbackTable:
          columns:
            - Career level
            - Full-time median (Rp)
            - Contractors and freelancers median (Rp)
          rows:
            - label: All levels
              values: ["97,200,000", "80,620,000"]
      - label: Singapore
        summary: "Singapore full-time (n=150) versus contractors and
          freelancers (n=19) median annual-equivalent compensation, all levels
          combined, in Singapore Dollars: contractors and freelancers earn a
          median of S$66,000 against S$83,594 for full-time employees. This is
          an all-levels aggregate, not a per-seniority-level comparison."
        evidenceIds:
          - evidence:2024-employment-type-compensation
          - evidence:2024-sg-compensation
        plot:
          type: range
          xLabel: Annual-equivalent compensation (S$)
          valuePrefix: "S$"
          rows:
            - label: Full-time (n=150)
              min: 30000
              median: 83594
              q1: 60635
              q3: 125058
              max: 542000
              tone: workhorse
            - label: Contractors and freelancers (n=19)
              min: 34800
              median: 66000
              q1: 54000
              q3: 89928
              max: 144850
              tone: signal
        fallbackTable:
          columns:
            - Career level
            - Full-time median (S$)
            - Contractors and freelancers median (S$)
          rows:
            - label: All levels
              values: ["83,594", "66,000"]
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
    caption: "Base salary as a percentage of total compensation across seniority levels, showing the shift toward variable pay at higher levels. Based on N=1,797 responses."
    summary: "Base salary's share of total compensation declines from 90.5% at junior IC to 83.7% at head of design as variable pay grows with seniority."
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
    summary: 'Health insurance is the most common benefit, offered to 52.0% of designers.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/09-other-benefits-breakdown.png
    fallbackTable:
      columns: [Benefit, Respondents (n), Proportion]
      rows:
        - label: Health insurance
          values: ['935', '52.0%']
        - label: Paid time off / vacation time
          values: ['582', '32.4%']
        - label: Paid medical leave
          values: ['511', '28.4%']
        - label: Professional development, training, or learning fund
          values: ['423', '23.5%']
        - label: Dental insurance
          values: ['418', '23.3%']
        - label: Flexible schedule
          values: ['398', '22.1%']
        - label: Allowance for flexible working arrangement (remote/co-working space)
          values: ['373', '20.8%']
        - label: Onsite food / snacks
          values: ['351', '19.5%']
        - label: Transport subsidies
          values: ['226', '12.6%']
        - label: Meal subsidies
          values: ['218', '12.1%']
        - label: Internet / mobile phone subsidies
          values: ['217', '12.1%']
        - label: Budget for equipment or home office setup
          values: ['192', '10.7%']
        - label: Wellness (gym, fitness, etc.)
          values: ['165', '9.2%']
        - label: Flexible spending account
          values: ['65', '3.6%']
        - label: Other
          values: ['33', '1.8%']
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
  - 'Notable compensation jumps between IC and management tracks'
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
  If you contract or freelance, read your annualised pay against these salaried medians with the gaps in mind. The annual figure assumes a full year of billable work, and benefits, unpaid time, and tax are yours to cover.
whatThisMeansLeaders: |-
  Think about creating career paths for designers who want to stay hands-on rather than manage.
  Be ready to show how your design team adds value to justify good pay.
  Check if your design team structure and pay matches how important design is to your business.
  Review if your pay ranges help you keep good designers.
  When you compare a contractor rate with a salaried band, load in the costs the salary already carries before deciding which is cheaper.
questions:
  - 'Will we keep paying managers much more, or will we create better-paid roles for senior designers?'
  - 'How does basing new job offers on previous salary (plus 20%) affect the industry long term?'
  - 'What happens when managers must both lead and do design work themselves?'
  - 'How can companies pay fairly across different countries when teams work remotely?'
  - 'When your annual figure quietly assumes you bill every month of the year, what does it actually take to match a salaried offer?'
references:
  - label: 'Indonesia design manager salaries range from Rp 13.5M to Rp 16.5M monthly'
    url: 'https://id.jobstreet.com/career-advice/role/design-manager/salary'
  - label: 'Southeast Asian salary increases projected for 2025: Vietnam 6.7%, Indonesia 6.3%'
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2024/salaries-in-southeast-asia-expected-to-rise-in-2025'
  - label: 'Technology and manufacturing sectors in SEA budgeting highest salary increases at 5.8%'
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2024/salaries-in-southeast-asia-expected-to-rise-in-2025'
---

Median annual compensation varies dramatically across the five surveyed markets, reflecting differences in cost of living, market maturity, and demand for design talent. In local currency terms, the medians are:

- Indonesia: IDR 92.35 million
- Singapore: SGD 79,200
- Malaysia: MYR 97,200
- Vietnam: VND 260 million
- Thailand: THB 652,000

Indonesia, Singapore, and Malaysia have per-level cohorts deep enough to break out a compensation range by career level; Vietnam and Thailand's cohorts thin out beyond Senior IC and remain published as distribution charts below.

::chart{id="currency-distribution"}

::pullquote{quote="In much of the region, your next salary is still anchored to your last one."}

::chart{id="salary-sharing-preference"}

Indonesia and Singapore's ranges widen sharply above Senior IC; Malaysia's stay comparatively tight through Lead / Staff / Principal IC, the highest level it can publish.

::chart{id="compensation-trends-by-level"}

::chart{id="compensation-trends-vn"}

::chart{id="compensation-trends-th"}

::chart{id="compensation-mix"}

Variable pay does not grow evenly with seniority:

- Base salary's share dips sharpest at manager level (84.3%), before edging back up for Director/VP
- Stock grants reach their highest share, 4.3%, at head of design
- Bonuses peak earlier, at 11.3% for senior leadership

::chart{id="other-benefits"}

## Full-time versus contractors and freelancers, side by side

Nearly one in five people in the 2024 sample, 18.75% or roughly 337 designers, work as contractors or freelancers rather than employees. Until now their pay sat folded inside the market medians. Here it is on its own.

The comparison only holds within a single market and a single currency, so this reads market by market rather than as one regional number. Contractors and freelancers answered the same base-salary question as everyone else. These figures are their total annual compensation, taken as reported, and that annual total quietly assumes a full year of engagements. For someone who contracts, that assumption rarely holds: the number sits above what a year of uneven projects, unpaid gaps, self-funded healthcare, and the tax an employer would otherwise carry actually leaves in hand. Read it with that gap in mind. Cohorts too small to show safely are held back, and interns (n=35) are excluded from this comparison entirely.

::chart{id="employment-type-comp"}

Contractor and freelancer cohorts in Malaysia, Thailand, Vietnam, Japan, and the Philippines fell below the 10-respondent disclosure threshold and are not broken out here.
