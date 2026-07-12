import type { CollectionEntry } from 'astro:content';
import { renderRichTextSegments } from './frontmatter-markdown';

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

  // The `reports` collection globs `*/index.md`. Astro's glob loader treats an
  // `index` file as representing its parent directory, so the resulting entry
  // id is just the directory name (e.g. "2024"), not "2024/index".
  return parts[0];
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

/* ── ::chart directive resolution (Brief A3) ───────────────────────────
   Splits a section's body into ordered prose/chart segments and resolves
   each `::chart{id="…"}` directive against that section's `charts[]`. Every
   chart must be placed by exactly one directive: a directive with no
   matching chart, or a chart never referenced, is a content authoring
   mistake and must fail the build rather than degrade silently (e.g. by
   dropping the directive or appending stray charts at the end). */
export type SectionContentSegment =
  | { type: 'prose'; html: string }
  | { type: 'chart'; chart: ReportChart }
  | { type: 'pullquote'; quote: string; attribution?: string };

export const buildSectionContentSegments = (section: ReportSectionView): SectionContentSegment[] => {
  const segments = renderRichTextSegments(section.body);
  const chartsById = new Map(section.charts.map((chart) => [chart.id, chart]));
  const referencedIds = new Set<string>();
  const result: SectionContentSegment[] = [];

  for (const segment of segments) {
    if (segment.type === 'prose' || segment.type === 'pullquote') {
      result.push(segment);
      continue;
    }

    const chart = chartsById.get(segment.chartId);
    if (!chart) {
      throw new Error(
        `Report section "${section.entryId}" references unknown chart id "${segment.chartId}" in a ::chart directive.`,
      );
    }

    referencedIds.add(chart.id);
    result.push({ type: 'chart', chart });
  }

  const unreferenced = section.charts.filter((chart) => !referencedIds.has(chart.id));
  if (unreferenced.length > 0) {
    throw new Error(
      `Report section "${section.entryId}" declares chart(s) [${unreferenced
        .map((chart) => chart.id)
        .join(', ')}] that are never placed by a ::chart directive in the body.`,
    );
  }

  return result;
};
