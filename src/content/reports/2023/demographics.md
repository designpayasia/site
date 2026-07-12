---
report: "2023"
title: Demographics
summary: A young, diverse workforce concentrated in Singapore, with near-equal
  gender representation and a strong urban skew.
order: 20
charts:
  - id: chart-geographic-distribution
    title: Respondent distribution by country
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
      - label: Indonesia
        value: 8.9
      - label: Philippines
        value: 2.5
      - label: Vietnam
        value: 2.2
      - label: Thailand
        value: 0.9
      - label: Others
        value: 1.9
  - id: chart-gender-distribution
    title: Gender distribution
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
      - label: Non-binary
        value: 0.6
      - label: Prefer not to state
        value: 0.6
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
---

## Geographic distribution

The inaugural 2023 survey reached designers across 10 countries. Three markets formed the core: Singapore at 224 respondents (69.4%), Malaysia at 46 (14.2%), and Indonesia at 29 (8.9%). The Philippines contributed 8 respondents (2.5%), Vietnam 7 (2.2%), Thailand 3 (0.9%), and six others from Taiwan, India, Romania, and Japan. While Singapore represents the majority of responses, the survey also reached neighbouring markets that grew in the years that followed.

::chart{id="chart-geographic-distribution"}

## Gender distribution

The 2023 survey achieved a nearly equal gender split: 54.5% women (176) and 43.9% men (142), with small numbers of non-binary and prefer-not-to-state respondents. This balance was a deliberate outcome of distribution strategy and community partnerships, and proved critical for the gender pay gap analysis.

::chart{id="chart-gender-distribution"}

## Age profile

The workforce skews young. The 25-30 age bracket is the largest at 43%, forming the core of the design workforce. Age distribution across all groups: 18-24 (16.4%), 25-30 (43.0%), 31-35 (25.4%), 36-40 (9.9%), 41-45 (3.1%), 46-50 (1.5%). Across all groups under 35, women outnumbered men. Above 36, the pattern shifts, with men dominating each older bracket: a signal of structural retention challenges that later surveys would examine.

::chart{id="chart-age-distribution"}
