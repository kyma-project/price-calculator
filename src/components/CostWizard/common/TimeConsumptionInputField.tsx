import React from 'react';
import config from '../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from './HeaderWithInfo';

interface Props {
  value: number;
  handleChange: (event: any) => void;
}

export default function TimeConsumptionInputField(props: Props) {
  const { value, handleChange } = props;
  const configuration = config.baseConfig.TimeConsumption;

  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  return (
    <>
      <HeaderWithInfo header="Time Consumption" info="hours per month" />
      <StepInput
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={value}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
