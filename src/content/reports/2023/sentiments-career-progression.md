---
report: "2023"
title: "Sentiments: career progression"
summary: Most designers have made career progress, but employer support is
  mixed. Over half are open to new opportunities.
order: 80
keyFindings:
  - Over 50% are open to switching jobs or companies. 21.7% are actively looking.
metrics:
  - value: "53.9"
    unit: "%"
    label: made formal career levelling progress this year
    color: workhorse
    evidenceId: evidence:2023-roles-experience
    sampleSize: 323
    publishMode: published
  - value: "4.54"
    unit: "/7"
    label: company support for career growth (mean)
    color: workhorse
    evidenceId: evidence:2023-sentiments
    sampleSize: 323
    publishMode: published
charts:
  - id: chart-job-levelling-progress-vs-last-year
    type: bar
    title: Job levelling progress vs last year
    caption: Respondents reporting formal job levelling progress vs the previous
      year (N=323, all markets).
    summary: "Bar chart showing whether respondents made formal progress on job levelling
      compared with last year. Just over half answered Yes."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing whether respondents made formal progress on job
        levelling compared with last year. Just over half answered Yes."
    fallbackTable:
      columns:
        - Response
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: Yes
          values: ["174", "53.9"]
        - label: No
          values: ["96", "29.7"]
        - label: N/A
          values: ["53", "16.4"]
    bars:
      - label: Yes
        value: 53.9
        tone: signal
      - label: No
        value: 29.7
        tone: workhorse
      - label: N/A
        value: 16.4
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
        - Respondents (N=216)
        - Share (%)
      rows:
        - label: No increase
          values: ["43", "19.9"]
        - label: 0.1–5%
          values: ["41", "19.0"]
        - label: 6–10%
          values: ["34", "15.7"]
        - label: 11–15%
          values: ["23", "10.6"]
        - label: 16–20%
          values: ["20", "9.3"]
        - label: More than 20%
          values: ["55", "25.5"]
    bars:
      - label: No increase
        value: 19.9
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
  - id: career-progression-support
    title: Career progression support
    caption: Distribution of responses to the career progression support statement
      (N=323) on a 1-7 Likert scale, where 1 - Strongly disagree and 7 - Strongly agree.
    summary: Responses on the 1-7 Likert scale lean positive, led by 5, 4, and 6;
      1 - Strongly disagree and 7 - Strongly agree.
    evidenceIds:
      - evidence:2023-sentiments
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    bars:
      - label: "1 - Strongly disagree"
        value: 3.4
      - label: "2 - Disagree"
        value: 9.0
      - label: "3 - Somewhat disagree"
        value: 11.1
      - label: "4 - Neutral"
        value: 21.4
      - label: "5 - Somewhat agree"
        value: 24.5
      - label: "6 - Agree"
        value: 15.5
      - label: "7 - Strongly agree"
        value: 12.1
    fallbackTable:
      columns:
        - Rating
        - Respondents
        - Share (%)
      rows:
        - label: "1 - Strongly disagree"
          values: ["11", "3.4"]
        - label: "2 - Disagree"
          values: ["29", "9.0"]
        - label: "3 - Somewhat disagree"
          values: ["36", "11.1"]
        - label: "4 - Neutral"
          values: ["69", "21.4"]
        - label: "5 - Somewhat agree"
          values: ["79", "24.5"]
        - label: "6 - Agree"
          values: ["50", "15.5"]
        - label: "7 - Strongly agree"
          values: ["39", "12.1"]
  - id: chart-switch-primary-work-area
    type: bar
    title: Switch primary area of work
    caption: 1-7 Likert response distribution for switching primary area of work in
      the coming year (N=312, mean 4.34), where 1 - Strongly disagree and 7 = Strongly
      agree.
    summary: "Bar chart showing responses about switching primary area of work in
      the coming year. The mean response is 4.34 on a 1-7 Likert scale, where 1 =
      Strongly disagree and 7 - Strongly agree."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    averageLabel: "Mean: 4.34 / 7"
    accessibility:
      summary: "Bar chart showing responses about switching primary area of work in
        the coming year. The mean response is 4.34 on a 1-7 Likert scale, where 1 =
        Strongly disagree and 7 - Strongly agree."
    fallbackTable:
      columns:
        - Response
        - Respondents (N=312)
        - Share (%)
      rows:
        - label: "1 - Strongly disagree"
          values: ["23", "7.4"]
        - label: "2 - Disagree"
          values: ["31", "9.9"]
        - label: "3 - Somewhat disagree"
          values: ["38", "12.2"]
        - label: "4 - Neutral"
          values: ["60", "19.2"]
        - label: "5 - Somewhat agree"
          values: ["74", "23.7"]
        - label: "6 - Agree"
          values: ["56", "17.9"]
        - label: "7 - Strongly agree"
          values: ["30", "9.6"]
    bars:
      - label: "1 - Strongly disagree"
        value: 7.4
        tone: workhorse
      - label: "2 - Disagree"
        value: 9.9
        tone: workhorse
      - label: "3 - Somewhat disagree"
        value: 12.2
        tone: workhorse
      - label: "4 - Neutral"
        value: 19.2
        tone: workhorse
      - label: "5 - Somewhat agree"
        value: 23.7
      - label: "6 - Agree"
        value: 17.9
        tone: workhorse
      - label: "7 - Strongly agree"
        value: 9.6
        tone: workhorse
  - id: chart-switch-ic-management-track
    type: bar
    title: Switch IC-management track
    caption: 1-7 Likert response distribution for switching between IC and management
      track in the coming year (N=309, mean 3.46), where 1 - Strongly disagree and
      7 - Strongly agree.
    summary: "Bar chart showing responses about switching between IC and management
      tracks in the coming year. The mean response is 3.46 on a 1-7 Likert scale,
      where 1 - Strongly disagree and 7 - Strongly agree."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    averageLabel: "Mean: 3.46 / 7"
    accessibility:
      summary: "Bar chart showing responses about switching between IC and management
        tracks in the coming year. The mean response is 3.46 on a 1-7 Likert scale,
        where 1 - Strongly disagree and 7 - Strongly agree."
    fallbackTable:
      columns:
        - Response
        - Respondents (N=309)
        - Share (%)
      rows:
        - label: "1 - Strongly disagree"
          values: ["70", "22.7"]
        - label: "2 - Disagree"
          values: ["40", "12.9"]
        - label: "3 - Somewhat disagree"
          values: ["44", "14.2"]
        - label: "4 - Neutral"
          values: ["60", "19.4"]
        - label: "5 - Somewhat agree"
          values: ["42", "13.6"]
        - label: "6 - Agree"
          values: ["33", "10.7"]
        - label: "7 - Strongly agree"
          values: ["20", "6.5"]
    bars:
      - label: "1 - Strongly disagree"
        value: 22.7
      - label: "2 - Disagree"
        value: 12.9
        tone: workhorse
      - label: "3 - Somewhat disagree"
        value: 14.2
        tone: workhorse
      - label: "4 - Neutral"
        value: 19.4
        tone: workhorse
      - label: "5 - Somewhat agree"
        value: 13.6
        tone: workhorse
      - label: "6 - Agree"
        value: 10.7
        tone: workhorse
      - label: "7 - Strongly agree"
        value: 6.5
        tone: workhorse
  - id: chart-switch-jobs-companies
    type: bar
    title: Switch jobs or companies
    caption: 1-7 Likert response distribution for switching jobs or companies in the
      coming year (N=313, mean 4.34), where 1 - Strongly disagree and 7 = Strongly
      agree.
    summary: "Bar chart showing responses about switching jobs or companies in the
      coming year. The mean response is 4.34 on a 1-7 Likert scale, where 1 = Strongly
      disagree and 7 - Strongly agree."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    averageLabel: "Mean: 4.34 / 7"
    accessibility:
      summary: "Bar chart showing responses about switching jobs or companies in the
        coming year. The mean response is 4.34 on a 1-7 Likert scale, where 1 = Strongly
        disagree and 7 - Strongly agree."
    fallbackTable:
      columns:
        - Response
        - Respondents (N=313)
        - Share (%)
      rows:
        - label: "1 - Strongly disagree"
          values: ["44", "14.1"]
        - label: "2 - Disagree"
          values: ["31", "9.9"]
        - label: "3 - Somewhat disagree"
          values: ["33", "10.5"]
        - label: "4 - Neutral"
          values: ["51", "16.3"]
        - label: "5 - Somewhat agree"
          values: ["42", "13.4"]
        - label: "6 - Agree"
          values: ["44", "14.1"]
        - label: "7 - Strongly agree"
          values: ["68", "21.7"]
    bars:
      - label: "1 - Strongly disagree"
        value: 14.1
        tone: workhorse
      - label: "2 - Disagree"
        value: 9.9
        tone: workhorse
      - label: "3 - Somewhat disagree"
        value: 10.5
        tone: workhorse
      - label: "4 - Neutral"
        value: 16.3
        tone: workhorse
      - label: "5 - Somewhat agree"
        value: 13.4
        tone: workhorse
      - label: "6 - Agree"
        value: 14.1
        tone: workhorse
      - label: "7 - Strongly agree"
        value: 21.7
