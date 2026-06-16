import { useAtom } from 'jotai';
import config from '../../../../config.json';
import './NFSGBQuantityInputField.css';
import { FlexBox, Icon, Slider, Title } from '@ui5/webcomponents-react';
import { nfsGBQuantityState } from '../../../../state/storage/nfsGBQuantityState';
import openLinks from '../../Functions/openLinks';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

export default function NFSGBQuantityInputField() {
  const configuration = config.NFSStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [nfsGBQuantity, setNfsGBQuantity] = useAtom(nfsGBQuantityState);

  const { handleChange } = useStepInputValidation({
    setValue: setNfsGBQuantity,
    min,
    max,
    step,
  });

  return (
    <div>
      <FlexBox
        wrap="NoWrap"
        alignItems="Center"
        fitContainer
        displayInline
        justifyContent="Start"
      >
        <Title className="wizard-subheader" level="H5" size="H5">
          NFS Storage: number of GB
        </Title>
        <Icon
          className="help-portal-link"
          design="Information"
          mode="Interactive"
          name="sys-help"
          onClick={() => openLinks('nfs')}
        />
      </FlexBox>
      <SpinnerInput
        id="nfs-gb-quantity-input"
        value={nfsGBQuantity}
        setValue={setNfsGBQuantity}
        min={min}
        max={max}
        step={step}
        unit={`GB`}
      />
      <Slider
        value={nfsGBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
