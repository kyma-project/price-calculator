import calculateNodeConfigCosts from './calculateNodeConfigCosts';
import { expect, test, describe } from 'vitest';

// Config values (from config.json)
// nodeConfig.PricePerUnit (PPU) = 0.12
// Formula: minAutoscaler * computeUnits * PPU * machineTypeFactor * timeConsumption
//
// Machine types:
//   General Purpose  → machineTypeFactor = 1.0
//   Compute Optimized → machineTypeFactor = 1.0
//   Memory Intensive  → machineTypeFactor = 1.5

describe('calculateNodeConfigCosts — zero / boundary cases', () => {
  test('returns zero when minAutoscaler is zero', () => {
    const cost = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 0,
      machineTypeFactor: 1,
    });

    expect(cost).toBe(0);
  });

  test('returns zero when timeConsumption is zero', () => {
    const cost = calculateNodeConfigCosts({
      timeConsumption: 0,
      computeUnits: 4,
      minAutoscaler: 6,
      machineTypeFactor: 1,
    });

    expect(cost).toBe(0);
  });
});

describe('calculateNodeConfigCosts — General Purpose (factor = 1.0)', () => {
  // VM sizes: 2CPU/8GB→CU3, 4CPU/16GB→CU4, 8CPU/32GB→CU8,
  //           16CPU/64GB→CU16, 32CPU/128GB→CU32, 48CPU/192GB→CU48, 64CPU/256GB→CU64

  test('2 CPU - 8 GB RAM (computeUnits=3), minAutoscaler=3, time=720', () => {
    // 3 * 3 * 0.12 * 1 * 720 = 777.6
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 3,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(777.6);
  });

  test('4 CPU - 16 GB RAM (computeUnits=4), minAutoscaler=3, time=720', () => {
    // 3 * 4 * 0.12 * 1 * 720 = 1036.8
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 4,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(1036.8);
  });

  test('8 CPU - 32 GB RAM (computeUnits=8), minAutoscaler=3, time=720', () => {
    // 3 * 8 * 0.12 * 1 * 720 = 2073.6
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 8,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(2073.6);
  });

  test('16 CPU - 64 GB RAM (computeUnits=16), minAutoscaler=3, time=720', () => {
    // 3 * 16 * 0.12 * 1 * 720 = 4147.2
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 16,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(4147.2);
  });

  test('32 CPU - 128 GB RAM (computeUnits=32), minAutoscaler=3, time=720', () => {
    // 3 * 32 * 0.12 * 1 * 720 = 8294.4
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 32,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(8294.4);
  });

  test('48 CPU - 192 GB RAM (computeUnits=48), minAutoscaler=3, time=720', () => {
    // 3 * 48 * 0.12 * 1 * 720 = 12441.6
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 48,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(12441.6);
  });

  test('64 CPU - 256 GB RAM (computeUnits=64), minAutoscaler=3, time=720', () => {
    // 3 * 64 * 0.12 * 1 * 720 = 16588.8
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 64,
        minAutoscaler: 3,
        machineTypeFactor: 1,
      }),
    ).toBe(16588.8);
  });

  test('costs of minAutoscaler=6 with computeUnits=4, time=720', () => {
    // 6 * 4 * 0.12 * 1 * 720 = 2073.6
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 4,
        minAutoscaler: 6,
        machineTypeFactor: 1,
      }),
    ).toBe(2073.6);
  });
});

describe('calculateNodeConfigCosts — Memory Intensive (factor = 1.5)', () => {
  // VM sizes: 2CPU/16GB→CU3, 4CPU/32GB→CU4, 8CPU/64GB→CU8,
  //           16CPU/128GB→CU16, 32CPU/256GB→CU32, 48CPU/384GB→CU48, 64CPU/512GB→CU64

  test('2 CPU - 16 GB RAM (computeUnits=3), minAutoscaler=3, time=720', () => {
    // 3 * 3 * 0.12 * 1.5 * 720 = 1166.4
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 3,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(1166.4);
  });

  test('4 CPU - 32 GB RAM (computeUnits=4), minAutoscaler=3, time=720', () => {
    // 3 * 4 * 0.12 * 1.5 * 720 = 1555.2
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 4,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(1555.2);
  });

  test('8 CPU - 64 GB RAM (computeUnits=8), minAutoscaler=3, time=720', () => {
    // 3 * 8 * 0.12 * 1.5 * 720 = 3110.4
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 8,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(3110.4);
  });

  test('16 CPU - 128 GB RAM (computeUnits=16), minAutoscaler=3, time=720', () => {
    // 3 * 16 * 0.12 * 1.5 * 720 = 6220.8
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 16,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(6220.8);
  });

  test('32 CPU - 256 GB RAM (computeUnits=32), minAutoscaler=3, time=720', () => {
    // 3 * 32 * 0.12 * 1.5 * 720 = 12441.6
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 32,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(12441.6);
  });

  test('48 CPU - 384 GB RAM (computeUnits=48), minAutoscaler=3, time=720', () => {
    // 3 * 48 * 0.12 * 1.5 * 720 = 18662.4
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 48,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(18662.4);
  });

  test('64 CPU - 512 GB RAM (computeUnits=64), minAutoscaler=3, time=720', () => {
    // 3 * 64 * 0.12 * 1.5 * 720 = 24883.2
    expect(
      calculateNodeConfigCosts({
        timeConsumption: 720,
        computeUnits: 64,
        minAutoscaler: 3,
        machineTypeFactor: 1.5,
      }),
    ).toBe(24883.2);
  });
});

describe('calculateNodeConfigCosts — machine type factor comparisons', () => {
  test('Memory Intensive costs exactly 1.5x General Purpose for same config', () => {
    const generalPurpose = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const memoryIntensive = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });

    expect(memoryIntensive).toBeCloseTo(generalPurpose * 1.5, 5);
  });

  test('Compute Optimized costs same as General Purpose (both factor = 1.0)', () => {
    const generalPurpose = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const computeOptimized = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });

    expect(computeOptimized).toBe(generalPurpose);
  });

  test('applies machineTypeFactor correctly — doubling factor doubles cost', () => {
    const baseCost = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const doubledCost = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 2,
    });

    expect(doubledCost).toBe(baseCost * 2);
  });

  test('cost scales linearly with minAutoscaler', () => {
    const base = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 8,
      minAutoscaler: 3,
      machineTypeFactor: 1.5,
    });
    const doubled = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 8,
      minAutoscaler: 6,
      machineTypeFactor: 1.5,
    });

    expect(doubled).toBe(base * 2);
  });
});