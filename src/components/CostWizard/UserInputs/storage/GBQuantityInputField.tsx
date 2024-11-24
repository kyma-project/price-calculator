import React from 'react';
import config from '../../../../config.json';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../../state/storage/GBQuantityState';
import { timeConsumptionStorageState } from '../../../../state/storage/timeConsumptionState';
import { premiumGBQuantityState } from '../../../../state/storage/premiumGBQuantityState';
import { useCostCalculator } from '../../../../calculatorFunctions/CostCalculatorContext';

export default function GBQuantityInputField() {
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const [value, setValue] = useRecoilState<number>(GBQuantityState);
  const premiumGBQuantity: number = useRecoilValue<number>(
    premiumGBQuantityState,
  );

  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const { updateStorageCosts } = useCostCalculator();

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setValue(newValue);

    updateStorageCosts({
      GBQuantity: newValue,
      premiumGBQuantity,
      timeConsumption,
    });
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Standard Storage: number of GB
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
