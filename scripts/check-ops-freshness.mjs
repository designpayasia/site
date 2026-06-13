import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const ops = await readFile(resolve('src/pages/ops.astro'), 'utf8');
const requiredRoutes = ['/', '/reports', '/reports/2024', '/reports/2023', '/docs', '/search', '/ops'];
const requiredTerms = ['evidenceId', 'redirect', 'Node 22', 'Ownership matrix'];
const missing = [];

for (const route of requiredRoutes) {
  if (!ops.includes(route)) {
    missing.push(`route: ${route}`);
  }
}

for (const term of requiredTerms) {
  if (!ops.includes(term)) {
    missing.push(`term: ${term}`);
  }
}

if (missing.length > 0) {
  console.error('Ops page is missing required continuity entries:');
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}
