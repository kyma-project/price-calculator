import config from '../../../../config.json';
import { Slider, Title } from '@ui5/webcomponents-react';
import { useAtom } from 'jotai';
import { snapshotGiBQuantityState } from '../../../../state/storage/snapshotGiBQuantityState';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

export default function SnapshotGiBQuantityInputField() {
  const configuration = config.SnapshotStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [snapshotGiBQuantity, setSnapshotGiBQuantity] = useAtom(
    snapshotGiBQuantityState,
  );

  const { handleChange } = useStepInputValidation({
    setValue: setSnapshotGiBQuantity,
    min,
    max,
    step,
  });

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Cluster's Snapshot used Storage: number of GiB
      </Title>
      <SpinnerInput
        id="snapshot-gib-quantity-input"
        value={snapshotGiBQuantity}
        setValue={setSnapshotGiBQuantity}
        min={min}
        max={max}
        step={step}
        unit={`GiB`}
      />
      <Slider
        value={snapshotGiBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
