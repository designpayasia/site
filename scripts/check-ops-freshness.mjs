import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { listRoutePatterns } from '../src/lib/routes.mjs';

const readme = await readFile(resolve('README.md'), 'utf8');
const purposes = JSON.parse(await readFile(resolve('src/data/route-purposes.json'), 'utf8'));

// The /ops page is retired; routes are checked against the purpose map directly.
// What can still rot is the purpose map: a new route with no purpose, or a
// purpose left behind by a deleted route.
const patterns = listRoutePatterns().map(({ pattern }) => pattern);
const problems = [];

for (const pattern of patterns) {
  if (!(pattern in purposes)) {
    problems.push(`route has no purpose in src/data/route-purposes.json: ${pattern}`);
  }
}

for (const pattern of Object.keys(purposes)) {
  if (!patterns.includes(pattern)) {
    problems.push(`purpose refers to a route that no longer exists: ${pattern}`);
  }
}

// These are the continuity commitments the README states now that the ops page is retired.
// They are prose rather than data, so a text check is still the right tool.
const requiredTerms = [
  'evidenceId',
  'redirect',
  'Node 22',
  'ownership matrix',
  'Recovery floor',
  'Architecture',
  'Succession',
];

for (const term of requiredTerms) {
  if (!readme.includes(term)) {
    problems.push(`README is missing required term: ${term}`);
  }
}

if (problems.length > 0) {
  console.error('Ops freshness check failed:');
  for (const item of problems) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

console.log(`Ops freshness OK: ${patterns.length} route patterns, all documented.`);
