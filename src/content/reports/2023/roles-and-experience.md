---
report: "2023"
title: Roles and experience
summary: Product design dominates, individual contributors are the norm, and
  many designers are career switchers with more total work experience than
  design-specific experience.
order: 30
metrics:
  - value: "67.5"
    unit: "%"
    label: work primarily in product design
    color: workhorse
    evidenceId: evidence:2023-roles-experience
    sampleSize: 323
    publishMode: published
  - value: "87"
    unit: "%"
    label: are individual contributors, not managers
    color: workhorse
    evidenceId: evidence:2023-roles-experience
    sampleSize: 323
    publishMode: published
  - value: "6"
    unit: yrs
    label: median total working experience
    color: workhorse
    evidenceId: evidence:2023-roles-experience
    sampleSize: 323
    publishMode: published
  - value: "4"
    unit: yrs
    label: median design-specific experience
    color: signal
    evidenceId: evidence:2023-roles-experience
    sampleSize: 323
    publishMode: published
charts:
  - id: chart-job-title-distribution
    type: bar
    title: Job title distribution
    caption: Respondents by current job title (N=323, all markets). Product Designer
      is the largest named title, with most responses falling into Other.
    summary: "Bar chart showing current job titles among respondents. Product Designer
      is the largest named title, while Other contains most of the remaining responses."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing current job titles among respondents. Product
        Designer is the largest named title, while Other contains most of the remaining
        responses."
    fallbackTable:
      columns:
        - Job title
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: Product Designer
          values: ["33", "10.2"]
        - label: UX Designer
          values: ["25", "7.7"]
        - label: Senior Product Designer
          values: ["18", "5.6"]
        - label: UI/UX Designer
          values: ["18", "5.6"]
        - label: UX Researcher
          values: ["10", "3.1"]
        - label: Product designer
          values: ["9", "2.8"]
        - label: Senior UX Designer
          values: ["9", "2.8"]
        - label: UIUX Designer
          values: ["7", "2.2"]
        - label: Other
          values: ["194", "60.1"]
    bars:
      - label: Product Designer
        value: 10.2
        tone: workhorse
      - label: UX Designer
        value: 7.7
        tone: workhorse
      - label: Senior Product Designer
        value: 5.6
        tone: workhorse
      - label: UI/UX Designer
        value: 5.6
        tone: workhorse
      - label: UX Researcher
        value: 3.1
        tone: workhorse
      - label: Product designer
        value: 2.8
        tone: workhorse
      - label: Senior UX Designer
        value: 2.8
        tone: workhorse
      - label: UIUX Designer
        value: 2.2
        tone: workhorse
      - label: Other
        value: 60.1
  - id: chart-career-level-distribution
    title: Career level distribution
    caption: Individual contributors dominate at 87% of respondents. Junior ICs make
      up the largest segment at 31.3%, with management roles collectively at
      13%.
    summary: Distribution of respondents across career levels, from Junior IC to
      Vice President.
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: 2023 DPA Report
    sourceUrl: https://designpay.asia/reports/2023
    fallbackTable:
      columns:
        - Career Level
        - Respondents
        - Share (%)
      rows:
        - label: Junior IC
          values: ["101", "31.3"]
        - label: Mid-level IC
          values: ["76", "23.5"]
        - label: Senior IC
          values: ["72", "22.3"]
        - label: Lead / Staff / Principal IC
          values: ["32", "9.9"]
        - label: People Manager
          values: ["27", "8.4"]
        - label: Director
          values: ["11", "3.4"]
        - label: VP
          values: ["4", "1.2"]
    bars:
      - label: Junior IC
        value: 31.3
        tone: workhorse
      - label: Mid-level IC
        value: 23.5
        tone: workhorse
      - label: Senior IC
        value: 22.3
        tone: workhorse
      - label: Lead / Staff IC
        value: 9.9
      - label: People Manager
        value: 8.4
      - label: Director
        value: 3.4
      - label: VP
        value: 1.2
  - id: chart-field-of-work
    type: bar
    title: Field of work
    caption: Respondents by primary design discipline (N=323, all markets)
    summary: Product design dominates at 67.5%. Research, design leadership, graphic
      design, content design, and design operations each account for 2–8%.
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: Bar chart showing design discipline breakdown. Product design 67.5%,
        Research 7.4%, Design Leadership 6.8%, Graphic/Marketing 4.6%, Content
        Design 4.0%, Design Operations 2.5%.
    fallbackTable:
      columns:
        - Discipline
        - Share
      rows:
        - label: Product design
          value: 67.5%
        - label: Research
          value: 7.4%
        - label: Design leadership & management
          value: 6.8%
        - label: Graphic/marketing design
          value: 4.6%
        - label: Content design/writing
          value: 4.0%
        - label: Design operations
          value: 2.5%
    bars:
      - label: Product design
        value: 67.5
        tone: signal
      - label: Research
        value: 7.4
        tone: workhorse
      - label: Design leadership
        value: 6.8
        tone: workhorse
      - label: Graphic/marketing design
        value: 4.6
        tone: workhorse
      - label: Content design/writing
        value: 4
        tone: workhorse
      - label: Design operations
        value: 2.5
        tone: workhorse
  - id: chart-yoe-design
    type: bar
    title: Years of design experience
    caption: Respondents by years of design experience (N=323, all markets). Almost
      half have three or fewer years of design experience.
    summary: "The 2023 cohort is experience-young: 47.1% have 0–3 years of design
      experience. Only 15.5% have 10 or more years."
    evidenceIds:
      - evidence:2023-roles-experience
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    accessibility:
      summary: "Bar chart showing years of design experience. 0–3 years: 47.1%, 4–6
        years: 23.2%, 7–9 years: 14.2%, 10+ years: 15.5%."
    fallbackTable:
      columns:
        - Years of design experience
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: 0–3 years
          values: ["152", "47.1"]
        - label: 4–6 years
          values: ["75", "23.2"]
        - label: 7–9 years
          values: ["46", "14.2"]
        - label: 10+ years
          values: ["50", "15.5"]
    bars:
      - label: 0–3 years
        value: 47.1
      - label: 4–6 years
        value: 23.2
        tone: workhorse
      - label: 7–9 years
        value: 14.2
        tone: workhorse
      - label: 10+ years
        value: 15.5
        tone: workhorse
  - id: chart-yoe-vs-total-experience
    type: scatter
    title: Design experience vs total working experience
    caption: "Median design experience is 4 years and median total working
      experience is 6 years, derived from responses (N=323, all markets).
      Each point is one design-experience/total-experience pairing; point
      size shows how many respondents share that exact pairing. The dashed
      diagonal marks where design experience equals total working
      experience, and the dashed guides mark the two medians."
    summary: "Scatter chart plotting years of design experience (vertical
      axis) against years of total working experience (horizontal axis) for
      323 respondents; point size shows how many respondents share each
      pairing. Dashed guide lines mark the medians derived from responses:
      4 years of design experience and 6 years of total working experience.
      Many points sit on or near the diagonal reference line, where design
      experience equals total experience. Below the line, a spread of
      points shows respondents whose total working experience exceeds their
      design experience, consistent with career switchers who bring broader
      work history into design roles."
    evidenceIds:
      - evidence:2023-yoe-scatter-aggregate
    sourceLabel: Design Pay Asia 2023 Survey
    sourceUrl: https://designpay.asia/reports/2023
    plot:
      type: scatter
      xLabel: Total years of experience
      yLabel: Years of design experience
      medianGuides:
        x:
          value: 6
        y:
          value: 4
      points:
        - { x: 3, y: 0, count: 1 }
        - { x: 9, y: 0, count: 1 }
        - { x: 0, y: 1, count: 3 }
        - { x: 1, y: 1, count: 27 }
        - { x: 2, y: 1, count: 15 }
        - { x: 3, y: 1, count: 8 }
        - { x: 4, y: 1, count: 5 }
        - { x: 5, y: 1, count: 4 }
        - { x: 6, y: 1, count: 3 }
        - { x: 7, y: 1, count: 4 }
        - { x: 10, y: 1, count: 3 }
        - { x: 15, y: 1, count: 1 }
        - { x: 20, y: 1, count: 1 }
        - { x: 1, y: 2, count: 1 }
        - { x: 2, y: 2, count: 14 }
        - { x: 3, y: 2, count: 12 }
        - { x: 4, y: 2, count: 3 }
        - { x: 5, y: 2, count: 3 }
        - { x: 6, y: 2, count: 3 }
        - { x: 9, y: 2, count: 2 }
        - { x: 10, y: 2, count: 1 }
        - { x: 12, y: 2, count: 2 }
        - { x: 15, y: 2, count: 1 }
        - { x: 16, y: 2, count: 1 }
        - { x: 20, y: 2, count: 1 }
        - { x: 1, y: 3, count: 1 }
        - { x: 2, y: 3, count: 2 }
        - { x: 3, y: 3, count: 10 }
        - { x: 4, y: 3, count: 5 }
        - { x: 5, y: 3, count: 7 }
        - { x: 6, y: 3, count: 4 }
        - { x: 7, y: 3, count: 1 }
        - { x: 8, y: 3, count: 1 }
        - { x: 12, y: 3, count: 1 }
        - { x: 3, y: 4, count: 1 }
        - { x: 4, y: 4, count: 11 }
        - { x: 5, y: 4, count: 3 }
        - { x: 6, y: 4, count: 4 }
        - { x: 7, y: 4, count: 2 }
        - { x: 8, y: 4, count: 2 }
        - { x: 10, y: 4, count: 4 }
        - { x: 11, y: 4, count: 2 }
        - { x: 15, y: 4, count: 1 }
        - { x: 22, y: 4, count: 1 }
        - { x: 2, y: 5, count: 1 }
        - { x: 5, y: 5, count: 9 }
        - { x: 6, y: 5, count: 7 }
        - { x: 8, y: 5, count: 2 }
        - { x: 9, y: 5, count: 1 }
        - { x: 10, y: 5, count: 3 }
        - { x: 11, y: 5, count: 1 }
        - { x: 14, y: 5, count: 1 }
        - { x: 20, y: 5, count: 1 }
        - { x: 0, y: 6, count: 1 }
        - { x: 2, y: 6, count: 1 }
        - { x: 3, y: 6, count: 1 }
        - { x: 4, y: 6, count: 1 }
        - { x: 6, y: 6, count: 8 }
        - { x: 7, y: 6, count: 3 }
        - { x: 8, y: 6, count: 1 }
        - { x: 12, y: 6, count: 1 }
        - { x: 13, y: 6, count: 1 }
        - { x: 5, y: 7, count: 2 }
        - { x: 7, y: 7, count: 9 }
        - { x: 8, y: 7, count: 1 }
        - { x: 10, y: 7, count: 1 }
        - { x: 12, y: 7, count: 3 }
        - { x: 13, y: 7, count: 1 }
        - { x: 15, y: 7, count: 1 }
        - { x: 19, y: 7, count: 1 }
        - { x: 7, y: 8, count: 1 }
        - { x: 8, y: 8, count: 9 }
        - { x: 9, y: 8, count: 1 }
        - { x: 11, y: 8, count: 2 }
        - { x: 12, y: 8, count: 2 }
        - { x: 15, y: 8, count: 1 }
        - { x: 17, y: 8, count: 1 }
        - { x: 9, y: 9, count: 5 }
        - { x: 10, y: 9, count: 3 }
        - { x: 11, y: 9, count: 1 }
        - { x: 16, y: 9, count: 1 }
        - { x: 7, y: 10, count: 2 }
        - { x: 8, y: 10, count: 1 }
        - { x: 10, y: 10, count: 6 }
        - { x: 12, y: 10, count: 6 }
        - { x: 13, y: 10, count: 2 }
        - { x: 14, y: 10, count: 1 }
        - { x: 15, y: 10, count: 1 }
        - { x: 16, y: 10, count: 1 }
        - { x: 18, y: 10, count: 1 }
        - { x: 4, y: 11, count: 1 }
        - { x: 9, y: 11, count: 1 }
        - { x: 15, y: 11, count: 1 }
        - { x: 10, y: 12, count: 1 }
        - { x: 12, y: 12, count: 1 }
        - { x: 15, y: 12, count: 1 }
        - { x: 16, y: 12, count: 1 }
        - { x: 17, y: 12, count: 1 }
        - { x: 13, y: 13, count: 2 }
        - { x: 14, y: 13, count: 1 }
        - { x: 14, y: 14, count: 3 }
        - { x: 15, y: 15, count: 3 }
        - { x: 18, y: 15, count: 1 }
        - { x: 16, y: 16, count: 1 }
        - { x: 18, y: 16, count: 1 }
        - { x: 17, y: 17, count: 1 }
        - { x: 18, y: 17, count: 2 }
        - { x: 18, y: 18, count: 1 }
        - { x: 20, y: 20, count: 2 }
        - { x: 22, y: 20, count: 1 }
        - { x: 23, y: 20, count: 1 }
        - { x: 25, y: 25, count: 1 }
    fallbackTable:
      columns:
        - Design × total YOE band
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: Design 0–3y / total 0–3y
          values: ["94", "29.1"]
        - label: Design 0–3y / total 4–6y
          values: ["37", "11.5"]
        - label: Design 0–3y / total 7–9y
          values: ["9", "2.8"]
        - label: Design 0–3y / total 10+y
          values: ["12", "3.7"]
        - label: Design 4–6y / total 0–3y
          values: ["5", "1.5"]
        - label: Design 4–6y / total 4–6y
          values: ["43", "13.3"]
        - label: Design 4–6y / total 7–9y
          values: ["11", "3.4"]
        - label: Design 4–6y / total 10+y
          values: ["16", "5.0"]
        - label: Design 7–9y / total 4–6y
          values: ["2", "0.6"]
        - label: Design 7–9y / total 7–9y
          values: ["26", "8.0"]
        - label: Design 7–9y / total 10+y
          values: ["18", "5.6"]
        - label: Design 10+y / total 4–6y
          values: ["1", "0.3"]
        - label: Design 10+y / total 7–9y
          values: ["4", "1.2"]
        - label: Design 10+y / total 10+y
          values: ["45", "13.9"]
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
        - Respondents (N=323)
        - Share (%)
      rows:
        - label: Bachelor's degree
          values: ["214", "66.3"]
        - label: Master's degree
          values: ["50", "15.5"]
        - label: Diploma
          values: ["44", "13.6"]
        - label: High school/secondary
          values: ["9", "2.8"]
        - label: Doctoral or higher
          values: ["2", "0.6"]
    bars:
      - label: Bachelor's degree
        value: 66.3
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
      - label: Online certification
        value: 29.1
        tone: workhorse
      - label: Bootcamps
        value: 27.9
        tone: workhorse
      - label: In-person certified courses
        value: 11.1
        tone: workhorse
      - label: No formal design education
        value: 22.3
        tone: workhorse
    fallbackTable:
      columns:
        - Pathway
        - Count
        - Share (%)
      rows:
        - label: Formal design education
          values: ["161", "49.8"]
        - label: Online certification
          values: ["94", "29.1"]
        - label: Bootcamps
          values: ["90", "27.9"]
        - label: In-person certified courses
          values: ["36", "11.1"]
        - label: No formal design education
          values: ["72", "22.3"]
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
      - label: No
        value: 18.6
        tone: workhorse
    fallbackTable:
      columns:
        - Answer
        - Count
        - Share (%)
      rows:
        - label: Yes
          values: ["263", "81.4"]
        - label: No
          values: ["60", "18.6"]
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
      - label: No
        value: 71.5
        tone: workhorse
    fallbackTable:
      columns:
        - Answer
        - Count
        - Share (%)
      rows:
        - label: Yes
          values: ["92", "28.5"]
        - label: No
          values: ["231", "71.5"]
