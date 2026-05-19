import calculateStorageCosts from './calculateStorageCosts';
import { expect, test, describe } from 'vitest';

// Config values (from config.json)
// Storage.PricePerUnit = 0.02
// Storage.Step = 32
// PremiumStorage.multiplier = 3
// PremiumStorage.Step = 32
// SnapshotStorage.multiplier = 1
// SnapshotStorage.Step = 32

describe('calculateStorageCosts — zero / boundary cases', () => {
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
});

describe('calculateStorageCosts — standard storage', () => {
  test('calculates standard storage only — 1 block (32 GB)', () => {
    // 0.02 * 720 * (32 / 32) = 14.4
    const storageCosts = calculateStorageCosts({
      GBQuantity: 32,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(14.4);
  });

  test('calculates standard storage only — 2 blocks (64 GB)', () => {
    // 0.02 * 720 * (64 / 32) = 28.8
    const storageCosts = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(28.8);
  });

  test('standard storage scales linearly with timeConsumption', () => {
    const half = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 360,
    });
    const full = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(full).toBe(half * 2);
  });
});

describe('calculateStorageCosts — premium storage', () => {
  test('calculates premium storage only — 2 blocks (64 GB)', () => {
    // 3 * 0.02 * 720 * (64 / 32) = 86.4
    const storageCosts = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 64,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBeCloseTo(86.4, 5);
  });

  test('premium storage costs exactly 3x standard for equal GB and time', () => {
    const standard = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });
    const premium = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 64,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(premium).toBeCloseTo(standard * 3, 10);
  });
});

describe('calculateStorageCosts — snapshot storage', () => {
  test('calculates snapshot storage only — 2 blocks (64 GB)', () => {
    // 1 * 0.02 * 720 * (64 / 32) = 28.8
    const storageCosts = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 64,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(28.8);
  });

  test('snapshot storage costs the same as standard for equal GB and time (multiplier = 1)', () => {
    const standard = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });
    const snapshot = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 64,
      timeConsumption: 720,
    });

    expect(snapshot).toBe(standard);
  });
});

describe('calculateStorageCosts — combined types', () => {
  test('total storage costs with all types combined', () => {
    // standard: 0.02 * 516 * (1056/32) = 0.02 * 516 * 33 = 340.56
    // premium:  3 * 0.02 * 516 * (1056/32) = 3 * 340.56 = 1021.68
    // snapshot: 1 * 0.02 * 516 * (2048/32) = 0.02 * 516 * 64 = 660.48
    // total: 340.56 + 1021.68 + 660.48 = 2022.72
    const storageCosts = calculateStorageCosts({
      GBQuantity: 1056,
      premiumGBQuantity: 1056,
      snapshotGBQuantity: 2048,
      timeConsumption: 516,
    });

    expect(storageCosts).toBe(2022.72);
  });

  test('combined costs equal sum of individual components', () => {
    const props = {
      GBQuantity: 96,
      premiumGBQuantity: 64,
      snapshotGBQuantity: 128,
      timeConsumption: 720,
    };

    const combined = calculateStorageCosts(props);
    const standardOnly = calculateStorageCosts({
      ...props,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
    });
    const premiumOnly = calculateStorageCosts({
      ...props,
      GBQuantity: 0,
      snapshotGBQuantity: 0,
    });
    const snapshotOnly = calculateStorageCosts({
      ...props,
      GBQuantity: 0,
      premiumGBQuantity: 0,
    });

    expect(combined).toBeCloseTo(standardOnly + premiumOnly + snapshotOnly, 10);
  });
});