import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aggregate, normaliseAnnualEquivalent } from './aggregate-employment-type.mjs';

const map = {
  columns: {
    employmentType: 'Employment Type', country: 'Country', seniority: 'Seniority',
    compValue: 'Annual Total Comp', compCurrency: 'Currency', compBasis: 'Pay Frequency',
  },
  employmentTypeValues: {
    // interns (n=35) are deliberately absent — excluded from the comparison, not silently dropped
    'contract-freelance': ['Fixed term contractor', 'Self-employed (Freelancers; own company)'],
    'full-time': ['Full-time', 'Permanent'],
  },
  basisValues: { annual: ['Annual'], monthly: ['Monthly'] },
};

// Annual Total Comp is already annualised; values pass through unmultiplied regardless of pay basis. No day/hourly bases exist in the 2024 data.
test('Annual Total Comp passes through unmultiplied', () => {
  assert.equal(normaliseAnnualEquivalent(1000, 'Monthly', map), 1000);
  assert.equal(normaliseAnnualEquivalent(50000, 'Annual', map), 50000);
});

test('aggregate groups by market and employment type within one currency', () => {
  const rows = [
    { 'Employment Type': 'Full-time', Country: 'Indonesia', Seniority: 'Junior IC', 'Annual Total Comp': '5000000', Currency: 'IDR', 'Pay Frequency': 'Monthly' },
    { 'Employment Type': 'Full-time', Country: 'Indonesia', Seniority: 'Junior IC', 'Annual Total Comp': '7000000', Currency: 'IDR', 'Pay Frequency': 'Monthly' },
    { 'Employment Type': 'Fixed term contractor', Country: 'Indonesia', Seniority: 'Junior IC', 'Annual Total Comp': '9000000', Currency: 'IDR', 'Pay Frequency': 'Monthly' },
  ];
  const out = aggregate(rows, map, 'overall');
  const idFull = out.groups.find((g) => g.market === 'Indonesia' && g.employmentType === 'full-time');
  const idFree = out.groups.find((g) => g.market === 'Indonesia' && g.employmentType === 'contract-freelance');
  assert.equal(idFull.n, 2);
  assert.equal(idFull.currency, 'IDR');
  assert.equal(idFull.median, 6000000); // median of 5M and 7M — Annual Total Comp passed through
  assert.equal(idFree.n, 1);
  assert.equal(idFree.belowThreshold, true); // n < 10
});
