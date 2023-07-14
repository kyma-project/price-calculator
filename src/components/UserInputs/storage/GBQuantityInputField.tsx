import React from 'react';
import config from '../../../config.json';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import calculateStorageCosts from '../../../calculatorFunctions/storageCosts/calculateStorageCosts';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';

export default function GBQuantityInputField() {
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const setStorageCosts = useSetRecoilState<number>(storageCostsState);
  const [value, setValue] = useRecoilState<number>(GBQuantityState);

  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const nodeCosts: number = useRecoilValue(nodeCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const storageCosts = calculateStorageCosts({
      GBQuantity: newValue,
      timeConsumption,
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
    <div>
      <Title className="wizard-subheader" level="H5">
        Number of GB
      </Title>
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
    </div>
  );
}
