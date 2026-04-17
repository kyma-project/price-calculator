import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { Form } from '@ui5/webcomponents-react';
import VMsizeSelect from './UserInputs/nodes/VMsizeSelect';
import MachineTypeSelect from './UserInputs/nodes/MachineTypeSelect';
import MinAutoscalerInputField from './UserInputs/nodes/MinAutoscalerInputField';
import NodeVolumeSizeInputField from './UserInputs/nodes/NodeVolumeSizeInputField';
import './CostWizard.css';
import {
  MachineSetup,
  MachineType,
  VMSize,
} from '../../state/nodes/machineSetupState';
import { timeConsumptionState } from '../../state/additionalConfig/timeConsumptionState';

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
  const timeConsumption = useAtomValue(timeConsumptionState);

  const setMachineType = useCallback(
    (machineType: MachineType) => {
      const VMSize = machineType.VMSizeOptions[0];
      updateMachine({ ...machine, machineType, VMSize, timeConsumption });
    },
    [machine, updateMachine, timeConsumption],
  );

  const setVMSize = useCallback(
    (VMSize: VMSize) => {
      updateMachine({ ...machine, VMSize, timeConsumption });
    },
    [machine, updateMachine, timeConsumption],
  );

  const setAutoScalerMin = useCallback(
    (minAutoscaler: number) => {
      updateMachine({ ...machine, minAutoscaler, timeConsumption });
    },
    [machine, updateMachine, timeConsumption],
  );

  const setNodeVolumeSizeGb = useCallback(
    (nodeVolumeSizeGb: number) => {
      updateMachine({ ...machine, nodeVolumeSizeGb, timeConsumption });
    },
    [machine, updateMachine, timeConsumption],
  );

  return (
    <Form>
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
      <NodeVolumeSizeInputField
        nodeVolumeSizeGb={machine.nodeVolumeSizeGb}
        setNodeVolumeSizeGb={setNodeVolumeSizeGb}
      />
    </Form>
  );
}
