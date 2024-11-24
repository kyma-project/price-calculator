import React from 'react';
import config from '../../../../config.json';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import { minAutoscalerState } from '../../../../state/baseConfig/minAutoscalerState';
import { VMSize, VMsizeState } from '../../../../state/baseConfig/VMsizeState';
import { timeConsumptionBaseConfigState } from '../../../../state/baseConfig/timeConsumptionState';
import { machineTypeState } from '../../../../state/baseConfig/machineTypeState';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import { useCostCalculator } from '../../../../calculatorFunctions/CostCalculatorContext';

export default function MinAutoscalerInputField() {
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const [value, setValue] = useRecoilState<number>(minAutoscalerState);

  const machineTypeFactor: number = useRecoilValue(machineTypeState).multiple;

  const configuration = config.baseConfig.AutoScalerMin;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const { updateBaseConfigCosts } = useCostCalculator();

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setValue(newValue);
    updateBaseConfigCosts({
      timeConsumption,
      vmMultiplier,
      minAutoscaler: newValue,
      machineTypeFactor,
    });
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
