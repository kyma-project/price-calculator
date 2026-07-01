import { atom } from 'jotai';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from './nodes/machineSetupState';
import { GiBQuantityState } from './storage/GiBQuantityState';
import { nfsGiBQuantityState } from './storage/nfsGiBQuantityState';
import { snapshotGiBQuantityState } from './storage/snapshotGiBQuantityState';
import { timeConsumptionState } from './additionalConfig/timeConsumptionState';
import { applyConversionRateState } from './additionalConfig/applyConversionRateState';
import { redisState } from './additionalConfig/redisState';
import calculateNodeConfigCosts from '../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';
import calculateAdditionalNodeVolumeCosts from '../calculatorFunctions/storageCosts/calculateAdditionalNodeVolumeCosts';
import calculateStorageCosts from '../calculatorFunctions/storageCosts/calculateStorageCosts';
import calculateAdditionalCosts from '../calculatorFunctions/additionalConfig/calculateAdditionalCosts';
import calculateTotalCosts, {
  TotalCosts,
} from '../calculatorFunctions/totalCosts/calculateTotalCosts';

export const nodeConfigCostsAtom = atom<number>((get) => {
  const baseMachineSetup = get(baseMachineSetupState);
  const additionalMachineSetup = get(additionalMachineSetupState);
  const combinedMachineSetup = [baseMachineSetup, ...additionalMachineSetup];
  const timeConsumption = get(timeConsumptionState);

  return combinedMachineSetup.reduce((total, machine) => {
    const computeCost = calculateNodeConfigCosts({
      timeConsumption,
      computeUnits: machine.VMSize.computeUnits,
      minAutoscaler: machine.minAutoscaler,
      machineTypeFactor: machine.machineType.multiple,
    });
    return total + computeCost;
  }, 0);
});
nodeConfigCostsAtom.debugLabel = 'nodeConfigCostsAtom';

export const storageCostsAtom = atom<number>((get) => {
  const GiBQuantity = get(GiBQuantityState);
  const nfsGiBQuantity = get(nfsGiBQuantityState);
  const snapshotGiBQuantity = get(snapshotGiBQuantityState);
  const timeConsumption = get(timeConsumptionState);

  // Additional node volume is billed as storage, scaled per pool by autoscaler min.
  const baseMachineSetup = get(baseMachineSetupState);
  const additionalMachineSetup = get(additionalMachineSetupState);
  const combinedMachineSetup = [baseMachineSetup, ...additionalMachineSetup];
  const additionalVolumeCost = combinedMachineSetup.reduce(
    (total, machine) =>
      total +
      calculateAdditionalNodeVolumeCosts({
        additionalVolumeGib: machine.additionalVolumeGib,
        minAutoscaler: machine.minAutoscaler,
        timeConsumption,
      }),
    0,
  );

  return (
    calculateStorageCosts({
      GiBQuantity,
      nfsGiBQuantity,
      snapshotGiBQuantity,
      timeConsumption,
    }) + additionalVolumeCost
  );
});
storageCostsAtom.debugLabel = 'storageCostsAtom';

export const additionalCostsAtom = atom<number>((get) => {
  const redis = get(redisState);
  const timeConsumption = get(timeConsumptionState);
  return calculateAdditionalCosts({
    redisStorageGib: redis.storageGib,
    timeConsumption,
  });
});
additionalCostsAtom.debugLabel = 'additionalCostsAtom';

export const totalCostsAtom = atom<TotalCosts>((get) => {
  const nodeConfigCosts = get(nodeConfigCostsAtom);
  const storageCosts = get(storageCostsAtom);
  const additionalCosts = get(additionalCostsAtom);
  const conversionRatio = get(applyConversionRateState);

  return calculateTotalCosts({
    nodeConfigCosts,
    storageCosts,
    additionalCosts,
    conversionRatio,
  });
});
totalCostsAtom.debugLabel = 'totalCostsAtom';
