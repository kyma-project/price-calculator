import React from 'react';
import { Wizard } from '@ui5/webcomponents-react';
import NodeConfigStep from './WizardSteps/NodeConfigStep';
import AdditionalConfig from './WizardSteps/AdditionalConfigStep';
import StorageStep from './WizardSteps/StorageStep';
import WorkerNodes from './WizardSteps/WorkerNodesStep';
import './CostWizard.css';

export default function CostWizard() {
  return (
    <Wizard id="CostWizard" contentLayout={'SingleStep'}>
      <NodeConfigStep />
      <WorkerNodes />
      <StorageStep />
      <AdditionalConfig />
    </Wizard>
  );
}
