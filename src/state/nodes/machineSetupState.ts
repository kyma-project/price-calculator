import { atom, RecoilState } from 'recoil';

export interface MachineType {
  value: string;
  multiple: number;
}

export interface VMSize {
  value: string;
  multiple: number;
  nodes: number;
}

export interface MachineSetup {
  machineType: MachineType;
  minAutoscaler: number;
  timeConsuption: number;
  VMSize: VMSize;
  visible: boolean;
}

export const machineSetupState: RecoilState<MachineSetup[]> = atom<MachineSetup[]>({
  key: 'machineSetupState',
  default: [],
});
