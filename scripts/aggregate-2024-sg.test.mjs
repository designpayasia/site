import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  median, quantile, experienceBand, womenVsMenPct,
  mergeAdjacent, bucketWithFloor, normaliseGender, runAggregation,
} from './aggregate-2024-sg.mjs';

test('median handles odd and even lengths', () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([1, 2, 3, 4]), 2.5);
  assert.equal(median([5]), 5);
  assert.equal(median([]), null);
});

test('quantile interpolates linearly', () => {
  assert.equal(quantile([1, 2, 3, 4], 0.25), 1.75);
  assert.equal(quantile([10], 0.75), 10);
});

test('experienceBand buckets years', () => {
  assert.equal(experienceBand(1), '0–2');
  assert.equal(experienceBand(4), '3–5');
  assert.equal(experienceBand(10), '6–10');
  assert.equal(experienceBand(13), '11–15');
  assert.equal(experienceBand(25), '16+');
  assert.equal(experienceBand(null), null);
});

test('womenVsMenPct: positive means women lower (2023 continuity)', () => {
  assert.equal(womenVsMenPct(123000, 71300), 42);
  assert.equal(womenVsMenPct(100000, 110000), -10);
  assert.equal(womenVsMenPct(0, 50000), null);
});

test('normaliseGender maps common variants', () => {
  assert.equal(normaliseGender('Female'), 'Woman');
  assert.equal(normaliseGender('m'), 'Man');
  assert.equal(normaliseGender('Non-binary'), 'Other');
});

test('mergeAdjacent merges sub-floor buckets forward, labels honestly', () => {
  const out = mergeAdjacent([
    { label: '0–2', values: [10, 20] },
    { label: '3–5', values: [30] },
    { label: '6–10', values: [40, 50, 60] },
  ], 3);
  assert.equal(out.length, 2);
  assert.equal(out[0].label, '0–2–3–5');
  assert.equal(out[0].status, 'merged');
  assert.equal(out[0].n, 3);
  assert.equal(out[0].median, 20);
  assert.equal(out[1].label, '6–10');
  assert.equal(out[1].status, 'published');
});

test('bucketWithFloor keeps big groups, folds the tail into Other', () => {
  const out = bucketWithFloor([
    { label: 'Enterprise', values: [1, 2, 3] },
    { label: 'Startup', values: [4, 5, 6] },
    { label: 'Agency', values: [7] },
    { label: 'Government', values: [8] },
  ], 3, 'Other (merged)');
  const other = out.find((b) => b.label === 'Other (merged)');
  assert.ok(other);
  assert.equal(other.n, 2);
  assert.equal(other.status, 'suppressed'); // 2 < 3
});

const FIXTURE = `Country,Currency you draw your salary in,Gender,Annual Total Comp,Level of seniority,Years of relevant design experience,What type of company do you currently work for?
Singapore,SGD,Woman,60000,Mid-level IC,3,Startup
Singapore,SGD,Man,90000,Mid-level IC,7,Enterprise
Singapore,SGD,Woman,72000,Senior IC,6,Enterprise
Singapore,SGD,Man,120000,Senior IC,9,Enterprise
Indonesia,IDR,Woman,90000000,Mid-level IC,4,Startup
Singapore,USD,Man,150000,Senior IC,10,Enterprise
Singapore,SGD,Woman,55000,Junior IC,1,Agency
Singapore,SGD,Man,58000,Junior IC,2,Agency
`;

test('runAggregation filters to Singapore SGD and flags sub-10 as unpublished', () => {
  const res = runAggregation(FIXTURE, { minCohort: 10 });
  assert.equal(res.singapore.sample.nSgd, 6);   // 6 SG-SGD comp rows
  assert.equal(res.singapore.sample.n, 7);      // 7 SG rows (incl. the USD man)
  assert.equal(res.singapore.genderGap.published, false); // every cohort < 10
  assert.equal(res.singapore.genderGap.man.median, null);
  assert.equal(res.singapore.genderGap.byLevel.every((l) => !l.published), true);
});
