import { parseHTML } from 'linkedom';
import * as Plot from '@observablehq/plot';
import { makeTickFormat } from './chartFormat';

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
 * `font-family` attribute and its auto-injected `<style>` block (which
 * hardcodes `--plot-background: white`) are stripped after render so
 * axis/tick text falls through to the site's own CSS for font family (DM
 * Mono via `--font-data`). Font *size* is instead pinned via an inline
 * `style` attribute to `PLOT_TEXT_SIZE` (11px, ChartBlock's `--ui-meta`
 * label scale) — an inline style is the only thing from this module that
 * can outrank ChartBlock's own `.chart-block__plot svg` rule (14px,
 * `--type-caption`), and 14px read visibly larger than ChartBlock's native
 * bar labels in review.
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

/** Matches ChartBlock's `--ui-meta` label scale (11px / DM Mono) — see the
 *  theming-contract comment at the top of this file. */
const PLOT_TEXT_SIZE = '11px';

/**
 * Shared post-render pass: strip Plot's inline font-family default and its
 * auto-injected style block (hardcodes `--plot-background: white`), pin
 * font size to `PLOT_TEXT_SIZE` via inline style, mark the SVG decorative,
 * and tag it with the tone class ChartBlock's CSS themes via `currentColor`.
 */
function finaliseSvg(svg: RenderedSvgElement, tone: ChartTone): string {
  svg.removeAttribute('font-family');
  svg.removeAttribute('font-size');
  svg.querySelector('style')?.remove();
  svg.setAttribute('style', `font-size: ${PLOT_TEXT_SIZE};`);

  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('role', 'presentation');
  svg.classList.add(`chart-block__fill--${tone}`);

  return svg.outerHTML;
}

/** Tick-count hint for non-currency value axes (short labels). */
const MAX_X_TICKS = 5;

/**
 * Hard tick control for currency axes. `ticks: N` is only a d3 hint and
 * awkward domains (e.g. 0–355k) can render 8 ticks whose compact labels
 * jam together (gotcha 15, seen again in rendered review). Compute at
 * most five round tick values ourselves — always including 0 — extend
 * the domain to the last tick, and pass the array form, which d3 honours
 * exactly.
 */
function currencyAxisTicks(domainMax: number): {
  domain: [number, number];
  tickValues: number[];
} {
  const targetIntervals = 4;
  const rawStep = Math.max(1, domainMax) / targetIntervals;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step =
    [1, 2, 2.5, 5, 10].map((multiple) => multiple * magnitude).find((s) => s >= rawStep) ??
    10 * magnitude;
  // step >= domainMax / 4, so intervals <= 4 and tick count <= 5.
  const intervals = Math.max(1, Math.ceil(domainMax / step));
  const tickValues = Array.from({ length: intervals + 1 }, (_, index) => index * step);
  return { domain: [0, intervals * step], tickValues };
}

/** Estimated mono-glyph advance (px) at the site's caption size — used only
 *  to lay out category margins and the two-series key, where a few px of
 *  slack is invisible but a text-measurement API would drag in jsdom. */
const MONO_CHAR_WIDTH = 8;

/** Slightly tighter glyph estimate for the category label column only —
 *  the axis tick face is a hair narrower than the key-row estimate above,
 *  and a tighter number lets typical labels reserve less width, leaving
 *  the value axis (the actual data) the majority of the SVG. */
const CATEGORY_CHAR_WIDTH = 7;

/** Small gap between the truncated label column and the plot area. */
const CATEGORY_LABEL_RIGHT_PADDING = 8;

