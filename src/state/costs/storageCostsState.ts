import { atom, RecoilState } from 'recoil';
import calculateStorageCosts from '../../calculatorFunctions/storageCosts/calculateStorageCosts';
import config from '../../config.json';

const GBQuantity = config.Storage.Default;
const timeConsumption = config.Storage.TimeConsumption.Default;

export const storageCostsState: RecoilState<number> = atom<number>({
  key: 'storageCostsState',
  default: calculateStorageCosts({ GBQuantity, timeConsumption }),
});
