import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import calculateStorageCosts from '../../../calculatorFunctions/storageCosts/calculateStorageCosts';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import TimeConsumptionInputField from '../../CostWizard/common/TimeConsumptionInputField';

export default function TimeConStorageInput() {
  const GBQuantity: number = useRecoilValue<number>(GBQuantityState);
  const setStorageCosts = useSetRecoilState<number>(storageCostsState);
  const [value, setValue] = useRecoilState<number>(timeConsumptionStorageState);

  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const nodeCosts: number = useRecoilValue(nodeCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const storageCosts = calculateStorageCosts({
      GBQuantity,
      timeConsumption: newValue,
    });
    setStorageCosts(storageCosts);

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
