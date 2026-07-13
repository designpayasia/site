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
