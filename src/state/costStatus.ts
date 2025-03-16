import { atom, RecoilState } from 'recoil';

export const costNodeState: RecoilState<number[]> = atom<number[]>({
  key: 'costNodeState',
  default: [],
});
