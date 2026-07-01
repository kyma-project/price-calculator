import calculateAdditionalCosts from './calculateAdditionalCosts';
import { expect, test, describe } from 'vitest';

// Redis cost = (storageGib / 32) blocks * 0.02 rate * timeConsumption.
// Tier GiB values come from config.json RedisCosts.Tiers.

const RATE = 0.02;
const BLOCK_SIZE_GIB = 32;
const MONTH = 720;

const expectedCost = (storageGib: number, time: number) =>
  (storageGib / BLOCK_SIZE_GIB) * RATE * time;

describe('calculateAdditionalCosts — no Redis', () => {
  test('returns zero when there is no redis storage (None tier)', () => {
    expect(
      calculateAdditionalCosts({ redisStorageGib: 0, timeConsumption: 720 }),
    ).toBe(0);
  });

  test('returns zero when timeConsumption is zero', () => {
    expect(
      calculateAdditionalCosts({ redisStorageGib: 182, timeConsumption: 0 }),
    ).toBe(0);
  });
});

describe('calculateAdditionalCosts — Standard Redis tiers (full month)', () => {
  test('Standard1 (182 GiB) → 81.9 CU', () => {
    expect(
      calculateAdditionalCosts({
        redisStorageGib: 182,
        timeConsumption: MONTH,
      }),
    ).toBeCloseTo(81.9, 5);
  });

  test('Standard4 (1915 GiB) → 861.75 CU', () => {
    expect(
      calculateAdditionalCosts({
        redisStorageGib: 1915,
        timeConsumption: MONTH,
      }),
    ).toBeCloseTo(861.75, 5);
  });

  test('Standard8 (30353 GiB)', () => {
    expect(
      calculateAdditionalCosts({
        redisStorageGib: 30353,
        timeConsumption: MONTH,
      }),
    ).toBeCloseTo(expectedCost(30353, MONTH), 10);
  });
});

describe('calculateAdditionalCosts — Premium Redis tiers (full month)', () => {
  test('Premium1 (1903 GiB)', () => {
    expect(
      calculateAdditionalCosts({
        redisStorageGib: 1903,
        timeConsumption: MONTH,
      }),
    ).toBeCloseTo(expectedCost(1903, MONTH), 10);
  });

  test('Premium6 (60704 GiB) → 27316.8 CU', () => {
    expect(
      calculateAdditionalCosts({
        redisStorageGib: 60704,
        timeConsumption: MONTH,
      }),
    ).toBeCloseTo(27316.8, 5);
  });
});

describe('calculateAdditionalCosts — time scaling', () => {
  test('redis cost scales linearly with timeConsumption', () => {
    const half = calculateAdditionalCosts({
      redisStorageGib: 1915,
      timeConsumption: 360,
    });
    const full = calculateAdditionalCosts({
      redisStorageGib: 1915,
      timeConsumption: 720,
    });

    expect(full).toBeCloseTo(half * 2, 10);
  });

  test('a partial month costs less than a full month', () => {
    const partial = calculateAdditionalCosts({
      redisStorageGib: 182,
      timeConsumption: 360,
    });
    const full = calculateAdditionalCosts({
      redisStorageGib: 182,
      timeConsumption: 720,
    });

    expect(partial).toBeLessThan(full);
  });

  test('Premium1 costs less than Standard8 for the same time', () => {
    const premium1 = calculateAdditionalCosts({
      redisStorageGib: 1903,
      timeConsumption: MONTH,
    });
    const standard8 = calculateAdditionalCosts({
      redisStorageGib: 30353,
      timeConsumption: MONTH,
    });

    expect(premium1).toBeLessThan(standard8);
  });
});
