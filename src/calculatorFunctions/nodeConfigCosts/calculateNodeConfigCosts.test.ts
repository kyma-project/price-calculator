import calculateNodeConfigCosts from './calculateNodeConfigCosts';

test('costs of minAutoscaler', () => {
  const timeConsumption = 720;
  const vmMultiplier = 2;
  const minAutoscaler = 4;
  const machineTypeFactor = 1;
  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption,
    vmMultiplier,
    minAutoscaler,
    machineTypeFactor,
  });

  expect(nodeConfigCosts).toBe(2833);
});
