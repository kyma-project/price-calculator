import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const timeConsumptionStorageState: RecoilState<number> = atom<number>({
  key: 'timeConsumptionStorageState',
  default: config.Storage.TimeConsumption.Default,
});
