import config from '../../../../config.json';
import { Slider } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

interface Props {
  additionalVolumeGib: number;
  setAdditionalVolumeGib: (value: number) => void;
  machineDefaultVolume: number;
}

export default function AdditionalNodeVolumeInputField({
  additionalVolumeGib,
  setAdditionalVolumeGib,
  machineDefaultVolume,
}: Props) {
  const configuration = config.nodeConfig.AdditionalNodeVolume;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const { handleChange } = useStepInputValidation({
    setValue: setAdditionalVolumeGib,
    min,
    max,
    step,
  });

  return (
    <div>
      <HeaderWithInfo
        header="Additional Volume (GiB)"
        info={`machine includes ${machineDefaultVolume} GiB free; extra is billed in 32 GiB blocks`}
      />
      <SpinnerInput
        id="additional-volume-input"
        value={additionalVolumeGib}
        setValue={setAdditionalVolumeGib}
        min={min}
        max={max}
        step={step}
        unit="GiB"
      />
      <Slider
        value={additionalVolumeGib}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
