import calculateNodeConfigCosts from './calculateNodeConfigCosts';
import { expect, test } from 'vitest';

test('costs of minAutoscaler', () => {
  const timeConsumption = 720;
  const computeUnits = 4;
  const minAutoscaler = 6;
  const machineTypeFactor = 1;
  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption,
    computeUnits,
    minAutoscaler,
    machineTypeFactor,
  });

  expect(nodeConfigCosts).toBe(2073.6);
});
