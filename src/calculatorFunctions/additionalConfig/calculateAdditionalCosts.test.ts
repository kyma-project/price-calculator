import calculateAdditionalCosts from './calculateAdditionalCosts';
import { expect, test } from 'vitest';

test('total costs', () => {
  const redis = 74;

  const additionalCosts = calculateAdditionalCosts({ redis });

  expect(additionalCosts).toBe(74);
});
