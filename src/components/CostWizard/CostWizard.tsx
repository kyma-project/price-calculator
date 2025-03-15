import React from 'react';
import { Wizard } from '@ui5/webcomponents-react';
import BaseConfigStep from './WizardSteps/BaseConfigStep';
import AdditionalConfig from './WizardSteps/AdditionalConfigStep';
import StorageStep from './WizardSteps/StorageStep';
import WorkerNodes from './WizardSteps/WorkerNodesStep';
import './CostWizard.css';

export default function CostWizard() {
  return (
    <Wizard id="CostWizard">
      <BaseConfigStep />
      <WorkerNodes />
      <StorageStep />
      <AdditionalConfig />
    </Wizard>
  );
}
