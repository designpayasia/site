/**
 * a11y-charts.mjs — verify every ChartBlock in content has a non-empty summary.
 *
 * This is a pre-build fast-fail that gives a clear, named error for the a11y
 * chart-summary contract. Zod at build time enforces the same constraint, but
 * this step:
 *   - runs before the full Astro build (faster feedback in CI)
 *   - produces a human-readable CI step name ("a11y:charts")
 *   - catches the case where someone bypasses Zod (e.g. type cast, raw loader)
 *
 * Parses YAML front-matter from src/content/reports/*.md and checks every
 * chart block for a non-empty `summary` field.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';

const REPORTS_DIR = resolve('src/content/reports');

/**
 * Minimal YAML extractor for the `charts:` array.
 * We parse the raw front-matter text rather than importing a YAML library to
 * keep this script dependency-free.
 *
 * Strategy: find each `- id:` block inside `charts:` and extract the `summary:`
 * line. This is deliberately narrow — it only reads what we care about.
 */

function extractFrontMatter(text) {
  // YAML front-matter is between the first two `---` lines.
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

/**
 * Extract all chart blocks from YAML front-matter text.
 * Returns array of { id, summary } objects (summary may be undefined if missing).
 */
function extractCharts(yaml) {
  const charts = [];

  // Find the `charts:` key and everything indented under it.
  const chartsMatch = yaml.match(/^charts:\s*\n((?:[ \t]+.*\n?)*)/m);
  if (!chartsMatch) return charts;

  const chartsBlock = chartsMatch[1];

  // Split into individual chart entries (each starts with `  - id:` or `  - `)
  const entries = chartsBlock.split(/\n(?=[ \t]+-[ \t]+id:)/);

  for (const entry of entries) {
    const idMatch = entry.match(/id:\s*(.+)/);
    const summaryMatch = entry.match(/summary:\s*(.+)/);

    if (idMatch) {
      charts.push({
        id: idMatch[1].trim().replace(/^['"]|['"]$/g, ''),
        summary: summaryMatch ? summaryMatch[1].trim().replace(/^['"]|['"]$/g, '') : undefined,
      });
    }
  }

  return charts;
}

const files = (await readdir(REPORTS_DIR))
  .filter((f) => f.endsWith('.md'))
  .map((f) => join(REPORTS_DIR, f));

const violations = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  const rel = relative(process.cwd(), file);
  const yaml = extractFrontMatter(text);
  const charts = extractCharts(yaml);

  for (const chart of charts) {
    if (!chart.summary || chart.summary.length === 0) {
      violations.push(`${rel}: chart "${chart.id}" is missing a non-empty summary`);
    }
  }
}

if (violations.length > 0) {
  console.error('a11y:charts — chart summary violations found:');
  for (const v of violations) {
    console.error(`  ${v}`);
  }
  process.exit(1);
}

const totalCharts = (
  await Promise.all(
    files.map(async (f) => {
      const text = await readFile(f, 'utf8');
      return extractCharts(extractFrontMatter(text)).length;
    }),
  )
).reduce((a, b) => a + b, 0);

console.log(
  `a11y:charts: all ${totalCharts} chart(s) across ${files.length} report(s) have non-empty summaries. ✓`,
);
