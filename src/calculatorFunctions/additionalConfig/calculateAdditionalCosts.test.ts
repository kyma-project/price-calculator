import calculateAdditionalCosts from './calculateAdditionalCosts';
import { expect, test } from 'vitest';

test('returns redis cost as-is', () => {
  const additionalCosts = calculateAdditionalCosts({ redis: 74 });
  expect(additionalCosts).toBe(74);
});

test('returns zero when redis is zero', () => {
  const additionalCosts = calculateAdditionalCosts({ redis: 0 });
  expect(additionalCosts).toBe(0);
});
