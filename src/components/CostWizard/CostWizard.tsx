import React from 'react';
import { Wizard } from '@ui5/webcomponents-react';
import BaseConfigStep from './WizardSteps/BaseConfigStep';
import NodeStep from './WizardSteps/NodeStep';
import StorageStep from './WizardSteps/StorageStep';
import './CostWizard.css';

export default function CostWizard() {
  return (
    <Wizard id="CostWizard">
      <BaseConfigStep />
      <NodeStep />
      <StorageStep />
    </Wizard>
  );
}
