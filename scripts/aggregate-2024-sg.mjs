/**
 * aggregate-2024-sg.mjs — compute the 2024 Singapore deep-dive aggregates
 * (gender pay gap, experience premium, company-type pay) from the raw 2024
 * survey CSV, enforcing the MIN_SAFE_COHORT = 10 publish floor before any
 * value leaves this script.
 *
 * The raw CSV is an EXTERNAL input (contains PII) and is never committed.
 * Usage:
 *   node scripts/aggregate-2024-sg.mjs <path-to-csv> [--min-cohort=10] [--out=tmp/2024-sg-aggregates.json]
 *
 * If the real CSV header names differ, adjust COLUMNS (and, if needed, the
 * normalisers). The CLI prints detected headers and the distinct
 * gender/level/company values it saw, and errors if a mapped column is absent.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export const MIN_SAFE_COHORT = 10;

/** Header names in the raw CSV. Confirm against the real header row.
 *  Comp basis: `Annual Total Comp` is the precomputed local-currency
 *  total-comp column, restricted to rows paid in SGD via the currency
 *  filter in `sgSgdRows` — never `Annual TC USD` — for parity with the
 *  2023 S$-based gap methodology. */
export const COLUMNS = {
  country: 'Country',
  currency: 'Currency you draw your salary in',
  gender: 'Gender',
  comp: 'Annual Total Comp',
  level: 'Level of seniority',
  experience: 'Years of relevant design experience',
  companyType: 'What type of company do you currently work for?',
};

export const LEVEL_ORDER = [
  'Junior IC (Entry level)',
  'Mid-level IC',
  'Senior IC',
  'Lead / Staff / Principal IC',
  'Manager',
  'Director / VP*',
  'Head of department / Senior leadership',
];

/** Minimal RFC-4180-ish CSV parser: handles quoted fields, quoted commas,
 *  escaped double-quotes ("") and CRLF. Returns row objects keyed by header. */
export function parseCsv(text) {
  const rows = [];
  let field = '';
  let record = [];
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') { record.push(field); field = ''; }
    else if (ch === '\r') { /* ignore */ }
    else if (ch === '\n') { record.push(field); rows.push(record); field = ''; record = []; }
    else field += ch;
  }
  if (field.length > 0 || record.length > 0) { record.push(field); rows.push(record); }
  if (rows.length === 0) return [];
  const header = rows[0].map((h) => h.trim());
  return rows.slice(1)
    .filter((r) => r.some((c) => c.trim() !== ''))
    .map((r) => Object.fromEntries(header.map((h, idx) => [h, (r[idx] ?? '').trim()])));
}

export function toNumber(value) {
  const raw = String(value ?? '').trim();
  if (raw === '') return null;
  const n = Number(raw.replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : null;
}

export function median(values) {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return null;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/** Linear-interpolation quantile (p in [0,1]). */
export function quantile(values, p) {
  const s = [...values].sort((a, b) => a - b);
  if (s.length === 0) return null;
  if (s.length === 1) return s[0];
  const idx = (s.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return s[lo];
  return s[lo] + (s[hi] - s[lo]) * (idx - lo);
}

export function experienceBand(years) {
  if (years == null) return null;
  if (years <= 2) return '0–2';
  if (years <= 5) return '3–5';
  if (years <= 10) return '6–10';
  if (years <= 15) return '11–15';
  return '16+';
}

export function groupBy(rows, keyFn) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row);
    if (key == null) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(row);
  }
  return map;
}

/** Women-lower percentage relative to the man median. + = women lower. */
export function womenVsMenPct(manMedian, womanMedian) {
  if (!manMedian) return null;
  return Math.round(((manMedian - womanMedian) / manMedian) * 1000) / 10;
}

function statsFor(values) {
  return {
    n: values.length,
    min: values.length ? Math.min(...values) : null,
    q1: quantile(values, 0.25),
    median: median(values),
    q3: quantile(values, 0.75),
    max: values.length ? Math.max(...values) : null,
  };
}

/** Merge adjacent ordered buckets until each clears minCohort. Input ordered
 *  [{label, values:number[]}]. A trailing bucket that cannot clear the floor is
 *  merged back into the previous bucket; a lone leftover is emitted 'suppressed'. */
export function mergeAdjacent(ordered, minCohort) {
  const out = [];
  let acc = null;
  for (const bucket of ordered) {
    if (!acc) acc = { members: [bucket.label], values: [...bucket.values] };
    else { acc.members.push(bucket.label); acc.values.push(...bucket.values); }
    if (acc.values.length >= minCohort) { out.push(acc); acc = null; }
  }
  if (acc) {
    if (out.length > 0) {
      const last = out[out.length - 1];
      last.members.push(...acc.members);
      last.values.push(...acc.values);
    } else out.push(acc);
  }
  return out.map((b) => ({
    label: b.members.length > 1 ? `${b.members[0]}–${b.members[b.members.length - 1]}` : b.members[0],
    members: b.members,
    status: b.values.length >= minCohort ? (b.members.length > 1 ? 'merged' : 'published') : 'suppressed',
    ...statsFor(b.values),
  }));
}

