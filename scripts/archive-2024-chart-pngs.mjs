import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = '/Volumes/Workspace/obsidian-vault/workbench/dpa/staging/2024';
const OUTPUT_DIR = 'public/charts/2024';
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

const SECTION_BY_FILE = {
  '10-2024-career-progression.md': 'career-progression',
  '10-2024-company.md': 'company-landscape',
  '10-2024-compensation.md': 'compensation',
  '10-2024-demographics.md': 'demographics',
  '10-2024-job-market-and-opportunities.md': 'job-market',
  '10-2024-offer-and-negotiation.md': 'offer-and-negotiation',
  '10-2024-roles-and-experiences.md': 'roles-and-experiences',
  '10-2024-value-of-design.md': 'value-of-design',
};

const isDryRun = process.argv.includes('--dry-run');
const force = process.argv.includes('--force');

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);

const cleanLabel = (value) =>
  value
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]*]\([^)]*\)/g, '')
    .replace(/[#*_`>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const isDataChartImage = (url, altText) => {
  const lowerUrl = url.toLowerCase();
  const lowerAlt = altText.toLowerCase();

  if (lowerAlt.includes('page icon')) return false;
  if (lowerUrl.includes('.svg')) return false;
  if (!lowerUrl.includes('.png')) return false;

  return lowerUrl.includes('designpayasia.notion.site/image/');
};

const findNearestLabel = (lines, imageLineIndex, altText) => {
  for (let index = imageLineIndex - 1; index >= 0; index -= 1) {
    const line = lines[index].trim();
    if (!line || line.startsWith('![')) continue;

    const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
    if (headingMatch) return cleanLabel(headingMatch[1]);

    const cleaned = cleanLabel(line);
    if (cleaned.length > 0 && cleaned.length <= 120) return cleaned;
  }

  return cleanLabel(altText) || 'chart';
};

const extractCharts = async () => {
  const sourceFiles = (await readdir(SOURCE_DIR))
    .filter((file) => Object.hasOwn(SECTION_BY_FILE, file))
    .sort();

  const charts = [];
  const skipped = [];

  for (const sourceFile of sourceFiles) {
    const section = SECTION_BY_FILE[sourceFile];
    const sourcePath = path.join(SOURCE_DIR, sourceFile);
    const source = await readFile(sourcePath, 'utf8');
    const lines = source.split('\n');
    const usedSlugs = new Map();
    let sectionChartIndex = 0;

    for (const [lineIndex, line] of lines.entries()) {
      const match = line.match(/!\[([^\]]*)]\((https:\/\/designpayasia\.notion\.site\/image\/.*)\)\s*$/);
      if (!match) continue;

      const [raw, altText, url] = match;
      const lineNumber = lineIndex + 1;

      if (!isDataChartImage(url, altText)) {
        skipped.push({
          section,
          sourceFile,
          lineNumber,
          reason: 'non-data image',
          altText,
          url,
        });
        continue;
      }

      const title = findNearestLabel(lines, lineNumber - 1, altText);
      const baseSlug = slugify(title) || `chart-${charts.length + 1}`;
      const nextCount = (usedSlugs.get(baseSlug) ?? 0) + 1;
      usedSlugs.set(baseSlug, nextCount);
      const filenameSlug = nextCount === 1 ? baseSlug : `${baseSlug}-${nextCount}`;
      sectionChartIndex += 1;
      const filename = `${String(sectionChartIndex).padStart(2, '0')}-${filenameSlug}.png`;

      charts.push({
        section,
        title,
        sourceFile,
        lineNumber,
        sourceUrl: url,
        outputPath: `/charts/2024/${section}/${filename}`,
        rawMarkdown: raw,
      });
    }
  }

  return { charts, skipped };
};

const downloadChart = async (chart) => {
  const outputPath = path.join(process.cwd(), 'public', chart.outputPath.replace(/^\//, ''));
  await mkdir(path.dirname(outputPath), { recursive: true });

  if (!force) {
    try {
      await readFile(outputPath);
      return { ...chart, status: 'exists' };
    } catch {
      // File does not exist yet.
    }
  }

  const response = await fetch(chart.sourceUrl);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${chart.sourceFile}:${chart.lineNumber}`);
  }

  const body = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, body);

  return {
    ...chart,
    status: 'downloaded',
    bytes: body.length,
    contentType: response.headers.get('content-type'),
  };
};

const main = async () => {
  const { charts, skipped } = await extractCharts();
  const downloads = [];

  if (!isDryRun) {
    for (const chart of charts) {
      downloads.push(await downloadChart(chart));
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDir: SOURCE_DIR,
    mode: isDryRun ? 'dry-run' : 'download',
    chartCount: charts.length,
    skippedCount: skipped.length,
    charts: isDryRun ? charts : downloads,
    skipped,
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`${isDryRun ? 'Found' : 'Archived'} ${charts.length} chart PNGs.`);
  console.log(`Skipped ${skipped.length} non-data images.`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
