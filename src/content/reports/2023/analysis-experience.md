---
report: "2023"
title: "Analysis: experience 🇸🇬"
summary: Reported median total compensation among Singapore survey respondents,
  grouped by seniority, years of design experience, international work
  experience, and negotiation response.
order: 100
charts:
  - id: sg-compensation-seniority
    title: Pay range by seniority
    caption: Reported minimum, median, and maximum total compensation in SGD among Singapore survey respondents in each published seniority subgroup. These are survey figures, not population estimates. Subgroups below n=10 are suppressed.
    summary: Among the published Singapore survey subgroups, reported total compensation ranged from S$12,000 to S$157,000 for Junior IC respondents (median S$54,000), S$34,800 to S$210,000 for Mid-level IC respondents (median S$75,800), S$44,200 to S$339,927 for Senior IC respondents (median S$119,500), S$38,400 to S$201,342 for Lead, Staff, or Principal IC respondents (median S$103,200), and S$37,396 to S$235,000 for People Manager respondents (median S$139,100). These are survey figures, not population estimates.
    evidenceIds:
      - evidence:2023-sg-compensation-seniority
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Subgroup among Singapore survey respondents (n)
        - Reported total compensation (SGD), min – median – max, not a population estimate
      rows:
        - label: Junior IC (n=63)
          value: S$12,000 – S$54,000 – S$157,000
        - label: Mid-level IC (n=56)
          value: S$34,800 – S$75,800 – S$210,000
        - label: Senior IC (n=52)
          value: S$44,200 – S$119,500 – S$339,927
        - label: Lead / Staff / Principal IC (n=19)
          value: S$38,400 – S$103,200 – S$201,342
        - label: People Manager (n=23)
          value: S$37,396 – S$139,100 – S$235,000
    plot:
      type: range
      xLabel: Total compensation (S$)
      valuePrefix: "S$"
      rows:
        - label: Junior IC (n=63)
          min: 12000
          median: 54000
          max: 157000
        - label: Mid-level IC (n=56)
          min: 34800
          median: 75800
          max: 210000
        - label: Senior IC (n=52)
          min: 44200
          median: 119500
          max: 339927
        - label: Lead / Staff / Principal IC (n=19)
          min: 38400
          median: 103200
          max: 201342
        - label: People Manager (n=23)
          min: 37396
          median: 139100
          max: 235000
          tone: signal
  - id: sg-compensation-yoe-group
    title: Pay range by years of design experience
    caption: Reported minimum, median, and maximum total compensation in SGD among Singapore survey respondents, grouped by years of design experience (YOE). These are survey figures, not population estimates.
    summary: Among Singapore survey respondents, reported total compensation ranged from S$12,000 to S$230,636 for 0–3 years of design experience (n=98, median S$62,700), S$35,100 to S$230,000 for 4–6 years (n=55, median S$96,000), S$48,000 to S$208,000 for 7–9 years (n=38, median S$131,650), and S$52,000 to S$355,000 for 10 or more years (n=32, median S$156,100). These are survey figures, not population estimates.
    evidenceIds:
      - evidence:2023-experience-salary
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Years of design experience (n)
        - Reported total compensation (SGD), min – median – max, not a population estimate
      rows:
        - label: 0–3 years (n=98)
          value: S$12,000 – S$62,700 – S$230,636
        - label: 4–6 years (n=55)
          value: S$35,100 – S$96,000 – S$230,000
        - label: 7–9 years (n=38)
          value: S$48,000 – S$131,650 – S$208,000
        - label: 10+ years (n=32)
          value: S$52,000 – S$156,100 – S$355,000
    plot:
      type: range
      xLabel: Total compensation (S$)
      valuePrefix: "S$"
      rows:
        - label: 0–3 years (n=98)
          min: 12000
          median: 62700
          max: 230636
        - label: 4–6 years (n=55)
          min: 35100
          median: 96000
          max: 230000
        - label: 7–9 years (n=38)
          min: 48000
          median: 131650
          max: 208000
        - label: 10+ years (n=32)
          min: 52000
          median: 156100
          max: 355000
      annotations:
        - x: 355000
          y: 10+ years (n=32)
          text: "Widest range: S$52,000–S$355,000"
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
  - id: sg-compensation-negotiation-by-yoe
    title: Median total compensation by negotiation and years of design experience
    caption: Reported median total compensation in SGD among Singapore survey respondents who negotiated their current compensation versus those who did not, grouped by years of design experience (YOE). These survey medians are not population estimates. Per-cell sample sizes for this breakdown are not separately published; only the YOE-band totals shown in the years-of-experience chart above are reported.
    summary: Among Singapore survey respondents grouped by years of design experience, those who negotiated reported lower medians than those who did not in the 0–3 year band (S$56,275 versus S$65,100) and the 4–6 year band (S$72,000 versus S$106,600). The pattern reverses from 7 years of experience onward, where those who negotiated reported higher medians, S$137,500 versus S$112,800 for 7–9 years and S$159,000 versus S$143,500 for 10 or more years.
    evidenceIds:
      - evidence:2023-experience-salary
    sourceLabel: Design Pay Asia 2022-23 survey data
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Years of design experience, negotiation response
        - Reported median total compensation (SGD), not a population estimate
      rows:
        - label: 0–3 years, negotiated
          value: S$56,275
        - label: 0–3 years, did not negotiate
          value: S$65,100
        - label: 4–6 years, negotiated
          value: S$72,000
        - label: 4–6 years, did not negotiate
          value: S$106,600
        - label: 7–9 years, negotiated
          value: S$137,500
        - label: 7–9 years, did not negotiate
          value: S$112,800
        - label: 10+ years, negotiated
          value: S$159,000
        - label: 10+ years, did not negotiate
          value: S$143,500
    bars:
      - label: 0–3 years, negotiated
        value: 35.4
      - label: 0–3 years, did not negotiate
        value: 40.9
      - label: 4–6 years, negotiated
        value: 45.3
      - label: 4–6 years, did not negotiate
        value: 67.0
      - label: 7–9 years, negotiated
        value: 86.5
      - label: 7–9 years, did not negotiate
        value: 70.9
      - label: 10+ years, negotiated
        value: 100
      - label: 10+ years, did not negotiate
        value: 90.3
