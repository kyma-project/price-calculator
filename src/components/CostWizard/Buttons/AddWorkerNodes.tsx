import React, { useState } from "react";
import { Button } from "@ui5/webcomponents-react";
import {
  MachineSetup,
  machineSetupState,
} from "../../../state/machineSetupState";
import MachineSetupObj from "../MachineSetup";
import { useRecoilState } from "recoil";

interface DynamicComponentProps {
  index: number;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ index }) => {
  const [machineSetup, setMachineSetup] =
    useRecoilState<MachineSetup[]>(machineSetupState);
  const removeComponent = () => {
    setMachineSetup((prevSetups) =>
      prevSetups.map((setup, ind) =>
        ind === index ? { ...setup, visible: false } : setup
      )
    );
  };

  return (
    <div
      className="StepContent"
      style={{ display: machineSetup.at(index)?.visible ? "block" : "none" }}
    >
      <MachineSetupObj nodeIndex={index} workerNode={true} />
      <Button onClick={removeComponent}>Remove Component</Button>
    </div>
  );
};

export default function AddWorkerNodes() {
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  const addComponent = () => {
    const newIndex = components.length + 1;
    setComponents([
      ...components,
      React.createElement(DynamicComponent, { index: newIndex }),
    ]);
  };
  return (
    <div>
      {components}
      <Button onClick={addComponent}>Add Component</Button>
    </div>
  );
}
