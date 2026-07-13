# ChartRange integration into the report pipeline — design

Status: approved. Source: `~/obsidian-vault/workbench/dpa/DPA ChartRange integration — handover (Jul 2026).md` (deferred during PR #14, site-crit fixes).

## Problem

Report range charts and the patterns-doc range demo are two different chart engines that look different, and the nicer one (`ChartRange.astro`, hand-built CSS/HTML, tokenised) is wired only into the docs demo. Reports render range charts via `renderRangePlotSvg` (Observable Plot → static SVG, `src/lib/plot.ts`), which was polished in PR #14 to *approximate* `ChartRange`'s look but will never pixel-match it, and re-implements (imperfectly) things `ChartRange` already does.

Goal: report range charts render the real `ChartRange` visual instead of the SVG approximation.

## Scope

All 7 range charts, one branch:
- 2024 `compensation-trends-by-level` (variants: ID/SG/MY) — has q1/q3.
- 2023 `compensation-by-level` (variants: SG/MY) — has q1/q3.
- 2023 `analysis-experience` (`sg-compensation-seniority`, `sg-compensation-yoe-group`) — min/median/max only, no q1/q3.

Scatter and two-series-bar (`groupedBar`/`pairedBar`) plot types are untouched — they stay on `renderPlotSvg`/Observable Plot. This migration is range-type only.

## Chart engine choice: Plot/SVG vs hand-built CSS vs D3

- **Observable Plot (existing, kept for scatter/two-series-bar)**: one code path handles genuinely 2D/statistical shapes well (the scatter chart). Styling lives in margin/tick arithmetic in `plot.ts` (px estimates, mono-char-width hacks) — harder to restyle than CSS, and it's what caused the visual divergence from `ChartRange` in the first place.
- **Hand-built CSS (`ChartRange` pattern, chosen for range charts)**: full token control via `_semantic.css`, matches `.chart-block`'s own bar pattern exactly, trivial to restyle, no SVG margin-math. Doesn't generalise to true 2D data (scatter) — CSS positioning is the wrong tool there.
- **D3**: already in play indirectly — Plot is built on D3, and `d3.quantile` (R-7) is used at data-prep time to compute IQR from raw survey data (offline, Python/JS, not a runtime dependency). No case for adding D3 as a direct rendering dependency; nothing here needs it that Plot + CSS don't already cover.

Decision: hybrid. Hand-built CSS for category/range/bar-shaped data (this migration), Observable Plot reserved for genuinely continuous 2D shapes.

## Architecture

Extract the whisker/band/dot row visual out of `ChartRange.astro` into a new header/table-free partial, `ChartRangeRows.astro`. `ChartRange.astro` keeps its figure/meta/table chrome and consumes the partial (backward-compatible with the docs demo, `src/pages/docs/patterns.astro`). `ChartBlock.astro` gets a new `rangeRows` visual branch at the same precedence tier as today's `plotSvg`/`bars`, so tabs/segments/variants/table chrome stay owned by `ChartBlock` alone — no duplicated tab-switching machinery in two components.

This is a deliberate departure from the handover doc's literal suggestion ("render `<ChartRange>` instead of the SVG"): `ChartRange` as coded is a whole standalone figure (own title/caption/summary/evidenceIds/sourceLabel/sourceUrl/fallbackColumns/fallbackRows), not a drop-in visual like `plotSvg`. 3 of the 7 charts need `ChartBlock`'s variant tab-filter chrome, which `ChartRange` has no concept of. Extracting the shared partial avoids either duplicating markup/CSS or teaching `ChartRange` a second implementation of tab-switching.

## Components

### `src/lib/chartFormat.ts` (new)
Lift `formatThousands`, `formatCompact`, `makeTickFormat`, `currencyAxisTicks` out of `plot.ts` — no behaviour change. Shared by the Plot renderer (scatter/two-series-bar, unaffected) and the new range transform, so formatting logic has one home instead of two.

### `src/lib/chartRange.ts` (new)
`toChartRangeRows(rows: RangeRow[], { valuePrefix, valueSuffix }): { rows: ChartRangeVisualRow[]; axisTickLabels: string[] }`

Pure function:
- Domain `[0, max(row.max for all rows)]` — matches the existing SVG axis convention (0-based, currency-tick-friendly).
- Scales `min`/`median`/`max`/`q1`/`q3` to 0–100% of that domain → `whiskerStart`/`whiskerEnd`/`medianPosition`/`bandStart`/`bandEnd`.
- Band (`bandStart`/`bandEnd`) omitted when `q1`/`q3` are absent — graceful degradation for the 2023/experience charts, no data recompute needed now.
- `valueLabel` formatted via `chartFormat.ts`, same currency/percent conventions as today.
- `axisTickLabels`: 5 labels via `currencyAxisTicks`/`makeTickFormat`, same tick math the SVG path already uses.
- Tone: every median dot renders signal/crimson, every band renders neutral — both fixed, preserving the existing `plot.ts` convention ("the median is the finding for every row"), not driven by `row.tone`. `ChartRangeVisualRow` (the transform's output shape) carries no `tone` field — there's nothing left for it to control once dot/band colour are fixed conventions rather than per-row choices. `row.tone` on the input `RangeRow` is read and discarded; the field stays on the Zod schema/type only because existing content frontmatter sets it. `RangeRow`/`RangePlotOptions` types relocate here from `plot.ts` (schema-facing shape moves with the code that now owns range rendering).

### `src/components/ChartRangeRows.astro` (new)
Pure visual partial: rows + axis tick labels in, whisker/band/dot markup out. Reuses `ChartRange`'s existing CSS classes/tokens (`chart-range__band`, `chart-range__dot`, tone tokens). New optional `whiskerStart`/`whiskerEnd` per row — thin muted line rendered behind the band (translating the SVG's `strokeOpacity: 0.22` treatment to a CSS token), band+dot-only rows render unchanged when whisker props are absent.

### `src/components/ChartRange.astro`
Refactored to render `ChartRangeRows` internally for its row visual. Own props/behaviour (figure, header, meta, table) unchanged — the docs demo keeps working as-is.

### `src/components/ChartBlock.astro`
New optional `rangeRows`/`rangeAxisTickLabels` props on both the top-level `Props` interface and `Variant`. Rendered via `ChartRangeRows` ahead of `plotSvg` in the existing precedence chain (`rangeRows` > `plotSvg` > `pngIsPrimaryVisual` > `bars`). Segments interface not touched — no range chart currently uses `segments`.

### Report pages
`src/pages/reports/[slug].astro`, `src/pages/reports/[year]/[section].astro` — where they currently call `renderPlotSvg(chart.plot)` / `renderPlotSvg(variant.plot)` unconditionally, branch on `chart.plot.type === 'range'` (and `variant.plot.type === 'range'`): call `toChartRangeRows` and pass the result into `ChartBlock`'s new `rangeRows`/`rangeAxisTickLabels` props instead of `plotSvg`. Non-range types (`scatter`, `groupedBar`, `pairedBar`) keep calling `renderPlotSvg` exactly as today.

### `src/lib/plot.ts`
`renderRangePlotSvg` and its range-only helpers (`rangeCategoryMarginLeft`, `wrapCategoryLabel`, `RANGE_Y_LABEL_FONT_SIZE`, `MEDIAN_LABEL_FONT_SIZE`, `RANGE_CATEGORY_CHAR_WIDTH`) deleted once no caller remains. No live use case survives the migration — graceful degradation means the SVG fallback is never reached, and dead code with no caller only invites drift from the component it was meant to back up. `renderPlotSvg`'s dispatch drops the `'range'` case; the `PlotSpec` union drops the `range` arm (schema-level `type: 'range'` discriminant is unaffected — that's Zod's, not `plot.ts`'s). Scatter/two-series-bar renderers and their helpers untouched.

