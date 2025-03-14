import React, { useEffect } from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import MachineSetup from '../MachineSetup';
import InfoField from '../common/InfoField';

export default function BaseConfigStep() {


  return (
    <WizardStep selected titleText="Base Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        1. Choose the Base Configuration
      </Title>
      <div className="StepContent">
        <InfoField info="contains 224 GB of storage by default" />
        <MachineSetup nodeIndex={0} />
      </div>
      <div className="ButtonContainer">
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
