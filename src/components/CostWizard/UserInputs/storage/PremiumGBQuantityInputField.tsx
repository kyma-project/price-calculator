import React, { useRef } from 'react';
import config from '../../../../config.json';
import './PremiumGBQuantityInputField.css';
import {
  FlexBox,
  Icon,
  Slider,
  StepInput,
  StepInputDomRef,
  Title,
} from '@ui5/webcomponents-react';
import { useRecoilState } from 'recoil';
import { premiumGBQuantityState } from '../../../../state/storage/premiumGBQuantityState';
import openLinks from '../../Functions/openLinks';

export default function PremiumGBQuantityInputField() {
  const configuration = config.PremiumStorage;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [premiumGBQuantity, setPremiumGBQuantity] = useRecoilState<number>(
    premiumGBQuantityState,
  );

  const stepInputRef = useRef<StepInputDomRef>(null);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    if (newValue % step === 0 && newValue >= min && newValue <= max) {
      setPremiumGBQuantity(newValue);
    } else if (stepInputRef.current) {
      const input = stepInputRef.current.shadowRoot?.querySelector('ui5-input');
      input?.setAttribute('value', String(premiumGBQuantity));
    }
  }

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