---

## Job titles

Designers reported a wide variety of titles, but nearly 90% included the word "design." Over half (50.7%) featured "UX" and 25.3% had "UI" in the title. The most common titles were:

- Product Designer: 33
- UX Designer: 25
- UI/UX Designer: 18
- Senior Product Designer: 18

Around 40.8% of job titles indicated some level of seniority, suggesting that formal levelling is common but not universal across the region's design industry.

::chart{id="chart-job-title-distribution"}

## Career level distribution

Individual contributors dominate at 87% of all respondents:

- Junior IC: 101 respondents (31.3%)
- Mid-level IC: 76 (23.5%)
- Senior IC: 72 (22.3%)
- Lead / Staff / Principal IC: 32 (9.9%)

Management roles account for the remaining 13%:

- People Manager: 27 (8.4%)
- Director: 11 (3.4%)
- Vice President: 4 (1.2%)

::chart{id="chart-career-level-distribution"}

## Primary field of work

Respondents by primary field of work:

- Product design: 67.5% (218)
- Research: 7.4% (24)
- Design Leadership and Management: 6.8% (22)
- Graphic and Marketing Design: 4.6% (15)
- Content Design and Writing: 4.0% (13)
- Design Operations: 2.5% (8)

::chart{id="chart-field-of-work"}

