import calculateStorageCosts from './calculateStorageCosts';

test('total costs', () => {
  const GBQuantity = 1056;
  const timeConsumption = 516;

  const nodeCosts = calculateStorageCosts({ GBQuantity, timeConsumption });

  expect(nodeCosts).toBe(307.45);
});
