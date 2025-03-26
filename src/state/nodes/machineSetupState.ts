import { atom, RecoilState } from 'recoil';
import config from '../../config.json';

export interface MachineType {
  value: string;
  multiple: number;
  VMSizeOptions: VMSize[];
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
}

export const baseMachineSetupState: RecoilState<MachineSetup> =
  atom<MachineSetup>({
    key: 'baseMachineSetupState',
    default: {
      timeConsuption: config.nodeConfig.timeConsumption.Default,
      machineType: config.nodeConfig.MachineTypes[0],
      VMSize: config.nodeConfig.MachineTypes[0].VMSizeOptions[0],
      minAutoscaler: config.nodeConfig.AutoScalerMin.Default,
    },
  });

export const additionalMachineSetupState: RecoilState<MachineSetup[]> = atom<
  MachineSetup[]
>({
  key: 'additionalMachineSetupState',
  default: [],
});
