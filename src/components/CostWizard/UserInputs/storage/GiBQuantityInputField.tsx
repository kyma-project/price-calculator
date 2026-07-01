import { useAtom } from 'jotai';
import config from '../../../../config.json';
import { Slider, Title } from '@ui5/webcomponents-react';
import { GiBQuantityState } from '../../../../state/storage/GiBQuantityState';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

export default function GiBQuantityInputField() {
  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;
  const [GiBQuantity, setGiBQuantity] = useAtom(GiBQuantityState);
  const { handleChange } = useStepInputValidation({
    setValue: setGiBQuantity,
    min,
    max,
    step,
  });

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Standard Storage: number of GiB
      </Title>
      <SpinnerInput
        id="gib-quantity-input"
        value={GiBQuantity}
        setValue={setGiBQuantity}
        min={min}
        max={max}
        step={step}
        unit={`GiB`}
      />
      <Slider
        value={GiBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
