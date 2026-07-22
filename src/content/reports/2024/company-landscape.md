---
report: '2024'
title: 'Company landscape'
summary: 'Organisation size, work models, and sector distribution.'
order: 50
metrics:
  - value: '30.3'
    unit: '%'
    label: of respondents work at startups
    color: workhorse
    evidenceId: evidence:2024-company-profile
    sampleSize: 1797
    publishMode: published
  - value: '81.9'
    unit: '%'
    label: of design teams have fewer than 10 people
    color: workhorse
    evidenceId: evidence:2024-company-profile
    sampleSize: 1797
    publishMode: published
charts:
  - id: 'company-types'
    title: Company type distribution
    caption: Breakdown of company types employing designers across Southeast Asia.
    summary: 'Startups lead at 30.3%, followed by agencies/consulting (22.7%) and large enterprise (20.8%), with the commercial sector at 89.8% combined.'
    evidenceIds: ['evidence:2024-company-profile']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/company-landscape/01-company-types.png
    fallbackTable:
      columns: [Company type, Respondents (n), Proportion]
      rows:
        - label: Startup
          values: ['544', '30.3%']
        - label: Agency/Consulting
          values: ['407', '22.7%']
        - label: Large enterprise
          values: ['374', '20.8%']
        - label: SME
          values: ['287', '16.0%']
        - label: Public/Education
          values: ['88', '4.9%']
  - id: 'industry-sectors'
    title: Industry distribution
    caption: Sector distribution of design employment across Southeast Asian markets. Based on N=1,797 responses.
    summary: 'Technology & Telecommunications leads at 32.8%, with financial services at 14.8% combined and an 18.1% ''other'' category suggesting emerging sectors.'
    evidenceIds: ['evidence:2024-company-profile']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/company-landscape/02-industry-sectors.png
    fallbackTable:
      columns: [Industry, Proportion]
      rows:
        - label: 'Technology & Telecommunications'
          value: '32.8%'
        - label: Financial Services (combined)
          value: '14.8%'
        - label: Consumer Products
          value: '7.3%'
        - label: Essential Services
          value: '8.3%'
        - label: Other
          value: '18.1%'
  - id: 'design-team-structures'
    title: Mosaic plot of company and design team sizes
    caption: Relationship between company size and design team structure across respondents.
    summary: '81.9% of design teams have fewer than 10 people; small teams (2–10) are most common at 59.3%, regardless of company size.'
    evidenceIds: ['evidence:2024-company-profile']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/company-landscape/03-design-team-structures.png
    fallbackTable:
      columns: [Team size, Respondents (n), Proportion]
      rows:
        - label: Solo designer
          values: ['406', '22.6%']
        - label: Small (2–10 people)
          values: ['1,065', '59.3%']
        - label: Mid-size (11–50)
          values: ['240', '13.7%']
        - label: 'Large (>50)'
          values: ['86', '4.4%']
  - id: 'hq-vs-regional'
    title: Located at company headquarters
    caption: Distribution of designers by office location — headquarters versus satellite or regional offices.
    summary: '60.1% of designers are based at company headquarters, while 29.6% work from satellite or regional offices.'
    evidenceIds: ['evidence:2024-company-profile']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/company-landscape/04-headquarters-vs-regional-structure.png
    fallbackTable:
      columns: [Location type, Respondents (n), Proportion]
      rows:
        - label: Headquarters
          values: ['1,080', '60.1%']
        - label: Satellite/Regional office
          values: ['531', '29.6%']
        - label: Not applicable
          values: ['186', '10.4%']
  - id: 'work-model'
    title: 'Work model distribution'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Work model comparison showing Singapore vs regional preferences."
    summary: "Singapore strongly favours hybrid at 70.1% vs 36.0% regional. Remote is 14.4% SG vs 24.9% regional."
    evidenceIds: ["evidence:2024-company-profile", "evidence:2024-sg-company"]
    columns:
    - 'Model'
    - 'Share'
    bars:
    - label: 'Hybrid (SG)'
      value: 70.1
      tone: workhorse
    - label: 'Hybrid (Regional)'
      value: 36.0
      tone: workhorse
    - label: 'Remote (SG)'
      value: 14.4
      tone: signal
    - label: 'Remote (Regional)'
      value: 24.9
      tone: signal
    - label: 'Onsite (SG)'
      value: 15.5
      tone: workhorse
    - label: 'Onsite (Regional)'
      value: 39.0
      tone: workhorse
    fallbackTable:
      columns:
      - 'Model'
      - 'Respondents (n)'
      - 'Share'
      rows:
      - label: 'Hybrid (SG)'
        values: ['122', '70.1%']
      - label: 'Hybrid (Regional)'
        values: ['645', '36.0%']
      - label: 'Remote (SG)'
        values: ['25', '14.4%']
      - label: 'Remote (Regional)'
        values: ['446', '24.9%']
      - label: 'Onsite (SG)'
        values: ['27', '15.5%']
      - label: 'Onsite (Regional)'
        values: ['706', '39.0%']
