/**
 * Shared chart number/tick formatting — used by both the Observable Plot
 * renderer (`plot.ts`, scatter/two-series-bar) and the CSS range-chart
 * transform (`chartRange.ts`), so formatting has one home instead of two.
 */

/**
 * Deterministic thousands grouping — never `toLocaleString`, whose output
 * can vary with the build machine's ICU data.
 */
export function formatThousands(value: number): string {
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
export function formatCompact(value: number): string {
  if (Math.abs(value) >= 1000) {
    const thousands = Math.round((value / 1000) * 10) / 10;
    return `${formatThousands(thousands)}k`;
  }
  return formatThousands(value);
}

export function makeTickFormat(prefix: string, suffix: string): (value: number) => string {
  // A prefix marks a currency axis — compact its ticks (S$20k) so they
  // cannot jam together at narrow widths. Suffix-only axes (e.g. "%") keep
  // full values, which are short by nature.
  const format = prefix ? formatCompact : formatThousands;
  return (value) => `${prefix}${format(value)}${suffix}`;
}

/**
 * Hard tick control for currency axes. `ticks: N` is only a d3 hint and
 * awkward domains (e.g. 0–355k) can render 8 ticks whose compact labels
 * jam together (gotcha 15, seen again in rendered review). Compute at
 * most five round tick values ourselves — always including 0 — extend
 * the domain to the last tick, and pass the array form, which d3 honours
 * exactly.
 */
export function currencyAxisTicks(domainMax: number): {
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
