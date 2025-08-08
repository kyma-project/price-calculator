import React, { useRef } from 'react';
import config from '../../../../config.json';
import {
  Slider,
  StepInput,
  StepInputDomRef,
  Title,
} from '@ui5/webcomponents-react';
import { useAtom } from 'jotai';
import { snapshotGBQuantityState } from '../../../../state/storage/snapshotGBQuantityState';

export default function SnapshotGBQuantityInputField() {
  const configuration = config.SnapshotStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [snapshotGBQuantity, setSnapshotGBQuantity] = useAtom(
    snapshotGBQuantityState,
  );
  const stepInputRef = useRef<StepInputDomRef>(null);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue % step === 0 && newValue >= min && newValue <= max) {
      setSnapshotGBQuantity(newValue);
    } else if (stepInputRef.current) {
      const input = stepInputRef.current.shadowRoot?.querySelector('ui5-input');
      input?.setAttribute('value', String(snapshotGBQuantity));
    }
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Cluster's Snapshot used Storage: number of GB
      </Title>
      <StepInput
        id={'snapshot-gb-quantity-input'}
        ref={stepInputRef}
        value={snapshotGBQuantity}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={snapshotGBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
