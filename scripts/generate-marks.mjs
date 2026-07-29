#!/usr/bin/env node
/**
 * Export the icon mark and the default OG card from the locked D″ master path.
 *
 * Run: pnpm run marks:generate
 *
 * Nothing here is hand-drawn. The favicon set derives from `src/lib/blob-path.mjs`,
 * which the site's Blob component also renders from, so the mark cannot drift from
 * the shape on the page. Design spec §3 requires exactly this: the favicon sizes are
 * re-exported from the master path, never redrawn as simplified small-scale geometry.
 *
 * The icon mark is the blob with its own counter. The blob already reads as a D —
 * flat left edge, round right, chamfered top-left — so the aperture is a scaled copy
 * of the same path rather than a letterform borrowed from a typeface. That keeps the
 * mark self-similar and, more practically, means it needs no font to build.
 *
 * The OG card uses the full wordmark logo because its letterforms are already
 * outlined paths. No font file is required anywhere in this script, which matters:
 * the repo vendors none, and all three brand faces load from the Google CDN.
 */
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

import { blobPath, BLOB_VIEWBOX } from '../src/lib/blob-path.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (name) => resolve(root, 'public', name);

/* Mirrors --color-crimson-700 and --color-cream-50 in src/styles/tokens/_primitives.css.
   An SVG written to disk cannot read a custom property, so the literals live here. */
const CRIMSON = '#991844';
const CREAM = '#faf8f4';

/* A mark that bleeds to the canvas edge reads wrong in a browser tab, so the shape
   is inset by 6% of the field. The counter is placed to leave the left stem and the
   right wall even; at 16px an off-centre counter closes up on one side. */
const PAD = 24;
const INSET = (BLOB_VIEWBOX - 2 * PAD) / BLOB_VIEWBOX;
const COUNTER_SCALE = 0.45;
const COUNTER_X = 110;
const COUNTER_Y = 110;

/* Outer shape and counter are subpaths of ONE path with fill-rule="evenodd". Two
   sibling <path> elements would not knock through — evenodd only resolves within a
   single path, so the counter would render as a filled shape sitting on top. */
const markPath = [
  blobPath({ scale: INSET, x: PAD, y: PAD }),
  blobPath({ scale: COUNTER_SCALE * INSET, x: PAD + COUNTER_X * INSET, y: PAD + COUNTER_Y * INSET }),
].join(' ');

const markSvg = (background) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BLOB_VIEWBOX} ${BLOB_VIEWBOX}">` +
  (background ? `<rect width="${BLOB_VIEWBOX}" height="${BLOB_VIEWBOX}" fill="${background}"/>` : '') +
  `<path fill="${CRIMSON}" fill-rule="evenodd" d="${markPath}"/>` +
  `</svg>\n`;

const rasterise = (size, background) =>
  sharp(Buffer.from(markSvg(background)), { density: 1200 }).resize(size, size).png().toBuffer();

/**
 * Build an .ico. The format is a 6-byte header, then one 16-byte directory entry per
 * image, then the payloads. Every browser in support accepts PNG payloads, so there is
 * no need to emit BMP. A dimension of 256 is encoded as 0.
 */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry[0] = size === 256 ? 0 : size; // width
    entry[1] = size === 256 ? 0 : size; // height
    entry[2] = 0; // palette size
    entry[3] = 0; // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const ICO_SIZES = [16, 32, 48];
/* Apple ignores transparency and composites onto black, so this one gets the cream plate. */
const APPLE_TOUCH_SIZE = 180;
const OG = { width: 1200, height: 630, logo: 340 };

writeFileSync(out('favicon.svg'), markSvg(null));

writeFileSync(
  out('favicon.ico'),
  ico(await Promise.all(ICO_SIZES.map(async (size) => ({ size, data: await rasterise(size, null) })))),
);

writeFileSync(out('apple-touch-icon.png'), await rasterise(APPLE_TOUCH_SIZE, CREAM));

const logo = await sharp(readFileSync(resolve(root, 'src/DPA logo.svg')), { density: 1200 })
  .resize(OG.logo, OG.logo, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({ create: { width: OG.width, height: OG.height, channels: 3, background: CREAM } })
  .composite([
    { input: logo, left: Math.round((OG.width - OG.logo) / 2), top: Math.round((OG.height - OG.logo) / 2) },
  ])
  .png()
  .toFile(out('og-default.png'));

console.log(
  `Marks written to public/: favicon.svg, favicon.ico (${ICO_SIZES.join('/')}), ` +
    `apple-touch-icon.png (${APPLE_TOUCH_SIZE}), og-default.png (${OG.width}x${OG.height}).`,
);
