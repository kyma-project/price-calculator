import calculateAdditionalNodeVolumeCosts from './calculateAdditionalNodeVolumeCosts';
import { expect, test } from 'vitest';

test('returns zero when additional volume is zero', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 0,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  expect(cost).toBe(0);
});

test('returns zero when minAutoscaler is zero', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 50,
    minAutoscaler: 0,
    timeConsumption: 720,
  });

  expect(cost).toBe(0);
});

test('returns zero when timeConsumption is zero', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 50,
    minAutoscaler: 3,
    timeConsumption: 0,
  });

  expect(cost).toBe(0);
});

test('calculates correct cost for additional volume', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 50,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // 50 GiB rounds up to 64 GiB (2 blocks of 32): 64 * 0.000625 * 3 * 720 = 86.4
  expect(cost).toBeCloseTo(86.4, 5);
});

test('rounds additional up to the next 32 GiB block (1 GiB to 32 GiB)', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 1,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // 1 GiB rounds up to 32 GiB (1 block): 32 * 0.000625 * 3 * 720 = 43.2
  expect(cost).toBeCloseTo(43.2, 5);
});

test('does not over-round when additional equals a block boundary', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 32,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // 32 GiB is exactly 1 block, no rounding up
  expect(cost).toBeCloseTo(43.2, 5);
});

test('advances to the next block at 1 GiB over the boundary', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 33,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // 33 GiB rounds up to 64 GiB (2 blocks): 64 * 0.000625 * 3 * 720 = 86.4
  expect(cost).toBeCloseTo(86.4, 5);
});

test('bills additional volume per node (input GiB x autoscaler min)', () => {
  const cost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 32,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  // 32 GiB x 3 nodes = 96 GiB billed: 32 * 0.000625 * 3 * 720 = 43.2
  expect(cost).toBeCloseTo(32 * 0.000625 * 3 * 720, 5);
});

test('scales linearly with minAutoscaler', () => {
  const baseCost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 50,
    minAutoscaler: 3,
    timeConsumption: 720,
  });

  const doubledCost = calculateAdditionalNodeVolumeCosts({
    additionalVolumeGib: 50,
    minAutoscaler: 6,
    timeConsumption: 720,
  });

  // Rounding is per node, so doubling the node count doubles total cost.
  expect(doubledCost).toBe(baseCost * 2);
});
