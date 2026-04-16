import calculateNodeConfigCosts from '../nodeConfigCosts/calculateNodeConfigCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
import calculateAdditionalCosts from '../additionalConfig/calculateAdditionalCosts';
import calculateTotalCosts from './calculateTotalCosts';

import { expect, test, describe } from 'vitest';

describe('calculateTotalCosts — zero / boundary cases', () => {
  test('returns zero CU and CC when all costs are zero', () => {
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts: 0,
      storageCosts: 0,
      additionalCosts: 0,
      conversionRatio: 1.06,
    });

    expect(totalCosts.CU).toBe(0);
    expect(totalCosts.CC).toBe(0);
  });

  test('returns zero CC when conversionRatio is zero', () => {
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts: 100,
      storageCosts: 50,
      additionalCosts: 25,
      conversionRatio: 0,
    });

    expect(totalCosts.CU).toBe(175);
    expect(totalCosts.CC).toBe(0);
  });
});

describe('calculateTotalCosts — conversion ratio', () => {
  test('applies conversion ratio correctly (0.5)', () => {
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts: 100,
      storageCosts: 0,
      additionalCosts: 0,
      conversionRatio: 0.5,
    });

    expect(totalCosts.CU).toBe(100);
    expect(totalCosts.CC).toBe(50);
  });

  test('applies conversion ratio correctly (1.0 — no change)', () => {
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts: 500,
      storageCosts: 200,
      additionalCosts: 74,
      conversionRatio: 1.0,
    });

    expect(totalCosts.CU).toBe(774);
    expect(totalCosts.CC).toBe(774);
  });

  test('CC = CU * conversionRatio for arbitrary values', () => {
    const conversionRatio = 0.35;
    const totalCosts = calculateTotalCosts({
      nodeConfigCosts: 1000,
      storageCosts: 500,
      additionalCosts: 148,
      conversionRatio,
    });

    expect(totalCosts.CC).toBeCloseTo(totalCosts.CU * conversionRatio, 10);
  });
});

describe('calculateTotalCosts — additivity of cost components', () => {
  test('CU equals sum of nodeConfig + storage + additional costs', () => {
    const nodeConfigCosts = 1200;
    const storageCosts = 300;
    const additionalCosts = 74;

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 1.0,
    });

    expect(totalCosts.CU).toBe(nodeConfigCosts + storageCosts + additionalCosts);
  });

  test('nodeConfig cost contribution is isolated correctly', () => {
    const nodeConfigCosts = 2073.6;

    const withNode = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts: 0,
      additionalCosts: 0,
      conversionRatio: 1.0,
    });

    expect(withNode.CU).toBe(nodeConfigCosts);
  });

  test('storage cost contribution is isolated correctly', () => {
    const storageCosts = 288;

    const withStorage = calculateTotalCosts({
      nodeConfigCosts: 0,
      storageCosts,
      additionalCosts: 0,
      conversionRatio: 1.0,
    });

    expect(withStorage.CU).toBe(storageCosts);
  });
});

describe('calculateTotalCosts — General Purpose full scenario', () => {
  test('total costs with General Purpose 16 CPU, standard+premium+snapshot storage, Standard1 Redis', () => {
    // nodeConfig: General Purpose, 16 CPU/64GB (CU=16), minAutoscaler=3, time=450, factor=1
    // 3 * 16 * 0.12 * 1 * 450 = 2592
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 450,
      computeUnits: 16,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });

    // storage: standard=1024GB, premium=1024GB, snapshot=2048GB, time=450
    // standard: 0.02 * 450 * 32 = 288
    // premium:  3 * 0.02 * 450 * 32 = 864
    // snapshot: 1 * 0.02 * 450 * 64 = 576
    // total: 1728
    const storageCosts = calculateStorageCosts({
      GBQuantity: 1024,
      premiumGBQuantity: 1024,
      snapshotGBQuantity: 2048,
      timeConsumption: 450,
    });

    const additionalCosts = calculateAdditionalCosts({ redis: 74 });

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 0.35,
    });

    expect(totalCosts.CU).toBe(4394);
    expect(totalCosts.CC.toFixed(2)).toBe('1537.90');
  });
});

describe('calculateTotalCosts — Memory Intensive full scenario', () => {
  test('total costs with Memory Intensive 4 CPU, standard+premium storage, Standard1 Redis', () => {
    // nodeConfig: Memory Intensive, 4 CPU/32GB (CU=4), minAutoscaler=3, time=720, factor=1.5
    // 3 * 4 * 0.12 * 1.5 * 720 = 1555.2
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    // storage: standard=64GB (2 blocks), premium=32GB (1 block), snapshot=0, time=720
    // standard: 0.02 * 720 * 2 = 28.8
    // premium:  3 * 0.02 * 720 * 1 = 43.2
    // total: 72
    const storageCosts = calculateStorageCosts({
      GBQuantity: 64,
      premiumGBQuantity: 32,
      snapshotGBQuantity: 0,
      timeConsumption: 720,
    });

    const additionalCosts = calculateAdditionalCosts({ redis: 74 });

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 1.0,
    });

    // 1555.2 + 72 + 74 = 1701.2
    expect(totalCosts.CU).toBeCloseTo(1701.2, 5);
    expect(totalCosts.CC).toBeCloseTo(1701.2, 5);
  });

  test('Memory Intensive total costs higher than General Purpose for same config', () => {
    const commonStorage = { GBQuantity: 64, premiumGBQuantity: 0, snapshotGBQuantity: 0, timeConsumption: 720 };
    const storageCosts = calculateStorageCosts(commonStorage);
    const additionalCosts = calculateAdditionalCosts({ redis: 0 });

    const gpNodeCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const miNodeCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    const gpTotal = calculateTotalCosts({ nodeConfigCosts: gpNodeCosts, storageCosts, additionalCosts, conversionRatio: 1 });
    const miTotal = calculateTotalCosts({ nodeConfigCosts: miNodeCosts, storageCosts, additionalCosts, conversionRatio: 1 });

    expect(miTotal.CU).toBeGreaterThan(gpTotal.CU);
    expect(miTotal.CU).toBeCloseTo(gpTotal.CU * 1.5 - storageCosts * 0.5, 5);
  });

  test('total costs with Memory Intensive 16 CPU, all storage types, Premium1 Redis', () => {
    // nodeConfig: Memory Intensive, 16 CPU/128GB (CU=16), minAutoscaler=3, time=720, factor=1.5
    // 3 * 16 * 0.12 * 1.5 * 720 = 6220.8
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 16,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    // storage: standard=128GB, premium=64GB, snapshot=128GB, time=720
    // standard: 0.02 * 720 * 4 = 57.6
    // premium:  3 * 0.02 * 720 * 2 = 86.4
    // snapshot: 1 * 0.02 * 720 * 4 = 57.6
    // total: 201.6
    const storageCosts = calculateStorageCosts({
      GBQuantity: 128,
      premiumGBQuantity: 64,
      snapshotGBQuantity: 128,
      timeConsumption: 720,
    });

    const additionalCosts = calculateAdditionalCosts({ redis: 773 }); // Premium1

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 0.5,
    });

    // CU: 6220.8 + 201.6 + 773 = 7195.4
    expect(totalCosts.CU).toBeCloseTo(7195.4, 5);
    expect(totalCosts.CC).toBeCloseTo(7195.4 * 0.5, 5);
  });
});