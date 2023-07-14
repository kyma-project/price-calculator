import React from 'react';
import { Button } from '@ui5/webcomponents-react';
import './NextStepButton.css';
import selectNextStep from '../Functions/selectNextStep';

export default function NextStepButton() {
  return (
    <Button
      className="NextStepButton"
      design="Emphasized"
      onClick={(event) => selectNextStep(event.target)}
    >
      Next Step
    </Button>
  );
}
