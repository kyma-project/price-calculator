import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export const timeConsumptionNodeState: RecoilState<number> = atom<number>({
  key: 'timeConsumptionNodeState',
  default: config.Nodes.TimeConsumption.Default,
});
