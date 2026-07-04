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

const chartSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  caption: z.string().min(1),
  summary: z.string().min(1),
  evidenceIds: z.array(z.string().regex(/^evidence:[a-z0-9-]+$/)).min(1),
  sourceLabel: z.string().min(1),
  sourceUrl: z.url(),
  pngPath: z.string().regex(/^\/.*\.png$/).optional(),
  fallbackTable: z.object({
    columns: z.array(z.string().min(1)).length(2),
    rows: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
        }),
      )
      .min(1),
  }),
  bars: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.number().min(0).max(100),
        tone: z.enum(['workhorse', 'signal']).default('workhorse'),
      }),
    )
    .default([]),
}).superRefine((data, ctx) => {
  if (!data.pngPath && data.bars.length === 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'bars is required when pngPath is not provided',
      path: ['bars'],
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
