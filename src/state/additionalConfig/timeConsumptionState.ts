import { atom } from 'jotai';
import config from '../../config.json';

export const timeConsumptionState = atom(
  config.AdditionalConfig.TimeConsumption,
);
