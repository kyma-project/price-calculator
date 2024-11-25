import React from 'react';
import config from '../../../../config.json';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { useRecoilState } from 'recoil';
import { GBQuantityState } from '../../../../state/storage/GBQuantityState';

export default function GBQuantityInputField() {
  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [GBQuantity, setGBQuantity] = useRecoilState<number>(GBQuantityState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setGBQuantity(newValue);
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Standard Storage: number of GB
      </Title>
      <StepInput
        value={GBQuantity}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={GBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
