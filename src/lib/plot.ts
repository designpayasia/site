import { parseHTML } from 'linkedom';
import * as Plot from '@observablehq/plot';

/**
 * Build-time Observable Plot renderer — produces a static SVG string, no
 * client JS. Rendering happens in Astro frontmatter (page/component) at
 * build; ChartBlock only ever receives an inert SVG string to drop in via
 * `set:html`.
 *
 * DOM shim: linkedom, not jsdom. linkedom's `parseHTML` provides enough of
 * the DOM (createElementNS, classList, attribute get/set, style-block
 * insertion) for Plot's SVG code path to run; a smoke test rendering a
 * dot+line spec produced a well-formed <svg> with no missing-API errors.
 * If a future chart needs a Plot feature that trips over a linkedom gap
 * (e.g. text-measurement APIs Plot uses for automatic label wrapping),
 * swap to jsdom here and note why in this comment.
 *
 * Theming contract (DESIGN.md § Data visualisation, brief architecture
 * contract): Plot's own colour system is bypassed. Every mark's
 * fill/stroke channel is the literal string `'currentColor'`, never a hex
 * value or Plot's default categorical scale, and the returned <svg> is
 * tagged with the chart-block tone class (`chart-block__fill--workhorse` /
 * `--signal`) so ChartBlock's existing CSS sets the `color` property that
 * `currentColor` resolves against. Dark mode is then free via `_dark.css`
 * — nothing here needs a dark-mode override of its own. Plot's inline
 * `font-family`/`font-size` on the root <svg> and its auto-injected
 * `<style>` block (which hardcodes `--plot-background: white`) are
 * stripped after render so axis/tick text falls through to the site's own
 * CSS (DM Mono via `--font-data`).
 */

export interface ScatterPoint {
  /** Horizontal value (e.g. total years of experience). */
  x: number;
  /** Vertical value (e.g. years of design experience). */
  y: number;
  /** Number of respondents this (x, y) pair represents — encodes dot radius. */
  count: number;
}

export type ChartTone = 'workhorse' | 'signal';

export interface MedianGuide {
  /** Data value the guide line sits at. */
  value: number;
  /** Guide label; defaults to `median ${value}`. */
  label?: string;
}

/**
 * Free-text annotation placed at data coordinates. Numbers address
 * continuous axes; strings address category (band) axes — on the faceted
 * two-series charts, `y` names the category facet and the text sits at
 * the facet's vertical middle. Rendered as a Plot text mark with no
 * inline font styling, so it inherits DM Mono and muted ink from
 * ChartBlock's CSS like axis text. No leader line is drawn: the input
 * carries no target point, and the DPA register wants annotations that
 * name the finding, not arrows that chase it.
 */
export interface PlotAnnotation {
  x: number | string;
  y: number | string;
  text: string;
  /** @default 'start' */
  anchor?: 'start' | 'middle' | 'end';
}

export interface ScatterPlotOptions {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  /** @default 640 */
  width?: number;
  /** @default 480 */
  height?: number;
  /**
   * Tone class applied to the rendered <svg> — reuses ChartBlock's
   * existing bar tone system so the same CSS colours both bars and Plot
   * marks. This chart is workhorse-only (no signal mark).
   * @default 'workhorse'
   */
  tone?: ChartTone;
  /**
   * y = x structural reference line — allowed per the brief as a
   * geometric aid (not a data claim, so it carries no evidence weight).
   * @default true
   */
  showDiagonalReference?: boolean;
  /**
   * Optional dashed median guide lines with small labels. `x` draws a
   * vertical rule at the given x value, `y` a horizontal rule at the given
   * y value. Muted-ink treatment (same register as the frame and diagonal
   * reference), never signal tone — the label text inherits the site's
   * data face and muted fill from ChartBlock's CSS, like axis text.
   */
  medianGuides?: { x?: MedianGuide; y?: MedianGuide };
  /** DPA register: one or two per chart at most. */
  annotations?: PlotAnnotation[];
}

/** Minimal structural shape used from the rendered node — avoids depending
 *  on lib.dom's SVGSVGElement, which linkedom's element does not nominally
 *  satisfy even though it implements the same surface at runtime. */
