import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const timeConsumptionBaseConfigState: RecoilState<number> = atom<number>(
  {
    key: 'timeConsumptionBaseConfigState',
    default: config.baseConfig.TimeConsumption.Default,
  },
);
