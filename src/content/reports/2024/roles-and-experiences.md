---
report: '2024'
title: 'Roles & Experiences'
summary: 'Employment types, design functions, and career levels of respondents.'
order: 30
charts:
  - id: 'job-titles-wordcloud'
    title: Job titles word cloud
    caption: 'Word cloud of job titles across all respondents, illustrating role diversity.'
    summary: 'Designer remains the core identity; Product/UX roles dominate alongside Creative and Leadership titles (Lead, Manager, Director).'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/01-job-titles.png
    fallbackTable:
      columns: [Role cluster, Notes]
      rows:
        - label: Designer (central)
          value: Most common term
        - label: Product/UX design
          value: Primary specialisations
        - label: 'Leadership (Lead, Manager, Director)'
          value: Significant presence
  - id: 'employment-type'
    title: Current employment type
    caption: Breakdown of employment arrangements across all designers surveyed.
    summary: '79.3% of designers are in full-time employment; contractors and freelancers combine for 18.76%.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/02-employment-type.png
    fallbackTable:
      columns: [Employment type, Proportion]
      rows:
        - label: Full-time
          value: '79.3%'
        - label: Fixed-term contractor
          value: '13.75%'
        - label: Self-employed/Freelancer
          value: '5.01%'
        - label: Intern/Apprentice
          value: '1.95%'
  - id: 'career-levels'
    title: 'Career Level Distribution'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Career level distribution comparing regional and Singapore profiles."
    summary: "Mid-level ICs at 42.6% regional vs 32.2% Singapore. Leadership at 5.9% regional vs 11.5% Singapore."
    evidenceIds: ["evidence:2024-roles-experience", "evidence:2024-sg-roles"]
    columns:
    - 'Level'
    - 'Share'
    bars:
    - label: 'Junior'
      value: 21.0
      tone: workhorse
    - label: 'Mid'
      value: 42.6
      tone: workhorse
    - label: 'Senior'
      value: 21.0
      tone: workhorse
    - label: 'Leadership'
      value: 5.9
      tone: workhorse
    - label: 'SG Senior+'
      value: 11.5
      tone: signal
    fallbackTable:
      columns:
      - 'Level'
      - 'Share'
      rows:
      - label: 'Junior'
        value: '21.0%'
      - label: 'Mid'
        value: '42.6%'
      - label: 'Senior'
        value: '21.0%'
      - label: 'Leadership'
        value: '5.9%'
      - label: 'SG Senior+'
        value: '11.5%'
  - id: 'primary-field-of-work'
    title: Primary field of work
    caption: Distribution of primary design specialisation across all respondents.
    summary: 'Digital design accounts for 61.83% (led by Product/UX at 41.74%), while traditional design makes up 22.65% and emerging specialities 8.67%.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/04-primary-field-of-work.png
    fallbackTable:
      columns: [Specialisation, Proportion]
      rows:
        - label: Product/UX design
          value: '41.74%'
        - label: Visual/UI design
          value: '16.86%'
        - label: Marketing/Graphic design
          value: '20.65%'
        - label: Design leadership
          value: '3.67%'
        - label: Other emerging
          value: '~5%'
  - id: 'design-experience-distribution'
    title: Years of relevant design experience
    caption: Distribution of design-specific years of experience across all respondents.
    summary: 'Peak concentration is at 3 years (20.31%), with more than 60% having 1–5 years of design experience; senior designers (10+ years) account for 7.95%.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/05-design-experience-distribution.png
    fallbackTable:
      columns: [Experience band, Proportion]
      rows:
        - label: 1–5 years
          value: '>60%'
        - label: 6–10 years (mid-career)
          value: '12.74%'
        - label: 10+ years (senior)
          value: '7.95%'
        - label: 20+ years (veteran)
          value: '1.62%'
  - id: 'total-working-experience'
    title: Years of total working experience
    caption: Distribution of total working years (across all industries) for all respondents.
    summary: 'Early-career respondents (2–5 years total) are the largest group at 37.37%, but 17.20% have 20+ years of total work experience.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/06-total-working-experience.png
    fallbackTable:
      columns: [Experience band, Proportion]
      rows:
        - label: 0–1 years
          value: '6.52%'
        - label: 2–5 years
          value: '37.37%'
        - label: 6–10 years
          value: '19.37%'
        - label: 11–20 years
          value: '19.54%'
        - label: 20+ years
          value: '17.20%'
  - id: 'experience-correlation'
    title: Total working vs design years of experience
    caption: Scatter or bubble chart correlating total working experience with design-specific experience.
    summary: '68% of respondents have total experience within 2 years of their design experience, indicating design as their primary career; notable outliers have 20+ total years but fewer than 10 in design.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/07-experience-correlation.png
    fallbackTable:
      columns: [Pattern, Value]
      rows:
        - label: Within 2 years of design exp
          value: '68%'
        - label: Largest cluster (total/design)
          value: 3–7 years each
  - id: 'highest-formal-education'
    title: Highest level of formal education attained
    caption: Education level distribution across all respondents.
    summary: '77.46% hold a bachelor''s degree; master''s degrees account for 5.23% and diplomas for 8.40%.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/08-highest-formal-education.png
    fallbackTable:
      columns: [Education level, Proportion]
      rows:
        - label: 'Bachelor''s degree'
          value: '77.46%'
        - label: Diploma
          value: '8.40%'
        - label: 'Master''s degree'
          value: '5.23%'
        - label: High school/Secondary
          value: '7.85%'
  - id: 'design-related-education'
    title: Design-related education (formal or informal)
    caption: Whether respondents have any design-related educational background.
    summary: '65.33% of designers have some design-related education, while 34.67% have no formal design training.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/09-design-related-education.png
    fallbackTable:
      columns: [Education status, Proportion]
      rows:
        - label: Has design-related education
          value: '65.33%'
        - label: No formal design training
          value: '34.67%'
  - id: 'education-types'
    title: Design-related education types
    caption: Distribution of design learning formats among those with design education.
    summary: 'Formal academic education leads at 65.57%, but self-taught/informal courses reach 34.01% and online certifications 32.99%, reflecting a highly mixed learning ecosystem.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/10-design-related-education-types.png
    fallbackTable:
      columns: [Education type, Proportion]
      rows:
        - label: Formal academic
          value: '65.57%'
        - label: Self-taught/Informal
          value: '34.01%'
        - label: Online certifications
          value: '32.99%'
        - label: Bootcamps/Workshops
          value: '32.74%'
        - label: In-person certified courses
          value: '10.07%'
  - id: 'education-cooccurrence'
    title: Co-occurrence of education types (heatmap)
    caption: Heatmap showing how designers combine different learning formats.
    summary: 'Self-taught with online certification (17.21%) and formal education with self-taught (17.12%) are the most common learning combinations.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/11-high-complementary-use-of-multiple-learning-types.png
    fallbackTable:
      columns: [Combination, Co-occurrence]
      rows:
        - label: Self-taught + Online certification
          value: '17.21%'
        - label: Formal + Self-taught
          value: '17.12%'
        - label: Bootcamps + Online certification
          value: '16.52%'
        - label: Formal + Online certification
          value: '15.33%'
  - id: 'overseas-experience'
    title: Overseas working experience
    caption: Share of designers with international versus domestic career experience.
    summary: '85.81% of designers have exclusively domestic careers; only 14.19% have international work experience.'
    evidenceIds: ['evidence:2024-roles-experience']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/roles-and-experiences/12-overseas-working-experience.png
    fallbackTable:
      columns: [Career scope, Proportion]
      rows:
        - label: Domestic career
          value: '85.81%'
        - label: International experience
          value: '14.19%'
