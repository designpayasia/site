---
report: '2024'
title: 'Demographics'
summary: 'Age and gender profile of 1,797 surveyed designers across Southeast Asia.'
order: 20
charts:
  - id: 'geo-distribution'
    title: 'Geographic Distribution of Respondents'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Geographic distribution of survey respondents across five Southeast Asian markets."
    summary: "Indonesia dominates at 79%, followed by Singapore (9.7%), Malaysia (5.1%), Vietnam (2.9%), and Thailand (2.4%)."
    evidenceIds: ["evidence:2024-geographic-distribution"]
    columns:
    - 'Country'
    - 'Share'
    bars:
    - label: 'Indonesia'
      value: 79.0
      tone: workhorse
    - label: 'Singapore'
      value: 9.7
      tone: workhorse
    - label: 'Malaysia'
      value: 5.1
      tone: workhorse
    - label: 'Vietnam'
      value: 2.9
      tone: workhorse
    - label: 'Thailand'
      value: 2.4
      tone: workhorse
    fallbackTable:
      columns:
      - 'Country'
      - 'Share'
      rows:
      - label: 'Indonesia'
        value: '79.0%'
      - label: 'Singapore'
        value: '9.7%'
      - label: 'Malaysia'
        value: '5.1%'
      - label: 'Vietnam'
        value: '2.9%'
      - label: 'Thailand'
        value: '2.4%'
  - id: 'city-breakdown'
    title: Country and city breakdown (top 3 cities per country)
    caption: Urban concentration of respondents across key Southeast Asian cities.
    summary: 'Jakarta alone accounts for 48.36% of all respondents (869 of 1,797); capital cities dominate across all markets.'
    evidenceIds: ['evidence:2024-geographic-distribution']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/demographics/02-city-breakdown.png
    fallbackTable:
      columns: [City, Respondents]
      rows:
        - label: Jakarta
          value: '869 (48.36%)'
        - label: Singapore
          value: '174 (9.68%)'
        - label: Kuala Lumpur
          value: '81 (4.51%)'
        - label: Bangkok
          value: '41 (2.28%)'
        - label: Ho Chi Minh City
          value: '26 (1.45%)'
  - id: 'gender-distribution'
    title: 'Gender Distribution by Market'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Gender distribution comparing regional aggregate to Singapore."
    summary: "Singapore shows 65.5% female vs 39.8% regional, with males at 34.5% vs 59.3% regional."
    evidenceIds: ["evidence:2024-demographics-age-gender", "evidence:2024-sg-demographics"]
    columns:
    - 'Gender'
    - 'Share'
    bars:
    - label: 'Female (Regional)'
      value: 39.8
      tone: workhorse
    - label: 'Male (Regional)'
      value: 59.3
      tone: workhorse
    - label: 'Female (Singapore)'
      value: 65.5
      tone: signal
    - label: 'Male (Singapore)'
      value: 34.5
      tone: signal
    fallbackTable:
      columns:
      - 'Gender'
      - 'Share'
      rows:
      - label: 'Female (Regional)'
        value: '39.8%'
      - label: 'Male (Regional)'
        value: '59.3%'
      - label: 'Female (Singapore)'
        value: '65.5%'
      - label: 'Male (Singapore)'
        value: '34.5%'
  - id: 'age-group'
    title: Respondents by age group
    caption: Age distribution across all survey respondents.
    summary: '80.19% of designers are under 30, with the 25–30 bracket accounting for 56.98% of all respondents.'
    evidenceIds: ['evidence:2024-demographics-age-gender']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/demographics/04-age-group.png
    fallbackTable:
      columns: [Age group, Proportion]
      rows:
        - label: 18–24 years
          value: '23.21%'
        - label: 25–30 years
          value: '56.98%'
        - label: 31–35 years
          value: '13.83%'
        - label: 36+ years
          value: '6.04%'
  - id: 'gender-by-age'
    title: Gender distribution by age group
    caption: Cross-analysis of gender and age groups across the full respondent set.
    summary: 'The early-career cohort (18–24) is nearly balanced at 58% male / 42% female, while mid-career brackets show higher male representation.'
    evidenceIds: ['evidence:2024-demographics-age-gender']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/demographics/05-gender-by-age-group.png
    fallbackTable:
      columns: [Age group, Female proportion]
      rows:
        - label: 18–24 (early career)
          value: '~42%'
        - label: 25–30 (prime years)
          value: '~41–37%'
        - label: 36–45 (mid-career)
          value: Lowest female share
