import { atom, RecoilState } from 'recoil';
import calculateTotalCosts from '../../calculatorFunctions/totalCosts/calculateTotalCosts';
import calculateBaseConfigCosts from '../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import calculateNodeCosts from '../../calculatorFunctions/nodeCosts/calculateNodeCosts';
import calculateStorageCosts from '../../calculatorFunctions/storageCosts/calculateStorageCosts';
import config from '../../config.json';

const baseConfigTimeConsumption = config.baseConfig.TimeConsumption.Default;
const minAutoscaler = config.baseConfig.AutoScalerMin.Default;
const vmMultiplier = config.baseConfig.VirtualMachineSize.Options[0].multiple;
const baseConfigCosts = calculateBaseConfigCosts({
  timeConsumption: baseConfigTimeConsumption,
  minAutoscaler,
  vmMultiplier,
});

const vmQuantity = config.VirtualMachines.Default;
const nodeTimeConsumption = config.Nodes.TimeConsumption.Default;
const nodeCosts = calculateNodeCosts({
  vmQuantity,
  vmMultiplier,
  timeConsumption: nodeTimeConsumption,
});

const GBQuantity = config.Storage.Default;
const storageTimeConsumption = config.Storage.TimeConsumption.Default;
const storageCosts = calculateStorageCosts({
  GBQuantity,
  timeConsumption: storageTimeConsumption,
});

export const totalCostsState: RecoilState<number> = atom<number>({
  key: 'totalCostsState',
  default: calculateTotalCosts({ baseConfigCosts, nodeCosts, storageCosts }),
});
