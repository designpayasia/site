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

// A link's fragment and query are not part of its path on disk. Splitting them
// off is what lets anchor links be checked at all — previously "/reports#top"
// was resolved as a directory named "reports#top" and always failed.
function splitTarget(target) {
  const [withoutFragment, ...fragmentParts] = target.split('#');
  const fragment = fragmentParts.join('#');
  const path = withoutFragment.split('?')[0];
  return { path, fragment };
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

function hasAnchor(html, fragment) {
  const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:id|name)="${escaped}"`).test(html);
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

    const { path: targetPath, fragment } = splitTarget(target);
    const path = normalizeTarget(targetPath);

    try {
      await stat(path);
    } catch {
      broken.push(`${file} -> ${target}`);
      continue;
    }

    // Resolving the page is only half the check. A fragment that matches no id
    // on the destination is a link that silently lands in the wrong place.
    if (fragment) {
      const destination = await readFile(path, 'utf8');
      if (!hasAnchor(destination, fragment)) {
        broken.push(`${file} -> ${target} (no #${fragment} on the destination page)`);
      }
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