## Schema

No `content.config.ts` changes. `q1`/`q3` are already optional on `rangePlotSchema` (added in PR #14). `type: 'range'` remains a valid frontmatter discriminant — only the *page-level renderer dispatch* changes, not the authoring format or content schema.

## Error handling / edge cases

- Rows with `q1`/`q3` absent (2023 `analysis-experience`, `sg-compensation-seniority`/`sg-compensation-yoe-group`): whisker + dot render, band omitted. No crash, no placeholder band.
- Suppressed cohorts (n < 10, `MIN_SAFE_COHORT`): already excluded upstream in content — no change needed here.
- `fallbackTable` stays schema-required on every chart (a11y) — unaffected by this migration, `ChartBlock`'s existing table/disclosure logic is untouched.
- Dead top-level `bars`/`fallbackTable` on `compensation-trends-by-level` (unused at render when `variants` present): left as-is, `bars` must remain an array per schema — out of scope for this migration.

## Testing / verification

1. `pnpm run check` — Astro diagnostics + content schema.
2. `pnpm build:site`.
3. `pnpm run a11y:charts` — chart accessibility summary requirement unaffected (`summary` prop unchanged).
4. `pnpm run a11y:contrast` — new whisker token needs a contrast pass.
5. Visual verify (browser, light + dark): all 7 charts across 2023 and 2024 report/section pages — tab-switching still works on the 3 variant charts (2024 ID/SG/MY, 2023 SG/MY), the 4 no-quartile charts render whisker+dot with band correctly omitted, fallback tables render unchanged.
6. `pnpm run redirects:check` — not applicable, no route changes.

## Branch and commits

Branch: `feat/chart-range-integration`. One branch/PR, all 7 charts (graceful degradation means no data work blocks the 2023/experience charts, so there's no reason to phase — phasing would leave reports on two different chart engines mid-migration). Conventional Commits, phased within the branch:

1. `refactor: extract chart formatting helpers into chartFormat.ts`
2. `feat: add ChartRangeRows shared range-chart visual`
3. `refactor: wire ChartRange.astro through ChartRangeRows`
4. `feat: add range-chart row transform`
5. `feat: render range visual in ChartBlock`
6. `feat: switch report pages to ChartRange rendering for range plots`
7. `chore: remove dead renderRangePlotSvg SVG path`

`feat` → MINOR (new capability — the real component now backs report charts, not merely a bug fix).
