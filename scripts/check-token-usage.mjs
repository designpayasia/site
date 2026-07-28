// Token discipline gate.
//
// The previous version of this script grepped one regex against a hardcoded
// list of 17 files. It passed, but 21 components, four pages, both layouts and
// global.css were never scanned, and --color-cream-* was not in the pattern at
// all. It also could not see the failure mode that actually shipped: a
// reference to a token that does not exist. `var(--space-14)` with no fallback
// is invalid at computed-value time, so `padding-block: var(--space-14)`
// silently renders as zero. Nothing throws, nothing warns, the page just
// quietly loses its padding.
//
// This version walks the whole tree, reads the real token definitions rather
// than assuming a naming pattern, and fails on the three things that are
// always wrong:
//
//   1. a var() reference to a token nothing defines  (the --space-14 class)
//   2. a colour primitive used outside src/styles/tokens/
//   3. a hardcoded colour literal in a component, page or layout
//
// Two further classes are reported as warnings rather than failures, because
// both are honest descriptions of the system as it stands rather than mistakes
// in any one file:
//
//   - direct use of typography and motion primitives, which happens because
//     the semantic tier has no alias for them (no --weight-*, no --tracking-*,
//     no --font-size-lg). Closing that gap is a design decision, not a lint fix.
//   - semantic tokens with no consumer.

import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const TOKENS_DIR = 'src/styles/tokens';

// Definitions live here; everything else is a consumer.
const TOKEN_FILES = ['_primitives.css', '_semantic.css', '_dark.css'];

