import { atom } from 'jotai';
import config from '../../config.json';

export const premiumGBQuantityState = atom(config.PremiumStorage.Default);