function categoryMarginLeft(labels: string[], width: number): number {
  // +2ch cushion on the widest label: form review caught the previous
  // estimate under-measuring by 1–2ch, which clipped leading glyphs.
  // Over-reserving costs a few px of plot width; under-reserving eats
  // the label.
  const longest = Math.max(...labels.map((label) => label.length));
  const estimate = Math.ceil((longest + 2) * CATEGORY_CHAR_WIDTH) + 24;
  // Cap at 38% of the SVG width, not a flat pixel value or the previous
  // 70%: long rows like "Head of department / Senior leadership (n=15)"
  // (45ch) were consuming most of the 640px canvas, crushing the value
  // axis to a sliver. The value axis carries the data and always keeps
  // the majority of the width now; labels that would overflow this
  // capped column are truncated at render time (see truncateLabel) — the
  // full string still lives in the chart's fallbackTable.
  return Math.min(Math.round(width * 0.38), Math.max(80, estimate));
}

/**
 * Truncate a category label so its rendered tick text fits within the
 * capped left margin, appending an ellipsis. Purely cosmetic: it only
 * reformats the axis tick text via Plot's `tickFormat`, so the underlying
 * band-scale domain (and therefore mark positioning and annotation
 * matching) is untouched, and the full label always lives in the chart's
 * fallbackTable.
 */
function truncateLabel(label: string, marginLeft: number): string {
  const availableChars = Math.floor(
    (marginLeft - CATEGORY_LABEL_RIGHT_PADDING) / CATEGORY_CHAR_WIDTH,
  );
  if (label.length <= availableChars) return label;
  const keep = Math.max(1, availableChars - 1);
  return `${label.slice(0, keep)}…`;
}

/**
 * Right margin reserving room for half the final tick label: the last
 * currency tick sits at the domain end and its centred label would
 * otherwise clip at the SVG edge ("S$400k" losing its k). Same mono-width
 * estimate as categoryMarginLeft. Non-currency axes keep the base margin.
 */
function valueAxisMarginRight(
  currencyAxis: { tickValues: number[] } | undefined,
  tickFormat: (value: number) => string,
): number {
  const base = 24;
  if (!currencyAxis) return base;
  const lastTick = currencyAxis.tickValues[currencyAxis.tickValues.length - 1];
  return Math.max(base, Math.ceil(tickFormat(lastTick).length / 2) * MONO_CHAR_WIDTH + 4);
}

/**
 * Vertical gap (px) between an annotation's text and the row/point it
 * labels. Paired with `lineAnchor: 'bottom'` below, this is the *full*
 * clearance: Plot's default lineAnchor ('middle') instead centres the text
 * block on the offset point, so half the text height still overlapped the
 * mark it was meant to clear (seen in review as the label crossing its own
 * row's mark at typical 44–56px row heights).
 */
const ANNOTATION_CLEARANCE = 12;

/**
 * Extra marginTop (px) reserved when an annotation labels the topmost
 * row/category: enough for the clearance above plus one line of
 * caption-sized text, so the label doesn't clip against the SVG's own top
 * edge instead of the row below it.
 */
const ANNOTATION_TOP_RESERVE = 36;

