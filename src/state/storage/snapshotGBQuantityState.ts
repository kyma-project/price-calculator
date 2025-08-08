import { atom } from 'jotai';
import config from '../../config.json';

export const snapshotGBQuantityState = atom(config.SnapshotStorage.Default);
