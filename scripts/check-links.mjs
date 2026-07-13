import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const distDir = resolve('dist');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = join(dir, entry.name);
      return entry.isDirectory() ? walk(fullPath) : fullPath;
    }),
  );

  return files.flat();
}

function normalizeTarget(target) {
  if (target.endsWith('/')) {
    return join(distDir, target, 'index.html');
  }

  if (target.match(/\.[a-z0-9]+$/i)) {
    return join(distDir, target);
  }

  return join(distDir, target, 'index.html');
}

const htmlFiles = (await walk(distDir)).filter((file) => file.endsWith('.html'));
const broken = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const matches = [...html.matchAll(/(?:href|src)="([^"]+)"/g)];

  for (const match of matches) {
    const target = match[1];

    if (
      !target.startsWith('/') ||
      target.startsWith('//') ||
      target.startsWith('/_astro/') ||
      target.startsWith('/charts/') ||
      target === '/favicon.ico' ||
      target === '/favicon.svg' ||
      target === '/og-default.png'
    ) {
      continue;
    }

    const path = normalizeTarget(target);

    try {
      await stat(path);
    } catch {
      broken.push(`${file} -> ${target}`);
    }
  }
}

if (broken.length > 0) {
  console.error('Broken internal links or assets found:');
  for (const item of broken) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}
