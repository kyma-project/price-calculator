import { useAtom } from 'jotai';
import config from '../../../../config.json';
import { Slider, Title } from '@ui5/webcomponents-react';
import { applyConversionRateState } from '../../../../state/additionalConfig/applyConversionRateState';
import InfoField from '../../common/InfoField';
import SpinnerInput from '../common/SpinnerInput';

export default function ConversionRateInput() {
  const [value, setValue] = useAtom(applyConversionRateState);

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

  function handleChange(event: { target: { value: string | number } }): void {
    const newValue: number = parseFloat(String(event.target.value));
    setValue(newValue);
  }

  return (
    <div>
      <InfoField info={text} />
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