---

## Career levelling progress

Over half of respondents reported making formal progress on job levelling this year. A substantial minority saw no such progress, and a smaller group were not in a position to answer.

::chart{id="chart-job-levelling-progress-vs-last-year"}

Pay movement over the same period was bimodal rather than evenly spread. A quarter of respondents saw an increase of more than 20%, likely driven by job changes, while nearly as many saw no increase at all, effectively a pay cut once inflation is accounted for.

::chart{id="chart-pay-increase-distribution"}

Read together, the two charts show that career progress and pay growth do not always move in step. Levelling up and a bigger pay cheque overlap for some, but plenty of designers who progressed on paper still saw only modest pay movement.

## Company support for growth

::chart{id="career-progression-support"}

Sentiment around company support for career growth averaged 4.54 out of 7. Just over half (52.1%, ratings 5–7) rated their company supportive, while roughly a quarter (23.5%, ratings 1–3) felt actively unsupported, and the rest sat neutral. That split points to career development investment being inconsistent rather than a company-wide standard.

## Learning and development

Designers showed more appetite for exploring different disciplines and picking up new skills than for switching career tracks entirely. The pattern flips when you look at the full distribution: 51.2% leaned towards exploring a new area of work (ratings 5–7), but for switching tracks entirely, half (49.8%, ratings 1–3) leaned against it, and only 30.8% were open to the idea. Curiosity about new disciplines is common; abandoning a chosen track is not.

::chart{id="chart-switch-primary-work-area"}

::chart{id="chart-switch-ic-management-track"}

## Job search activity

Treating a neutral-or-better response as at least open to a move, 65.5% of respondents (ratings 4 and above) were open to switching jobs or changing companies in the coming year. Narrowed to clear agreement (ratings 5–7), that share drops to 49.2%. The single largest response band on the chart is the top one: 21.7% strongly agreed that they were actively looking.

::chart{id="chart-switch-jobs-companies"}

*Sentiment findings reflect aggregate responses across 10 markets; 69.4% of respondents are Singapore-based.*
