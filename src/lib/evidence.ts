import type { CollectionEntry } from 'astro:content';

export const MIN_SAFE_COHORT = 10;

type EvidenceEntry = CollectionEntry<'evidence'>;
type Metric =
  | CollectionEntry<'site'>['data']['stats'][number]
  | CollectionEntry<'reports'>['data']['stats'][number];

export function buildEvidenceMap(entries: EvidenceEntry[]) {
  return new Map(entries.map((entry) => [entry.data.id, entry] as const));
}

export function assertMetricsHaveEvidence(
  metrics: Metric[],
  evidenceMap: Map<string, EvidenceEntry>,
  scope: string,
) {
  for (const metric of metrics) {
    if (!evidenceMap.has(metric.evidenceId)) {
      throw new Error(`Missing evidence entry "${metric.evidenceId}" for ${scope}.`);
    }
  }
}

export function assertEvidenceIdsExist(
  evidenceIds: string[],
  evidenceMap: Map<string, EvidenceEntry>,
  scope: string,
) {
  for (const evidenceId of evidenceIds) {
    if (!evidenceMap.has(evidenceId)) {
      throw new Error(`Missing evidence entry "${evidenceId}" for ${scope}.`);
    }
  }
}

export function getVisibleMetrics<T extends Metric>(metrics: T[]) {
  return metrics.filter((metric) => metric.publishMode !== 'suppressed');
}

export function collectEvidence(metrics: Metric[], evidenceMap: Map<string, EvidenceEntry>) {
  const seen = new Set<string>();
  const entries: EvidenceEntry[] = [];

  for (const metric of metrics) {
    if (seen.has(metric.evidenceId)) {
      continue;
    }

    const evidence = evidenceMap.get(metric.evidenceId);

    if (!evidence) {
      throw new Error(`Missing evidence entry "${metric.evidenceId}".`);
    }

    seen.add(metric.evidenceId);
    entries.push(evidence);
  }

  return entries;
}

export function collectEvidenceByIds(
  evidenceIds: string[],
  evidenceMap: Map<string, EvidenceEntry>,
) {
  const seen = new Set<string>();
  const entries: EvidenceEntry[] = [];

  for (const evidenceId of evidenceIds) {
    if (seen.has(evidenceId)) {
      continue;
    }

    const evidence = evidenceMap.get(evidenceId);

    if (!evidence) {
      throw new Error(`Missing evidence entry "${evidenceId}".`);
    }

    seen.add(evidenceId);
    entries.push(evidence);
  }

  return entries;
}

function normaliseSourcePath(value: string) {
  const pathname = new URL(value, 'https://designpay.asia').pathname.replace(/\/$/, '');

  return pathname || '/';
}

function normaliseSourceHost(value: string) {
  return new URL(value, 'https://designpay.asia').hostname.replace(/^www\./, '');
}

export function isSelfHostedSource(sourceUrl: string | undefined, reportPath: string | undefined) {
  if (!sourceUrl || !reportPath) {
    return false;
  }

  const sourceHost = normaliseSourceHost(sourceUrl);

  if (sourceHost === 'designpay.asia') {
    return true;
  }

  return normaliseSourcePath(sourceUrl) === normaliseSourcePath(reportPath);
}
