import { atom, RecoilState } from 'recoil';
import calculateNodeCosts from '../../calculatorFunctions/nodeCosts/calculateNodeCosts';
import config from '../../config.json';

const vmQuantity = config.VirtualMachines.Default;
const vmMultiplier = config.baseConfig.VirtualMachineSize.Options[0].multiple;
const timeConsumption = config.Nodes.TimeConsumption.Default;

export const nodeCostsState: RecoilState<number> = atom<number>({
  key: 'nodeCostsState',
  default: calculateNodeCosts({ vmQuantity, vmMultiplier, timeConsumption }),
});
