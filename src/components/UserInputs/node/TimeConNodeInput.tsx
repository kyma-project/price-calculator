import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timeConsumptionNodeState } from '../../../state/node/timeConsumptionState';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { VMQuantityState } from '../../../state/node/VMQuantityState';
import calculateNodeCosts from '../../../calculatorFunctions/nodeCosts/calculateNodeCosts';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import TimeConsumptionInputField from '../../CostWizard/common/TimeConsumptionInputField';

export default function TimeConNodeInput() {
  const vmQuantity: number = useRecoilValue<number>(VMQuantityState);
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const setNodeCosts = useSetRecoilState<number>(nodeCostsState);
  const [value, setValue] = useRecoilState<number>(timeConsumptionNodeState);

  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const nodeCosts = calculateNodeCosts({
      vmQuantity,
      vmMultiplier,
      timeConsumption: newValue,
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
    <TimeConsumptionInputField value={value} handleChange={handleChange} />
  );
}
