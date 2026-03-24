import calculateNodeConfigCosts from '../nodeConfigCosts/calculateNodeConfigCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
import calculateAdditionalCosts from '../additionalConfig/calculateAdditionalCosts';
import calculateTotalCosts from './calculateTotalCosts';

import { expect, test } from 'vitest';

test('total costs', () => {
  //  Baseconfiguration
  const minAutoscaler = 3;
  const timeConsumption = 450;
  const computeUnits = 16; // 16 CPU 64gb RAM
  const machineTypeFactor = 1;
  //  Storage
  const GBQuantity = 1024;
  const premiumGBQuantity = 1024;
  const snapshotGBQuantity = 2048;
  //  Additional config
  const redis = 74;

  const conversionRatio = 0.35;

  const nodeConfigCosts = calculateNodeConfigCosts({
    timeConsumption,
    computeUnits,
    minAutoscaler,
    machineTypeFactor,
  });
  const storageCosts = calculateStorageCosts({
    GBQuantity,
    premiumGBQuantity,
    snapshotGBQuantity,
    timeConsumption,
  });

  const additionalCosts = calculateAdditionalCosts({ redis });

  const totalCosts = calculateTotalCosts({
    nodeConfigCosts,
    storageCosts,
    additionalCosts,
    conversionRatio,
  });

  expect(totalCosts.CU).toBe(4394);
  expect(totalCosts.CC.toFixed(2)).toBe('1537.90');
});

test('returns zero when all costs are zero', () => {
  const totalCosts = calculateTotalCosts({
    nodeConfigCosts: 0,
    storageCosts: 0,
    additionalCosts: 0,
    conversionRatio: 1.06,
  });

  expect(totalCosts.CU).toBe(0);
  expect(totalCosts.CC).toBe(0);
});

test('applies conversion ratio correctly', () => {
  const totalCosts = calculateTotalCosts({
    nodeConfigCosts: 100,
    storageCosts: 0,
    additionalCosts: 0,
    conversionRatio: 0.5,
  });

  expect(totalCosts.CU).toBe(100);
  expect(totalCosts.CC).toBe(50);
});