keyFindings:
  - 'Young workforce dominance (80% under 35) with strong urban concentration'
  - 'Clear geographic hub pattern centered on Indonesia, Singapore, Malaysia'
  - 'Notable gender distribution showing more balance in early career stages'
commentary: |-
  Most designers work in major tech cities, but we might be missing voices from places like the Philippines and Thailand, perhaps due to language barriers and survey reach.
hubCommentary: |-
  The data shows that the design industry is growing in Southeast Asia, but some countries and smaller cities might not be fully represented. With such a young group of designers, companies have a great opportunity to shape the future of design, but they also need to think about how to best support and grow their talent.
whatThisMeans: |-
  Gender balance varies by country, with Indonesia's large response numbers affecting the overall picture.
  80% of designers are under 35 years old, which is typical for tech but younger than traditional banking.
  Most designers live in cities, but this might change as companies look to reduce costs.
  Singapore remains important as a talent centre despite higher costs, thanks to its strong business environment and education system.
  Indonesia stands out with 79% of responses, showing both its large market size and active design community. There are signs that a portion of Indonesian designers work remotely for international companies.
whatThisMeansIndividuals: |-
  Consider what advantages or challenges you might face in your career based on where you are.
  Think about how your location might affect your job opportunities and pay.
whatThisMeansLeaders: |-
  Consider how you could benefit from hiring people in different locations, especially with remote work becoming common.
  Look at how your team's mix of people compares to the wider market.
  Review if your hiring approach makes the most of talent from different locations and remote workers.
  Plan for managing and developing a younger workforce.
questions:
  - 'How can we better capture design industry data from underrepresented Southeast Asian markets, particularly addressing language and accessibility barriers?'
  - 'What impact will the rise of distributed teams and remote work have on traditional design hubs like Singapore and Jakarta?'
  - 'How is the concentration of young designers (80% under 35) shaping workplace culture and expectations across different Southeast Asian markets?'
  - 'With significant variation in gender representation across countries, what regional and cultural factors are influencing these differences?'
references:
  - label: 'Gender balance varies by country: OECD study on gender equality in Southeast Asia'
    url: 'https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/03/sigi-2024-regional-report-for-southeast-asia_d157077d/7fc15e1c-en.pdf'
  - label: 'Most designers live in cities: ERIA study on digital economy in ASEAN'
    url: 'https://www.eria.org/uploads/media/discussion-papers/FY22/Women-and-Leadership-in-the-ASEAN-Digital-Economy-Mapping-the-Rhetorical-Landscape.pdf'
  - label: 'Singapore remains important as a talent centre: World Investment Report 2024 by UNCTAD'
    url: 'https://unctad.org/system/files/official-document/wir2024_en.pdf'
  - label: 'Rise of distributed teams and remote work: BCG report on closing the gender gap in technology in Southeast Asia'
    url: 'https://www.bcg.com/publications/2024/closing-gender-gap-in-technology-in-southeast-asia'
  - label: 'Impact of young designers on workplace culture: M Moser Associates survey on remote working in Asia'
    url: 'https://www.mmoser.com/ideas/future-of-work-survey/'
  - label: 'Regional and cultural factors influencing gender representation: UN Women and ASEAN Cambodia report on gender equality'
    url: 'https://asiapacific.unwomen.org/sites/default/files/2023-06/asean-re-gender-roadmape6b5.pdf'
---

The 2024 DPA survey captured a predominantly young design workforce. An overwhelming 93.9% of all respondents are aged 35 or under, confirming that Southeast Asia's design industry is driven by early-to-mid career professionals. This demographic concentration has significant implications for career development programmes, mentorship initiatives, and compensation structures tailored to emerging talent.

::chart{id="geo-distribution"}

::chart{id="city-breakdown"}

::chart{id="gender-distribution"}

::chart{id="age-group"}

::chart{id="gender-by-age"}

Gender distribution across the full sample shows 39.8% female and 59.3% male respondents, with a small percentage identifying as non-binary or preferring not to disclose. The gender ratio varies notably by market: Singapore stands out with 65.5% female respondents, significantly higher than the regional average. This may reflect both Singapore's progressive workplace policies and specific outreach to women in design during the survey period.

Regional markets outside Singapore show a more traditional gender split, with male respondents forming the majority. Indonesia, given its dominant share of the sample, largely shapes the regional aggregate. These gender patterns highlight opportunities for targeted initiatives to support women in design across the region, particularly in markets where female representation in the profession remains lower.
