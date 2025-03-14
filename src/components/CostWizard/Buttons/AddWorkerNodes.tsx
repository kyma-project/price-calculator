import React, { useState } from 'react';
import { Button } from '@ui5/webcomponents-react';
import MachineSetup from '../MachineSetup';
import selectNextStep from '../Functions/selectNextStep';

export default function AddWorkerNodes() {
  interface DynamicComponentProps {
    text: string;
  }
  
  const DynamicComponent: React.FC<DynamicComponentProps> = ({ text }) => {
    return <div className="StepContent">
            <MachineSetup nodeIndex={1}/>
          </div>;
  };
  

    const [components, setComponents] = useState<React.ReactNode[]>([]);
  const addComponent = () => {
    setComponents([...components, React.createElement(DynamicComponent, { text: 'New Component' })]);
  };
  return (
    <div>
      {components}
      <Button onClick={addComponent}>Add Component</Button>
    </div>
  );
}
