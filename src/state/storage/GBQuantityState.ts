import { atom } from 'jotai';
import config from '../../config.json';

export const GBQuantityState = atom(config.Storage.Default);
