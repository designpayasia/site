import type { CollectionEntry } from 'astro:content';

export type ReportEntry = CollectionEntry<'reports'>;
export type ReportSectionEntry = CollectionEntry<'reportSections'>;
type ReportChart = ReportSectionEntry['data']['charts'][number];
export type ReportSectionView = ReportSectionEntry['data'] & {
  id: string;
  entryId: string;
  reportId: string;
  body: string;
};

export const getReportSlug = (report: ReportEntry) => report.data.slug ?? report.id;

export const getSectionSlugFromId = (sectionId: string) => {
  const parts = sectionId.split('/');
  return parts[parts.length - 1] ?? sectionId;
};

export const getReportIdFromSectionId = (sectionId: string) => {
  const parts = sectionId.split('/');
  if (parts.length < 2) {
    throw new Error(`Invalid report section id "${sectionId}". Expected "report-slug/section-slug".`);
  }

  return `${parts[0]}/index`;
};

export const normalizeReportSection = (section: ReportSectionEntry): ReportSectionView => ({
  ...section.data,
  id: getSectionSlugFromId(section.id),
  entryId: section.id,
  reportId: getReportIdFromSectionId(section.id),
  body: section.body ?? '',
});

export const sortReportSections = (sections: ReportSectionEntry[]) =>
  [...sections].sort(
    (left, right) =>
      left.data.order - right.data.order ||
      getSectionSlugFromId(left.id).localeCompare(getSectionSlugFromId(right.id)),
  );

export const getSectionsForReport = (report: ReportEntry, sections: ReportSectionEntry[]) =>
  sortReportSections(sections)
    .filter((section) => getReportIdFromSectionId(section.id) === report.id)
    .map(normalizeReportSection);