/** Keep groups >= floor as-is; fold the rest into one 'Other' bucket,
 *  published only if it clears the floor, else suppressed. */
export function bucketWithFloor(entries, minCohort, otherLabel = 'Other') {
  const kept = [];
  const restValues = [];
  const restMembers = [];
  for (const e of entries) {
    if (e.values.length >= minCohort) {
      kept.push({ label: e.label, members: [e.label], status: 'published', ...statsFor(e.values) });
    } else { restValues.push(...e.values); restMembers.push(e.label); }
  }
  if (restMembers.length > 0) {
    kept.push({
      label: otherLabel,
      members: restMembers,
      status: restValues.length >= minCohort ? 'merged' : 'suppressed',
      ...statsFor(restValues),
    });
  }
  return kept;
}

export function normaliseGender(raw) {
  const g = (raw || '').trim().toLowerCase();
  if (['man', 'male', 'm'].includes(g)) return 'Man';
  if (['woman', 'female', 'f'].includes(g)) return 'Woman';
  return 'Other';
}

export function normaliseLevel(raw) {
  const v = (raw || '').trim();
  // Any value not found in LEVEL_ORDER buckets explicitly as 'Unknown' —
  // never silently drops rows or mints a new ad-hoc level label.
  return LEVEL_ORDER.find((l) => l.toLowerCase() === v.toLowerCase()) ?? 'Unknown';
}

function sgSgdRows(rows, C) {
  return rows.filter(
    (r) => (r[C.country] || '').trim().toLowerCase() === 'singapore'
      && (r[C.currency] || '').trim().toUpperCase() === 'SGD'
      && toNumber(r[C.comp]) != null,
  );
}

export function computeGenderGap(rows, C, minCohort) {
  const withGender = rows.map((r) => ({ ...r, _g: normaliseGender(r[C.gender]), _comp: toNumber(r[C.comp]), _level: normaliseLevel(r[C.level]) }));
  const man = withGender.filter((r) => r._g === 'Man').map((r) => r._comp);
  const woman = withGender.filter((r) => r._g === 'Woman').map((r) => r._comp);
  // 'Unknown' is an explicit trailing bucket for levels not in LEVEL_ORDER —
  // rows never get silently dropped from the per-level breakdown.
  const byLevel = [...LEVEL_ORDER, 'Unknown'].map((level) => {
    const atLevel = withGender.filter((r) => r._level === level);
    const mAt = atLevel.filter((r) => r._g === 'Man').map((r) => r._comp);
    const wAt = atLevel.filter((r) => r._g === 'Woman').map((r) => r._comp);
    const published = mAt.length >= minCohort && wAt.length >= minCohort;
    return {
      level,
      manN: mAt.length, manMedian: published ? median(mAt) : null,
      womanN: wAt.length, womanMedian: published ? median(wAt) : null,
      womenVsMenPct: published ? womenVsMenPct(median(mAt), median(wAt)) : null,
      published,
    };
  });
  const unknownLevelN = withGender.filter((r) => r._level === 'Unknown').length;
  const published = man.length >= minCohort && woman.length >= minCohort;
  return {
    man: { n: man.length, median: published ? median(man) : null },
    woman: { n: woman.length, median: published ? median(woman) : null },
    womenVsMenPct: published ? womenVsMenPct(median(man), median(woman)) : null,
    published,
    byLevel,
    unknownLevelN,
  };
}

export function computeExperiencePremium(rows, C, minCohort) {
  const grouped = groupBy(
    rows.map((r) => ({ band: experienceBand(toNumber(r[C.experience])), comp: toNumber(r[C.comp]) }))
        .filter((r) => r.band && r.comp != null),
    (r) => r.band,
  );
  const ordered = ['0–2', '3–5', '6–10', '11–15', '16+']
    .filter((b) => grouped.has(b))
    .map((b) => ({ label: b, values: grouped.get(b).map((r) => r.comp) }));
  const bands = mergeAdjacent(ordered, minCohort);
  // Total rows across bands — smaller than the SGD sample n whenever
  // experience or comp is null; this is the per-cut sampleSize evidence
  // entries should bind to, not the top-level nSgd.
  const n = bands.reduce((sum, b) => sum + b.n, 0);
  return { bands, n };
}

