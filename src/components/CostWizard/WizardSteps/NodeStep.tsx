import React from 'react';
import VMQuantityInputField from '../../UserInputs/node/VMQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import InfoField from '../common/InfoField';
import NextStepButton from '../Buttons/NextStepButton';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import TimeConNodeInput from '../../UserInputs/node/TimeConNodeInput';

export default function NodeStep() {
  return (
    <WizardStep disabled titleText="Additional Nodes">
      <Title wrappingType="Normal" level="H2">
        2. Additional Nodes for the Kyma cluster
      </Title>
      <div className="StepContent">
        <InfoField css="info" info="The term 'Node' refers to the commercial unit of 2vCPUs and 8GB RAM. It is not referring to a 'Kubernetes Node'." />
        <VMQuantityInputField />
        <TimeConNodeInput />
      </div>
      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
