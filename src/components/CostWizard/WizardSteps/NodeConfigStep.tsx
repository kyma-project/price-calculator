import React, { useEffect } from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import MachineSetupForm from '../MachineSetupForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  additionalMachineSetupState,
  baseMachineSetupState,
  MachineSetup,
} from '../../../state/nodes/machineSetupState';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import calculateNodeConfigCosts from '../../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts';

export default function NodeConfigStep() {
  const [baseMachineSetup, setBaseMachineSetup] = useRecoilState<MachineSetup>(
    baseMachineSetupState,
  );
  const additionalMachineSetup = useRecoilValue<MachineSetup[]>(
    additionalMachineSetupState,
  );

  useEffect(() => {
    console.log(additionalMachineSetup);
  }, [additionalMachineSetup]);

  const { setNodeConfigCosts } = useCostCalculator();

  useEffect(() => {
    const combinedMachineSetup = [baseMachineSetup, ...additionalMachineSetup];
    let nodeConfigCosts = 0;

    for (const machine of combinedMachineSetup) {
      const machineCost = calculateNodeConfigCosts({
        timeConsumption: machine.timeConsuption,
        computeUnits: machine.VMSize.computeUnits,
        minAutoscaler: machine.minAutoscaler,
        machineTypeFactor: machine.machineType.multiple,
      });

      nodeConfigCosts += machineCost;
    }

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
