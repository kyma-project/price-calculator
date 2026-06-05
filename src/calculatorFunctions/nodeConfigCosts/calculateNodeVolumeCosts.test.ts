import calculateNodeVolumeCosts from './calculateNodeVolumeCosts';
import { expect, test } from 'vitest';

test('returns zero at default volume size (80GB)', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 80,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  expect(cost).toBe(0);
});

test('returns zero when minAutoscaler is zero', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 130,
    minAutoscaler: 0,
    timeConsumption: 720,
  });

  expect(cost).toBe(0);
});

test('returns zero when timeConsumption is zero', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 130,
    minAutoscaler: 3,
    timeConsumption: 0,
  });

  expect(cost).toBe(0);
});

test('calculates correct cost for excess volume', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 130,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // excess = 130 - 80 = 50 GiB → rounded up to 64 GiB (2 × 32-GiB blocks)
  // cost = 64 * 0.000625 * 3 * 720 = 86.4
  expect(cost).toBeCloseTo(86.4, 5);
});

test('rounds excess up to the next 32-GiB block (1 GiB → 32 GiB)', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 81,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // excess = 1 GiB → rounded up to 32 GiB (1 full block)
  // cost = 32 * 0.000625 * 3 * 720 = 43.2
  expect(cost).toBeCloseTo(43.2, 5);
});

test('does not over-round when excess equals a block boundary', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 112,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // excess = 32 GiB → exactly 1 block, no rounding up
  expect(cost).toBeCloseTo(43.2, 5);
});

test('advances to the next block at 1 GiB over the boundary', () => {
  const cost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 113,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // excess = 33 GiB → rounded up to 64 GiB (2 blocks)
  // cost = 64 * 0.000625 * 3 * 720 = 86.4
  expect(cost).toBeCloseTo(86.4, 5);
});

test('scales linearly with minAutoscaler', () => {
  const baseCost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 130,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  const doubledCost = calculateNodeVolumeCosts({
    nodeVolumeSizeGb: 130,
    minAutoscaler: 6,
    timeConsumption: 720,
  });

  // Per-node rounding: each of N nodes is billed for ceil(excess/32) blocks,
  // so doubling N doubles total cost.
  expect(doubledCost).toBe(baseCost * 2);
});
