import { useAtom } from 'jotai';
import config from '../../../../config.json';
import { Slider, Title } from '@ui5/webcomponents-react';
import { applyConversionRateState } from '../../../../state/additionalConfig/applyConversionRateState';
import SpinnerInput from '../common/SpinnerInput';

export default function ConversionRateInput() {
  const [value, setValue] = useAtom(applyConversionRateState);

  const min = 0.01;
  const max = 1.2;
  const step = 0.01;

  function handleChange(event: { target: { value: string | number } }): void {
    const newValue: number = parseFloat(String(event.target.value));
    setValue(newValue);
  }

  return (
    <div>
      <Title className="wizard-subheader" level="H5" size="H5">
        Conversion rate from Capacity Units to {config.CurrencyCode}
      </Title>
      <SpinnerInput
        value={value}
        setValue={setValue}
        min={min}
        max={max}
        step={step}
        decimals={2}
        unit={`${config.CurrencyCode}/CU`}
      />
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
