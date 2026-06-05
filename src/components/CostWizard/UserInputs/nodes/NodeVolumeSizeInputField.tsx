import config from '../../../../config.json';
import { Slider } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

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

  const { handleChange } = useStepInputValidation({
    setValue: setNodeVolumeSizeGb,
    min,
    max,
    step,
  });

  return (
    <>
      <HeaderWithInfo
        header="Node Volume Size (GB)"
        info="first 80 GB included; extra is billed in 32 GiB blocks"
      />
      <SpinnerInput
        id="node-volume-size-input"
        value={nodeVolumeSizeGb}
        setValue={setNodeVolumeSizeGb}
        min={min}
        max={max}
        step={step}
        unit="GB"
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
