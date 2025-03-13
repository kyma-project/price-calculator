import calculateAdditionalCosts from './calculateAdditionalCosts';

test('total costs', () => {
  const redis = 74;

  const additionalCosts = calculateAdditionalCosts({ redis });

  expect(additionalCosts).toBe(74);
});
