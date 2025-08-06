import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const snapshotGBQuantityState: RecoilState<number> = atom<number>({
  key: 'snapshotGBQuantityState',
  default: config.SnapshotStorage.Default,
});
