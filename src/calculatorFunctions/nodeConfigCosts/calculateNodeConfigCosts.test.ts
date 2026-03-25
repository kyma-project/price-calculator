import calculateNodeConfigCosts from './calculateNodeConfigCosts';
import { expect, test } from 'vitest';

test('costs of minAutoscaler', () => {
  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption: 720,
    computeUnits: 4,
    minAutoscaler: 6,
    machineTypeFactor: 1,
  });

  expect(nodeConfigCosts).toBe(2073.6);
});

test('returns zero when minAutoscaler is zero', () => {
  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption: 720,
    computeUnits: 4,
    minAutoscaler: 0,
    machineTypeFactor: 1,
  });

  expect(nodeConfigCosts).toBe(0);
});

test('returns zero when timeConsumption is zero', () => {
  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption: 0,
    computeUnits: 4,
    minAutoscaler: 6,
    machineTypeFactor: 1,
  });

  expect(nodeConfigCosts).toBe(0);
});

test('applies machineTypeFactor correctly', () => {
  const baseCost = calculateNodeConfigCosts({
    timeConsumption: 720,
    computeUnits: 4,
    minAutoscaler: 3,
    machineTypeFactor: 1,
  });

  const doubledCost = calculateNodeConfigCosts({
    timeConsumption: 720,
    computeUnits: 4,
    minAutoscaler: 3,
    machineTypeFactor: 2,
  });

  expect(doubledCost).toBe(baseCost * 2);
});