export function computeCompanyPay(rows, C, minCohort) {
  const byType = groupBy(
    rows.map((r) => ({ type: (r[C.companyType] || '').trim() || 'Unknown', comp: toNumber(r[C.comp]) }))
        .filter((r) => r.comp != null),
    (r) => r.type,
  );
  const entries = [...byType.entries()]
    .map(([label, rs]) => ({ label, values: rs.map((r) => r.comp) }))
    .sort((a, b) => b.values.length - a.values.length);
  const types = bucketWithFloor(entries, minCohort, 'Other (merged)');
  // Total rows across types — smaller than the SGD sample n whenever comp
  // is null; this is the per-cut sampleSize evidence entries should bind
  // to, not the top-level nSgd.
  const n = types.reduce((sum, t) => sum + t.n, 0);
  return { types, n };
}

export function sampleComposition(rows, C) {
  const sg = rows.filter((r) => (r[C.country] || '').trim().toLowerCase() === 'singapore');
  const n = sg.length;
  const female = sg.filter((r) => normaliseGender(r[C.gender]) === 'Woman').length;
  const male = sg.filter((r) => normaliseGender(r[C.gender]) === 'Man').length;
  return {
    n,
    nSgd: sgSgdRows(sg, C).length,
    pctFemale: n ? Math.round((female / n) * 1000) / 10 : 0,
    pctMale: n ? Math.round((male / n) * 1000) / 10 : 0,
  };
}

export function regionalSampleComposition(rows, C) {
  const n = rows.length;
  const female = rows.filter((r) => normaliseGender(r[C.gender]) === 'Woman').length;
  const male = rows.filter((r) => normaliseGender(r[C.gender]) === 'Man').length;
  return {
    n,
    pctFemale: n ? Math.round((female / n) * 1000) / 10 : 0,
    pctMale: n ? Math.round((male / n) * 1000) / 10 : 0,
  };
}

export function runAggregation(csvText, { minCohort = MIN_SAFE_COHORT, columns = COLUMNS } = {}) {
  const rows = parseCsv(csvText);
  const C = columns;
  const sg = sgSgdRows(rows, C);
  return {
    generatedAt: new Date().toISOString(),
    minCohort,
    regional: {
      sample: regionalSampleComposition(rows, C),
    },
    singapore: {
      sample: sampleComposition(rows, C),
      genderGap: computeGenderGap(sg, C, minCohort),
      experiencePremium: computeExperiencePremium(sg, C, minCohort),
      companyPay: computeCompanyPay(sg, C, minCohort),
    },
  };
}

function parseArgs(argv) {
  const args = { csv: null, minCohort: MIN_SAFE_COHORT, out: 'tmp/2024-sg-aggregates.json' };
  for (const a of argv) {
    if (a.startsWith('--min-cohort=')) args.minCohort = Number(a.split('=')[1]);
    else if (a.startsWith('--out=')) args.out = a.split('=')[1];
    else if (!a.startsWith('--')) args.csv = a;
  }
  return args;
}

async function main() {
  const { csv, minCohort, out } = parseArgs(process.argv.slice(2));
  if (!csv) {
    console.error('Usage: node scripts/aggregate-2024-sg.mjs <path-to-csv> [--min-cohort=10] [--out=path]');
    process.exit(1);
  }
  const text = await readFile(csv, 'utf8');
  const rows = parseCsv(text);
  const header = Object.keys(rows[0] ?? {});
  for (const [key, name] of Object.entries(COLUMNS)) {
    if (!header.includes(name)) {
      console.error(`Column "${name}" (mapped as ${key}) not found. Detected headers: ${header.join(', ')}`);
      process.exit(1);
    }
  }
  console.error('Detected headers:', header.join(', '));
  console.error('Distinct genders:', [...new Set(rows.map((r) => r[COLUMNS.gender]))].join(', '));
  const distinctLevels = [...new Set(rows.map((r) => r[COLUMNS.level]))];
  console.error('Distinct levels:', distinctLevels.join(', '));
  const unmapped = distinctLevels.filter((v) => !LEVEL_ORDER.some((l) => l.toLowerCase() === (v || '').trim().toLowerCase()));
  if (unmapped.length) {
    console.error('Levels not in LEVEL_ORDER (will bucket as Unknown — reconcile LEVEL_ORDER against these):', unmapped.join(', '));
  }
  console.error('Distinct company types:', [...new Set(rows.map((r) => r[COLUMNS.companyType]))].join(', '));
  const result = runAggregation(text, { minCohort });
  if (result.singapore.genderGap.unknownLevelN > 0) {
    console.error(`\nHard fail: ${result.singapore.genderGap.unknownLevelN} Singapore row(s) have a level value not in LEVEL_ORDER. Reconcile LEVEL_ORDER against the distinct levels printed above and re-run.`);
    process.exit(1);
  }
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify(result, null, 2));
  process.stdout.write(JSON.stringify(result, null, 2) + '\n');
  console.error(`\nWrote ${out}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => { console.error(err); process.exit(1); });
}
