import { glob } from 'astro/loaders';
import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

const metricSchema = z
  .object({
    value: z.string().min(1),
    unit: z.string().default(''),
    label: z.string().min(1),
    color: z.enum(['workhorse', 'signal']).default('workhorse'),
    evidenceId: z.string().regex(/^evidence:[a-z0-9-]+$/),
    sampleSize: z.number().int().positive().optional(),
    publishMode: z.enum(['published', 'sample', 'suppressed']).default('published'),
    note: z.string().optional(),
  })
  .superRefine((metric, ctx) => {
    if (
      metric.publishMode === 'published' &&
      metric.sampleSize !== undefined &&
      metric.sampleSize < 10
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Published metrics must suppress cohorts smaller than 10.',
      });
    }

    if (metric.publishMode !== 'published' && !metric.note) {
      ctx.addIssue({
        code: 'custom',
        message: 'Non-published metrics must explain why they are sampled or suppressed.',
      });
    }
  });

/**
 * Build-time Observable Plot layer (src/lib/plot.ts). Plot specs carry
 * pre-aggregated data inline in the chart's own frontmatter entry, the
 * same self-contained convention `bars`/`fallbackTable` already follow.
 * All values must be aggregated upstream (never row-level data) so the
 * MIN_SAFE_COHORT suppression rule is enforced before data ever reaches
 * this repo, not by this schema.
 *
 * Supported types: `scatter` (binned x/y/count dots), `range`
 * (min–median–max dot-and-whisker per category), and `groupedBar` /
 * `pairedBar` (two series over shared categories — one renderer, two
 * names so authoring intent stays legible).
 */

/**
 * Free-text annotation placed at data coordinates. Numbers address
 * continuous axes; strings address category (band) axes. DPA register:
 * one or two per chart at most — annotations name the finding, they do
 * not decorate.
 */
const plotAnnotationSchema = z.object({
  x: z.union([z.number(), z.string().min(1)]),
  y: z.union([z.number(), z.string().min(1)]),
  text: z.string().min(1),
  anchor: z.enum(['start', 'middle', 'end']).optional(),
});

const scatterPlotSchema = z.object({
  type: z.literal('scatter'),
  xLabel: z.string().min(1),
  yLabel: z.string().min(1),
  points: z
    .array(
      z.object({
        x: z.number(),
        y: z.number(),
        count: z.number().int().positive(),
      }),
    )
    .min(1),
  /** y = x structural reference line — geometric aid, not a data claim. */
  showDiagonalReference: z.boolean().default(true),
  /**
   * Optional dashed median guide lines: `x` draws a vertical rule at the
   * given x value, `y` a horizontal rule at the given y value. Labels
   * default to `median <value>` in src/lib/plot.ts.
   */
  medianGuides: z
    .object({
      x: z.object({ value: z.number(), label: z.string().min(1).optional() }).optional(),
      y: z.object({ value: z.number(), label: z.string().min(1).optional() }).optional(),
    })
    .optional(),
  annotations: z.array(plotAnnotationSchema).optional(),
});

/**
 * Horizontal min–median–max dot-and-whisker per category: muted rule from
 * min to max, emphasised median dot. Per-row `min <= median <= max` is
 * enforced in chartSchema's superRefine (discriminated unions require
 * plain object members, so the check cannot live on this schema).
 */
const rangePlotSchema = z.object({
  type: z.literal('range'),
  xLabel: z.string().min(1),
  /** Prepended to axis tick values, e.g. "S$". */
  valuePrefix: z.string().optional(),
  /** Appended to axis tick values, e.g. "%". */
  valueSuffix: z.string().optional(),
  rows: z
    .array(
      z.object({
        label: z.string().min(1),
        min: z.number(),
        median: z.number(),
        max: z.number(),
        /** Optional interquartile range — renders a q1–q3 band when both present. */
        q1: z.number().optional(),
        q3: z.number().optional(),
        /** Signal at most one row — the finding, not a rainbow. */
        tone: z.enum(['workhorse', 'signal']).default('workhorse'),
      }),
    )
    .min(1),
  annotations: z.array(plotAnnotationSchema).optional(),
});

