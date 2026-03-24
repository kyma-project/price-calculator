import config from '../../../../config.json';
import { Slider, StepInput, Title } from '@ui5/webcomponents-react';
import { useAtom } from 'jotai';
import { snapshotGBQuantityState } from '../../../../state/storage/snapshotGBQuantityState';
import useStepInputValidation from '../../hooks/useStepInputValidation';

export default function SnapshotGBQuantityInputField() {
  const configuration = config.SnapshotStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [snapshotGBQuantity, setSnapshotGBQuantity] = useAtom(
    snapshotGBQuantityState,
  );

  const { stepInputRef, handleChange } = useStepInputValidation({
    value: snapshotGBQuantity,
    setValue: setSnapshotGBQuantity,
    min,
    max,
    step,
  });

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
