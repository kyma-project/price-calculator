import React from 'react';
import config from '../../../../config.json';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { useRecoilState } from 'recoil';
import { premiumGBQuantityState } from '../../../../state/storage/premiumGBQuantityState';

export default function PremiumGBQuantityInputField() {
  const configuration = config.PremiumStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [premiumGBQuantity, setPremiumGBQuantity] = useRecoilState<number>(
    premiumGBQuantityState,
  );

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setPremiumGBQuantity(newValue);
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        NFS Storage: number of GB
      </Title>
      <StepInput
        value={premiumGBQuantity}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={premiumGBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
