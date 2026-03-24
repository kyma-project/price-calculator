import { useAtom } from 'jotai';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import MachineSetupForm from '../MachineSetupForm';
import { baseMachineSetupState } from '../../../state/nodes/machineSetupState';

export default function NodeConfigStep() {
  const [baseMachineSetup, setBaseMachineSetup] = useAtom(
    baseMachineSetupState,
  );

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
