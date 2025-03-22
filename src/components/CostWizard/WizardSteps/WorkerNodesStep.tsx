import React from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import AddWorkerNodes from '../AddWorkerNodes';

export default function WorkerNodesStep() {
  return (
    <WizardStep disabled titleText="Worker Node Pools">
      <Title wrappingType="Normal" level="H2" size="H2">
        2. Add more worker node pools
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
