import React from 'react';
import config from '../../../config.json';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import { VMQuantityState } from '../../../state/node/VMQuantityState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { timeConsumptionNodeState } from '../../../state/node/timeConsumptionState';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import calculateNodeCosts from '../../../calculatorFunctions/nodeCosts/calculateNodeCosts';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import HeaderWithInfo from '../../CostWizard/common/HeaderWithInfo';

export default function VMQuantityInputField() {
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionNodeState,
  );
  const setNodeCosts = useSetRecoilState<number>(nodeCostsState);
  const [value, setValue] = useRecoilState<number>(VMQuantityState);

  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  const configuration = config.VirtualMachines;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const nodeCosts = calculateNodeCosts({
      vmQuantity: newValue,
      vmMultiplier,
      timeConsumption,
    });
    setNodeCosts(nodeCosts);

    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      nodeCosts,
      storageCosts,
    });
    setTotalCosts(totalCosts);
  }

  return (
    <>
      <HeaderWithInfo
        header="Virtual Machines"
        info="based on chosen VM size"
      />
      <StepInput
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={value}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