// Not anchored to the line start: components legitimately define custom
// properties inside an inline style attribute, and Blob.astro builds its two
// in frontmatter before the markup ever sees them. It IS anchored to a
// position where a declaration can begin, and comments are stripped first,
// so a sentence mentioning --space-14 in prose cannot pass itself off as a
// definition and whitelist the very bug this gate exists to catch.
const DEFINITION = /(?:^|[;{('"`]|\s)(--[a-zA-Z0-9_-]+)\s*:/gm;
const BLOCK_COMMENT = /\/\*[\s\S]*?\*\//g;
// Negative lookbehind for `:` so a protocol-relative or https:// URL survives.
const LINE_COMMENT = /(?<!:)\/\/[^\n]*/g;
// The space scale is the documented public API (CLAUDE.md), not a primitive
// leak — components are meant to reach for it directly.
const PUBLIC_PRIMITIVES = /^--space-\d+$/;
// A fallback makes the reference safe even when the token is undefined, which
// is how the --team-* and --contributor-* override APIs are written.
const REFERENCE = /var\(\s*(--[a-zA-Z0-9_-]+)\s*(,)?/g;
// Colour literals only count when they sit where a value goes, so an anchor
// like href="#top" and a hex in frontmatter logic do not read as colours.
const NAMED_COLOURS =
  'white|black|red|green|blue|yellow|orange|purple|pink|brown|gray|grey|silver|navy|teal|olive|maroon|aqua|cyan|magenta|fuchsia|lime|gold|beige|ivory|crimson|salmon|khaki|indigo|violet|turquoise|tan';
const COLOUR_LITERAL = new RegExp(
  String.raw`(?<=[:,(]\s*)(#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|\b(?:${NAMED_COLOURS})\b)`,
  'g',
);
const THEME_RULE = /\[data-theme\s*=|prefers-color-scheme/g;

async function walk(dir) {
  const found = [];
  for (const entry of await readdir(join(ROOT, dir), { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await walk(path)));
    } else {
      found.push(path);
    }
  }
  return found;
}

function lineOf(content, index) {
  return content.slice(0, index).split('\n').length;
}

// Blank a matched region rather than deleting it, so every line number in the
// file stays honest. Newlines survive; everything else becomes a space.
function blank(content, pattern) {
  return content.replace(pattern, (match) => match.replace(/[^\n]/g, ' '));
}

// Comments are prose. This repo comments its colours by name ("crimson fill",
// "the navy station marker") and its tokens by name, so a scan that reads
// comments would both invent colour-literal findings and let a sentence
// mentioning a token pass itself off as a declaration.
function blankComments(content) {
  return blank(blank(content, BLOCK_COMMENT), LINE_COMMENT);
}

// Astro frontmatter is TypeScript, not CSS. Blanking it (rather than dropping
// it) keeps every line number in the file honest.
function stripFrontmatter(content) {
  if (!content.startsWith('---')) return content;
  const end = content.indexOf('\n---', 3);
  if (end === -1) return content;
  const head = content.slice(0, end);
  return head.replace(/[^\n]/g, ' ') + content.slice(end);
}

const allFiles = await walk('src');
const tokenPaths = TOKEN_FILES.map((name) => join(TOKENS_DIR, name));
const consumers = allFiles.filter(
  (path) => (path.endsWith('.astro') || path.endsWith('.css')) && !path.startsWith(TOKENS_DIR),
);

// --- what exists -----------------------------------------------------------

const defined = new Map(); // token -> file it is defined in
for (const path of tokenPaths) {
  const content = await readFile(resolve(ROOT, path), 'utf8');
  for (const match of content.matchAll(DEFINITION)) {
    if (!defined.has(match[1])) defined.set(match[1], path);
  }
}

const primitives = new Set(
  [...defined].filter(([, file]) => file.endsWith('_primitives.css')).map(([token]) => token),
);
const semantics = new Set(
  [...defined].filter(([, file]) => file.endsWith('_semantic.css')).map(([token]) => token),
);
const isColourPrimitive = (token) => primitives.has(token) && token.startsWith('--color-');

// --- what is used ----------------------------------------------------------

const errors = [];
const warnings = [];
const unaliased = new Map(); // primitive -> how many times a consumer reaches for it
const referenced = new Set();

for (const path of consumers) {
  const raw = await readFile(resolve(ROOT, path), 'utf8');
  const source = blankComments(raw);
  const content = path.endsWith('.astro') ? stripFrontmatter(source) : source;

  // Tokens a file defines for itself are legitimate, including the --_private
  // convention, which is deliberately file-scoped. Read from the raw file, not
  // the frontmatter-stripped copy, because Blob.astro builds --blob-color and
  // --blob-aspect in frontmatter — but with comments removed, so prose cannot
  // grant a token an alibi.
  const local = new Set([...source.matchAll(DEFINITION)].map((match) => match[1]));

  for (const match of content.matchAll(REFERENCE)) {
    const [, token, fallback] = match;
    referenced.add(token);
    const line = `${path}:${lineOf(content, match.index)}`;

    // A fallback keeps the reference safe when the token is missing, which is
    // how the --team-* and --contributor-* override APIs are written. It does
    // not excuse reaching past the semantic tier, so it only skips the
    // undefined check, not the primitive one.
    if (!local.has(token) && !fallback && !defined.has(token)) {
      errors.push(`${line}  var(${token}) is defined nowhere — this renders as nothing`);
      continue;
    }
    if (isColourPrimitive(token)) {
      errors.push(`${line}  var(${token}) is a primitive — use a semantic token`);
      continue;
    }
    if (primitives.has(token) && !PUBLIC_PRIMITIVES.test(token)) {
      // Counted, not listed: there are ~110 of these and they exist because
      // the semantic tier has no --weight-*, --tracking-* or --font-size-lg
      // alias to reach for. One line each would bury everything else.
      unaliased.set(token, (unaliased.get(token) ?? 0) + 1);
    }
  }

  for (const match of content.matchAll(COLOUR_LITERAL)) {
    errors.push(
      `${path}:${lineOf(content, match.index)}  hardcoded colour "${match[0]}" — use a token`,
    );
  }

  for (const match of content.matchAll(THEME_RULE)) {
    warnings.push(
      `${path}:${lineOf(content, match.index)}  theme rule outside ${TOKENS_DIR}/_dark.css`,
    );
  }
}

for (const token of semantics) {
  if (!referenced.has(token)) warnings.push(`${TOKENS_DIR}/_semantic.css  ${token} has no consumer`);
}

// --- report ----------------------------------------------------------------

const scanned = `${consumers.length} file(s), ${defined.size} token(s)`;

if (unaliased.size > 0) {
  const total = [...unaliased.values()].reduce((sum, count) => sum + count, 0);
  console.warn(`Primitives with no semantic alias (${total} reference(s)):`);
  for (const [token, count] of [...unaliased].sort((a, b) => b[1] - a[1])) {
    console.warn(`- ${token} × ${count}`);
  }
  console.warn('');
}

if (warnings.length > 0) {
  console.warn(`Token warnings (${warnings.length}):`);
  for (const item of warnings) console.warn(`- ${item}`);
  console.warn('');
}

if (errors.length > 0) {
  console.error(`Token errors (${errors.length}):`);
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`audit:tokens: ${scanned} clean. ✓`);
