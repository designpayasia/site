---
report: "2023"
title: Demographics
summary: A young, diverse workforce concentrated in Singapore, with near-equal
  gender representation and a strong urban skew.
order: 20
charts:
  - id: chart-geographic-distribution
    title: Respondent Distribution by Country
    caption: Singapore dominates survey participation at 69.4%, followed by Malaysia
      (14.2%) and Indonesia (8.9%). Nine additional countries are represented in
      smaller numbers.
    summary: Geographic concentration of survey respondents, with Singapore as the
      primary market.
    evidenceIds:
      - evidence:2023-survey-overview
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Country
        - Share
      rows:
        - label: Singapore
          value: 224 (69.4%)
        - label: Malaysia
          value: 46 (14.2%)
        - label: Indonesia
          value: 29 (8.9%)
        - label: Philippines
          value: 8 (2.5%)
        - label: Vietnam
          value: 7 (2.2%)
        - label: Thailand
          value: 3 (0.9%)
        - label: Others
          value: 6 (1.9%)
    bars:
      - label: Singapore
        value: 69.4
        tone: workhorse
      - label: Malaysia
        value: 14.2
        tone: signal
      - label: Indonesia
        value: 8.9
        tone: signal
      - label: Philippines
        value: 2.5
        tone: signal
      - label: Vietnam
        value: 2.2
        tone: signal
      - label: Thailand
        value: 0.9
        tone: signal
      - label: Others
        value: 1.9
        tone: signal
  - id: chart-gender-distribution
    title: Gender Distribution
    caption: The 2023 survey achieved a nearly equal gender split, with women at
      54.5% and men at 43.9%. This balance is notably different from later
      surveys.
    summary: Gender distribution of survey respondents showing near-equal
      representation.
    evidenceIds:
      - evidence:2023-survey-overview
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Gender
        - Share
      rows:
        - label: Women
          value: 176 (54.5%)
        - label: Men
          value: 142 (43.9%)
        - label: Non-binary
          value: 2 (0.6%)
        - label: Prefer not to state
          value: 2 (0.6%)
    bars:
      - label: Women
        value: 54.5
        tone: workhorse
      - label: Men
        value: 43.9
        tone: signal
      - label: Non-binary
        value: 0.6
        tone: signal
      - label: Prefer not to state
        value: 0.6
        tone: signal
  - id: chart-age-distribution
    type: bar
    title: Age distribution
    caption: Respondents by age group (N=323, all markets)
    summary: "The 2023 cohort skews young-mid career: 43% are 25–30, with the 31–35
      group second at 25.4%."
    evidenceIds:
      - evidence:2023-survey-overview
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing age group distribution. 25–30 is the largest group at
        43%, followed by 31–35 at 25.4%, 18–24 at 16.4%, 36–40 at 9.9%, 41–45 at
        3.1%, and 46–50 at 1.5%.
    fallbackTable:
      columns:
        - Age group
        - Share
      rows:
        - label: 18–24
          value: 16.4%
        - label: 25–30
          value: 43.0%
        - label: 31–35
          value: 25.4%
        - label: 36–40
          value: 9.9%
        - label: 41–45
          value: 3.1%
        - label: 46–50
          value: 1.5%
    bars:
      - label: 18–24
        value: 16.4
        tone: workhorse
      - label: 25–30
        value: 43
        tone: signal
      - label: 31–35
        value: 25.4
        tone: workhorse
      - label: 36–40
        value: 9.9
        tone: workhorse
      - label: 41–45
        value: 3.1
        tone: workhorse
      - label: 46–50
        value: 1.5
        tone: workhorse
  - id: chart-formal-education
    type: bar
    title: Highest level of formal education
    caption: Respondents by highest formal education level (N=323, all markets).
      Two-thirds hold a bachelor's degree. Master's and diploma holders each
      make up roughly 14–16%.
    summary: "Degree-holders dominate: 66.3% have a bachelor's and 15.5% hold a
      master's. One in seven has a diploma as their highest qualification."
    evidenceIds:
      - evidence:2023-education-analysis
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing highest formal education level. Bachelor's degree
        66.3%, Master's degree 15.5%, Diploma 13.6%, High school/secondary 2.8%,
        Doctoral or higher 0.6%.
    fallbackTable:
      columns:
        - Education level
        - Share (N=323)
      rows:
        - label: Bachelor's degree
          value: 214 (66.3%)
        - label: Master's degree
          value: 50 (15.5%)
        - label: Diploma
          value: 44 (13.6%)
        - label: High school/secondary
          value: 9 (2.8%)
        - label: Doctoral or higher
          value: 2 (0.6%)
    bars:
      - label: Bachelor's degree
        value: 66.3
        tone: signal
      - label: Master's degree
        value: 15.5
        tone: workhorse
      - label: Diploma
        value: 13.6
        tone: workhorse
      - label: High school/secondary
        value: 2.8
        tone: workhorse
      - label: Doctoral or higher
        value: 0.6
        tone: workhorse
  
  - id: chart-design-education-pathways
    title: Design education pathways
    caption: Share of respondents who selected each learning pathway, out of 323 responses.
    summary: Shows the share of respondents selecting each design education pathway in the survey.
    evidenceIds:
      - evidence:2023-survey-overview
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Formal design education
        value: 49.8
        tone: signal
      - label: Online certification
        value: 29.1
        tone: workhorse
      - label: In-person certified courses
        value: 27.9
        tone: workhorse
      - label: Bootcamps
        value: 11.1
        tone: workhorse
      - label: No formal design education
        value: 22.3
        tone: workhorse
    fallbackTable:
      columns:
        - Pathway
        - Count (Percent)
      rows:
        - label: Formal design education
          value: 161 (49.8%)
        - label: Online certification
          value: 94 (29.1%)
        - label: Bootcamps
          value: 90 (27.9%)
        - label: In-person certified courses
          value: 36 (11.1%)
        - label: No formal design education
          value: 72 (22.3%)

  - id: chart-lived-and-worked-abroad
    title: Lived and worked abroad
    caption: Whether respondents had lived and worked outside their home country, out of 323 responses.
    summary: Shows how many respondents said they had lived and worked abroad versus those who had not.
    evidenceIds:
      - evidence:2023-survey-overview
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Yes
        value: 28.5
        tone: signal
      - label: No
        value: 71.5
        tone: workhorse
    fallbackTable:
      columns:
        - Answer
        - Count (Percent)
      rows:
        - label: Yes
          value: 92 (28.5%)
        - label: No
          value: 231 (71.5%)

  - id: chart-design-related-education
    title: Design-related education
    caption: Restored yes/no split for raw column 12 using the original report's intended grouping.
    summary: Restores the chart that failed to render in the original report; any raw column 12 response other than exact "No formal design education" counts as yes.
    evidenceIds:
      - evidence:2023-education-analysis
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: Yes
        value: 81.4
        tone: signal
      - label: No
        value: 18.6
        tone: workhorse
    fallbackTable:
      columns:
        - Answer
        - Count (Percent)
      rows:
        - label: Yes
          value: 263 (81.4%)
        - label: No
          value: 60 (18.6%)
