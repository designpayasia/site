---
report: "2023"
title: "Analysis: experience 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents,
  grouped by seniority, international work experience, and negotiation response.
order: 100
charts:
  - id: sg-compensation-seniority
    title: Median total compensation by seniority
    caption: Reported median total compensation in SGD among Singapore survey respondents in each published seniority subgroup. These survey medians are not population estimates. Subgroups below n=10 are suppressed.
    summary: Among the published Singapore survey subgroups, reported median total compensation was S$54,000 for Junior IC respondents, S$75,800 for Mid-level IC respondents, S$119,500 for Senior IC respondents, S$103,200 for Lead, Staff, or Principal IC respondents, and S$139,100 for People Manager respondents. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-seniority
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-experience/sg-compensation-seniority.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Junior IC (n=63)
          value: S$54,000
        - label: Mid-level IC (n=56)
          value: S$75,800
        - label: Senior IC (n=52)
          value: S$119,500
        - label: Lead / Staff / Principal IC (n=19)
          value: S$103,200
        - label: People Manager (n=23)
          value: S$139,100
  - id: sg-compensation-international-experience
    title: Median total compensation by international work experience
    caption: Reported median total compensation in SGD among Singapore survey respondents, grouped by whether they reported international work experience. These survey medians are not population estimates.
    summary: Singapore survey respondents who reported no international work experience had median total compensation of S$70,100, while respondents who reported international work experience had a median of S$130,000. These are survey medians, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-international-experience
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-experience/sg-compensation-international-experience.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: No international work experience (n=150)
          value: S$70,100
        - label: International work experience (n=73)
          value: S$130,000
  - id: sg-compensation-negotiation
    title: Median total compensation by salary negotiation
    caption: Reported median total compensation in SGD among Singapore survey respondents, grouped by their answer about negotiating current compensation. These survey medians are not population estimates. Blank responses are omitted.
    summary: Reported median total compensation among Singapore survey respondents was S$84,500 for Yes responses, S$84,150 for No responses, and S$85,801 for Not applicable responses. These are survey medians, not population estimates, and blank responses are omitted.
    evidenceIds:
      - evidence:2023-sg-compensation-negotiation
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    pngPath: /charts/2023/analysis-experience/sg-compensation-negotiation.png
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: Yes (n=121)
          value: S$84,500
        - label: No (n=88)
          value: S$84,150
        - label: Not applicable (n=11)
          value: S$85,801
keyFindings:
  - People Manager respondents recorded the highest reported median total
    compensation among the published seniority cohorts, at S$139,100.
  - Respondents with international work experience recorded S$130,000, compared
    with S$70,100 among respondents without it.
  - Negotiation-response medians were S$84,500 for Yes, S$84,150 for No, and
    S$85,801 for Not applicable.
---

## Seniority

The published seniority cohorts have different reported medians. Junior IC respondents recorded S$54,000, while People Manager respondents recorded S$139,100. Senior IC respondents recorded S$119,500, compared with S$103,200 for the smaller Lead / Staff / Principal IC cohort.

These are cross-sectional groups with different roles and respondent profiles, not an individual salary path. Director and Vice President responses are omitted because those cohorts fall below the publication threshold.

::chart{id="sg-compensation-seniority"}

## International work experience

Respondents who reported international work experience had a median of S$130,000. Respondents who did not report it had a median of S$70,100. This is an unadjusted comparison; seniority, role, company, and other respondent characteristics may differ between the groups.

::chart{id="sg-compensation-international-experience"}

## Current-compensation negotiation

The three published negotiation-response groups recorded similar medians: S$84,500 for Yes, S$84,150 for No, and S$85,801 for Not applicable. Blank responses are omitted. This is an unadjusted comparison of survey groups.

::chart{id="sg-compensation-negotiation"}

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
