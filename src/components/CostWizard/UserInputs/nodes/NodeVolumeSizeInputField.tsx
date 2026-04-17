import config from '../../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import useStepInputValidation from '../../hooks/useStepInputValidation';

interface Props {
  nodeVolumeSizeGb: number;
  setNodeVolumeSizeGb: (value: number) => void;
}

export default function NodeVolumeSizeInputField({
  nodeVolumeSizeGb,
  setNodeVolumeSizeGb,
}: Props) {
  const configuration = config.nodeConfig.NodeVolumeSize;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const { stepInputRef, handleChange } = useStepInputValidation({
    value: nodeVolumeSizeGb,
    setValue: setNodeVolumeSizeGb,
    min,
    max,
    step,
  });

  return (
    <>
      <HeaderWithInfo
        header="Node Volume Size (GB)"
        info="first 80 GB included"
      />
      <StepInput
        id={'node-volume-size-input'}
        ref={stepInputRef}
        value={nodeVolumeSizeGb}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={nodeVolumeSizeGb}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
