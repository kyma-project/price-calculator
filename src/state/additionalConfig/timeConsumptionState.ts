import { atom } from 'jotai';
import config from '../../config.json';

export const timeConsumptionState = atom<number>(
  config.AdditionalConfig.TimeConsumption,
);
timeConsumptionState.debugLabel = 'timeConsumptionState';
