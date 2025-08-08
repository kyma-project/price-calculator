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
}

export interface MachineSetup {
  machineType: MachineType;
  minAutoscaler: number;
  timeConsumption: number;
  VMSize: VMSize;
}

export const baseMachineSetupState = atom<MachineSetup>({
  timeConsumption: config.AdditionalConfig.TimeConsumption,
  machineType: config.nodeConfig.MachineTypes[0],
  VMSize: config.nodeConfig.MachineTypes[0].VMSizeOptions[0],
  minAutoscaler: config.nodeConfig.AutoScalerMin.Default,
});

export const additionalMachineSetupState = atom<MachineSetup[]>([]);
