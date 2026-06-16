import calculateStorageCosts from './calculateStorageCosts';
import { expect, test, describe } from 'vitest';

// Config values (from config.json)
// Storage.PricePerUnit = 0.02
// Storage.Step = 32
// Storage.FreeStorageBlocks = 1 (one 32-GB block is free on standard storage)
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
  test('the first block (32 GB) is free', () => {
    // (32/32 - 1) free block = 0 billable blocks
    const storageCosts = calculateStorageCosts({
      GBQuantity: 32,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(0);
  });

  test('calculates standard storage — 2 blocks (64 GB), 1 free → bills 1 block', () => {
    // 0.02 * 720 * (64/32 - 1) = 0.02 * 720 * 1 = 14.4
    const storageCosts = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(14.4);
  });

  test('calculates standard storage — 3 blocks (96 GB), 1 free → bills 2 blocks', () => {
    // 0.02 * 720 * (96/32 - 1) = 0.02 * 720 * 2 = 28.8
    const storageCosts = calculateStorageCosts({
      GBQuantity: 96,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(28.8);
  });

  test('standard storage scales linearly with timeConsumption', () => {
    const half = calculateStorageCosts({
      GBQuantity: 96,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 360,
    });
    const full = calculateStorageCosts({
      GBQuantity: 96,
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

  test('premium storage is not discounted by the free standard block', () => {
    // premium bills all blocks: 3 * 0.02 * 720 * (32/32) = 43.2
    const premium = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 32,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(premium).toBeCloseTo(43.2, 5);
  });

  test('premium storage costs 3x standard for equal billable blocks', () => {
    // standard gets 1 free block, so 96 GB → 2 billable blocks
    const standard = calculateStorageCosts({
      GBQuantity: 96,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });
    // premium has no free block, so 64 GB → 2 billable blocks
    const premium = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 64,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    expect(premium).toBeCloseTo(standard * 3, 5);
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

  test('snapshot storage is not discounted by the free standard block', () => {
    // snapshot bills all blocks: 1 * 0.02 * 720 * (32/32) = 14.4
    const snapshot = calculateStorageCosts({
      GBQuantity: 0,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 32,
      timeConsumption: 720,
    });

    expect(snapshot).toBe(14.4);
  });

  test('snapshot storage costs the same as standard for equal billable blocks (multiplier = 1)', () => {
    // standard gets 1 free block, so 96 GB → 2 billable blocks
    const standard = calculateStorageCosts({
      GBQuantity: 96,
      premiumGBQuantity: 0,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });
    // snapshot has no free block, so 64 GB → 2 billable blocks
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
    // standard: 0.02 * 516 * (1056/32 - 1) = 0.02 * 516 * 32 = 330.24
    // premium:  3 * 0.02 * 516 * (1056/32) = 1021.68
    // snapshot: 1 * 0.02 * 516 * (2048/32) = 0.02 * 516 * 64 = 660.48
    // total: 330.24 + 1021.68 + 660.48 = 2012.4
    const storageCosts = calculateStorageCosts({
      GBQuantity: 1056,
      premiumGBQuantity: 1056,
      snapshotGBQuantity: 2048,
      timeConsumption: 516,
    });

    expect(storageCosts).toBe(2012.4);
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
