import { atom } from 'jotai';
import config from '../../config.json';

export const snapshotGiBQuantityState = atom<number>(
  config.SnapshotStorage.Default,
);
snapshotGiBQuantityState.debugLabel = 'snapshotGiBQuantityState';
