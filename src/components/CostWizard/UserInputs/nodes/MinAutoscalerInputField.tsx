import React, { useRef } from 'react';
import config from '../../../../config.json';
import { Slider, StepInput, StepInputDomRef } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';

interface Props {
  autoScalerMin: number;
  setAutoScalerMin: React.Dispatch<React.SetStateAction<number>>;
  workerNode: boolean;
}
export default function MinAutoscalerInputField({
  autoScalerMin,
  setAutoScalerMin,
  workerNode,
}: Props) {
  const configuration = config.nodeConfig.AutoScalerMin;
  const min = workerNode ? configuration.MinWorkerNodes : configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const stepInputRef = useRef<StepInputDomRef>(null);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue % step === 0 && newValue >= min && newValue <= max) {
      setAutoScalerMin(newValue);
    } else if (stepInputRef.current) {
      const input = stepInputRef.current.shadowRoot?.querySelector('ui5-input');
      input?.setAttribute('value', String(autoScalerMin));
    }
  }

  return (
    <>
      <HeaderWithInfo
        header="Autoscaler Min"
        info="minimum number of available Virtual Machines"
      />
      <StepInput
        id={'autoscaler-input'}
        ref={stepInputRef}
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
