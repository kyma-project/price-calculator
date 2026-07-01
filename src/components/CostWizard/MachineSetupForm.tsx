import { useCallback } from 'react';
import { Form } from '@ui5/webcomponents-react';
import VMsizeSelect from './UserInputs/nodes/VMsizeSelect';
import MachineTypeSelect from './UserInputs/nodes/MachineTypeSelect';
import MinAutoscalerInputField from './UserInputs/nodes/MinAutoscalerInputField';
import AdditionalNodeVolumeInputField from './UserInputs/nodes/AdditionalNodeVolumeInputField';
import './CostWizard.css';
import {
  MachineSetup,
  MachineType,
  VMSize,
} from '../../state/nodes/machineSetupState';
import calculateDefaultVolumeSize from '../../calculatorFunctions/defaultVolumeSize/calculateDefaultVolumeSize';

interface Props {
  machine: MachineSetup;
  updateMachine: (updatedMachine: MachineSetup) => void;
  workerNode: boolean;
}

export default function MachineSetupForm({
  machine,
  updateMachine,
  workerNode,
}: Props) {
  const setMachineType = useCallback(
    (machineType: MachineType) => {
      const VMSize = machineType.VMSizeOptions[0];
      updateMachine({ ...machine, machineType, VMSize });
    },
    [machine, updateMachine],
  );

  const setVMSize = useCallback(
    (VMSize: VMSize) => {
      updateMachine({ ...machine, VMSize });
    },
    [machine, updateMachine],
  );

  const setAutoScalerMin = useCallback(
    (minAutoscaler: number) => {
      updateMachine({ ...machine, minAutoscaler });
    },
    [machine, updateMachine],
  );

  const setAdditionalVolumeGib = useCallback(
    (additionalVolumeGib: number) => {
      updateMachine({ ...machine, additionalVolumeGib });
    },
    [machine, updateMachine],
  );

  const machineDefaultVolume = calculateDefaultVolumeSize(
    machine.VMSize.vcpus,
    machine.VMSize.memoryGib,
  );

  return (
    <Form layout="S1 M1 L1 XL1">
      <MachineTypeSelect
        machineType={machine.machineType}
        setMachineType={setMachineType}
        workerNode={workerNode}
      />
      <VMsizeSelect
        VMSize={machine.VMSize}
        setVMSize={setVMSize}
        VMSizeOptions={machine.machineType.VMSizeOptions}
      />
      <MinAutoscalerInputField
        autoScalerMin={machine.minAutoscaler}
        setAutoScalerMin={setAutoScalerMin}
        workerNode={workerNode}
      />
      <AdditionalNodeVolumeInputField
        additionalVolumeGib={machine.additionalVolumeGib}
        setAdditionalVolumeGib={setAdditionalVolumeGib}
        machineDefaultVolume={machineDefaultVolume}
      />
    </Form>
  );
}
