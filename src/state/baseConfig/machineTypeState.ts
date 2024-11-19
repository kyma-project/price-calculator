import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export interface MachineType {
  value: string;
  multiple: number;
}

const defaultOption = config.baseConfig.machineTypeFactor.MachineTypes[0];

export const machineTypeState: RecoilState<MachineType> = atom<MachineType>({
  key: 'machineTypeState',
  default: {
    value: defaultOption.value,
    multiple: defaultOption.multiple,
  },
});
