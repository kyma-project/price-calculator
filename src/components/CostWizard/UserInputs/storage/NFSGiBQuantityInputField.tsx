import { useAtom } from 'jotai';
import config from '../../../../config.json';
import './NFSGiBQuantityInputField.css';
import { FlexBox, Icon, Slider, Title } from '@ui5/webcomponents-react';
import { nfsGiBQuantityState } from '../../../../state/storage/nfsGiBQuantityState';
import openLinks from '../../Functions/openLinks';
import useStepInputValidation from '../../hooks/useStepInputValidation';
import SpinnerInput from '../common/SpinnerInput';

export default function NFSGiBQuantityInputField() {
  const configuration = config.NFSStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [nfsGiBQuantity, setNfsGiBQuantity] = useAtom(nfsGiBQuantityState);

  const { handleChange } = useStepInputValidation({
    setValue: setNfsGiBQuantity,
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
          NFS Storage: number of GiB
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
        id="nfs-gib-quantity-input"
        value={nfsGiBQuantity}
        setValue={setNfsGiBQuantity}
        min={min}
        max={max}
        step={step}
        unit={`GiB`}
      />
      <Slider
        value={nfsGiBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
