import { atom } from 'jotai';
import config from '../../config.json';

export const nfsGiBQuantityState = atom<number>(config.NFSStorage.Default);
nfsGiBQuantityState.debugLabel = 'nfsGiBQuantityState';
