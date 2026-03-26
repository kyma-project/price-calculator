import config from '../../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import useStepInputValidation from '../../hooks/useStepInputValidation';

interface Props {
  autoScalerMin: number;
  setAutoScalerMin: (value: number) => void;
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

  const { stepInputRef, handleChange } = useStepInputValidation({
    value: autoScalerMin,
    setValue: setAutoScalerMin,
    min,
    max,
    step,
  });

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
