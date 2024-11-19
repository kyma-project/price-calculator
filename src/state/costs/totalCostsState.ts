import { atom, RecoilState } from 'recoil';
import calculateTotalCosts from '../../calculatorFunctions/totalCosts/calculateTotalCosts';
import calculateBaseConfigCosts from '../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import calculateStorageCosts from '../../calculatorFunctions/storageCosts/calculateStorageCosts';
import config from '../../config.json';

const baseConfigTimeConsumption = config.baseConfig.TimeConsumption.Default;
const minAutoscaler = config.baseConfig.AutoScalerMin.Default;
const vmMultiplier = config.baseConfig.VirtualMachineSize.Options[0].multiple;
const machineTypeFactor = config.baseConfig.machineTypeFactor.MachineTypes[0].multiple;
const baseConfigCosts = calculateBaseConfigCosts({
  timeConsumption: baseConfigTimeConsumption,
  minAutoscaler,
  vmMultiplier,
  machineTypeFactor
});

const GBQuantity = config.Storage.Default;
const premiumGBQuantity = config.Storage.Default;
const storageTimeConsumption = config.Storage.TimeConsumption.Default;
const storageCosts = calculateStorageCosts({
  GBQuantity,
  premiumGBQuantity,
  timeConsumption: storageTimeConsumption,
});

const additionalCosts = config.AdditionalConfig.Default;

const factor = config.ConversionRateCUCC;
const cost = calculateTotalCosts({ baseConfigCosts, storageCosts, additionalCosts, conversionRatio: factor});

export const totalCostsState: RecoilState<number> = atom<number>({
  key: 'totalCostsState',
  default: cost.CU,
});


export const totalCostsInCCState: RecoilState<number> = atom<number>({
  key: 'totalCostsInCCState',
  default: cost.CC
});

