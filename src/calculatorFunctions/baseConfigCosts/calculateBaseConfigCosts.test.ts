import calculateBaseConfigCosts from './calculateBaseConfigCosts';

test('costs of minAutoscaler', () => {
  const timeConsumption = 720;
  const vmMultiplier = 2;
  const minAutoscaler = 4;
  const machineTypeFactor = 1;
  const baseConfigCosts = calculateBaseConfigCosts({
    timeConsumption,
    vmMultiplier,
    minAutoscaler,
    machineTypeFactor,
  });

  expect(baseConfigCosts).toBe(2833);
});
