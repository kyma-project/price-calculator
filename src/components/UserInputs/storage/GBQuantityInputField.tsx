import React from 'react';
import config from '../../../config.json';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import calculateStorageCosts from '../../../calculatorFunctions/storageCosts/calculateStorageCosts';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import {
  totalCostsInCCState,
  totalCostsState,
} from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';
import { additionalCostsState } from '../../../state/costs/additionalCostsState';

export default function GBQuantityInputField() {
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionStorageState,
  );
  const setStorageCosts = useSetRecoilState<number>(storageCostsState);
  const [value, setValue] = useRecoilState<number>(GBQuantityState);

  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const additionalCosts: number = useRecoilValue(additionalCostsState);
  const premiumGBQuantity: number = useRecoilValue<number>(
    premiumGBQuantityState,
  );
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);
  const setTotalCostsInCC = useSetRecoilState<number>(totalCostsInCCState);
  const conversionRatio: number = useRecoilValue(applyConversionRateState);

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
      premiumGBQuantity,
      timeConsumption,
    });
    setStorageCosts(storageCosts);

    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio,
    });
    setTotalCosts(totalCosts.CU);
    setTotalCostsInCC(totalCosts.CC);
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
