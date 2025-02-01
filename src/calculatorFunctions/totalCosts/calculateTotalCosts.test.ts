import calculateBaseConfigCosts from '../baseConfigCosts/calculateBaseConfigCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
import calculateAdditionalCosts from '../additionalConfig/calculateAdditionalCosts';
import calculateTotalCosts from './calculateTotalCosts';

test('total costs', () => {
  //  Baseconfiguration
  const minAutoscaler = 3;
  const timeConsumption = 450;
  const vmMultiplier = 4; // 16 CPU 64gb RAM
  const machineTypeFactor = 1;
  //  Storage
  const GBQuantity = 1024;
  const premiumGBQuantity = 1024;
  //  Additional config
  const redis = 74;

  const conversionRatio = 0.35;

  const baseConfigCosts = calculateBaseConfigCosts({
    timeConsumption,
    vmMultiplier,
    minAutoscaler,
    machineTypeFactor,
  });
  const storageCosts = calculateStorageCosts({
    GBQuantity,
    premiumGBQuantity,
    timeConsumption,
  });

  const additionalCosts = calculateAdditionalCosts({redis});

  const totalCosts = calculateTotalCosts({
    baseConfigCosts,
    storageCosts,
    additionalCosts,
    conversionRatio,
  });

  expect(totalCosts.CU).toBe(3774);
  expect(totalCosts.CC.toFixed(2)).toBe('1320.90');
});
