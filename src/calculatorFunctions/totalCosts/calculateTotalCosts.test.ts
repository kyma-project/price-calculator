import calculateBaseConfigCosts from '../baseConfigCosts/calculateBaseConfigCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
import calculateTotalCosts from './calculateTotalCosts';

test('total costs', () => {
  //  Baseconfiguration
  const minAutoscaler = 3;
  const timeConsumption = 450;
  const vmMultiplier = 4; // 16 CPU 64gb RAM
  const machineTypeFactor = 1;
  //  Node
  const vmQuantity = 3;
  //  Storage
  const GBQuantity = 1024;
  const premiumGBQuantity = 1024;

  const conversionRatio = 1;
  const additionalCosts = 1;

  const baseConfigCosts = calculateBaseConfigCosts({
    timeConsumption,
    vmMultiplier,
    minAutoscaler,
    machineTypeFactor
  });
  const storageCosts = calculateStorageCosts({ GBQuantity, premiumGBQuantity, timeConsumption });

  const totalCosts = calculateTotalCosts({
    baseConfigCosts,
    storageCosts,
    additionalCosts,
    conversionRatio
  });

  expect(totalCosts).toBe(5783.15);
});
