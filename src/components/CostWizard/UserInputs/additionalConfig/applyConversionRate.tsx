import React from 'react';
import config from '../../../../config.json';
import { useRecoilState } from 'recoil';
import { Slider, Title } from '@ui5/webcomponents-react';
import { applyConversionRateState } from '../../../../state/additionalConfig/applyConversionRateState';

export default function TimeConStorageInput() {
  const [value, setValue] = useRecoilState<number>(applyConversionRateState);

  const min = 0.01;
  const max = 1;
  const step = 0.01;

  function handleChange(event: any): void {
    const newValue: number = parseFloat(event.target.value);
    setValue(newValue);
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
