import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const files = [
  'src/components/BigStat.astro',
  'src/components/Blob.astro',
  'src/components/ChartBlock.astro',
  'src/components/ConversationBlock.astro',
  'src/components/DarkBeat.astro',
  'src/components/FindingsStrip.astro',
  'src/components/Invitation.astro',
  'src/components/PullQuote.astro',
  'src/components/SiteFooter.astro',
  'src/components/SiteHeader.astro',
  'src/components/StickyMeta.astro',
  'src/components/StubPage.astro',
  'src/components/GuidePage.astro',
  'src/pages/index.astro',
  'src/pages/ops.astro',
  'src/pages/resources.astro',
  'src/pages/search.astro',
  'src/pages/reports/index.astro',
  'src/pages/reports/[slug].astro',
  'src/pages/docs/index.astro',
];

const primitivePattern = /var\(--color-(grey|crimson|navy)-\d+\)/g;
const violations = [];

for (const relativePath of files) {
  const content = await readFile(resolve(relativePath), 'utf8');
  const matches = [...content.matchAll(primitivePattern)];

  for (const match of matches) {
    violations.push(`${relativePath}: ${match[0]}`);
  }
}

if (violations.length > 0) {
  console.error('Primitive colour tokens found in component or page CSS:');
  for (const item of violations) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}