keyFindings:
  - 'Digital design roles dominate (61.8%), particularly product/UX design (41.7%)'
  - 'High proportion of mid-level ICs (42.6%) with limited leadership representation (5.9%)'
  - 'Strong formal design education (77.5%), often complemented with self-taught skills'
  - 'Primarily local roles, with limited international exposure (14.19%)'
commentary: |-
  In understanding where design teams stand today, we find that for every design manager there are 16 individual designers. This might suggest we need more design leaders.
  
  Digital design roles (like UX and UI) are nearly three times more common than traditional design roles, though traditional industries are adapting more slowly.
  
  Most designers (77.5 percent) have university degrees, especially important in places like Indonesia where companies often require them. People who switched to design from other fields bring valuable different perspectives.
hubCommentary: |-
  With so many digital design roles and mid-level designers, it seems the industry is growing up. But there aren't as many senior leadership positions or chances to work internationally, which could make it harder for designers to advance their careers and gain global experience.
whatThisMeansIndividuals: |-
  Consider how your previous experience in other fields could make you stand out.
  Look for skills beyond design that could help you advance (like business or technology).
whatThisMeansLeaders: |-
  Think about how your company views and supports design leadership.
  Be ready to show how design adds value to your business, especially when budgets are tight.
  Check if you are helping individual designers become managers and the potential value it could bring.
  Compare how you develop design leaders versus other departments like tech.
questions:
  - 'Why are not we seeing more design leaders in our region?'
  - 'How important are university degrees in different companies and countries?'
  - 'How will budget cuts affect developing future design leaders and career pathways?'
references:
  - label: 'Designer-to-developer ratio: NN Group study'
    url: 'https://www.nngroup.com/articles/ux-developer-ratio/'
  - label: 'Digital design job openings projected to increase by 8% from 2023 to 2033'
    url: 'https://www.nobledesktop.com/careers/digital-designer/job-outlook'
  - label: 'Design is the most popular university subject, but only 25% of graduates become designers'
    url: 'https://www.designweek.co.uk/issues/12-18-february-2018/design-popular-university-choice-graduates-arent-ending-designers/'
  - label: 'Southeast Asian companies with D&I programs are 2.5x more likely to benefit diverse employees'
    url: 'https://www.bcg.com/publications/2020/diversity-dividend-in-southeast-asia'
  - label: 'Only 1 in 3 companies have an equal design leader at the top'
    url: 'https://uxdesign.cc/designer-engagement-report-c44a701d2ef5'
---

Full-time employment dominates the respondent pool at 79.3%, with the remainder composed of freelancers, contractors, and those in part-time or transitional roles. Product design and UX design together account for 41.7% of all design functions represented, underscoring the maturation of digital product design as a distinct profession in Southeast Asia.

::chart{id="job-titles-wordcloud"}

::chart{id="employment-type"}

::chart{id="career-levels"}

::chart{id="primary-field-of-work"}

::chart{id="design-experience-distribution"}

::chart{id="total-working-experience"}

::chart{id="experience-correlation"}

::chart{id="highest-formal-education"}

::chart{id="design-related-education"}

::chart{id="education-types"}

::chart{id="education-cooccurrence"}

::chart{id="overseas-experience"}

Mid-level individual contributors form the largest career cohort at 42.6%, followed by junior designers at 21.0% and senior practitioners at 21.0%. Leadership roles, including heads of design and directors, represent 5.9% of respondents. Singapore shows a higher concentration of senior and leadership roles at approximately 11.5% senior-plus, reflecting its position as a regional hub for more established design practices.

Educational background in design is strong: 65.3% of respondents hold a formal design-related qualification, whether a degree, diploma, or certificate. This high proportion of formally trained designers speaks to the growing maturity of design education infrastructure across the region, though it also raises questions about accessibility for career-switchers and self-taught practitioners.