---
report: "2023"
title: Company landscape
summary: Large enterprises and startups are the top employers, hybrid work is
  the new norm, and remote roles command a significant compensation premium.
order: 50
keyFindings:
  - Singapore designers work primarily in large enterprises (32.2%), startups
    (28.5%), and agencies or consulting firms (20.4%) (N=223).
metrics:
  - value: "62.2"
    unit: "%"
    label: work at their company's headquarters
    color: workhorse
    evidenceId: evidence:2023-company-landscape
    sampleSize: 323
    publishMode: published
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
        - Respondents (N=224)
        - Share (%)
      rows:
        - label: Banking & Capital Markets
          values: ["44", "19.6"]
        - label: Consumer Products
          values: ["43", "19.2"]
        - label: Transportation, Hospitality & Services
          values: ["20", "8.9"]
        - label: Government & Public Services
          values: ["18", "8.0"]
        - label: Retail, Wholesale & Distribution
          values: ["11", "4.9"]
        - label: Investment Management
          values: ["11", "4.9"]
        - label: Health Care
          values: ["10", "4.5"]
        - label: Other industries
          values: ["67", "29.9"]
    bars:
      - label: Banking & Capital Markets
        value: 19.6
      - label: Consumer Products
        value: 19.2
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
        - Share (%)
      rows:
        - label: 1-10
          values: ["17", "5.3"]
        - label: 11-50
          values: ["63", "19.5"]
        - label: 51-200
          values: ["66", "20.4"]
        - label: 201-1,000
          values: ["62", "19.2"]
        - label: 1,001-10,000
          values: ["55", "17.0"]
        - label: 10,001+
          values: ["60", "18.6"]
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
            - Share (%)
          rows:
            - label: 1-10
              values: ["13", "5.8"]
            - label: 11-50
              values: ["38", "17.0"]
            - label: 51-200
              values: ["40", "17.9"]
            - label: 201-1,000
              values: ["38", "17.0"]
            - label: 1,001-10,000
              values: ["44", "19.6"]
            - label: 10,001+
              values: ["51", "22.8"]
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
        - Share (%)
      rows:
        - label: Team of 1
          values: ["24", "7.4"]
        - label: 2-10
          values: ["175", "54.2"]
        - label: 11-50
          values: ["89", "27.6"]
        - label: 51-200
          values: ["27", "8.4"]
        - label: 200+
          values: ["8", "2.5"]
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
            - Share (%)
          rows:
            - label: Team of 1
              values: ["16", "7.1"]
            - label: 2-10
              values: ["116", "51.8"]
            - label: 11-50
              values: ["59", "26.3"]
            - label: 51-200
              values: ["25", "11.2"]
            - label: 200+
              values: ["8", "3.6"]
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
        - Share (%)
      rows:
        - label: Yes
          values: ["201", "62.2"]
        - label: No
          values: ["96", "29.7"]
        - label: Not applicable
          values: ["26", "8.0"]
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
            - Share (%)
          rows:
            - label: Yes
              values: ["139", "62.1"]
            - label: No
              values: ["67", "29.9"]
            - label: Not applicable
              values: ["18", "8.0"]
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
        - Share (%)
      rows:
        - label: Hybrid
          values: ["232", "71.8"]
        - label: Remote
          values: ["54", "16.7"]
        - label: In-Office
          values: ["37", "11.5"]
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
            - Share (%)
          rows:
            - label: Hybrid
              values: ["180", "80.4"]
            - label: Remote
              values: ["23", "10.3"]
            - label: In-Office
              values: ["21", "9.4"]
---
## Company type

Large enterprises and startups are Singapore's two biggest draws for design talent, followed by agencies and consulting firms. Government, non-profit, and academic employers remain a small slice of the market by comparison. It is a workforce split mostly between the biggest and the newest companies, with fewer designers at small and mid-sized firms in between.

::chart{id="chart-company-type"}

## Industry distribution

Design work in Singapore is spread across sectors rather than concentrated in one or two. Even its two largest industry cohorts (banking and capital markets, and consumer products) leave more than three in five respondents elsewhere. Pay by industry is a separate question, and only the industries with a large enough published cohort are compared on pay elsewhere in this report.

::chart{id="chart-industry-distribution"}

## Company and team size

::chart{id="company-size"}

Company size is a little larger in Singapore than in the full sample.

::chart{id="design-team-size"}

Most respondents work in design teams of two to ten people. Solo designers and design orgs of 200 or more both sit at the rare end of the scale.

## Local vs international companies

::chart{id="at-company-hq"}

Most designers work at their company's headquarters, which suggests they are largely employed by local or locally headquartered companies. Working at a non-local company carries a pay premium too, with a median 67.1% higher than at local ones.

## Work arrangement

::chart{id="work-arrangement"}

Hybrid was already the default by early 2023, well into the post-pandemic shift toward flexible work. Remote work also carries a premium in the pay data: a fully remote median more than 2.7 times higher than in-office, and nearly double the hybrid median. Much of that gap traces back to who tends to hire remotely: the same global and non-local employers already shown above to pay a premium.

