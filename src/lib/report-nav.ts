import type { ReportSectionView } from './report-content';

// Grouped, scannable section list. Mirrors [slug].astro's hoisted grouping
// constants; SENTIMENT_IDS_BY_SLUG and ANALYSIS_IDS_BY_SLUG are year-keyed
// to prevent cross-report bleed.
export const EXCLUDED_IDS = new Set(['executive-summary', 'methodology']);
export const CLOSING_ID = 'closing';

// Both spellings: 2024 uses 'roles-and-experiences' (plural), 2023 'roles-and-experience'.
const LANDSCAPE_IDS = [
  'demographics',
  'roles-and-experiences',
  'roles-and-experience',
  'compensation',
  'company-landscape',
];
const SENTIMENT_IDS_BY_SLUG: Record<string, string[]> = {
  '2024': ['offer-and-negotiation', 'career-progression', 'value-of-design', 'job-market'],
  '2023': ['sentiments-negotiations', 'sentiments-work-setup', 'sentiments-career-progression'],
};
const ANALYSIS_IDS_BY_SLUG: Record<string, string[]> = {
  '2023': ['analysis-gender', 'analysis-experience', 'analysis-company', 'analysis-education'],
};
const ANALYSIS_LABEL = 'Singapore deep dive';

export interface NavGroup {
  key: string;
  label: string;
  sections: ReportSectionView[];
}

export function getSectionGroups(sections: ReportSectionView[], reportSlug: string): NavGroup[] {
  const routable = sections.filter((section) => !EXCLUDED_IDS.has(section.id));

  const landscapeIds = new Set(LANDSCAPE_IDS);
  const sentimentIds = new Set(SENTIMENT_IDS_BY_SLUG[reportSlug] ?? []);
  const analysisIds = new Set(ANALYSIS_IDS_BY_SLUG[reportSlug] ?? []);

  const groups: NavGroup[] = [
    {
      key: 'landscape',
      label: 'Landscape',
      sections: routable.filter((section) => landscapeIds.has(section.id)),
    },
    {
      key: 'sentiments',
      label: 'Sentiments',
      sections: routable.filter((section) => sentimentIds.has(section.id)),
    },
    {
      key: 'analysis',
      label: ANALYSIS_LABEL,
      sections: routable.filter((section) => analysisIds.has(section.id)),
    },
    {
      key: 'other',
      label: 'More',
      sections: routable.filter(
        (section) =>
          section.id !== CLOSING_ID &&
          !landscapeIds.has(section.id) &&
          !sentimentIds.has(section.id) &&
          !analysisIds.has(section.id),
      ),
    },
    {
      key: 'close',
      label: 'Close',
      sections: routable.filter((section) => section.id === CLOSING_ID),
    },
  ];

  return groups.filter((group) => group.sections.length > 0);
}
