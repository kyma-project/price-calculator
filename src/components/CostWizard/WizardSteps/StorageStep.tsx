import React from 'react';
import GBQuantityInputField from '../../UserInputs/storage/GBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import NextStepButton from '../Buttons/NextStepButton';
import GBPremiumStorage from '../../UserInputs/storage/GBPremiumStorageInputField';

export default function StorageStep() {
  return (
    <WizardStep disabled titleText="Additional Storage">
      <Title wrappingType="Normal" level="H2">
        2. Additional storage for the Kyma cluster
      </Title>
      <div className="StepContent">
        <GBQuantityInputField />
        <GBPremiumStorage />
      </div>

      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
