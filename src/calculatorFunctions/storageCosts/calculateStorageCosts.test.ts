import calculateStorageCosts from './calculateStorageCosts';
import { expect, test, describe } from 'vitest';

// Config values (from config.json)
// Storage.PricePerUnit = 0.02
// Storage.Step = 32
// Storage.FreeStorageBlocks = 1 (one 32-GiB block is free on standard storage)
// NFSStorage.multiplier = 3
// NFSStorage.Step = 32
// SnapshotStorage.multiplier = 1
// SnapshotStorage.Step = 32

describe('calculateStorageCosts — zero / boundary cases', () => {
  test('returns zero when all quantities are zero', () => {
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(0);
  });

  test('returns zero when timeConsumption is zero', () => {
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 1056,
      nfsGiBQuantity: 1056,
      snapshotGiBQuantity: 2048,
      timeConsumption: 0,
    });

    expect(storageCosts).toBe(0);
  });
});

describe('calculateStorageCosts — standard storage', () => {
  test('the first block (32 GiB) is free', () => {
    // (32/32 - 1) free block = 0 billable blocks
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 32,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(0);
  });

  test('calculates standard storage — 2 blocks (64 GiB), 1 free → bills 1 block', () => {
    // 0.02 * 720 * (64/32 - 1) = 0.02 * 720 * 1 = 14.4
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 64,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(14.4);
  });

  test('calculates standard storage — 3 blocks (96 GiB), 1 free → bills 2 blocks', () => {
    // 0.02 * 720 * (96/32 - 1) = 0.02 * 720 * 2 = 28.8
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 96,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(28.8);
  });

  test('standard storage scales linearly with timeConsumption', () => {
    const half = calculateStorageCosts({
      GiBQuantity: 96,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 360,
    });
    const full = calculateStorageCosts({
      GiBQuantity: 96,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(full).toBe(half * 2);
  });
});

describe('calculateStorageCosts — nfs storage', () => {
  test('calculates nfs storage only — 2 blocks (64 GiB)', () => {
    // 3 * 0.02 * 720 * (64 / 32) = 86.4
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 64,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(storageCosts).toBeCloseTo(86.4, 5);
  });

  test('nfs storage is not discounted by the free standard block', () => {
    // nfs bills all blocks: 3 * 0.02 * 720 * (32/32) = 43.2
    const nfs = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 32,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(nfs).toBeCloseTo(43.2, 5);
  });

  test('nfs storage costs 3x standard for equal billable blocks', () => {
    // standard gets 1 free block, so 96 GiB → 2 billable blocks
    const standard = calculateStorageCosts({
      GiBQuantity: 96,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });
    // nfs has no free block, so 64 GiB → 2 billable blocks
    const nfs = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 64,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    expect(nfs).toBeCloseTo(standard * 3, 5);
  });
});

describe('calculateStorageCosts — snapshot storage', () => {
  test('calculates snapshot storage only — 2 blocks (64 GiB)', () => {
    // 1 * 0.02 * 720 * (64 / 32) = 28.8
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 64,
      timeConsumption: 720,
    });

    expect(storageCosts).toBe(28.8);
  });

  test('snapshot storage is not discounted by the free standard block', () => {
    // snapshot bills all blocks: 1 * 0.02 * 720 * (32/32) = 14.4
    const snapshot = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 32,
      timeConsumption: 720,
    });

    expect(snapshot).toBe(14.4);
  });

  test('snapshot storage costs the same as standard for equal billable blocks (multiplier = 1)', () => {
    // standard gets 1 free block, so 96 GiB → 2 billable blocks
    const standard = calculateStorageCosts({
      GiBQuantity: 96,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });
    // snapshot has no free block, so 64 GiB → 2 billable blocks
    const snapshot = calculateStorageCosts({
      GiBQuantity: 0,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 64,
      timeConsumption: 720,
    });

    expect(snapshot).toBe(standard);
  });
});

describe('calculateStorageCosts — combined types', () => {
  test('total storage costs with all types combined', () => {
    // standard: 0.02 * 516 * (1056/32 - 1) = 0.02 * 516 * 32 = 330.24
    // nfs:  3 * 0.02 * 516 * (1056/32) = 1021.68
    // snapshot: 1 * 0.02 * 516 * (2048/32) = 0.02 * 516 * 64 = 660.48
    // total: 330.24 + 1021.68 + 660.48 = 2012.4
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 1056,
      nfsGiBQuantity: 1056,
      snapshotGiBQuantity: 2048,
      timeConsumption: 516,
    });

    expect(storageCosts).toBe(2012.4);
  });

  test('combined costs equal sum of individual components', () => {
    const props = {
      GiBQuantity: 96,
      nfsGiBQuantity: 64,
      snapshotGiBQuantity: 128,
      timeConsumption: 720,
    };

    const combined = calculateStorageCosts(props);
    const standardOnly = calculateStorageCosts({
      ...props,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
    });
    const nfsOnly = calculateStorageCosts({
      ...props,
      GiBQuantity: 0,
      snapshotGiBQuantity: 0,
    });
    const snapshotOnly = calculateStorageCosts({
      ...props,
      GiBQuantity: 0,
      nfsGiBQuantity: 0,
    });

    expect(combined).toBeCloseTo(standardOnly + nfsOnly + snapshotOnly, 10);
  });
});
