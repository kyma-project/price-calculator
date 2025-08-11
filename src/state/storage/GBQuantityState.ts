import { atom } from 'jotai';
import config from '../../config.json';

export const GBQuantityState = atom<number>(config.Storage.Default);
GBQuantityState.debugLabel = 'GBQuantityState';
