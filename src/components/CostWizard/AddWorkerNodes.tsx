import { useState } from 'react';
import { useAtom } from 'jotai';
import { Button, FlexBox, Panel, Title } from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/delete.js';
import './AddWorkerNodes.css';
import {
  additionalMachineSetupState,
  MachineSetup,
} from '../../state/nodes/machineSetupState';
import MachineSetupForm from './MachineSetupForm';
import config from '../../config.json';

interface PoolHeaderProps {
  slot?: string;
  title: string;
  summary: string;
  collapsed: boolean;
  onRemove: () => void;
}

function PoolHeader({ slot, title, summary, collapsed, onRemove }: PoolHeaderProps) {
  return (
    <FlexBox
      slot={slot}
      className="worker-node-pool-header"
      alignItems="Center"
      justifyContent="SpaceBetween"
      fitContainer
      wrap="NoWrap"
    >
      <FlexBox direction="Column">
        <Title level="H4" size="H4">
          {title}
        </Title>
        {collapsed && (
          <span className="worker-node-pool-summary">{summary}</span>
        )}
      </FlexBox>
      <Button
        icon="delete"
        design="Transparent"
        tooltip="Remove worker node pool"
        accessibleName="Remove worker node pool"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      />
    </FlexBox>
  );
}

export default function AddWorkerNodes() {
  const [machineSetup, setMachineSetup] = useAtom(additionalMachineSetupState);
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  const addMachineSetup = () => {
    const newMachine: MachineSetup = {
      id: crypto.randomUUID(),
      machineType: config.nodeConfig.MachineTypes[0],
      VMSize: config.nodeConfig.MachineTypes[0].VMSizeOptions[0],
      minAutoscaler: config.nodeConfig.AutoScalerMin.DefaultWorkerNodes,
      additionalVolumeGib: 0,
    };
    setMachineSetup((prevState) => prevState.concat(newMachine));
  };

  const updateMachineSetup = (id: string, updatedMachine: MachineSetup) => {
    setMachineSetup((prevState) =>
      prevState.map((machine) => (machine.id === id ? updatedMachine : machine)),
    );
  };

  const removeMachineSetup = (id: string) => {
    setMachineSetup((prevState) => prevState.filter((machine) => machine.id !== id));
  };

  const handleToggle = (id: string, collapsed: boolean) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (collapsed) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <div className="add-worker-node-container">
      {machineSetup.map((machine, index) => (
        <Panel
          key={machine.id}
          id={`machine-setup-${index}`}
          headerLevel="H4"
          onToggle={(event) => handleToggle(machine.id, event.target.collapsed)}
          header={
            <PoolHeader
              title={`Worker Node Pool ${index + 1}`}
              summary={`${machine.machineType.value} · ${machine.VMSize.value} · min ${machine.minAutoscaler}`}
              collapsed={collapsedIds.has(machine.id)}
              onRemove={() => removeMachineSetup(machine.id)}
            />
          }
        >
          <MachineSetupForm
            machine={machine}
            updateMachine={(updatedMachine: MachineSetup) =>
              updateMachineSetup(machine.id, updatedMachine)
            }
            workerNode={true}
          />
        </Panel>
      ))}
      <FlexBox
        wrap="NoWrap"
        alignItems="Center"
        fitContainer
        displayInline
        justifyContent="Start"
      >
        <Button icon="add" onClick={addMachineSetup}>
          Add Worker Node Pool
        </Button>
      </FlexBox>
    </div>
  );
}