interface RenderedSvgElement {
  outerHTML: string;
  removeAttribute(name: string): void;
  setAttribute(name: string, value: string): void;
  classList: { add(...names: string[]): void };
  querySelector(selector: string): { remove(): void } | null;
  querySelectorAll(selector: string): Array<{ classList: { add(...names: string[]): void } }>;
}

const PLOT_CLASS_NAME = 'dpa-plot';

/**
 * Shared post-render pass: strip Plot's inline font defaults and its
 * auto-injected style block (hardcodes `--plot-background: white`), mark
 * the SVG decorative, and tag it with the tone class ChartBlock's CSS
 * themes via `currentColor`.
 */
function finaliseSvg(svg: RenderedSvgElement, tone: ChartTone): string {
  svg.removeAttribute('font-family');
  svg.removeAttribute('font-size');
  svg.querySelector('style')?.remove();

  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('role', 'presentation');
  svg.classList.add(`chart-block__fill--${tone}`);

  return svg.outerHTML;
}

/**
 * Deterministic thousands grouping — never `toLocaleString`, whose output
 * can vary with the build machine's ICU data.
 */
function formatThousands(value: number): string {
  const sign = value < 0 ? '-' : '';
  const [whole, fraction] = Math.abs(value).toString().split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${sign}${grouped}${fraction ? `.${fraction}` : ''}`;
}

/**
 * Compact tick form for currency axes (OWID convention): 20,000 → 20k.
 * Full values remain in the fallback table, so nothing is lost. Values
 * under 1,000 fall through to plain grouping.
 */
function formatCompact(value: number): string {
  if (Math.abs(value) >= 1000) {
    const thousands = Math.round((value / 1000) * 10) / 10;
    return `${formatThousands(thousands)}k`;
  }
  return formatThousands(value);
}

function makeTickFormat(prefix: string, suffix: string): (value: number) => string {
  // A prefix marks a currency axis — compact its ticks (S$20k) so they
  // cannot jam together at 640px. Suffix-only axes (e.g. "%") keep full
  // values, which are short by nature.
  const format = prefix ? formatCompact : formatThousands;
  return (value) => `${prefix}${format(value)}${suffix}`;
}

/** Cap value-axis ticks so 640px-wide charts never crowd. */
const MAX_X_TICKS = 5;

/** Estimated mono-glyph advance (px) at the site's caption size — used only
 *  to lay out category margins and the two-series key, where a few px of
 *  slack is invisible but a text-measurement API would drag in jsdom. */
const MONO_CHAR_WIDTH = 8;

function categoryMarginLeft(labels: string[]): number {
  // +2ch cushion on the widest label: form review caught the previous
  // estimate under-measuring by 1–2ch, which clipped leading glyphs.
  // Over-reserving costs a few px of plot width; under-reserving eats
  // the label.
  const longest = Math.max(...labels.map((label) => label.length));
  return Math.min(240, Math.max(80, Math.ceil((longest + 2) * MONO_CHAR_WIDTH) + 24));
}

function annotationTextMarks(
  annotations: PlotAnnotation[] | undefined,
  { faceted = false, domainMax }: { faceted?: boolean; domainMax: number },
): Plot.Markish[] {
  if (!annotations || annotations.length === 0) return [];
  return annotations.map((annotation) => {
    const position = faceted
      ? { x: () => annotation.x, fy: () => String(annotation.y) }
      : { x: () => annotation.x, y: () => annotation.y };
    // Placement safety nets (form review): a small default dy lifts the
    // text off the category's own marks, and annotations in the right 40%
    // of the value domain auto-anchor 'end' so they extend inward rather
    // than clipping past the frame edge. An explicit author anchor wins.
    const anchor =
      annotation.anchor ??
      (typeof annotation.x === 'number' && annotation.x > 0.6 * domainMax ? 'end' : 'start');
    return Plot.text([annotation], {
      ...position,
      text: () => annotation.text,
      textAnchor: anchor,
      dx: anchor === 'end' ? -6 : 6,
      dy: -10,
    });
  });
}

/**
 * Render a binned scatter/dot chart (design YOE vs total YOE, or any
 * (x, y, count) aggregate) to a static SVG string.
 *
 * - Dot radius encodes `count` via Plot's built-in sqrt area scale, so
 *   visual area (not radius) is proportional to respondent count.
 * - Output is deterministic: the plot's CSS class is a fixed string (never
 *   Plot's default random suffix), and no clip-path or other
 *   counter/random id is generated because no mark requests clipping.
 */
export function renderScatterPlotSvg(options: ScatterPlotOptions): string {
  const {
    points,
    xLabel,
    yLabel,
    width = 640,
    height = 480,
    tone = 'workhorse',
    showDiagonalReference = true,
    medianGuides,
    annotations,
  } = options;

  const { document } = parseHTML('<!doctype html><html><body></body></html>');

  const maxAxisValue = Math.max(1, ...points.flatMap((point) => [point.x, point.y]));

  const marks: Plot.Markish[] = [Plot.frame({ stroke: 'currentColor', strokeOpacity: 0.3 })];

  if (showDiagonalReference) {
    marks.push(
      Plot.line(
        [
          { x: 0, y: 0 },
          { x: maxAxisValue, y: maxAxisValue },
        ],
        {
          x: 'x',
          y: 'y',
          stroke: 'currentColor',
          strokeOpacity: 0.4,
          strokeDasharray: '3,4',
          strokeWidth: 1,
        },
      ),
    );
  }

  // Median guides sit under the dots (pushed before the dot mark) so data
  // marks always read on top. Rules and text generate no ids or clip paths,
  // so determinism is preserved; the text mark carries no inline font
  // styling and inherits DM Mono + muted ink from ChartBlock's CSS.
  const guideStroke = {
    stroke: 'currentColor',
    strokeOpacity: 0.45,
    strokeDasharray: '2,3',
    strokeWidth: 1,
  } as const;

  if (medianGuides?.x) {
    const { value, label = `median ${medianGuides.x.value}` } = medianGuides.x;
    marks.push(
      Plot.ruleX([value], guideStroke),
      Plot.text([{ x: value, y: maxAxisValue }], {
        x: 'x',
        y: 'y',
        text: () => label,
        textAnchor: 'start',
        dx: 6,
        dy: 4,
      }),
    );
  }

  if (medianGuides?.y) {
    const { value, label = `median ${medianGuides.y.value}` } = medianGuides.y;
    marks.push(
      Plot.ruleY([value], guideStroke),
      Plot.text([{ x: maxAxisValue, y: value }], {
        x: 'x',
        y: 'y',
        text: () => label,
        textAnchor: 'end',
        dy: -8,
      }),
    );
  }

  marks.push(
    Plot.dot(points, {
      x: 'x',
      y: 'y',
      r: 'count',
      fill: 'currentColor',
      fillOpacity: 0.72,
      stroke: 'currentColor',
      strokeOpacity: 0.9,
      strokeWidth: 0.5,
    }),
  );

  marks.push(...annotationTextMarks(annotations, { domainMax: maxAxisValue }));

  const svg = Plot.plot({
    document: document as unknown as Document,
    figure: false,
    className: PLOT_CLASS_NAME,
    width,
    height,
    marginLeft: 56,
    marginBottom: 48,
    aspectRatio: 1,
    r: { range: [3, 13] },
    x: {
      label: xLabel,
      domain: [0, maxAxisValue],
      nice: true,
      labelAnchor: 'center',
      labelArrow: 'none',
    },
    y: {
      label: yLabel,
      domain: [0, maxAxisValue],
      nice: true,
      labelAnchor: 'center',
      labelArrow: 'none',
    },
    marks,
  }) as unknown as RenderedSvgElement;

  return finaliseSvg(svg, tone);
}

export interface RangeRow {
  label: string;
  min: number;
  median: number;
  max: number;
  /** Signal at most one row — the finding, not a rainbow. @default 'workhorse' */
  tone?: ChartTone;
}

export interface RangePlotOptions {
  rows: RangeRow[];
  xLabel: string;
  /** Prepended to axis tick values, e.g. "S$". */
  valuePrefix?: string;
  /** Appended to axis tick values, e.g. "%". */
  valueSuffix?: string;
  /** @default 640 */
  width?: number;
  /** @default derived from row count */
  height?: number;
  /** Root tone for rules and workhorse dots. @default 'workhorse' */
  tone?: ChartTone;
  annotations?: PlotAnnotation[];
}

/**
 * Horizontal min–median–max dot-and-whisker per category: a muted rule
 * from min to max with an emphasised median dot. Signal-toned rows are
 * drawn as a second dot mark whose group carries the signal tone class,
 * so both tones resolve via `currentColor` against ChartBlock's CSS —
 * no inline colour anywhere.
 */
export function renderRangePlotSvg(options: RangePlotOptions): string {
  const {
    rows,
    xLabel,
    valuePrefix = '',
    valueSuffix = '',
    width = 640,
    tone = 'workhorse',
    annotations,
  } = options;

  const height = options.height ?? 20 + rows.length * 44 + 48;

  const { document } = parseHTML('<!doctype html><html><body></body></html>');

  const labels = rows.map((row) => row.label);
  const workhorseRows = rows.filter((row) => row.tone !== 'signal');
  const signalRows = rows.filter((row) => row.tone === 'signal');

  const marks: Plot.Markish[] = [
    Plot.ruleY(rows, {
      y: 'label',
      x1: 'min',
      x2: 'max',
      stroke: 'currentColor',
      strokeOpacity: 0.35,
      strokeWidth: 2,
    }),
    Plot.dot(workhorseRows, {
      y: 'label',
      x: 'median',
      fill: 'currentColor',
      r: 5.5,
    }),
  ];

  if (signalRows.length > 0) {
    marks.push(
      Plot.dot(signalRows, {
        y: 'label',
        x: 'median',
        fill: 'currentColor',
        r: 5.5,
      }),
    );
  }

  const domainMax = Math.max(...rows.map((row) => row.max));
  marks.push(...annotationTextMarks(annotations, { domainMax }));

  const svg = Plot.plot({
    document: document as unknown as Document,
    figure: false,
    className: PLOT_CLASS_NAME,
    width,
    height,
    marginLeft: categoryMarginLeft(labels),
    marginRight: 24,
    marginBottom: 48,
    x: {
      label: xLabel,
      tickFormat: makeTickFormat(valuePrefix, valueSuffix),
      ticks: MAX_X_TICKS,
      nice: true,
      labelAnchor: 'center',
      labelArrow: 'none',
    },
    y: {
      label: null,
      domain: labels,
    },
    marks,
  }) as unknown as RenderedSvgElement;

  // The signal dot mark was pushed after the workhorse dot mark, so its
  // group is always the last `aria-label="dot"` group in document order —
  // deterministic, since Plot emits marks in mark order.
  if (signalRows.length > 0) {
    const dotGroups = svg.querySelectorAll('g[aria-label="dot"]');
    dotGroups[dotGroups.length - 1]?.classList.add('chart-block__fill--signal');
  }

  return finaliseSvg(svg, tone);
}

export interface TwoSeriesCategory {
  label: string;
  /** Series A value — rendered as solid workhorse fill. */
  a: number;
  /** Series B value — rendered as an outline (stroke + low-opacity fill). */
  b: number;
}

export interface TwoSeriesBarOptions {
  categories: TwoSeriesCategory[];
  seriesALabel: string;
  seriesBLabel: string;
  xLabel?: string;
  /** Prepended to axis tick values, e.g. "S$". */
  valuePrefix?: string;
  /** Appended to axis tick values, e.g. "%". */
  valueSuffix?: string;
  /** @default 640 */
  width?: number;
  /** @default derived from category count */
  height?: number;
  /** @default 'workhorse' */
  tone?: ChartTone;
  annotations?: PlotAnnotation[];
}

const KEY_SWATCH_SIZE = 12;
const KEY_TEXT_OFFSET = KEY_SWATCH_SIZE + 8;
const KEY_GROUP_GAP = 28;

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/**
 * Two series over shared categories, horizontal bars — serves both the
 * `groupedBar` and `pairedBar` chart types (one renderer: the drawing is
 * identical, only the authoring intent differs). Series A is solid
 * workhorse fill; series B is an outline (currentColor stroke, 0.12
 * fill-opacity) so the pair reads in one hue with no new colour tokens,
 * and survives greyscale/print unchanged. A small key row naming both
 * series is injected into the top margin as plain classed SVG — swatch
 * geometry is fixed and label spacing is mono-width arithmetic, so the
 * output stays deterministic.
 */
export function renderTwoSeriesBarSvg(options: TwoSeriesBarOptions): string {
  const {
    categories,
    seriesALabel,
    seriesBLabel,
    xLabel,
    valuePrefix = '',
    valueSuffix = '',
    width = 640,
    tone = 'workhorse',
    annotations,
  } = options;

  const height = options.height ?? 44 + categories.length * 56 + 48;

  const { document } = parseHTML('<!doctype html><html><body></body></html>');

  const labels = categories.map((category) => category.label);
  const seriesARows = categories.map((category) => ({
    category: category.label,
    series: seriesALabel,
    value: category.a,
  }));
  const seriesBRows = categories.map((category) => ({
    category: category.label,
    series: seriesBLabel,
    value: category.b,
  }));

  const marks: Plot.Markish[] = [
    Plot.barX(seriesARows, {
      fy: 'category',
      y: 'series',
      x: 'value',
      fill: 'currentColor',
    }),
    Plot.barX(seriesBRows, {
      fy: 'category',
      y: 'series',
      x: 'value',
      fill: 'currentColor',
      fillOpacity: 0.12,
      stroke: 'currentColor',
      strokeWidth: 1.5,
    }),
  ];

  const domainMax = Math.max(
    ...categories.flatMap((category) => [category.a, category.b]),
  );
  marks.push(...annotationTextMarks(annotations, { faceted: true, domainMax }));

  const marginLeft = categoryMarginLeft(labels);

  const svg = Plot.plot({
    document: document as unknown as Document,
    figure: false,
    className: PLOT_CLASS_NAME,
    width,
    height,
    marginLeft,
    marginRight: 24,
    marginTop: 44,
    marginBottom: 48,
    x: {
      label: xLabel ?? null,
      // Explicit zero baseline: bar length must encode the value from 0,
      // never a cropped domain, so the two series stay comparable.
      domain: [0, domainMax],
      tickFormat: makeTickFormat(valuePrefix, valueSuffix),
      ticks: MAX_X_TICKS,
      nice: true,
      labelAnchor: 'center',
      labelArrow: 'none',
    },
    y: {
      axis: null,
      domain: [seriesALabel, seriesBLabel],
      padding: 0.15,
    },
    fy: {
      label: null,
      domain: labels,
      padding: 0.25,
    },
    marks,
  }) as unknown as RenderedSvgElement;

  const rendered = finaliseSvg(svg, tone);

  // Key row: plain classed SVG injected into the reserved top margin.
  // Text inherits DM Mono + muted ink from ChartBlock's CSS exactly like
  // axis text; swatches mirror the two bar treatments via currentColor.
  const seriesBOffset =
    KEY_TEXT_OFFSET + Math.ceil(seriesALabel.length * MONO_CHAR_WIDTH) + KEY_GROUP_GAP;
  const key =
    `<g aria-label="key" text-anchor="start" transform="translate(${marginLeft},12)">` +
    `<rect width="${KEY_SWATCH_SIZE}" height="${KEY_SWATCH_SIZE}" fill="currentColor" />` +
    `<text x="${KEY_TEXT_OFFSET}" y="10">${escapeXml(seriesALabel)}</text>` +
    `<g transform="translate(${seriesBOffset},0)">` +
    `<rect width="${KEY_SWATCH_SIZE}" height="${KEY_SWATCH_SIZE}" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.5" />` +
    `<text x="${KEY_TEXT_OFFSET}" y="10">${escapeXml(seriesBLabel)}</text>` +
    `</g></g>`;

  return rendered.replace('</svg>', `${key}</svg>`);
}

/** Discriminated plot spec union mirroring `plotSchema` in content.config.ts. */
export type PlotSpec =
  | ({ type: 'scatter' } & ScatterPlotOptions)
  | ({ type: 'range' } & RangePlotOptions)
  | ({ type: 'groupedBar' | 'pairedBar' } & TwoSeriesBarOptions);

/** Dispatch a validated plot spec to its renderer. */
export function renderPlotSvg(spec: PlotSpec): string {
  switch (spec.type) {
    case 'scatter':
      return renderScatterPlotSvg(spec);
    case 'range':
      return renderRangePlotSvg(spec);
    case 'groupedBar':
    case 'pairedBar':
      return renderTwoSeriesBarSvg(spec);
    default: {
      // Exhaustiveness guard: a new union member added to the schema
      // without a renderer must crash the build loudly, never render
      // undefined into a page.
      const unhandled: never = spec;
      throw new Error(`renderPlotSvg: no renderer for plot type ${JSON.stringify(unhandled)}`);
    }
  }
}
