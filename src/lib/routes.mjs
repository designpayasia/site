import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

// Resolved from the working directory, not from import.meta.url: the ops audit
// script (scripts/check-ops-freshness.mjs) runs this module directly via node
// from the repo root, so cwd is the stable anchor.
const SRC = join(process.cwd(), 'src');
const PAGES = join(SRC, 'pages');
const CONTENT = join(SRC, 'content');

// Astro can route from .md, .mdx, .html, and .ts/.js endpoints as well as
// .astro. Only .astro is in use here, so rather than half-support the rest we
// refuse to walk past one: a silently invisible route would defeat the whole
// point of generating this inventory.
const ROUTABLE_EXTENSIONS = ['.astro', '.md', '.mdx', '.html', '.ts', '.js'];

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full));
      continue;
    }
    if (name.endsWith('.astro')) {
      out.push(full);
    } else if (ROUTABLE_EXTENSIONS.some((ext) => name.endsWith(ext))) {
      throw new Error(
        `src/pages/${relative(PAGES, full)} is a routable file type that the route ` +
          `inventory does not understand. Teach walk() in src/lib/routes.mjs how to ` +
          `handle it, or the route inventory will under-report.`,
      );
    }
  }
  return out;
}

function dirsIn(dir) {
  try {
    return readdirSync(dir).filter((name) => statSync(join(dir, name)).isDirectory());
  } catch {
    return [];
  }
}

function markdownIn(dir) {
  try {
    return readdirSync(dir).filter((name) => name.endsWith('.md'));
  } catch {
    return [];
  }
}

function frontmatterValue(file, key) {
  const raw = readFileSync(file, 'utf8');
  const block = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return undefined;
  const line = block[1].match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return line ? line[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
}

// src/pages/index.astro       -> /
// src/pages/docs/index.astro  -> /docs
// src/pages/docs/[slug].astro -> /docs/[slug]
function pagePattern(file) {
  const rel = relative(PAGES, file).replaceAll('\\', '/');
  const trimmed = rel.replace(/\.astro$/, '').replace(/(^|\/)index$/, '');
  return trimmed === '' ? '/' : `/${trimmed}`;
}

// Section files that produce no section route. 'index' is the report landing
// page itself; the rest come from src/data/unrouted-sections.json, which is the
// same list src/pages/reports/[year]/[section].astro filters getStaticPaths by.
// One source, so the inventory cannot disagree with what Astro builds.
const UNROUTED_SECTIONS = new Set([
  'index',
  ...JSON.parse(readFileSync(join(SRC, 'data', 'unrouted-sections.json'), 'utf8')).ids,
]);

// Both report routes filter the collection on status === 'published', so an
// unpublished report builds no pages. A directory without an index.md is not a
// report at all. Mirror both, or the inventory over-reports.
function publishedReportYears() {
  return dirsIn(join(CONTENT, 'reports')).filter((year) => {
    const index = join(CONTENT, 'reports', year, 'index.md');
    if (!existsSync(index)) return false;
    return frontmatterValue(index, 'status') === 'published';
  });
}

// Each dynamic pattern needs an expander, otherwise we cannot know what it
// resolves to. A new dynamic route with no expander is a deliberate build
// error: without one the inventory would silently under-report.
const expanders = {
  '/reports/[slug]': () => publishedReportYears().map((year) => `/reports/${year}`),
  '/reports/[year]/[section]': () =>
    publishedReportYears().flatMap((year) =>
      markdownIn(join(CONTENT, 'reports', year))
        .map((name) => name.replace(/\.md$/, ''))
        .filter((section) => !UNROUTED_SECTIONS.has(section))
        .map((section) => `/reports/${year}/${section}`),
    ),
  '/docs/[slug]': () =>
    markdownIn(join(CONTENT, 'docs'))
      .filter(
        (name) =>
          (frontmatterValue(join(CONTENT, 'docs', name), 'status') ?? 'published') === 'published',
      )
      .map((name) => `/docs/${name.replace(/\.md$/, '')}`),
};

/**
 * Every route pattern the site builds, derived from src/pages and the content
 * collections, with the routes each one resolves to. Nothing is hand-listed, so
 * the inventory cannot drift from what actually ships.
 */
export function listRoutePatterns() {
  const patterns = [];
  const unexpanded = [];

  for (const file of walk(PAGES)) {
    const pattern = pagePattern(file);
    if (!pattern.includes('[')) {
      patterns.push({ pattern, routes: [pattern] });
      continue;
    }
    const expand = expanders[pattern];
    if (!expand) {
      unexpanded.push(pattern);
      continue;
    }
    patterns.push({ pattern, routes: expand().sort() });
  }

  if (unexpanded.length > 0) {
    throw new Error(
      `No route expander for: ${unexpanded.join(', ')}. Add one in src/lib/routes.mjs.`,
    );
  }

  return patterns.sort((a, b) => a.pattern.localeCompare(b.pattern));
}

/** Flat list of every URL the site builds. */
export function listRoutes() {
  return listRoutePatterns()
    .flatMap(({ routes }) => routes)
    .sort();
}

