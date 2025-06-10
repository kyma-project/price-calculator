import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const premiumGBQuantityState: RecoilState<number> = atom<number>({
  key: 'premiumGBQuantityState',
  default: config.PremiumStorage.Default,
});
