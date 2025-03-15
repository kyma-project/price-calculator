import { atom, RecoilState } from 'recoil';
import { MachineType, machineTypeState } from './baseConfig/machineTypeState';
import { VMSize, VMsizeState } from './baseConfig/VMsizeState';

export interface MachineSetup {
  machineType: MachineType;
  minAutoscaler: number;
  timeConsuption: number;
  VMSize: VMSize;
  costCalulation: number;
  visible: boolean;
}

export const machineSetupState: RecoilState<MachineSetup[]> = atom<MachineSetup[]>({
  key: 'machineSetupState',
  default: [],
});
