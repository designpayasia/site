---
report: '2024'
title: 'Offer & Negotiation'
summary: 'Negotiation behaviour, confidence, and salary pressure among designers.'
order: 60
charts:
  - id: 'negotiation-landscape'
    title: Negotiation for current total compensation
    caption: Share of designers who actively negotiate their total compensation offer.
    summary: '52.5% of designers negotiate their compensation, and among those who do, 79.5% achieve some increase.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/01-negotiation-landscape.png
    fallbackTable:
      columns: [Category, Proportion]
      rows:
        - label: Negotiate
          value: '52.5%'
        - label: Do not negotiate
          value: '47.5%'
  - id: 'negotiation-by-seniority'
    title: Negotiation for current total compensation by level of seniority
    caption: 'Negotiation rates by career stage, showing the sharp increase from junior to senior levels.'
    summary: 'Senior leadership negotiates at 82.6%, more than double junior designers (39.1%), with mid-level at 53.6%.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/02-career-stage-impact.png
    fallbackTable:
      columns: [Level, Negotiation rate]
      rows:
        - label: Junior
          value: '39.1%'
        - label: Mid-level
          value: '53.6%'
        - label: Senior leadership
          value: '82.6%'
  - id: 'negotiation-outcomes'
    title: 'Negotiation Outcomes'
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    caption: "Distribution of negotiation outcomes."
    summary: "79.5% achieve some increase. Most common: 5-10% (25.6%). Above 20%: 19.8%. No increase: 20.5%."
    evidenceIds: ["evidence:2024-negotiation"]
    columns:
    - 'Outcome'
    - 'Share'
    bars:
    - label: '5-10% increase'
      value: 25.6
      tone: workhorse
    - label: '11-20% increase'
      value: 20.0
      tone: workhorse
    - label: '>20% increase'
      value: 19.8
      tone: signal
    - label: '<5% increase'
      value: 15.0
      tone: workhorse
    - label: 'No increase'
      value: 20.5
      tone: workhorse
    fallbackTable:
      columns:
      - 'Outcome'
      - 'Share'
      rows:
      - label: '5-10% increase'
        value: '25.6%'
      - label: '11-20% increase'
        value: '20.0%'
      - label: '>20% increase'
        value: '19.8%'
      - label: '<5% increase'
        value: '15.0%'
      - label: 'No increase'
        value: '20.5%'
  - id: 'negotiation-confidence'
    title: I feel confident in my compensation negotiation skills
    caption: Distribution of negotiation confidence levels (1–7 scale) across all designers.
    summary: '65.9% of designers rate their negotiation confidence at 4 or above, but high confidence (6–7) is reported by only 22.2%.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/04-negotiation-confidence.png
    fallbackTable:
      columns: [Confidence level, Proportion]
      rows:
        - label: High confidence (6–7)
          value: '22.2%'
        - label: Moderate confidence (4–5)
          value: '43.7%'
        - label: Low confidence (1–3)
          value: '34.1%'
  - id: 'past-salary-disclosure'
    title: Asked to provide salary information before offer
    caption: Share of employers requiring past salary disclosure before making an offer.
    summary: '58.1% of employers still require past salary disclosure before an offer, a practice that persists despite growing pushback.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/05-past-salary-information.png
    fallbackTable:
      columns: [Employer requirement, Proportion]
      rows:
        - label: Required disclosure
          value: '58.1%'
        - label: No requirement
          value: '41.9%'
  - id: 'salary-disclosure-pressure'
    title: I felt pressured to provide my past salary information to progress forward when interviewing
    caption: Perceived pressure level to disclose salary history during the interview process.
    summary: '70.3% of designers report moderate to high pressure (ratings 4–7) to disclose their salary history in order to progress.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/06-successfully-declining-remains-challenging.png
    fallbackTable:
      columns: [Pressure level, Proportion]
      rows:
        - label: Moderate to high pressure (4–7)
          value: '70.3%'
        - label: Low pressure (1–3)
          value: '29.7%'
  - id: 'salary-decline-outcomes'
    title: Instances of declining to provide past salary information
    caption: Outcomes for designers who attempted to decline salary disclosure.
    summary: 'Among the 44.4% who tried to decline salary disclosure, only 8.8% consistently succeeded — 55.6% were never able to decline.'
    evidenceIds: ['evidence:2024-negotiation']
    sourceLabel: '2024 DPA Report'
    sourceUrl: 'https://designpay.asia/reports/2024'
    pngPath: /charts/2024/offer-and-negotiation/07-alt.png
    fallbackTable:
      columns: [Outcome, Proportion]
      rows:
        - label: Never able to decline
          value: '55.6%'
        - label: Sometimes successful
          value: '35.6%'
        - label: Always successful
          value: '8.8%'
