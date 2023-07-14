import calculateBaseConfigCosts from '../baseConfigCosts/calculateBaseConfigCosts';
import calculateNodeCosts from '../nodeCosts/calculateNodeCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
import calculateTotalCosts from './calculateTotalCosts';

test('total costs', () => {
  //  Baseconfiguration
  const minAutoscaler = 3;
  const timeConsumption = 450;
  const vmMultiplier = 4; // 16 CPU 64gb RAM
  //  Node
  const vmQuantity = 3;
  //  Storage
  const GBQuantity = 1024;

  const baseConfigCosts = calculateBaseConfigCosts({
    timeConsumption,
    vmMultiplier,
    minAutoscaler,
  });
  const nodeCosts = calculateNodeCosts({
    vmQuantity,
    vmMultiplier,
    timeConsumption,
  });
  const storageCosts = calculateStorageCosts({ GBQuantity, timeConsumption });

  const totalCosts = calculateTotalCosts({
    baseConfigCosts,
    nodeCosts,
    storageCosts,
  });

  expect(totalCosts).toBe(5515);
});
