import React from 'react';
import config from '../../../../config.json';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Slider, Title } from '@ui5/webcomponents-react';
import { storageCostsState } from '../../../../state/costs/storageCostsState';
import { additionalCostsState } from '../../../../state/costs/additionalCostsState';
import { baseConfigCostsState } from '../../../../state/costs/baseConfigCostsState';
import { applyConversionRateState } from '../../../../state/additionalConfig/applyConversionRateState';
import {
  totalCostsInCCState,
  totalCostsState,
} from '../../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../../calculatorFunctions/totalCosts/calculateTotalCosts';

export default function TimeConStorageInput() {
  const baseConfigCosts: number = useRecoilValue(baseConfigCostsState);
  const additionalCosts: number = useRecoilValue(additionalCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);
  const setTotalCostsInCC = useSetRecoilState<number>(totalCostsInCCState);
  const [value, setValue] = useRecoilState<number>(applyConversionRateState);

  const min = 0.01;
  const max = 1;
  const step = 0.01;

  function handleChange(event: any): void {
    const newValue: number = parseFloat(event.target.value);
    if (newValue === value) return;
    setValue(newValue);

    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio: newValue,
    });
    setTotalCosts(totalCosts.CU);
    setTotalCostsInCC(totalCosts.CC);
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Conversion rate from Capacity Units to {config.CurrencyCode}
      </Title>
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
