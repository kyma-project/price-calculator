import calculateNodeCosts from './calculateNodeCosts';

test('total costs', () => {
  const vmQuantity = 2;
  const vmMultiplier: number = 12;
  const timeConsumption = 498;

  const nodeCosts = calculateNodeCosts({
    vmQuantity,
    vmMultiplier,
    timeConsumption,
  });

  expect(nodeCosts).toBe(5743.6);
});
