import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const additionalCostsState: RecoilState<number> = atom<number>({
  key: 'additionalCostsState',
  default: config.AdditionalConfig.Default,
});
