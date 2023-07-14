import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const GBQuantityState: RecoilState<number> = atom<number>({
  key: 'GBQuantityState',
  default: config.Storage.Default,
});
