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

  // excessGb = 130 - 80 = 50
  // cost = 50 * 0.000625 * 3 * 720 = 67.5
  expect(cost).toBe(67.5);
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

  expect(doubledCost).toBe(baseCost * 2);
});