/**
 * Two series over shared categories, horizontal bars. Series A renders as
 * solid workhorse fill, series B as an outline (currentColor stroke plus
 * low-opacity fill) — differentiation without new colour tokens.
 * `groupedBar` and `pairedBar` share one renderer; the two names exist so
 * frontmatter says what the chart means (grouped category comparison vs
 * paired distributions over the same buckets), not how it is drawn.
 */
const twoSeriesBarFields = {
  seriesALabel: z.string().min(1),
  seriesBLabel: z.string().min(1),
  xLabel: z.string().min(1).optional(),
  valuePrefix: z.string().optional(),
  valueSuffix: z.string().optional(),
  categories: z
    .array(
      z.object({
        label: z.string().min(1),
        a: z.number(),
        b: z.number(),
      }),
    )
    .min(1),
  annotations: z.array(plotAnnotationSchema).optional(),
};

const groupedBarPlotSchema = z.object({
  type: z.literal('groupedBar'),
  ...twoSeriesBarFields,
});

const pairedBarPlotSchema = z.object({
  type: z.literal('pairedBar'),
  ...twoSeriesBarFields,
});

const plotSchema = z.discriminatedUnion('type', [
  scatterPlotSchema,
  rangePlotSchema,
  groupedBarPlotSchema,
  pairedBarPlotSchema,
]);

/**
 * Fallback data table for a chart (ChartBlock/ChartRange/ChartDotPlot/
 * ChartSmallMultiples all render the same shape). `columns` is the printed
 * header row: `columns[0]` labels the row-label column, `columns[1..]`
 * label each row's value column(s) — 2 to 6 columns total. A row carries
 * either the legacy single `value` (only valid when there are exactly 2
 * columns, i.e. one value column) or the newer `values` array, whose
 * length must equal `columns.length - 1`.
 */
const fallbackTableRowSchema = z.union([
  z.object({
    label: z.string().min(1),
    value: z.string().min(1),
  }),
  z.object({
    label: z.string().min(1),
    values: z.array(z.string().min(1)).min(1),
  }),
]);

const fallbackTableSchema = z
  .object({
    columns: z.array(z.string().min(1)).min(2).max(6),
    rows: z.array(fallbackTableRowSchema).min(1),
  })
  .superRefine((table, ctx) => {
    const expectedValueCount = table.columns.length - 1;

    table.rows.forEach((row, index) => {
      if ('values' in row) {
        if (row.values.length !== expectedValueCount) {
          ctx.addIssue({
            code: 'custom',
            message: `fallbackTable row "${row.label}" has ${row.values.length} values but columns declares ${expectedValueCount} value column(s)`,
            path: ['rows', index, 'values'],
          });
        }
      } else if (expectedValueCount !== 1) {
        ctx.addIssue({
          code: 'custom',
          message: `fallbackTable row "${row.label}" uses a single "value" but columns declares ${expectedValueCount} value column(s); use "values" (array) instead`,
          path: ['rows', index, 'value'],
        });
      }
    });
  });

const chartSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  caption: z.string().min(1),
  summary: z.string().min(1),
  suppressionNote: z.string().min(1).optional(),
  evidenceIds: z.array(z.string().regex(/^evidence:[a-z0-9-]+$/)).min(1),
  sourceLabel: z.string().min(1),
  sourceUrl: z.url(),
  pngPath: z.string().regex(/^\/.*\.png$/).optional(),
  averageLabel: z.string().min(1).optional(),
  fallbackTable: fallbackTableSchema,
  bars: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.number().min(0).max(100),
        tone: z.enum(['workhorse', 'signal']).default('workhorse'),
        displayValue: z.string().min(1).optional(),
      }),
    )
    .default([]),
  /**
   * Optional build-time Observable Plot spec — see plotSchema above.
   * Mutually exclusive in practice with `bars` (a chart renders either the
   * bars track or the Plot SVG, never both — see ChartBlock's `plotSvg`
   * prop), but `bars` is left in place (as an empty array) rather than
   * removed, since `fallbackTable` — not `bars` — is the hard requirement
   * that must survive regardless of render path.
   */
  plot: plotSchema.optional(),
  segments: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z0-9-]+$/),
        label: z.string().min(1),
        caption: z.string().min(1),
        summary: z.string().min(1),
        suppressionNote: z.string().min(1).optional(),
        averageLabel: z.string().min(1).optional(),
        bars: z
          .array(
            z.object({
              label: z.string().min(1),
              value: z.number().min(0).max(100),
              tone: z.enum(['workhorse', 'signal']).default('workhorse'),
              displayValue: z.string().min(1).optional(),
            }),
          )
          .min(1),
        fallbackTable: fallbackTableSchema,
      }),
    )
    .optional(),
  defaultSegmentLabel: z.string().min(1).optional(),
  /**
   * Filter-control variants (progressive enhancement): a set of alternative
   * cuts of the same chart, toggled one-at-a-time by a segmented button
   * control. Unlike `segments` (tabbed views sharing the chart's own
   * evidence), each variant carries its own `evidenceIds` and may override
   * `sourceLabel`/`sourceUrl` — variants are meant for cuts backed by
   * distinct evidence (e.g. a per-market breakout), not merely a different
   * slice of the same dataset. A chart may declare `segments` or `variants`,
   * not both.
   */
  variants: z
    .array(
      z.object({
        label: z.string().min(1),
        summary: z.string().min(1),
        suppressionNote: z.string().min(1).optional(),
        evidenceIds: z.array(z.string().regex(/^evidence:[a-z0-9-]+$/)).min(1),
        sourceLabel: z.string().min(1).optional(),
        sourceUrl: z.url().optional(),
        /**
         * Variants mirror the top-level chart's plot/bars treatment: a
         * variant renders either its bars track or its Plot SVG, never
         * both. `bars` defaults to [] so a plot-backed variant needs no
         * dummy track; the bars-or-plot requirement is enforced in the
         * superRefine below, and `fallbackTable` stays hard-required per
         * variant regardless of render path.
         */
        plot: plotSchema.optional(),
        bars: z
          .array(
            z.object({
              label: z.string().min(1),
              value: z.number().min(0).max(100),
              tone: z.enum(['workhorse', 'signal']).default('workhorse'),
              displayValue: z.string().min(1).optional(),
            }),
          )
          .default([]),
        fallbackTable: fallbackTableSchema,
      }),
    )
    .optional(),
}).superRefine((data, ctx) => {
  if (!data.pngPath && !data.plot && data.bars.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'bars is required when neither pngPath nor plot is provided',
      path: ['bars'],
    });
  }

  if (data.pngPath && data.plot) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'pngPath and plot are mutually exclusive; a chart renders one or the other',
      path: ['plot'],
    });
  }

  if (data.plot?.type === 'range') {
    data.plot.rows.forEach((row, index) => {
      if (!(row.min <= row.median && row.median <= row.max)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `range row "${row.label}" must satisfy min <= median <= max`,
          path: ['plot', 'rows', index],
        });
      }
    });
  }

  if (data.segments && !data.defaultSegmentLabel) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'defaultSegmentLabel is required when segments are provided',
      path: ['defaultSegmentLabel'],
    });
  }

  if (data.defaultSegmentLabel && (!data.segments || data.segments.length === 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'segments are required when defaultSegmentLabel is provided',
      path: ['segments'],
    });
  }

  if (data.segments) {
    const segmentIds = new Set<string>();

    data.segments.forEach((segment, index) => {
      if (segmentIds.has(segment.id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'segment ids must be unique within a chart',
          path: ['segments', index, 'id'],
        });
      }

      if (segment.id === 'default') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "segment id 'default' is reserved for the chart's base view and cannot be reused",
          path: ['segments', index, 'id'],
        });
      }

      segmentIds.add(segment.id);
    });
  }

  if (data.variants && data.variants.length > 0) {
    if (data.segments && data.segments.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'a chart cannot define both segments and variants; choose one filter mechanism',
        path: ['variants'],
      });
    }

    const variantLabels = new Set<string>();

    data.variants.forEach((variant, index) => {
      if (variantLabels.has(variant.label)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'variant labels must be unique within a chart',
          path: ['variants', index, 'label'],
        });
      }

      variantLabels.add(variant.label);

      if (!variant.plot && variant.bars.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'variant bars are required when the variant provides no plot',
          path: ['variants', index, 'bars'],
        });
      }

      if (variant.plot?.type === 'range') {
        variant.plot.rows.forEach((row, rowIndex) => {
          if (!(row.min <= row.median && row.median <= row.max)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `range row "${row.label}" must satisfy min <= median <= max`,
              path: ['variants', index, 'plot', 'rows', rowIndex],
            });
          }
        });
      }
    });
  }
});

