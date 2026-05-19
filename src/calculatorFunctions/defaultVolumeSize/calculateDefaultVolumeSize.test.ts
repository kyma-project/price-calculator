import calculateDefaultVolumeSize from './calculateDefaultVolumeSize';
import { expect, test, describe } from 'vitest';

// Config values (from config.json → nodeConfig.volumeFormula)
//   volumeBase   = 30
//   volumeFactor = 8
//   volumeMin    = 80
//   volumeMax    = 250
//
// Formula:
//   normalized = max(vcpus / 2, memoryGib / 8)
//   raw        = floor(volumeBase + normalized * volumeFactor)
//   size       = min(volumeMax, max(volumeMin, raw))

describe('calculateDefaultVolumeSize — General Purpose (1:4 CPU:RAM)', () => {
  test('2 CPU / 8 GB clamps up to volumeMin', () => {
    // normalized = max(1, 1) = 1; raw = 38 → 80
    expect(calculateDefaultVolumeSize(2, 8)).toBe(80);
  });

  test('16 CPU / 64 GB sits inside the range', () => {
    // normalized = max(8, 8) = 8; raw = 94
    expect(calculateDefaultVolumeSize(16, 64)).toBe(94);
  });

  test('48 CPU / 192 GB sits near the top of the range', () => {
    // normalized = max(24, 24) = 24; raw = 222
    expect(calculateDefaultVolumeSize(48, 192)).toBe(222);
  });

  test('64 CPU / 256 GB clamps down to volumeMax', () => {
    // normalized = max(32, 32) = 32; raw = 286 → 250
    expect(calculateDefaultVolumeSize(64, 256)).toBe(250);
  });
});

describe('calculateDefaultVolumeSize — Compute Optimized (CPU dominates)', () => {
  test('2 CPU / 4 GB clamps up to volumeMin (vcpus wins)', () => {
    // normalized = max(1, 0.5) = 1; raw = 38 → 80
    expect(calculateDefaultVolumeSize(2, 4)).toBe(80);
  });

  test('32 CPU / 64 GB sits inside the range', () => {
    // normalized = max(16, 8) = 16; raw = 158
    expect(calculateDefaultVolumeSize(32, 64)).toBe(158);
  });
});

describe('calculateDefaultVolumeSize — Memory Intensive (RAM dominates)', () => {
  test('2 CPU / 16 GB clamps up to volumeMin (memoryGib wins)', () => {
    // normalized = max(1, 2) = 2; raw = 46 → 80
    expect(calculateDefaultVolumeSize(2, 16)).toBe(80);
  });

  test('8 CPU / 64 GB sits inside the range', () => {
    // normalized = max(4, 8) = 8; raw = 94
    expect(calculateDefaultVolumeSize(8, 64)).toBe(94);
  });

  test('64 CPU / 512 GB clamps down to volumeMax', () => {
    // normalized = max(32, 64) = 64; raw = 542 → 250
    expect(calculateDefaultVolumeSize(64, 512)).toBe(250);
  });
});
