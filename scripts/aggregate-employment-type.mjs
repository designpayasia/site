/**
 * aggregate-employment-type.mjs — cohort-size discovery + quartile stats for
 * the 2024 contractor/freelancer compensation breakout.
 *
 * Usage:
 *   node scripts/aggregate-employment-type.mjs --inspect <csv>
 *   node scripts/aggregate-employment-type.mjs <csv> [--map <map.json>] [--cut overall|by-country|by-seniority]
 *
 * Currency is NEVER mixed: every group is scoped to one market's currency.
 * The comparison value is the precomputed Annual Total Comp column (base plus
 * bonus/13th-month pay), already fully annualised for every pay basis and taken
 * as reported — no x12 is applied. No day or hourly pay bases occur in the 2024 data.
 */
import { readFileSync } from 'node:fs';
import { argv } from 'node:process';

export const MIN_SAFE_COHORT = 10;

/** Minimal RFC-4180-ish CSV parser (handles quoted fields and embedded commas). */
export function parseCsv(text) {
  const rows = [];
  let field = '', record = [], inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { record.push(field); field = ''; }
    else if (c === '\r') { /* skip */ }
    else if (c === '\n') { record.push(field); rows.push(record); field = ''; record = []; }
    else field += c;
  }
  if (field.length > 0 || record.length > 0) { record.push(field); rows.push(record); }
  const header = rows.shift() ?? [];
  return rows
    .filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

function matchValue(raw, groups) {
  const v = String(raw ?? '').trim().toLowerCase();
  for (const [key, aliases] of Object.entries(groups)) {
    if (aliases.some((a) => a.toLowerCase() === v)) return key;
  }
  return null;
}

/** Parses the precomputed Annual Total Comp (col 77) in the row's own currency; already annualised, no x12. */
export function normaliseAnnualEquivalent(value, rawBasis, map) {
  const num = Number(String(value).replace(/[,\s]/g, ''));
  if (!Number.isFinite(num) || num <= 0) return null;
  return num; // Annual Total Comp is already fully annualised (base + bonus/13th month) — passed through unmultiplied; rawBasis/map kept for signature stability only
}

function quantile(sorted, p) {
  if (sorted.length === 0) return 0;
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx), hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo);
}

export function aggregate(rows, map, cut) {
  const col = map.columns;
  const buckets = new Map();
  for (const row of rows) {
    const employmentType = matchValue(row[col.employmentType], map.employmentTypeValues);
    if (!employmentType) continue;
    const market = String(row[col.country] ?? '').trim();
    const currency = String(row[col.compCurrency] ?? '').trim();
    if (!market || !currency) continue;
    const annual = normaliseAnnualEquivalent(row[col.compValue], row[col.compBasis], map);
    if (annual === null) continue; // unparseable comp — skip
    const level = cut === 'by-seniority' ? String(row[col.seniority] ?? '').trim() : null;
    const key = [market, employmentType, level ?? ''].join('||');
    if (!buckets.has(key)) buckets.set(key, { market, employmentType, level, currency, values: [] });
    buckets.get(key).values.push(annual);
  }
  const groups = [...buckets.values()].map((b) => {
    const sorted = [...b.values].sort((x, y) => x - y);
    return {
      market: b.market, employmentType: b.employmentType, level: b.level,
      n: sorted.length, currency: b.currency, basis: 'annual-equivalent',
      min: sorted[0] ?? 0, q1: quantile(sorted, 0.25), median: quantile(sorted, 0.5),
      q3: quantile(sorted, 0.75), max: sorted[sorted.length - 1] ?? 0,
      belowThreshold: sorted.length < MIN_SAFE_COHORT,
    };
  });
  return { cut, groups: groups.sort((a, b) => b.n - a.n) };
}

// ── CLI ──────────────────────────────────────────────────────────────
function main() {
  const args = argv.slice(2);
  if (args.length === 0) { console.error('Usage: node scripts/aggregate-employment-type.mjs [--inspect] <csv> [--map map.json] [--cut ...]'); process.exit(1); }
  const inspect = args.includes('--inspect');
  const mapPath = args.includes('--map') ? args[args.indexOf('--map') + 1] : 'scripts/employment-type.map.json';
  const cut = args.includes('--cut') ? args[args.indexOf('--cut') + 1] : 'by-seniority';
  const csvPath = args.find((a) => !a.startsWith('--') && a !== mapPath && a !== cut);
  const rows = parseCsv(readFileSync(csvPath, 'utf8'));
  if (inspect) {
    console.error(`Header columns (${Object.keys(rows[0] ?? {}).length}):`);
    console.error(Object.keys(rows[0] ?? {}).join('\n'));
    console.error('\nFirst data row:');
    console.error(JSON.stringify(rows[0] ?? {}, null, 2));
    return;
  }
  const map = JSON.parse(readFileSync(mapPath, 'utf8'));
  const all = ['overall', 'by-country', 'by-seniority'].map((c) => aggregate(rows, map, c));
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), cuts: all }, null, 2));
}

if (import.meta.url === `file://${argv[1]}`) main();
