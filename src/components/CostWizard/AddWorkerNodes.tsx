import React from 'react';
import { Button, FlexBox, Icon, Title } from '@ui5/webcomponents-react';
import './AddWorkerNodes.css';
import {
  additionalMachineSetupState,
  MachineSetup,
} from '../../state/nodes/machineSetupState';
import MachineSetupForm from './MachineSetupForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import openLinks from './Functions/openLinks';
import config from '../../config.json';
import { timeConsumptionState } from '../../state/additionalConfig/timeConsumptionState';

export default function AddWorkerNodes() {
  const [machineSetup, setMachineSetup] = useRecoilState<MachineSetup[]>(
    additionalMachineSetupState,
  );
  const timeConsumption = useRecoilValue<number>(timeConsumptionState);

  const addMachineSetup = () => {
    const newMachine: MachineSetup = {
      timeConsumption: timeConsumption,
      machineType: config.nodeConfig.MachineTypes[0],
      VMSize: config.nodeConfig.MachineTypes[0].VMSizeOptions[0],
      minAutoscaler: config.nodeConfig.AutoScalerMin.DefaultWorkerNodes,
    };
    setMachineSetup((prevState) => prevState.concat(newMachine));
  };

  const updateMachineSetup = (index: number, updatedMachine: MachineSetup) => {
    setMachineSetup((prevState) =>
      prevState.map((machine, i) => (i === index ? updatedMachine : machine)),
    );
  };

  const removeMachineSetup = (index: number) => {
    setMachineSetup((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div className="add-worker-node-container">
      {machineSetup.map((machine, index) => (
        <div
          className="dynamic-worker-node-container"
          key={`machine-setup-${index}`}
        >
          <FlexBox
            wrap="NoWrap"
            alignItems="Center"
            fitContainer
            displayInline
            justifyContent="SpaceBetween"
          >
            <Title className="workernode-name" level="H2" size="H2">
              Worker Node Pool {index}
            </Title>
            <Button icon="decline" onClick={() => removeMachineSetup(index)}>
              Remove Worker Node Pool
            </Button>
          </FlexBox>
          <MachineSetupForm
            machine={machine}
            updateMachine={(updatedMachine: MachineSetup) =>
              updateMachineSetup(index, updatedMachine)
            }
            workerNode={true}
          />
        </div>
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
        <Icon
          className="help-portal-link"
          design="Information"
          mode="Interactive"
          name="sys-help"
          onClick={() => openLinks('worker-node-pools')}
        />
      </FlexBox>
    </div>
  );
}
