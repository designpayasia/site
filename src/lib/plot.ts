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
}

const PLOT_CLASS_NAME = 'dpa-plot';

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

  // Strip Plot's inline defaults so theming is entirely CSS-driven (see
  // module doc comment above).
  svg.removeAttribute('font-family');
  svg.removeAttribute('font-size');
  svg.querySelector('style')?.remove();

  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('role', 'presentation');
  svg.classList.add(`chart-block__fill--${tone}`);

  return svg.outerHTML;
}
