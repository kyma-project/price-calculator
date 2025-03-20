import React from 'react';
import config from '../../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';

interface Props {
  autoScalerMin: number;
  setAutoScalerMin: React.Dispatch<React.SetStateAction<number>>;
}
export default function MinAutoscalerInputField({
  autoScalerMin,
  setAutoScalerMin,
}: Props) {
  const configuration = config.nodeConfig.AutoScalerMin;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setAutoScalerMin(newValue);
  }

  return (
    <>
      <HeaderWithInfo
        header="Autoscaler Min"
        info="minimum number of available Virtual Machines"
      />
      <StepInput
        value={autoScalerMin}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={autoScalerMin}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
