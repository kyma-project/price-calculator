import { useAtom } from 'jotai';
import config from '../../../../config.json';
import './PremiumGBQuantityInputField.css';
import {
  FlexBox,
  Icon,
  Slider,
  StepInput,
  Title,
} from '@ui5/webcomponents-react';
import { premiumGBQuantityState } from '../../../../state/storage/premiumGBQuantityState';
import openLinks from '../../Functions/openLinks';
import useStepInputValidation from '../../hooks/useStepInputValidation';

export default function PremiumGBQuantityInputField() {
  const configuration = config.PremiumStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [premiumGBQuantity, setPremiumGBQuantity] = useAtom(
    premiumGBQuantityState,
  );

  const { stepInputRef, handleChange } = useStepInputValidation({
    value: premiumGBQuantity,
    setValue: setPremiumGBQuantity,
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
      <StepInput
        id={'premium-gb-quantity-input'}
        ref={stepInputRef}
        value={premiumGBQuantity}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={premiumGBQuantity}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </div>
  );
}