## Experience

Nearly half of respondents (47.1%) have three or fewer years of design experience, the single largest bracket in the survey. The published report frames the same skew in self-assessed terms: 48.4% describe their design experience as little to some, and 22.9% specifically put it at one year.

::chart{id="chart-yoe-design"}

The median total working experience, derived from responses, is 6 years, two years higher than the median design experience of 4 years (N=323). Many designers are career switchers who bring broader professional experience into their design roles than their design tenure alone would suggest; the two-year gap between the medians is consistent with that pattern.

::chart{id="chart-yoe-vs-total-experience"}

## Education

The workforce is highly educated:

- Bachelor's degrees: 66.3%
- Master's degrees: 15.5%
- Diplomas: 13.6%

Design education pathways:

- Formal design education: 49.8%
- Online certification: 29.1%
- Bootcamps: 27.9%
- In-person certified courses: 11.1%

Notably, 22.3% have no formal design education at all, demonstrating that design credentials are not a prerequisite for employment in the field.

::chart{id="chart-formal-education"}

Most respondents took a single route into design: 51.4% relied on just one form of design education, while 17.3% combined two different pathways, for example pairing formal study with a bootcamp or certification.

::chart{id="chart-design-education-pathways"}

::chart{id="chart-design-related-education"}

## International experience

28.5% of respondents have lived and worked in another country. This international exposure is one of the strongest compensation predictors: an 85.5% premium over locally-only careers.

::chart{id="chart-lived-and-worked-abroad"}
