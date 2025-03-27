import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const timeConsumptionState: RecoilState<number> = atom<number>({
  key: 'timeConsumptionState',
  default: config.AdditionalConfig.TimeConsumption,
});
