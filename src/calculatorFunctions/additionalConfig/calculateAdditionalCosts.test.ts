import calculateAdditionalCosts from './calculateAdditionalCosts';
import { expect, test, describe } from 'vitest';

// Redis costs are flat monthly CU values — NOT scaled by time.
// Tier values (from config.json RedisCosts.Tiers):
//   None=0, Standard1=74, Standard2=148, Standard3=387, Standard4=778,
//   Standard5=1541, Standard6=3084, Standard7=6167, Standard8=12331,
//   Premium1=773, Premium2=1555, Premium3=3082, Premium4=6167,
//   Premium5=12335, Premium6=24661

describe('calculateAdditionalCosts — no Redis', () => {
  test('returns zero when redis is zero (None tier)', () => {
    expect(calculateAdditionalCosts({ redis: 0 })).toBe(0);
  });
});

describe('calculateAdditionalCosts — Standard Redis tiers', () => {
  test('Standard1 tier (74 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 74 })).toBe(74);
  });

  test('Standard2 tier (148 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 148 })).toBe(148);
  });

  test('Standard3 tier (387 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 387 })).toBe(387);
  });

  test('Standard4 tier (778 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 778 })).toBe(778);
  });

  test('Standard5 tier (1541 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 1541 })).toBe(1541);
  });

  test('Standard6 tier (3084 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 3084 })).toBe(3084);
  });

  test('Standard7 tier (6167 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 6167 })).toBe(6167);
  });

  test('Standard8 tier (12331 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 12331 })).toBe(12331);
  });
});

describe('calculateAdditionalCosts — Premium Redis tiers', () => {
  test('Premium1 tier (773 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 773 })).toBe(773);
  });

  test('Premium2 tier (1555 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 1555 })).toBe(1555);
  });

  test('Premium3 tier (3082 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 3082 })).toBe(3082);
  });

  test('Premium4 tier (6167 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 6167 })).toBe(6167);
  });

  test('Premium5 tier (12335 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 12335 })).toBe(12335);
  });

  test('Premium6 tier (24661 CU)', () => {
    expect(calculateAdditionalCosts({ redis: 24661 })).toBe(24661);
  });
});

describe('calculateAdditionalCosts — flat-rate behaviour', () => {
  test('returns redis cost as-is (pass-through)', () => {
    expect(calculateAdditionalCosts({ redis: 74 })).toBe(74);
  });

  test('redis cost is a flat monthly amount — same value regardless of context', () => {
    // Calling twice with the same input must always return the same value
    const first = calculateAdditionalCosts({ redis: 387 });
    const second = calculateAdditionalCosts({ redis: 387 });
    expect(first).toBe(second);
  });

  test('Premium1 (773) costs less than Standard8 (12331)', () => {
    const premium1 = calculateAdditionalCosts({ redis: 773 });
    const standard8 = calculateAdditionalCosts({ redis: 12331 });
    expect(premium1).toBeLessThan(standard8);
  });
});