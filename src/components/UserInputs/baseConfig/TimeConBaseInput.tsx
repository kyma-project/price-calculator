import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import calculateBaseConfigCosts from '../../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import TimeConsumptionInputField from '../../CostWizard/common/TimeConsumptionInputField';

export default function TimeConBaseInput() {
  const minAutoscaler: number = useRecoilValue<number>(minAutoscalerState);
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const setBaseConfigCosts = useSetRecoilState<number>(baseConfigCostsState);
  const [value, setValue] = useRecoilState<number>(
    timeConsumptionBaseConfigState,
  );

  const nodeCosts: number = useRecoilValue(nodeCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const baseConfigCosts = calculateBaseConfigCosts({
      vmMultiplier,
      timeConsumption: newValue,
      minAutoscaler,
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
    <TimeConsumptionInputField value={value} handleChange={handleChange} />
  );
}
