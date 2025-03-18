import React, { useState } from 'react';
import { Button, FlexBox, Icon, Title } from '@ui5/webcomponents-react';
import './AddWorkerNodes.css';
import {
  MachineSetup,
  machineSetupState,
} from '../../state/nodes/machineSetupState';
import MachineSetupObj from './MachineSetup';
import { useRecoilState } from 'recoil';
import openLinks from './Functions/openLinks';

interface DynamicComponentProps {
  index: number;
}
/* Definition of dynamic component */
const DynamicComponent: React.FC<DynamicComponentProps> = ({ index }) => {
  const [machineSetup, setMachineSetup] =
    useRecoilState<MachineSetup[]>(machineSetupState);
  const removePool = () => {
    setMachineSetup((prevSetups) =>
      prevSetups.map((setup, ind) =>
        ind === index ? { ...setup, visible: false } : setup,
      ),
    );
  };

  return (
    <div
      className="dynamic-worker-node-container"
      style={{ display: machineSetup.at(index)?.visible ? 'block' : 'none' }}
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
        <Button icon="decline" onClick={removePool}>
          Remove Worker Node Pool
        </Button>
      </FlexBox>
      <MachineSetupObj nodeIndex={index} workerNode={true} />
    </div>
  );
};

export default function AddWorkerNodes() {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const addPool = () => {
    const newIndex = components.length + 1;
    setComponents([
      ...components,
      React.createElement(DynamicComponent, { index: newIndex }),
    ]);
  };
  return (
    <div className="add-worker-node-container">
      {components}
      <FlexBox
        wrap="NoWrap"
        alignItems="Center"
        fitContainer
        displayInline
        justifyContent="Start"
      >
        <Button icon="add" onClick={addPool}>
          Add Worker Node Pool
        </Button>
        <Icon
          className="help-portal-link"
          design="Information"
          mode="Interactive"
          name="sys-help"
          onClick={(event: any) => openLinks('redis')}
        />
      </FlexBox>
    </div>
  );
}
