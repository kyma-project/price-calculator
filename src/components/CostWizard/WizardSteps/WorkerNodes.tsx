import React from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import AddWorkerNodes from '../Buttons/AddWorkerNodes';

export default function WorkerNodes() {


  return (
    <WizardStep disabled titleText="Additional Worker Nodes">
      <Title wrappingType="Normal" level="H2" size="H2">
        2. Additional Worker Nodes
      </Title>
      <div className="StepContent">
        <AddWorkerNodes />
      </div>
      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
