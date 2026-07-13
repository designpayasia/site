import { currencyAxisTicks, makeTickFormat } from './chartFormat';

/** Mirrors rangePlotSchema's `tone` enum (src/content.config.ts:116). */
export type RangeTone = 'workhorse' | 'signal';

/**
 * Mirrors `rangePlotSchema`'s row shape (src/content.config.ts:105-118).
 * Defined here, not in plot.ts, because range charts no longer render
 * through the Observable Plot pipeline — this is the input to the
 * hand-built CSS transform below.
 */
export interface RangeRow {
  label: string;
  min: number;
  median: number;
  max: number;
  q1?: number;
  q3?: number;
  tone?: RangeTone;
}

export interface RangeAnnotation {
  /** Matches a row's `label` exactly. */
  y: string | number;
  text: string;
}

export interface RangePlotOptions {
  rows: RangeRow[];
  xLabel: string;
  /** Prepended to axis tick values, e.g. "S$". */
  valuePrefix?: string;
  /** Appended to axis tick values, e.g. "%". */
  valueSuffix?: string;
  annotations?: RangeAnnotation[];
}

/**
 * One row in ChartRangeRows' visual vocabulary — 0–100 positions, ready to
 * render as `left`/`width` percentages, no further scaling needed.
 */
export interface ChartRangeVisualRow {
  label: string;
  medianPosition: number;
  whiskerStart: number;
  whiskerEnd: number;
  /** Omitted (not both present) when the source row has no q1/q3 — the IQR
   *  band is skipped for that row rather than guessed. */
  bandStart?: number;
  bandEnd?: number;
  valueLabel: string;
  /** ChartRangeRows' own vocabulary ('action', not 'workhorse') — mapped
   *  here so the shared visual component never has to know the report
   *  schema's field naming. */
  tone?: 'action' | 'signal';
  annotation?: string;
}

export interface ChartRangeVisual {
  rows: ChartRangeVisualRow[];
  axisTickLabels: [string, string, string, string, string];
}

const AXIS_TICK_FRACTIONS = [0, 0.25, 0.5, 0.75, 1] as const;

/**
 * Scales raw min/median/max/q1/q3 values to 0–100% of a shared `[0, max]`
 * domain (max of every row's `max` — matches the 0-based axis convention
 * the deleted SVG renderer used) and formats axis/value labels.
 *
 * Currency axes (`valuePrefix` truthy) additionally pad that domain to a
 * round number via `currencyAxisTicks` — the same helper the deleted SVG
 * renderer used — before scaling positions and computing axis ticks, so
 * charts like "S$0 · S$85k · S$170k · S$254.9k · S$339.9k" instead read
 * "S$0 · S$100k · S$200k · S$300k · S$400k". Row positions and axis ticks
 * are derived from the same rounded domain, or the two would disagree.
 * Non-currency axes (no real content uses this today) keep the raw max,
 * matching `makeTickFormat`'s own prefix-only branch into compact
 * formatting.
 */
export function toChartRangeRows(options: RangePlotOptions): ChartRangeVisual {
  const { rows, valuePrefix = '', valueSuffix = '', annotations = [] } = options;
  const rawDomainMax = Math.max(...rows.map((row) => row.max));
  const domainMax = valuePrefix ? currencyAxisTicks(rawDomainMax).domain[1] : rawDomainMax;
  const tickFormat = makeTickFormat(valuePrefix, valueSuffix);
  const toPercent = (value: number) => (domainMax === 0 ? 0 : (value / domainMax) * 100);

  const visualRows: ChartRangeVisualRow[] = rows.map((row) => {
    const annotation = annotations.find((entry) => String(entry.y) === row.label);
    const hasBand = row.q1 !== undefined && row.q3 !== undefined;

    return {
      label: row.label,
      medianPosition: toPercent(row.median),
      whiskerStart: toPercent(row.min),
      whiskerEnd: toPercent(row.max),
      ...(hasBand ? { bandStart: toPercent(row.q1 as number), bandEnd: toPercent(row.q3 as number) } : {}),
      valueLabel: tickFormat(row.median),
      tone: row.tone === 'signal' ? 'signal' : 'action',
      ...(annotation ? { annotation: annotation.text } : {}),
    };
  });

  const axisTickLabels = AXIS_TICK_FRACTIONS.map((fraction) =>
    tickFormat(domainMax * fraction),
  ) as [string, string, string, string, string];

  return { rows: visualRows, axisTickLabels };
}
