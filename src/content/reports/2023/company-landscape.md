---
report: "2023"
title: Company landscape
summary: Large enterprises and startups are the top employers, hybrid work is
  the new norm, and remote roles command a significant compensation premium.
order: 50
charts:
  - id: chart-company-type
    type: bar
    title: Company type
    caption: Respondents by organisation type (N=223, Singapore)
    summary: Singapore designers work primarily in large enterprises (32.2%),
      startups (28.5%), and agencies or consulting firms (20.4%). SMEs account
      for around 14%.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing organisation type distribution. Large enterprises
        32.2%, startups 28.5%, agency/consulting 20.4%, SMEs ~14%, government
        3.4%, non-profits 0.9%, academia 0.6%.
    fallbackTable:
      columns:
        - Organisation type
        - Share
      rows:
        - label: Large enterprises
          value: 32.2%
        - label: Startups
          value: 28.5%
        - label: Agency/consulting
          value: 20.4%
        - label: SMEs
          value: ~14%
        - label: Government
          value: 3.4%
        - label: Non-profits
          value: 0.9%
        - label: Academia
          value: 0.6%
    bars:
      - label: Large enterprises
        value: 32.2
        tone: signal
      - label: Startups
        value: 28.5
        tone: workhorse
      - label: Agency/consulting
        value: 20.4
        tone: workhorse
      - label: SMEs
        value: 14
        tone: workhorse
      - label: Government
        value: 3.4
        tone: workhorse
      - label: Non-profits
        value: 0.9
        tone: workhorse
      - label: Academia
        value: 0.6
        tone: workhorse
  - id: chart-industry-distribution
    type: bar
    title: Industry distribution
    caption: Respondents by industry sector (N=224, Singapore). Banking/Capital
      Markets and Consumer Products each account for roughly one in five
      respondents. Industries with fewer than 10 respondents are grouped as
      Other.
    summary: Banking and consumer products dominate. Seven industries meet the
      minimum cohort threshold; all others are grouped.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing industry sector distribution for Singapore
        respondents. Banking/Capital Markets 19.6%, Consumer Products 19.2%,
        Transportation/Hospitality/Services 8.9%, Government/Public Services
        8.0%, Retail/Wholesale/Distribution 4.9%, Investment Management 4.9%,
        Health Care 4.5%, Other industries 29.9%.
    fallbackTable:
      columns:
        - Industry
        - Share (N=224)
      rows:
        - label: Banking & Capital Markets
          value: 44 (19.6%)
        - label: Consumer Products
          value: 43 (19.2%)
        - label: Transportation, Hospitality & Services
          value: 20 (8.9%)
        - label: Government & Public Services
          value: 18 (8.0%)
        - label: Retail, Wholesale & Distribution
          value: 11 (4.9%)
        - label: Investment Management
          value: 11 (4.9%)
        - label: Health Care
          value: 10 (4.5%)
        - label: Other industries
          value: 67 (29.9%)
    bars:
      - label: Banking & Capital Markets
        value: 19.6
        tone: signal
      - label: Consumer Products
        value: 19.2
        tone: signal
      - label: Transportation, Hospitality & Services
        value: 8.9
        tone: workhorse
      - label: Government & Public Services
        value: 8
        tone: workhorse
      - label: Retail, Wholesale & Distribution
        value: 4.9
        tone: workhorse
      - label: Investment Management
        value: 4.9
        tone: workhorse
      - label: Health Care
        value: 4.5
        tone: workhorse
      - label: Other industries
        value: 29.9
        tone: workhorse
  - id: design-team-size
    title: Design team size
    caption: Distribution of design-team size among all respondents (N=323).
    summary: Most respondents work in teams of 2-10 people, with relatively few solo designers or very large teams.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Team of 1
        value: 7.4
      - label: 2-10
        value: 54.2
      - label: 11-50
        value: 27.6
      - label: 51-200
        value: 8.4
      - label: 200+
        value: 2.5
    fallbackTable:
      columns:
        - Team size
        - Respondents
      rows:
        - label: Team of 1
          value: 24 (7.4%)
        - label: 2-10
          value: 175 (54.2%)
        - label: 11-50
          value: 89 (27.6%)
        - label: 51-200
          value: 27 (8.4%)
        - label: 200+
          value: 8 (2.5%)
    defaultSegmentLabel: All markets
    segments:
      - id: singapore
        label: Singapore
        caption: Distribution of design-team size among Singapore respondents (N=224).
        summary: Singapore respondents skew a little more toward larger design teams.
        bars:
          - label: Team of 1
            value: 7.1
          - label: 2-10
            value: 51.8
          - label: 11-50
            value: 26.3
          - label: 51-200
            value: 11.2
          - label: 200+
            value: 3.6
        fallbackTable:
          columns:
            - Team size
            - Respondents
          rows:
            - label: Team of 1
              value: 16 (7.1%)
            - label: 2-10
              value: 116 (51.8%)
            - label: 11-50
              value: 59 (26.3%)
            - label: 51-200
              value: 25 (11.2%)
            - label: 200+
              value: 8 (3.6%)
  - id: company-size
    title: Company size
    caption: Distribution of company size among all respondents (N=323).
    summary: Company size is spread across mid-sized and large firms, with 51-200 employees the largest single bucket.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: 1-10
        value: 5.3
      - label: 11-50
        value: 19.5
      - label: 51-200
        value: 20.4
      - label: 201-1,000
        value: 19.2
      - label: 1,001-10,000
        value: 17.0
      - label: 10,001+
        value: 18.6
    fallbackTable:
      columns:
        - Company size
        - Respondents
      rows:
        - label: 1-10
          value: 17 (5.3%)
        - label: 11-50
          value: 63 (19.5%)
        - label: 51-200
          value: 66 (20.4%)
        - label: 201-1,000
          value: 62 (19.2%)
        - label: 1,001-10,000
          value: 55 (17.0%)
        - label: 10,001+
          value: 60 (18.6%)
    defaultSegmentLabel: All markets
    segments:
      - id: singapore
        label: Singapore
        caption: Distribution of company size among Singapore respondents (N=224).
        summary: Singapore respondents cluster a little more toward larger firms, especially 10,001+ employers.
        bars:
          - label: 1-10
            value: 5.8
          - label: 11-50
            value: 17.0
          - label: 51-200
            value: 17.9
          - label: 201-1,000
            value: 17.0
          - label: 1,001-10,000
            value: 19.6
          - label: 10,001+
            value: 22.8
        fallbackTable:
          columns:
            - Company size
            - Respondents
          rows:
            - label: 1-10
              value: 13 (5.8%)
            - label: 11-50
              value: 38 (17.0%)
            - label: 51-200
              value: 40 (17.9%)
            - label: 201-1,000
              value: 38 (17.0%)
            - label: 1,001-10,000
              value: 44 (19.6%)
            - label: 10,001+
              value: 51 (22.8%)
  - id: at-company-hq
    title: Company headquarters
    caption: Share of respondents physically located at their company's headquarters (N=323).
    summary: About three in five respondents work at their company's headquarters, and Singapore is almost identical.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Yes
        value: 62.2
      - label: No
        value: 29.7
      - label: Not applicable
        value: 8.0
    fallbackTable:
      columns:
        - Response
        - Respondents
      rows:
        - label: Yes
          value: 201 (62.2%)
        - label: No
          value: 96 (29.7%)
        - label: Not applicable
          value: 26 (8.0%)
    defaultSegmentLabel: All markets
    segments:
      - id: singapore
        label: Singapore
        caption: Share of Singapore respondents physically located at their company's headquarters (N=224).
        summary: Singapore is nearly identical to the full sample on this question.
        bars:
          - label: Yes
            value: 62.1
          - label: No
            value: 29.9
          - label: Not applicable
            value: 8.0
        fallbackTable:
          columns:
            - Response
            - Respondents
          rows:
            - label: Yes
              value: 139 (62.1%)
            - label: No
              value: 67 (29.9%)
            - label: Not applicable
              value: 18 (8.0%)
  - id: work-arrangement
    title: Work arrangement
    caption: Share of respondents by working arrangement (N=323).
    summary: Hybrid work is the clear default, ahead of remote and in-office.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Hybrid
        value: 71.8
      - label: Remote
        value: 16.7
      - label: In-Office
        value: 11.5
    fallbackTable:
      columns:
        - Work arrangement
        - Respondents
      rows:
        - label: Hybrid
          value: 232 (71.8%)
        - label: Remote
          value: 54 (16.7%)
        - label: In-Office
          value: 37 (11.5%)
    defaultSegmentLabel: All markets
    segments:
      - id: singapore
        label: Singapore
        caption: Share of Singapore respondents by working arrangement (N=224).
        summary: Singapore respondents are even more hybrid-heavy than the full sample.
        bars:
          - label: Hybrid
            value: 80.4
          - label: Remote
            value: 10.3
          - label: In-Office
            value: 9.4
        fallbackTable:
          columns:
            - Work arrangement
            - Respondents
          rows:
            - label: Hybrid
              value: 180 (80.4%)
            - label: Remote
              value: 23 (10.3%)
            - label: In-Office
              value: 21 (9.4%)
  - id: extra-hours-worked
    title: Extra hours worked
    caption: Distribution of extra hours worked outside regular hours (N=311).
    summary: No extra hours and 1-2 extra hours are the most common responses, with 3-5 and 5+ trailing.
    evidenceIds:
      - evidence:2023-company-landscape
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: "0"
        value: 32.8
      - label: 1-2
        value: 26.9
      - label: 3-5
        value: 20.1
      - label: 5+
        value: 16.4
    fallbackTable:
      columns:
        - Extra hours
        - Respondents
      rows:
        - label: "0"
          value: 106 (32.8%)
        - label: 1-2
          value: 87 (26.9%)
        - label: 3-5
          value: 65 (20.1%)
        - label: 5+
          value: 53 (16.4%)
    defaultSegmentLabel: All markets
    segments:
      - id: singapore
        label: Singapore
        caption: Distribution of extra hours worked outside regular hours among Singapore respondents (N=217).
        summary: Singapore tilts a little more toward 1-2 extra hours.
        bars:
          - label: "0"
            value: 29.9
          - label: 1-2
            value: 29.5
          - label: 3-5
            value: 18.8
          - label: 5+
            value: 18.8
        fallbackTable:
          columns:
            - Extra hours
            - Respondents
          rows:
            - label: "0"
              value: 67 (29.9%)
            - label: 1-2
              value: 66 (29.5%)
            - label: 3-5
              value: 42 (18.8%)
            - label: 5+
              value: 42 (18.8%)

