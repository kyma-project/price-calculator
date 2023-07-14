import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export interface VMSize {
  value: string;
  multiple: number;
  nodes: number;
}

const defaultOption = config.baseConfig.VirtualMachineSize.Options[0];

export const VMsizeState: RecoilState<VMSize> = atom<VMSize>({
  key: 'VMsizeState',
  default: {
    value: defaultOption.value,
    multiple: defaultOption.multiple,
    nodes: defaultOption.nodes,
  },
});