---

## Geographic distribution

The inaugural 2023 survey reached designers across 10 countries. Three markets formed the core: Singapore at 224 respondents (69.4%), Malaysia at 46 (14.2%), and Indonesia at 29 (8.9%). The Philippines contributed 8 respondents (2.5%), Vietnam 7 (2.2%), Thailand 3 (0.9%), and six others from Taiwan, India, Romania, and Japan. While Singapore represents the majority of responses, the survey also reached neighbouring markets that grew in the years that followed.

::chart{id="chart-geographic-distribution"}

::chart{id="chart-gender-distribution"}

::chart{id="chart-age-distribution"}

::chart{id="chart-formal-education"}

The next three charts restore the omitted education and mobility items from the original report.

::chart{id="chart-design-education-pathways"}

::chart{id="chart-lived-and-worked-abroad"}

::chart{id="chart-design-related-education"}

## Age profile

The workforce skews young. The 25-30 age bracket is the largest at 43%, forming the core of the design workforce. Age distribution across all groups: 18-24 (16.4%), 25-30 (43.0%), 31-35 (25.4%), 36-40 (9.9%), 41-45 (3.1%), 46-50 (1.5%). Across all groups under 35, women outnumbered men. Above 36, the pattern shifts, with men dominating each older bracket: a signal of structural retention challenges that later surveys would examine.

## Gender distribution

The 2023 survey achieved a nearly equal gender split: 54.5% women (176) and 43.9% men (142), with small numbers of non-binary and prefer-not-to-state respondents, and one transgender man. This balance was a deliberate outcome of distribution strategy and community partnerships, and proved critical for the gender pay gap analysis.
