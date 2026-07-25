import type { CollectionEntry } from 'astro:content';

type ReportEntry = CollectionEntry<'reports'>;
type ContributorsData = CollectionEntry<'contributors'>['data'];

export interface Contributor {
  name: string;
  country: string;
  linkedin: string;
  photo?: string;
  years: number[];
  contribution?: string;
}

interface Sighting {
  linkedin: string;
  sortYear: number;
  name?: string;
  country?: string;
  photo?: string;
  contribution?: string;
  years: number[];
}

function normaliseLinkedIn(url: string): string {
  let value = url.trim().toLowerCase();
  value = value.replace(/^https?:\/\//, '');
  value = value.replace(/^www\./, '');
  value = value.split(/[?#]/)[0];
  value = value.replace(/\/$/, '');
  return value;
}

/**
 * Merges every report's `team[]` with `extras.extras`, deduping by
 * normalised LinkedIn URL. Contributors excluded via `extras.exclude` are
 * dropped entirely. When the same person's fields differ across sightings
 * (report years or extras' declared `years`), the most recent year's values
 * win; `years` itself is the union of every sighting, sorted ascending.
 * Output is sorted by earliest year ascending, then name ascending.
 */
export function collectContributors(
  reports: ReportEntry[],
  extras: ContributorsData,
): Contributor[] {
  const excludeSet = new Set(extras.exclude.map(normaliseLinkedIn));
  const sightingsByKey = new Map<string, Sighting[]>();

  const pushSighting = (linkedin: string, sighting: Omit<Sighting, 'linkedin'>) => {
    const key = normaliseLinkedIn(linkedin);

    if (excludeSet.has(key)) {
      return;
    }

    const list = sightingsByKey.get(key) ?? [];
    list.push({ linkedin, ...sighting });
    sightingsByKey.set(key, list);
  };

  const sortedReports = [...reports].sort((a, b) => a.data.year - b.data.year);

  for (const report of sortedReports) {
    for (const member of report.data.team ?? []) {
      pushSighting(member.linkedin, {
        sortYear: report.data.year,
        name: member.name,
        country: member.country,
        photo: member.photo,
        years: [report.data.year],
      });
    }
  }

  for (const extra of extras.extras) {
    const years = extra.years ?? [];
    const sortYear = years.length > 0 ? Math.max(...years) : -Infinity;

    pushSighting(extra.linkedin, {
      sortYear,
      name: extra.name,
      country: extra.country,
      photo: extra.photo,
      contribution: extra.contribution,
      years,
    });
  }

  const results: Contributor[] = [];

  for (const sightings of sightingsByKey.values()) {
    sightings.sort((a, b) => a.sortYear - b.sortYear);

    const merged: Partial<Contributor> & { linkedin: string } = {
      linkedin: sightings[sightings.length - 1].linkedin,
    };
    const yearsSet = new Set<number>();

    for (const sighting of sightings) {
      if (sighting.name !== undefined) merged.name = sighting.name;
      if (sighting.country !== undefined) merged.country = sighting.country;
      if (sighting.photo !== undefined) merged.photo = sighting.photo;
      if (sighting.contribution !== undefined) merged.contribution = sighting.contribution;

      for (const year of sighting.years) {
        yearsSet.add(year);
      }
    }

    results.push({
      name: merged.name!,
      country: merged.country!,
      linkedin: merged.linkedin,
      photo: merged.photo,
      contribution: merged.contribution,
      years: Array.from(yearsSet).sort((a, b) => a - b),
    });
  }

  return results.sort((a, b) => {
    // Contributors with no recorded year sort to the tail, not the head.
    const aYear = a.years[0] ?? Number.POSITIVE_INFINITY;
    const bYear = b.years[0] ?? Number.POSITIVE_INFINITY;

    if (aYear !== bYear) {
      return aYear - bYear;
    }

    // Within the same first year, whoever has worked on more reports comes first.
    if (a.years.length !== b.years.length) {
      return b.years.length - a.years.length;
    }

    return a.name.localeCompare(b.name);
  });
}

/**
 * Union of every report's `communityPartners[]` plus `extras.supporters`,
 * deduped case-insensitively while preserving the original casing of each
 * name's first occurrence. Output is sorted alphabetically.
 */
export function collectSupporters(reports: ReportEntry[], extras: ContributorsData): string[] {
  const seen = new Map<string, string>();

  const push = (name: string) => {
    const key = name.toLowerCase();

    if (!seen.has(key)) {
      seen.set(key, name);
    }
  };

  const sortedReports = [...reports].sort((a, b) => a.data.year - b.data.year);

  for (const report of sortedReports) {
    for (const partner of report.data.communityPartners ?? []) {
      push(partner);
    }
  }

  for (const supporter of extras.supporters) {
    push(supporter);
  }

  return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
}
