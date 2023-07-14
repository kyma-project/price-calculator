import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const minAutoscalerState: RecoilState<number> = atom<number>({
  key: 'minAutoscalerState',
  default: config.baseConfig.AutoScalerMin.Default,
});
