/**
 * a11y-contrast.mjs — WCAG 2.1 AA contrast check for DPA design-token pairs.
 *
 * This script checks a declared set of foreground/background colour pairs
 * (resolved from src/styles/tokens/_primitives.css and _semantic.css) against
 * the WCAG 2.1 AA thresholds:
 *
 *   - Normal text (< 18pt / < 14pt bold):  contrast ratio ≥ 4.5
 *   - Large text  (≥ 18pt / ≥ 14pt bold):  contrast ratio ≥ 3.0
 *   - Graphical objects (SC 1.4.11):       contrast ratio ≥ 3.0
 *
 * The third class covers tokens that paint chart marks rather than text. It
 * was missing, and --color-chart-neutral shipped below 3:1 in light mode
 * because nothing here was looking at it.
 *
 * The pairs are derived from the semantic roles in _semantic.css and the
 * known rendering surfaces in components. They are updated here whenever
 * the design system palette changes (do not use computed values from the
 * browser — this is a static token audit, not a rendered page audit).
 *
 * Depends only on Node built-ins. No browser or external npm package required.
 */

// ---------------------------------------------------------------------------
// Resolved hex values from _primitives.css (update here on palette changes)
// ---------------------------------------------------------------------------

const P = {
  // Crimson
  crimson300: '#f48baa',
  crimson400: '#e05878',
  crimson600: '#991844',

  // Navy
  navy200:    '#aec3d8',
  navy500:    '#4a6e99',
  navy700:    '#4a628f',
  navy800:    '#1f3a5f',
  navy900:    '#0f1c2e',

  // Grey
  grey100:    '#eeeceb',
  grey200:    '#d8d5d2',
  grey300:    '#b8b4b0',
  grey400:    '#928d89',
  grey500:    '#6d6865',
  grey600:    '#4d4a47',
  grey900:    '#1a1a1a',

  // Cream
  cream50:    '#faf8f4',

  // White (for reference)
  white:      '#ffffff',
};

// ---------------------------------------------------------------------------
// Semantic token pairs to check: [label, foreground, background, textType]
// textType: 'normal' → require ≥ 4.5  |  'large' → require ≥ 3.0
// ---------------------------------------------------------------------------

/**
 * Light-mode pairs
 *
 * Semantic mapping:
 *   --color-workhorse   = grey-900  (#1a1a1a)   → primary text
 *   --color-ambient     = cream-50  (#faf8f4)   → main background
 *   --color-signal-text = crimson-600            → signal links, emphasis
 *   --color-signal-fill = crimson-600            → badge fill (text on it = white)
 *   --color-action      = navy-700               → secondary interactive links
 *   --color-ink-muted   = grey-500               → supporting editorial text
 *   --color-ink-subtle  = grey-600               → captions, meta copy
 */
