import { atom } from 'jotai';
import config from '../../config.json';

export const premiumGBQuantityState = atom<number>(
  config.PremiumStorage.Default,
);
premiumGBQuantityState.debugLabel = 'premiumGBQuantityState';
