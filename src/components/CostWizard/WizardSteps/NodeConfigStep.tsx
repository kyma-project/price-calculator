import React, { useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import MachineSetupForm from '../MachineSetupForm';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
} from '../../../state/nodes/machineSetupState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import calculateNodeConfigCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';

export default function NodeConfigStep() {
  const [baseMachineSetup, setBaseMachineSetup] = useAtom(
    baseMachineSetupState,
  );
  const additionalMachineSetup = useAtomValue(additionalMachineSetupState);

  const { setNodeConfigCosts } = useCostCalculator();

  useEffect(() => {
    const combinedMachineSetup = [baseMachineSetup, ...additionalMachineSetup];

    const nodeConfigCosts = combinedMachineSetup.reduce((total, machine) => {
      return (
        total +
        calculateNodeConfigCosts({
          timeConsumption: machine.timeConsumption,
          computeUnits: machine.VMSize.computeUnits,
          minAutoscaler: machine.minAutoscaler,
          machineTypeFactor: machine.machineType.multiple,
        })
      );
    }, 0);

    setNodeConfigCosts(nodeConfigCosts);
  }, [setNodeConfigCosts, baseMachineSetup, additionalMachineSetup]);

  return (
    <WizardStep selected titleText="Base Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        1. Choose the base worker node pool configuration
      </Title>
      <div className="StepContent">
        <MachineSetupForm
          machine={baseMachineSetup}
          updateMachine={setBaseMachineSetup}
          workerNode={false}
        />
      </div>
      <div className="ButtonContainer">
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
