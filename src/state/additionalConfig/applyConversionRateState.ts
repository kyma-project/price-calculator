import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const applyConversionRateState: RecoilState<number> = atom<number>({
  key: 'applyConversionRateState',
  default: config.ConversionRateCUCC,
});
