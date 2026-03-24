import calculateStorageCosts from './calculateStorageCosts';
import { expect, test } from 'vitest';

test('total storage costs with all types', () => {
  const storageCosts = calculateStorageCosts({
    GBQuantity: 1056,
    premiumGBQuantity: 1056,
    snapshotGBQuantity: 2048,
    timeConsumption: 516,
  });

  expect(storageCosts).toBe(2022.72);
});

test('returns zero when all quantities are zero', () => {
  const storageCosts = calculateStorageCosts({
    GBQuantity: 0,
    premiumGBQuantity: 0,
    snapshotGBQuantity: 0,
    timeConsumption: 720,
  });

  expect(storageCosts).toBe(0);
});

test('returns zero when timeConsumption is zero', () => {
  const storageCosts = calculateStorageCosts({
    GBQuantity: 1056,
    premiumGBQuantity: 1056,
    snapshotGBQuantity: 2048,
    timeConsumption: 0,
  });

  expect(storageCosts).toBe(0);
});

test('calculates standard storage only', () => {
  const storageCosts = calculateStorageCosts({
    GBQuantity: 32,
    premiumGBQuantity: 0,
    snapshotGBQuantity: 0,
    timeConsumption: 720,
  });

  // 0.02 * 720 * (32 / 32) = 14.4
  expect(storageCosts).toBe(14.4);
});
