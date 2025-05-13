import calculateStorageCosts from './calculateStorageCosts';
import { expect, test } from 'vitest';

test('total costs', () => {
  const GBQuantity = 1056;
  const premiumGBQuantity = 1056;
  const timeConsumption = 516;

  const nodeCosts = calculateStorageCosts({
    GBQuantity,
    premiumGBQuantity,
    timeConsumption,
  });

  expect(nodeCosts).toBe(1362.24);
});