const evidence = defineCollection({
  loader: glob({ base: './src/content/evidence', pattern: '**/*.json' }),
  schema: z.object({
    id: z.string().regex(/^evidence:[a-z0-9-]+$/),
    title: z.string().min(1),
    summary: z.string().min(1),
    sourceName: z.string().min(1),
    sourceUrl: z.url(),
    year: z.number().int().min(2000).max(2100),
    collectedAt: z.string().min(1),
    geography: z.array(z.string().min(1)).min(1),
    methodology: z.string().min(1),
    sampleSize: z.number().int().positive().optional(),
    sensitivity: z.enum(['public', 'small-cohort', 'aggregate-only']).default('public'),
  }),
});

const site = defineCollection({
  loader: glob({ base: './src/content/site', pattern: '**/*.json' }),
  schema: z.object({
    heroTitle: z.string().min(1),
    heroSummary: z.string().min(1),
    heroCtaLabel: z.string().min(1),
    heroCtaHref: z.string().regex(/^\//),
    featuredReportSlug: z.string().min(1),
    stats: z.array(metricSchema).min(1),
    intro: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      body: z.string().min(1),
      ctaLabel: z.string().min(1),
      ctaHref: z.string().regex(/^\//),
    }),
  }),
});

const teamMemberSchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  linkedin: z.url(),
  photo: z.string().regex(/^\/team\/\d{4}\/.+\.jpg$/),
});

const reports = defineCollection({
  loader: glob({ base: './src/content/reports', pattern: '*/index.md' }),
  schema: z.object({
    slug: z.string(),
    title: z.string().min(1),
    summary: z.string().min(1),
    year: z.number().int().min(2000).max(2100),
    publishedAt: z.coerce.date(),
    markets: z.array(z.string().min(1)).min(1),
    status: z.enum(['published', 'draft']).default('published'),
    canonicalPath: z.string().regex(/^\/reports\/[a-z0-9-]+(\/[a-z0-9-]+)?$/),
    eyebrow: z.string().default('Report'),
    heroCtaLabel: z.string().default('Read report'),
    stats: z.array(metricSchema).min(1),
    team: z.array(teamMemberSchema).optional(),
    acknowledgement: z.string().optional(),
    communityPartners: z.array(z.string().min(1)).optional(),
    support: z
      .object({
        heading: z.string().min(1),
        body: z.string().min(1),
        ctaLabel: z.string().min(1),
        ctaUrl: z.url(),
      })
      .optional(),
    methodologyStrip: z
      .object({
        intro: z.string().min(1),
        process: z.array(z.string().min(1)).min(1),
        biasIntro: z.string().min(1),
        biasPoints: z.array(z.string().min(1)).min(1),
        caveat: z.string().min(1),
      })
      .optional(),
  }),
});

const reportSections = defineCollection({
  loader: glob({ base: './src/content/reports', pattern: ['*/*.md', '!*/index.md'] }),
  schema: z.object({
    report: reference('reports'),
    title: z.string().min(1),
    summary: z.string().min(1),
    // Editorial one-liner for the conversation-spine station; falls back to title when absent.
    provocation: z.string().min(1).optional(),
    order: z.number(),
    commentary: z.string().min(1).optional(),
    hubCommentary: z.string().optional(),
    questions: z.array(z.string().min(1)).default([]),
    whatThisMeans: z.string().min(1).optional(),
    whatThisMeansIndividuals: z.string().min(1).optional(),
    whatThisMeansLeaders: z.string().min(1).optional(),
    keyFindings: z.array(z.string()).optional(),
    references: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.url().optional(),
        }),
      )
      .default([]),
    charts: z.array(chartSchema).default([]),
  }),
});

export const collections = { evidence, site, reports, reportSections };