keyFindings:
  - 'Emerging hybrid work patterns (36% hybrid, 24.9% fully remote)'
commentary: |-
  How design teams are structured in companies suggests a landscape of lean, distributed teams.
  
  Most design teams (81.9 percent) are small, with fewer than 10 people. This might reflect both deliberate lean structures and the impact of budget cuts.
  
  Most designers (60.9 percent) prefer working remotely or in a hybrid arrangement, even as some companies push for a return to the office. The data shows startups and tech companies leading the field, with agencies close behind.
  Digital companies make up most of our data (63.1%), but we're seeing new ways of working, like part-time design leaders and design agencies offering subscription services.
  Many companies (29.6%) work across different countries, showing both growth and a way to manage costs through remote hiring.
hubCommentary: |-
  Startups, tech companies, and agencies are key players in the design industry, and many designers work in small teams or even on their own. While most still work in offices, we're starting to see a mix of in-office and remote work, suggesting that companies are trying to be flexible and adapt to what works best for their teams.
whatThisMeansIndividuals: |-
  How do you balance being a generalist while keeping your specialist skills sharp?
  Could you benefit from new work models, like being a part-time design leader for multiple companies?
whatThisMeansLeaders: |-
  Check if doing more with less is sustainable — what might suffer?
  How can you keep your team working well together when some are at home and others in the office?
  Are you measuring how smaller teams affect design quality and business results?
  What really drives your decisions about office work — is it what employees want, costs, or office space?
questions:
  - 'Will design teams grow larger like they have in Western countries?'
  - 'How will part-time leadership and subscription services change traditional jobs?'
  - 'What happens when designers become generalists instead of specialists?'
  - 'Who should make sure hybrid work actually works — design teams or someone else?'
references:
  - label: 'Southeast Asian remote-capable employees: 53% expect hybrid, 24% fully remote'
    url: 'https://www.gallup.com/workplace/390632/future-hybrid-work-key-questions-answered-data.aspx'
  - label: '91% of global employees prefer either fully or almost remote work'
    url: 'https://www.statista.com/topics/6565/work-from-home-and-remote-work/'
  - label: 'Hybrid work requires balancing flexibility with strengths-based alignment'
    url: 'https://www.harvardbusiness.org/desigining-hybrid-work/'
  - label: 'Technology industry leads with 67% of employees working primarily remotely'
    url: 'https://www.statista.com/topics/6565/work-from-home-and-remote-work/'
  - label: 'Fractional leadership slower in Asia, expected to grow as startup ecosystem matures'
    url: 'https://www.connectone.com.sg/insights/fractional-leadership-why-is-it-slower-to-take-off-in-asia-and-how-to-tap-into-this-growth-hack'
---

Enterprise organisations employ 32.8% of Singapore-based designers, against 20.8% regionally. Singapore's design workforce sits inside a more established employer base than the rest of the region does.

::chart{id="company-types"}

::chart{id="industry-sectors"}

::pullquote{quote="The field's centre of gravity sits at startups, working for tech."}

::chart{id="design-team-structures"}

::chart{id="hq-vs-regional"}

::chart{id="work-model"}

In Singapore, hybrid is the default. Elsewhere in the region, onsite work still leads by a wide margin, even as employers experiment with flexibility as a hiring lever.

Financial services is where Singapore diverges most sharply from the rest of the region: 26.9% of its designers work in banking, insurance, or financial services, against 14.8% regionally — nearly double, and consistent with the city's role as a financial hub.