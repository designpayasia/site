---
report: '2024'
title: 'Compensation'
summary: 'Median annual compensation across five Southeast Asian markets.'
order: 40
charts:
  - id: 'currency-distribution'
    title: Currency distribution for pay
    caption: Breakdown of currencies used to report compensation across 12 currencies.
    summary: '97% of pay is reported in Southeast Asian currencies, dominated by IDR (76.15%), SGD (10.02%), and MYR (5.23%).'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/01-currency-distribution.png
    fallbackTable:
      columns: [Currency, Share of total payments]
      rows:
        - label: IDR (Indonesian Rupiah)
          value: '76.15%'
        - label: SGD (Singapore Dollar)
          value: '10.02%'
        - label: MYR (Malaysian Ringgit)
          value: '5.23%'
        - label: USD
          value: '2.17%'
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
  - id: 'compensation-trends-id'
    title: Annual total compensation by level of seniority in Indonesia
    caption: Box plot of annual compensation (IDR) by seniority level among Indonesian designers.
    summary: 'Indonesian compensation spans 66M IDR (Junior IC) to 256M IDR (Manager), with the widest range at mid-level (4M–768M) and a significant management premium.'
    evidenceIds: ['evidence:2024-median-compensation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/03-compensation-trends-in-indonesia.png
    fallbackTable:
      columns: [Level, Median (IDR)]
      rows:
        - label: Junior IC
          value: 66M
        - label: Mid-level IC
          value: 90M
        - label: Senior IC
          value: 130M
        - label: Lead/Staff IC
          value: 133M
        - label: Manager
          value: 256M
        - label: Head/Senior Leadership
          value: 195M
  - id: 'compensation-trends-sg'
    title: Annual total compensation by level of seniority in Singapore
    caption: Box plot of annual compensation (SGD) by seniority level among Singapore designers.
    summary: 'Singapore shows predictable progression from SGD 60K (Junior IC) to SGD 171K (Head), with dramatic Head-level variance (108K–542K).'
    evidenceIds: ['evidence:2024-sg-compensation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/04-compensation-trends-in-singapore.png
    fallbackTable:
      columns: [Level, Median (SGD)]
      rows:
        - label: Junior IC
          value: 60K
        - label: Mid-level IC
          value: 72K
        - label: Senior IC
          value: 103K
        - label: Lead/Staff
          value: 120K
        - label: Manager
          value: 133K
        - label: Director/VP
          value: 164K
        - label: Head/Senior Leadership
          value: 171K
  - id: 'compensation-trends-my'
    title: Annual total compensation by level of seniority in Malaysia
    caption: Box plot of annual compensation (MYR) by seniority level among Malaysian designers.
    summary: 'Malaysian Director/VP band shows a near 4x range (MYR 240K–950K), the widest in the region at that level.'
    evidenceIds: ['evidence:2024-median-compensation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/05-compensation-trends-in-malaysia.png
    fallbackTable:
      columns: [Level, Median (MYR)]
      rows:
        - label: Junior IC
          value: 42K
        - label: Mid-level IC
          value: 76K
        - label: Senior IC
          value: 108K
        - label: Lead/Staff
          value: 154K
        - label: Manager
          value: 139K
        - label: Director/VP
          value: 353K
        - label: Head/Senior Leadership
          value: 310K
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
    title: 'Base Salary Share by Seniority Level'
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
      tone: signal
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
    caption: Distribution of non-salary benefits offered across Southeast Asian design roles.
    summary: 'Healthcare leads at 52%; combined flexibility benefits (remote + schedule) reach 43%, though equipment and home-office support lags at 10.7%.'
    evidenceIds: ['evidence:2024-currency-compensation-structure']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/compensation/09-other-benefits-breakdown.png
    fallbackTable:
      columns: [Benefit, Proportion]
      rows:
        - label: Healthcare
          value: '52%'
        - label: Remote/schedule flexibility (combined)
          value: '43%'
        - label: Equipment/home-office support
          value: '10.7%'
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

Median annual compensation varies dramatically across the five surveyed markets, reflecting differences in cost of living, market maturity, and demand for design talent. In local currency terms, the medians are: Indonesia at IDR 92.35 million, Singapore at SGD 79,200, Malaysia at MYR 97,200, Vietnam at VND 260 million, and Thailand at THB 652,000.

::chart{id="currency-distribution"}

::chart{id="salary-sharing-preference"}

::chart{id="compensation-trends-id"}

::chart{id="compensation-trends-sg"}

::chart{id="compensation-trends-my"}

::chart{id="compensation-trends-vn"}

::chart{id="compensation-trends-th"}

::chart{id="compensation-mix"}

::chart{id="other-benefits"}

When adjusted for purchasing power parity, Singapore predictably leads, but the gap narrows considerably. Indonesian designers, despite lower nominal salaries, benefit from a rapidly growing tech ecosystem that has driven year-on-year increases. Regional designers in markets like Vietnam and Thailand report the fastest relative growth in compensation, albeit from a lower base.

The survey also reveals significant compensation variation within markets based on company type. Designers at multinational corporations and well-funded startups consistently out-earn peers at local agencies and small businesses. Experience level remains the strongest predictor of compensation, with senior designers earning 2-3x the median of junior practitioners across all markets.

Compensation transparency remains low: fewer than 30% of respondents report that their organisations openly share salary bands or pay ranges. This opacity is a key driver of pay inequity and a recurring theme in qualitative feedback from survey participants.