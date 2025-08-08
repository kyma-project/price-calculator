import { atom } from 'jotai';
import config from '../../config.json';

export const applyConversionRateState = atom(config.ConversionRateCUCC);