---
## Company type

Large enterprises (multinational corporations) are the top destination at 32.2%, followed closely by startups at 28.5%. Agency and consulting firms account for 20.4%, with SMEs making up the remainder. Government (3.4%), non-profits (0.9%), and academia (0.6%) represent smaller but stable employer categories.

::chart{id="chart-company-type"}

::chart{id="chart-industry-distribution"}

## Industry distribution

Banking and Capital Markets (20.1%) and Consumer Products (19.8%) stand out as the primary magnets for design talent, and the top-paying sectors in the region. Other significant industries include Transportation, Hospitality and Services, Government and Public Services, Investment Management, Retail and Wholesale Distribution, Health Care, and Insurance. Life Sciences pays the highest median salary but has sparse data points; Automotive and Healthcare offer the lowest pay.

## Company and team size

::chart{id="design-team-size"}

Company size is a little larger in Singapore than in the full sample.

::chart{id="company-size"}

Designers are broadly spread across company sizes, with the exception of very small operations (1-10 employees). The most common design team size is 2-10 people (54.2%), followed by 11-50 people (27.6%). Solo designers (team of one) make up 7.4%, while large teams of 200-plus account for just 2.5%. Median pay tends to increase with company size, with a notable 25.5% jump between company sizes of 51-200 and 201-1,000 employees.

## Local vs international companies

::chart{id="at-company-hq"}

The majority of designers (62.2%) work at their company's headquarters, suggesting most are employed by local or locally-headquartered companies. Working at a non-local company offers a 67.1% higher median pay; global companies pay up to 91.5% more for designers without formal design education.

## Work arrangement

::chart{id="work-arrangement"}

::chart{id="extra-hours-worked"}

Hybrid work is the established norm at 71.8% (232 respondents). Fully remote accounts for 16.7% (54), and in-office is a minority at 11.5% (37). This distribution reflects the post-pandemic shift toward flexible working that had already become entrenched by early 2023.

The compensation implications are striking: fully remote roles offer over 2.7x higher median pay than in-office roles and 1.8x higher than hybrid. This premium reflects the access remote work provides to global and non-local employers with higher salary bands.

