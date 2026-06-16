import calculateNodeConfigCosts from './calculateNodeConfigCosts';
import { expect, test, describe } from 'vitest';

// Config values (from config.json)
// nodeConfig.PricePerUnit (PPU) = 0.12
// Formula: minAutoscaler * computeUnits * PPU * machineTypeFactor * timeConsumption
//
// Every machine type sets multiple: 1 in config, so machineTypeFactor is 1.0 in
// production; the factor remains a generic multiplier the formula supports.

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

describe('calculateNodeConfigCosts — machineTypeFactor', () => {
  test('factor of 1 (the production value for every machine type) leaves cost unscaled', () => {
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

  test('doubling the factor doubles the cost', () => {
    const base = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const doubled = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 4,
      minAutoscaler: 3,
      machineTypeFactor: 2,
    });

    expect(doubled).toBe(base * 2);
  });

  test('cost scales linearly with minAutoscaler', () => {
    const base = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 8,
      minAutoscaler: 3,
      machineTypeFactor: 1,
    });
    const doubled = calculateNodeConfigCosts({
      timeConsumption: 720,
      computeUnits: 8,
      minAutoscaler: 6,
      machineTypeFactor: 1,
    });

    expect(doubled).toBe(base * 2);
  });
});