function annotationTextMarks(
  annotations: PlotAnnotation[] | undefined,
  { faceted = false, domainMax }: { faceted?: boolean; domainMax: number },
): Plot.Markish[] {
  if (!annotations || annotations.length === 0) return [];
  return annotations.map((annotation) => {
    const position = faceted
      ? { x: () => annotation.x, fy: () => String(annotation.y) }
      : { x: () => annotation.x, y: () => annotation.y };
    // Placement safety nets (form review): lineAnchor 'bottom' plus a fixed
    // dy lifts the text's own baseline clear of the row/point it labels —
    // Plot's default 'middle' lineAnchor only moves the text's centre by
    // dy, leaving the label's lower half still over the mark. Annotations
    // in the right 40% of the value domain auto-anchor 'end' so they
    // extend inward rather than clipping past the frame edge. An explicit
    // author anchor wins.
    const anchor =
      annotation.anchor ??
      (typeof annotation.x === 'number' && annotation.x > 0.6 * domainMax ? 'end' : 'start');
    return Plot.text([annotation], {
      ...position,
      text: () => annotation.text,
      textAnchor: anchor,
      lineAnchor: 'bottom',
      dx: anchor === 'end' ? -6 : 6,
      dy: -ANNOTATION_CLEARANCE,
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
 * workhorse fill; series B is a lighter 0.12 fill-opacity fill so the pair
 * reads in one hue with no new colour tokens, and survives greyscale/print
 * unchanged. Neither series carries a stroke — matching treatment keeps
 * the pair visually symmetric (an earlier version stroked series B only,
 * which read heavier/thicker than series A). A small key row naming both
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
    }),
  ];

  const domainMax = Math.max(
    ...categories.flatMap((category) => [category.a, category.b]),
  );
  const currencyAxis = valuePrefix ? currencyAxisTicks(domainMax) : undefined;
  const tickFormat = makeTickFormat(valuePrefix, valueSuffix);
  marks.push(...annotationTextMarks(annotations, { faceted: true, domainMax }));

  const marginLeft = categoryMarginLeft(labels, width);

  // Base marginTop (44) reserves room for the key row (below); a top-facet
  // annotation needs more than that on top, or its label clips at the
  // SVG's top edge instead of clearing the facet it names.
  const topCategoryHasAnnotation = (annotations ?? []).some(
    (annotation) => categories.length > 0 && annotation.y === categories[0].label,
  );

  const svg = Plot.plot({
    document: document as unknown as Document,
    figure: false,
    className: PLOT_CLASS_NAME,
    width,
    height,
    marginLeft,
    marginRight: valueAxisMarginRight(currencyAxis, tickFormat),
    marginTop: topCategoryHasAnnotation ? 44 + ANNOTATION_TOP_RESERVE : 44,
    marginBottom: 48,
    x: {
      label: xLabel ?? null,
      tickFormat,
      // Explicit zero baseline either way: bar length must encode the
      // value from 0, never a cropped domain, so the two series stay
      // comparable. Currency axes additionally get hard-capped explicit
      // ticks (array form); short non-currency labels keep the d3 hint.
      ...(currencyAxis
        ? { domain: currencyAxis.domain, ticks: currencyAxis.tickValues }
        : { domain: [0, domainMax], ticks: MAX_X_TICKS, nice: true }),
      labelAnchor: 'center',
      labelArrow: 'none',
    },
    y: {
      axis: null,
      domain: [seriesALabel, seriesBLabel],
      // Gap between the A/B bars within one paired group — was 0.15
      // (chunky, near-touching pairs in review); widened for the slim,
      // airy feel of ChartBlock's own pill bars.
      padding: 0.35,
    },
    fy: {
      label: null,
      domain: labels,
      // Gap between category groups — wider than the within-group `y`
      // padding above so groups stay visually distinct from their own
      // paired bars.
      padding: 0.4,
      // Cosmetic only — the facet domain still keys off the full label,
      // so bar/annotation matching is unaffected.
      tickFormat: (label: string) => truncateLabel(label, marginLeft),
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
    `<rect width="${KEY_SWATCH_SIZE}" height="${KEY_SWATCH_SIZE}" fill="currentColor" fill-opacity="0.12" />` +
    `<text x="${KEY_TEXT_OFFSET}" y="10">${escapeXml(seriesBLabel)}</text>` +
    `</g></g>`;

  return rendered.replace('</svg>', `${key}</svg>`);
}

/** Discriminated plot spec union mirroring `plotSchema` in content.config.ts. */
export type PlotSpec =
  | ({ type: 'scatter' } & ScatterPlotOptions)
  | ({ type: 'groupedBar' | 'pairedBar' } & TwoSeriesBarOptions);

/** Dispatch a validated plot spec to its renderer. */
export function renderPlotSvg(spec: PlotSpec): string {
  switch (spec.type) {
    case 'scatter':
      return renderScatterPlotSvg(spec);
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
