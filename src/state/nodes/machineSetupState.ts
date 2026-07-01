import { atom } from 'jotai';
import config from '../../config.json';

export interface MachineType {
  value: string;
  multiple: number;
  VMSizeOptions: VMSize[];
}

export interface VMSize {
  value: string;
  computeUnits: number;
  vcpus: number;
  memoryGib: number;
}

export interface MachineSetup {
  id: string;
  machineType: MachineType;
  minAutoscaler: number;
  VMSize: VMSize;
  additionalVolumeGib: number;
}

export const baseMachineSetupState = atom<MachineSetup>({
  id: 'base',
  machineType: config.nodeConfig.MachineTypes[0],
  VMSize: config.nodeConfig.MachineTypes[0].VMSizeOptions[0],
  minAutoscaler: config.nodeConfig.AutoScalerMin.Default,
  additionalVolumeGib: 0,
});
baseMachineSetupState.debugLabel = 'baseMachineSetupState';

export const additionalMachineSetupState = atom<MachineSetup[]>([]);
additionalMachineSetupState.debugLabel = 'additionalMachineSetupState';
