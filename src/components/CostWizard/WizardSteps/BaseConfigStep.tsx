import React from 'react';
import VMsizeSelect from '../../UserInputs/baseConfig/VMsizeSelect';
import MinAutoscalerInputField from '../../UserInputs/baseConfig/MinAutoscalerInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import InfoField from '../common/InfoField';
import TimeConBaseInput from '../../UserInputs/baseConfig/TimeConBaseInput';

export default function BaseConfigStep() {
  return (
    <WizardStep selected titleText="Base Configuration">
      <Title wrappingType="Normal" level="H2">
        1. Choose the Base Configuration
      </Title>
      <div className="StepContent">
        <InfoField info="contains 224 GB of storage by default" />
        <VMsizeSelect />
        <MinAutoscalerInputField />
        <TimeConBaseInput />
      </div>
      <div className="ButtonContainer">
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
