import calculateNodeConfigCosts from '../nodeConfigCosts/calculateNodeConfigCosts';
import calculateStorageCosts from '../storageCosts/calculateStorageCosts';
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

    expect(totalCosts.CU).toBe(
      nodeConfigCosts + storageCosts + additionalCosts,
    );
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
  test('total costs with General Purpose 16 CPU, standard+nfs+snapshot storage, Standard1 Redis', () => {
    // nodeConfig: General Purpose, 16 CPU/64GiB (CU=16), minAutoscaler=3, time=450, factor=1
    // 3 * 16 * 0.12 * 1 * 450 = 2592
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 450,
      computeUnits: 16,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });

    // storage: standard=1024GiB, nfs=1024GiB, snapshot=2048GiB, time=450
    // standard: 0.02 * 450 * (32 - 1 free block) = 0.02 * 450 * 31 = 279
    // nfs:  3 * 0.02 * 450 * 32 = 864
    // snapshot: 1 * 0.02 * 450 * 64 = 576
    // total: 1719
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 1024,
      nfsGiBQuantity: 1024,
      snapshotGiBQuantity: 2048,
      timeConsumption: 450,
    });

    const additionalCosts = 74; // representative redis (additional) cost

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 0.35,
    });

    // CU: 2592 + 1719 + 74 = 4385;  CC: 4385 * 0.35 = 1534.75
    expect(totalCosts.CU).toBe(4385);
    expect(totalCosts.CC.toFixed(2)).toBe('1534.75');
  });
});

describe('calculateTotalCosts — Memory Intensive full scenario', () => {
  test('total costs with Memory Intensive 4 CPU, standard+nfs storage, Standard1 Redis', () => {
    // nodeConfig: Memory Intensive, 4 CPU/32GiB (CU=4), minAutoscaler=3, time=720, factor=1.5
    // 3 * 4 * 0.12 * 1.5 * 720 = 1555.2
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    // storage: standard=64GiB (2 blocks), nfs=32GiB (1 block), snapshot=0, time=720
    // standard: 0.02 * 720 * (2 - 1 free block) = 0.02 * 720 * 1 = 14.4
    // nfs:  3 * 0.02 * 720 * 1 = 43.2
    // total: 57.6
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 64,
      nfsGiBQuantity: 32,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    });

    const additionalCosts = 74; // representative redis (additional) cost

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 1.0,
    });

    // 1555.2 + 57.6 + 74 = 1686.8
    expect(totalCosts.CU).toBeCloseTo(1686.8, 5);
    expect(totalCosts.CC).toBeCloseTo(1686.8, 5);
  });

  test('Memory Intensive total costs higher than General Purpose for same config', () => {
    const commonStorage = {
      GiBQuantity: 64,
      nfsGiBQuantity: 0,
      snapshotGiBQuantity: 0,
      timeConsumption: 720,
    };
    const storageCosts = calculateStorageCosts(commonStorage);
    const additionalCosts = 0;

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

    const gpTotal = calculateTotalCosts({
      nodeConfigCosts: gpNodeCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 1,
    });
    const miTotal = calculateTotalCosts({
      nodeConfigCosts: miNodeCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 1,
    });

    expect(miTotal.CU).toBeGreaterThan(gpTotal.CU);
    expect(miTotal.CU).toBeCloseTo(gpTotal.CU * 1.5 - storageCosts * 0.5, 5);
  });

  test('total costs with Memory Intensive 16 CPU, all storage types, Premium1 Redis', () => {
    // nodeConfig: Memory Intensive, 16 CPU/128GiB (CU=16), minAutoscaler=3, time=720, factor=1.5
    // 3 * 16 * 0.12 * 1.5 * 720 = 6220.8
    const nodeConfigCosts = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 16,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    // storage: standard=128GiB, nfs=64GiB, snapshot=128GiB, time=720
    // standard: 0.02 * 720 * (4 - 1 free block) = 0.02 * 720 * 3 = 43.2
    // nfs:  3 * 0.02 * 720 * 2 = 86.4
    // snapshot: 1 * 0.02 * 720 * 4 = 57.6
    // total: 187.2
    const storageCosts = calculateStorageCosts({
      GiBQuantity: 128,
      nfsGiBQuantity: 64,
      snapshotGiBQuantity: 128,
      timeConsumption: 720,
    });

    const additionalCosts = 773; // representative redis (additional) cost

    const totalCosts = calculateTotalCosts({
      nodeConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: 0.5,
    });

    // CU: 6220.8 + 187.2 + 773 = 7181
    expect(totalCosts.CU).toBeCloseTo(7181, 5);
    expect(totalCosts.CC).toBeCloseTo(7181 * 0.5, 5);
  });
});
