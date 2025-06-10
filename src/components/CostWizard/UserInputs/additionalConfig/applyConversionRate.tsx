import React from 'react';
import config from '../../../../config.json';
import { useRecoilState } from 'recoil';
import { Slider, Title } from '@ui5/webcomponents-react';
import { applyConversionRateState } from '../../../../state/additionalConfig/applyConversionRateState';
import InfoField from '../../common/InfoField';

export default function TimeConStorageInput() {
  const [value, setValue] = useRecoilState<number>(applyConversionRateState);

  const text = (
    <>
      <div>
        With the '<strong>conversion rate</strong>' you can change the amount of{' '}
        <strong>{config.CurrencyCode}</strong> you are paying for{' '}
        <strong>1 Capacity Unit</strong>.
      </div>
      <div>This will help you to calculate eventual discounts.</div>
      <div>
        If you are unsure about how to change the default value (
        {config.ConversionRateCUCC}), please ask your SAP Sales Specialist.
      </div>{' '}
    </>
  );

  const min = 0.01;
  const max = 1.2;
  const step = 0.01;

  function handleChange(event: any): void {
    const newValue: number = parseFloat(event.target.value);
    setValue(newValue);
  }

  return (
    <div>
      <InfoField info={text} />
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
