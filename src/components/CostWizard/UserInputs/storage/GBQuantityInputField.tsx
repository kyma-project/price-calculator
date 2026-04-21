import { useAtom } from 'jotai';
import config from '../../../../config.json';
import { Slider, Title } from '@ui5/webcomponents-react';
import { GBQuantityState } from '../../../../state/storage/GBQuantityState';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';



export default function GBQuantityInputField() {
  const configuration = config.Storage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;
  const [GBQuantity, setGBQuantity] = useAtom(GBQuantityState);
  const { handleChange } = useStepInputValidation({
    value: GBQuantity,
    setValue: setGBQuantity,
    min,
    max,
    step,
  });

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Standard Storage: number of GB
      </Title>
      <SpinnerInput
        value={GBQuantity}
        setValue={setGBQuantity}
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