keyFindings:
  - People Manager respondents recorded the highest reported median total
    compensation among the published seniority cohorts, at S$139,100.
  - Median total compensation rose steadily with years of design experience,
    from S$62,700 at 0–3 years to S$156,100 at 10 or more years.
  - Respondents with international work experience recorded S$130,000, compared
    with S$70,100 among respondents without it.
  - Negotiation-response medians were S$84,500 for Yes, S$84,150 for No, and
    S$85,801 for Not applicable, but that aggregate hides a split by
    experience. A negotiation premium shows up from 7 years of design
    experience onward, not before.
---

## Seniority

The published seniority cohorts have different reported medians. Junior IC respondents recorded S$54,000, while People Manager respondents recorded S$139,100. Senior IC respondents recorded S$119,500, compared with S$103,200 for the smaller Lead / Staff / Principal IC cohort.

The full reported range widens at higher levels. Junior IC responses span S$12,000 to S$157,000, while Senior IC responses span S$44,200 to S$339,927, the highest reported figure among the published cohorts.

These are cross-sectional groups with different roles and respondent profiles, not an individual salary path. Director and Vice President responses are omitted because those cohorts fall below the publication threshold.

::chart{id="sg-compensation-seniority"}

## Years of design experience

Median total compensation rose steadily with years of design experience: S$62,700 at 0–3 years, S$96,000 at 4–6 years, S$131,650 at 7–9 years, and S$156,100 at 10 or more years. Across the whole sample, reported total compensation increased by an average of S$10,839 for every additional year of design experience. That figure is the annualised slope behind the medians below, not a promise of an automatic yearly rise for any individual respondent.

The reported range widens alongside the median. Respondents with 0–3 years of design experience span S$12,000 to S$230,636, while respondents with 10 or more years span S$52,000 to S$355,000, the widest published range in this section.

::chart{id="sg-compensation-yoe-group"}

## International work experience

Respondents who reported international work experience had a median of S$130,000, 85.5% higher than the S$70,100 median among respondents who did not. Part of that gap is experience mix rather than international exposure alone: respondents with international work experience averaged 7.1 years of design experience, against 4.4 years for those without it. This is an unadjusted comparison; seniority, role, company, and other respondent characteristics may also differ between the groups.

::chart{id="sg-compensation-international-experience"}

## Current-compensation negotiation

The three published negotiation-response groups recorded similar medians: S$84,500 for Yes, S$84,150 for No, and S$85,801 for Not applicable. Blank responses are omitted. This is an unadjusted comparison of survey groups.

::chart{id="sg-compensation-negotiation"}

### By years of design experience

That aggregate is nearly flat, but it masks a split by career stage. Below 7 years of design experience, respondents who negotiated reported lower medians than those who did not: S$56,275 versus S$65,100 at 0–3 years, and S$72,000 versus S$106,600 at 4–6 years. From 7 years onward the pattern reverses: S$137,500 versus S$112,800 at 7–9 years, and S$159,000 versus S$143,500 at 10 or more years, a premium of roughly 11–22% for those who negotiated.

Read the early-career figures cautiously. This is a cross-sectional snapshot, not a study of individual outcomes, and selection effects cut both ways. Someone earning less may be more likely to negotiate in the first place, and a small gap at entry level is easily overstated. The impact of negotiating seems more pronounced for respondents with 7 or more years of design experience; it isn't a clean story below that.

::chart{id="sg-compensation-negotiation-by-yoe"}

*Source: Design Pay Asia 2022-23 survey data. Filtered to Singapore respondents paid in SGD (n=223).*
