import config from '../../../../config.json';
import { Slider } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

interface Props {
  additionalVolumeGb: number;
  setAdditionalVolumeGb: (value: number) => void;
  machineDefaultVolume: number;
}

export default function AdditionalNodeVolumeInputField({
  additionalVolumeGb,
  setAdditionalVolumeGb,
  machineDefaultVolume,
}: Props) {
  const configuration = config.nodeConfig.AdditionalNodeVolume;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const { handleChange } = useStepInputValidation({
    setValue: setAdditionalVolumeGb,
    min,
    max,
    step,
  });

  return (
    <div>
      <HeaderWithInfo
        header="Additional Volume (GB)"
        info={`machine includes ${machineDefaultVolume} GB free; extra is billed in 32 GB blocks`}
      />
      <SpinnerInput
        id="additional-volume-input"
        value={additionalVolumeGb}
        setValue={setAdditionalVolumeGb}
        min={min}
        max={max}
        step={step}
        unit="GB"
      />
      <Slider
        value={additionalVolumeGb}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