const PAIRS = [
  // Core body text
  ['body text (grey-900 on cream-50)', P.grey900, P.cream50, 'normal'],

  // Signal: link/emphasis text on cream background
  ['signal-text link (crimson-600 on cream-50)', P.crimson600, P.cream50, 'normal'],

  // Action: nav/secondary links on cream
  ['action link (navy-700 on cream-50)', P.navy700, P.cream50, 'normal'],

  // Ink-muted: chart summaries, source labels, captions on cream
  ['ink-muted caption (grey-500 on cream-50)', P.grey500, P.cream50, 'normal'],

  // Ink-subtle: meta copy on cream
  ['ink-subtle meta (grey-600 on cream-50)', P.grey600, P.cream50, 'normal'],

  // Light-mode --color-chart-neutral. There was no light pair here at all,
  // only the dark one below, which is how grey-350 shipped at 2.80:1 against
  // the ambient. The token paints graphical objects that carry meaning —
  // support bars, the range band, legend and neutral dots — so it answers to
  // SC 1.4.11 at 3:1, not to a text threshold. grey-400 clears it at 3.10:1.
  //
  // Two known gaps this pair deliberately does NOT assert, because both are
  // properties of a consumer rather than of the token, and neither is closed
  // by any value the token could take without the support series ceasing to
  // read as support:
  //
  //   - ChartSmallMultiples paints its neutral fills inside a card whose
  //     background is --color-surface-muted (grey-100), not the ambient. The
  //     token measures 2.79:1 there. grey-500 would clear it at 4.67:1 but is
  //     --color-ink-muted, so the support series would tie the axis text.
  //   - ChartRangeRows draws its band at opacity 0.35, which composites to
  //     roughly 1.4:1 whatever the token is. Contrast there is a function of
  //     the opacity, not the colour.
  //
  // Both need a component-level fix (a lighter card, or an opacity that is
  // not 0.35), so they are recorded here rather than asserted.
  ['chart-neutral (grey-400 on cream-50)', P.grey400, P.cream50, 'graphic'],

  // Dark-beat inverse surface: cream text on navy-900
  ['inverse text (cream-50 on navy-900)', P.cream50, P.navy900, 'normal'],

  // Inverse signal-text (crimson-300 on navy-900) — dark-beat emphasis
  ['inverse signal-text (crimson-300 on navy-900)', P.crimson300, P.navy900, 'normal'],

  // Dark-mode --color-action. This was excluded for the whole of v1 with a note
  // saying navy-500 on navy-900 fails AA (3.25:1) but is never rendered. That
  // was true only while dark mode was unreachable: <html> carried a bare
  // data-theme attribute matching no selector. .btn--secondary and every prose
  // link use this role, so the pair is enforced now and the token moved to
  // navy-200. Checked against both dark surfaces, because links appear on the
  // muted panel too (StickyMeta).
  ['dark action link (navy-200 on navy-900)', P.navy200, P.navy900, 'normal'],
  ['dark action link on muted (navy-200 on navy-800)', P.navy200, P.navy800, 'normal'],

  // Dark-mode ink text. Every step is checked against both dark surfaces:
  // --color-surface-muted moved from navy-700 to navy-800, because navy-700
  // (#4a628f) is anomalously light and no grey in the scale clears AA on it.
  ['dark chart-neutral (grey-300 on navy-900)', P.grey300, P.navy900, 'normal'],
  ['dark muted text (grey-300 on navy-900)', P.grey300, P.navy900, 'normal'],
  ['dark muted text on muted surface (grey-300 on navy-800)', P.grey300, P.navy800, 'normal'],
  ['dark subtle text (grey-200 on navy-900)', P.grey200, P.navy900, 'normal'],
  ['dark subtle text on muted surface (grey-200 on navy-800)', P.grey200, P.navy800, 'normal'],

  // Display / stat headings are large text — lower threshold
  ['hero/stat text (grey-900 on cream-50) large', P.grey900, P.cream50, 'large'],

  // Signal fill surface: white text on crimson-600 (e.g. badge)
  ['white on signal-fill (crimson-600)', P.white, P.crimson600, 'normal'],

  // Homepage hero blob: BigStat label + source line sit directly on the
  // full-opacity --color-stat-blob-fill, not on cream-50/navy-900. Both use
  // ink-subtle rather than ink-muted, because ink-muted only barely clears AA
  // against the light-mode fill (4.67:1). Do not step the light-mode fill up to
  // border-subtle (grey-200), which would drop this to 3.76:1 and fail.
  //
  // In dark mode the fill no longer diverges from --color-surface-muted: both
  // are navy-800 now, so the dark pair below is the same check as
  // 'dark subtle text on muted surface'. Kept as its own line because the hero
  // is the one place a stat sits inside the fill rather than beside it.
  ['ink-subtle on stat blob fill (grey-600 on grey-100)', P.grey600, P.grey100, 'normal'],
  ['ink-subtle on stat blob fill dark (grey-200 on navy-800)', P.grey200, P.navy800, 'normal'],
];

// ---------------------------------------------------------------------------
// WCAG 2.1 relative luminance & contrast ratio
// ---------------------------------------------------------------------------

/** Convert an sRGB channel value [0–255] to linear light. */
function linearize(c8) {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance of a hex colour per WCAG 2.1. */
function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio between two hex colours. */
function contrastRatio(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// Run checks
// ---------------------------------------------------------------------------

// 'graphic' is SC 1.4.11 non-text contrast, not a text threshold that happens
// to share the number. It applies to the parts of a chart a reader has to make
// out to read the chart at all — a bar, a band, a dot, a legend swatch.
const THRESHOLD = { normal: 4.5, large: 3.0, graphic: 3.0 };

const failures = [];
const results = [];

for (const [label, fg, bg, textType] of PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const required = THRESHOLD[textType];
  const pass = ratio >= required;
  results.push({ label, ratio, required, pass });
  if (!pass) {
    failures.push({ label, ratio, required });
  }
}

// Print summary table
for (const { label, ratio, required, pass } of results) {
  const mark = pass ? '✓' : '✗';
  console.log(
    `  ${mark}  ${ratio.toFixed(2).padStart(5)}:1  (need ${required}:1)  ${label}`,
  );
}

if (failures.length > 0) {
  console.error('\na11y:contrast — WCAG 2.1 AA violations:');
  for (const { label, ratio, required } of failures) {
    console.error(`  ✗ ${label}: ${ratio.toFixed(2)}:1 < ${required}:1 required`);
  }
  process.exit(1);
}

console.log(`\na11y:contrast: all ${PAIRS.length} token pair(s) meet WCAG 2.1 AA. ✓`);
