import { atom } from 'jotai';
import config from '../../config.json';

export const applyConversionRateState = atom<number>(config.ConversionRateCUCC);
applyConversionRateState.debugLabel = 'applyConversionRateState';
