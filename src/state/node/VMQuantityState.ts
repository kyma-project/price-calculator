import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const VMQuantityState: RecoilState<number> = atom<number>({
  key: 'VMQuantityState',
  default: config.VirtualMachines.Default,
});
