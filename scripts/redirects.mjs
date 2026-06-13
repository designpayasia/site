import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const manifestPath = resolve('src/data/redirects.json');
const outputPath = resolve('public/_redirects');
const checkOnly = process.argv.includes('--check');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

const seen = new Set();
for (const entry of manifest) {
  if (!entry.from?.startsWith('/') || !entry.to?.startsWith('/')) {
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
