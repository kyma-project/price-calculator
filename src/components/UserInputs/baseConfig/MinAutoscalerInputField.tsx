import React from 'react';
import config from '../../../config.json';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import calculateBaseConfigCosts from '../../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import HeaderWithInfo from '../../CostWizard/common/HeaderWithInfo';

export default function MinAutoscalerInputField() {
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const setBaseConfigCosts = useSetRecoilState<number>(baseConfigCostsState);
  const [value, setValue] = useRecoilState<number>(minAutoscalerState);

  const nodeCosts: number = useRecoilValue(nodeCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  const configuration = config.baseConfig.AutoScalerMin;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const baseConfigCosts = calculateBaseConfigCosts({
      vmMultiplier,
      timeConsumption,
      minAutoscaler: newValue,
    });
    setBaseConfigCosts(baseConfigCosts);

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
        header="Autoscaler Min"
        info="minimum number of available Virtual Machines"
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
