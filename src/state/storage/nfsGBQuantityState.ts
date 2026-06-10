import { atom } from 'jotai';
import config from '../../config.json';

export const nfsGBQuantityState = atom<number>(config.NFSStorage.Default);
nfsGBQuantityState.debugLabel = 'nfsGBQuantityState';
