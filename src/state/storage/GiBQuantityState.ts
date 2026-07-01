import { atom } from 'jotai';
import config from '../../config.json';

export const GiBQuantityState = atom<number>(config.Storage.Default);
GiBQuantityState.debugLabel = 'GiBQuantityState';
