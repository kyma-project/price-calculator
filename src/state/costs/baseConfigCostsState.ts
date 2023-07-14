import { atom, RecoilState } from 'recoil';
import calculateBaseConfigCosts from '../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import config from '../../config.json';

const timeConsumption = config.baseConfig.TimeConsumption.Default;
const minAutoscaler = config.baseConfig.AutoScalerMin.Default;
const vmMultiplier = config.baseConfig.VirtualMachineSize.Options[0].multiple;

export const baseConfigCostsState: RecoilState<number> = atom<number>({
  key: 'baseConfigCostsState',
  default: calculateBaseConfigCosts({
    timeConsumption,
    minAutoscaler,
    vmMultiplier,
  }),
});
