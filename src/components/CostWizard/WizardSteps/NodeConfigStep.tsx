import React from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import MachineSetupForm from '../MachineSetupForm';
import InfoField from '../common/InfoField';

export default function NodeConfigStep() {
  return (
    <WizardStep selected titleText="Base Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        1. Choose the base worker node pool configuration
      </Title>
      <div className="StepContent">
        <InfoField info="contains 224 GB of storage by default" />
        <MachineSetupForm nodeIndex={0} workerNode={false} />
      </div>
      <div className="ButtonContainer">
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
