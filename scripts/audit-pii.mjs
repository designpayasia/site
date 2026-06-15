/**
 * audit-pii.mjs — scan src/content/ for PII patterns.
 *
 * Checks for: email addresses, phone numbers (E.164 / common formats), and
 * routable IPv4 addresses. Quasi-identifiers (age ranges, job levels, etc.)
 * are intentionally out of scope — they are aggregate, non-identifying data
 * already reviewed in QA-04.
 *
 * Exits 1 with a list of matches if any are found.
 */

import { readdir, readFile } from 'node:fs/promises';
import { join, resolve, relative } from 'node:path';

const CONTENT_DIR = resolve('src/content');

// Email: standard RFC 5322-ish pattern
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

// Phone: E.164 with explicit country-code prefix (+60 / +65 / +62 / +63 / +66 / +84 etc.)
// or local formatted numbers that have space/dot/parenthesis separators.
// ISO-8601 dates (YYYY-MM-DD) are explicitly excluded by the date RE below.
const PHONE_RE = /(?:\+\d{1,3}[\s\-.]?\d[\d\s\-.()\[\]]{5,}\d|\(\d{1,4}\)[\s\-.]?\d[\d\s\-.]{5,}\d)/g;

// ISO-8601 date pattern used to skip false-positive matches.
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// IPv4: four octets, routable (not 0.x / 127.x / 169.254.x / 192.0.2.x / 198.51.100.x / 203.0.113.x / 224.x–255.x test ranges)
// Simple routable check: first octet 1–126, 128–172 (not 172.16–31), 173–191, 193–223.
const IPV4_RE = /\b(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\b/g;

/** Returns true for private / documentation / broadcast ranges — these are NOT PII. */
function isNonRoutableIp(ip) {
  const [a, b] = ip.split('.').map(Number);
  if (a === 0) return true;
  if (a === 10) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 192 && b === 0) return true;   // 192.0.0.x and 192.0.2.x
  if (a === 198 && (b === 18 || b === 19 || b === 51)) return true;
  if (a === 203 && b === 0) return true;   // 203.0.113.x
  if (a >= 224) return true;              // multicast + reserved
  return false;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const full = join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full;
    }),
  );
  return files.flat();
}

const files = await walk(CONTENT_DIR);
const findings = [];

for (const file of files) {
  const text = await readFile(file, 'utf8');
  const rel = relative(process.cwd(), file);

  // Email
  for (const match of text.matchAll(EMAIL_RE)) {
    findings.push(`${rel}: email: ${match[0]}`);
  }

  // Phone — require E.164 prefix or parenthesised area code.
  // Skip anything that looks like an ISO-8601 date.
  for (const match of text.matchAll(PHONE_RE)) {
    const candidate = match[0].trim();
    if (DATE_RE.test(candidate)) continue;
    const digits = candidate.replace(/\D/g, '');
    if (digits.length >= 8) {
      findings.push(`${rel}: phone: ${candidate}`);
    }
  }

  // IPv4
  for (const match of text.matchAll(IPV4_RE)) {
    if (!isNonRoutableIp(match[0])) {
      findings.push(`${rel}: ip: ${match[0]}`);
    }
  }
}

if (findings.length > 0) {
  console.error('PII scan: potential PII found in src/content/');
  for (const f of findings) {
    console.error(`  ${f}`);
  }
  process.exit(1);
}

console.log(`PII scan: no email / phone / IP found in ${files.length} content file(s). ✓`);