keyFindings:
  - '52.5% of designers actively negotiate compensation'
  - 'Senior leaders 2.1x more likely to negotiate than junior designers'
  - 'Successful negotiations typically result in 5-10% increases'
  - 'Salary history disclosure remains a persistent challenge'
commentary: |-
  When it comes to understanding job offers and pay conversations, the data reveals a negotiation gap.
  
  While 79.5 percent of designers who negotiate succeed in getting a better offer, only 52.5 percent try to negotiate. This suggests barriers that go beyond confidence alone.
  
  Many companies still default to 'previous salary plus 20 percent' instead of using clear, published pay ranges, especially outside Singapore. Salary history disclosure remains a persistent challenge for designers across the region.
  Cultural factors (like avoiding conflict) and personal situations (like visa status) might affect whether people feel they can negotiate.
  More people are becoming aware of market pay rates through shared data, though some companies resist this transparency.
hubCommentary: |-
  Negotiating pay is important for designers, and it seems to pay off, with successful negotiations often leading to decent pay bumps. However, many companies still ask for salary history, which can be tricky for designers to navigate. This suggests that companies might need to rethink their approach to hiring and compensation to be more transparent and fair.
whatThisMeansIndividuals: |-
  Use market data and community knowledge to build confidence in pay discussions.
  Find ways to discuss pay that feel comfortable with your cultural values.
whatThisMeansLeaders: |-
  Consider how your pay practices work for people from different cultural backgrounds.
  Think about how to help team members feel comfortable discussing pay.
  Consider how unclear pay ranges might affect hiring and keeping good designers.
  Weigh the costs of keeping things as they are versus being more open about pay.
questions:
  - 'How will more open discussions about pay affect the previous salary plus 20 percent practice?'
  - 'What should companies do to make pay talks easier for everyone?'
  - 'How can we respect cultural differences while ensuring fair pay?'
  - 'Will budget cuts make pay differences bigger or smaller?'
references:
  - label: 'Indonesia maintains traditional approach to salary disclosure'
    url: 'https://www.michaelpage.co.id/advice/management-advice/reward-and-remuneration/salary-transparency-workplace-inequality'
  - label: 'East/Southeast Asian employees less likely to negotiate salaries due to cultural factors'
    url: 'https://pubmed.ncbi.nlm.nih.gov/35511532/'
  - label: '84% of Asian firms limit pay transparency to internal audiences'
    url: 'https://www.cnbc.com/2024/07/25/young-people-in-asia-push-for-salary-transparency-online.html'
  - label: 'Singapore leading ASEAN in pay transparency initiatives'
    url: 'https://www.campaignasia.com/article/pay-equity-and-transparency-gaining-momentum-in-asia/495374'
  - label: 'Pay transparency policies shown to reduce gender pay gaps'
    url: 'https://oxfordre.com/economics/abstract/10.1093/acrefore/9780190625979.001.0001/acrefore-9780190625979-e-860'
---

Just over half of designers, 52.5%, actively negotiate their compensation when receiving a job offer. This rate varies by gender, with male designers more likely to negotiate than female designers, though the gap has narrowed since previous survey years. Confidence plays a decisive role: 74.0% of respondents rate their negotiation confidence at 4 or above on a 7-point scale.

::chart{id="negotiation-landscape"}

::chart{id="negotiation-by-seniority"}

::chart{id="negotiation-outcomes"}

::chart{id="negotiation-confidence"}

::chart{id="past-salary-disclosure"}

::chart{id="salary-disclosure-pressure"}

::chart{id="salary-decline-outcomes"}

Among those who negotiate, outcomes are meaningful: 25.6% secure a 5-10% increase, 20.0% achieve an 11-20% increase, and another 19.8% report increases exceeding 20%. However, 15.0% see minimal gains under 5%, and 20.5% report no increase at all despite negotiating. These figures underscore both the value of negotiation and its inconsistent returns.

Salary pressure is a growing concern: 52.2% of respondents report feeling pressure to accept compensation below their expectations, driven by market conditions, employer leverage, and the competitive job landscape. This pressure is most acute among junior designers and those in markets with fewer alternative opportunities.