import React, { useRef } from 'react';
import { useAtom } from 'jotai';
import config from '../../../../config.json';
import {
  Slider,
  StepInput,
  StepInputDomRef,
  Title,
} from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../../state/storage/GBQuantityState';

export default function GBQuantityInputField() {
  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [GBQuantity, setGBQuantity] = useAtom(GBQuantityState);
  const stepInputRef = useRef<StepInputDomRef>(null);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue % step === 0 && newValue >= min && newValue <= max) {
      setGBQuantity(newValue);
    } else if (stepInputRef.current) {
      const input = stepInputRef.current.shadowRoot?.querySelector('ui5-input');
      input?.setAttribute('value', String(GBQuantity));
    }
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Standard Storage: number of GB
      </Title>
      <StepInput
        id={'gb-quantity-input'}
        ref={stepInputRef}
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
