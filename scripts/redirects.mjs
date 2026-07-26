import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const manifestPath = resolve('src/data/redirects.json');
const outputPath = resolve('public/_redirects');
const checkOnly = process.argv.includes('--check');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

// `from` is always an internal path. `to` is usually internal too, but a
// redirect may point out of the site entirely (e.g. to the public repo), so
// an absolute https URL is also valid there.
const isInternalPath = (value) => value?.startsWith('/') && !value.startsWith('//');
const isExternalUrl = (value) => /^https:\/\//.test(value ?? '');

const seen = new Set();
for (const entry of manifest) {
  if (!isInternalPath(entry.from) || !(isInternalPath(entry.to) || isExternalUrl(entry.to))) {
    throw new Error(`Invalid redirect entry: ${JSON.stringify(entry)}`);
  }

  if (seen.has(entry.from)) {
    throw new Error(`Duplicate redirect source: ${entry.from}`);
  }

  seen.add(entry.from);
}

const generated = `${manifest
  .map((entry) => `${entry.from} ${entry.to} ${entry.status}`)
  .join('\n')}\n`;

if (checkOnly) {
  const current = await readFile(outputPath, 'utf8');

  if (current !== generated) {
    throw new Error('public/_redirects is out of sync with src/data/redirects.json');
  }
} else {
  await writeFile(outputPath, generated);
}
