import React from 'react';
import config from '../../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import { useRecoilState } from 'recoil';
import { minAutoscalerState } from '../../../../state/baseConfig/minAutoscalerState';

export default function MinAutoscalerInputField() {
  const configuration = config.baseConfig.AutoScalerMin;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [minAutoScaler, setMinAutoScaler] =
    useRecoilState<number>(minAutoscalerState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setMinAutoScaler(newValue);
  }

  return (
    <>
      <HeaderWithInfo
        header="Autoscaler Min"
        info="minimum number of available Virtual Machines"
      />
      <StepInput
        value={minAutoScaler}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={minAutoScaler}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
