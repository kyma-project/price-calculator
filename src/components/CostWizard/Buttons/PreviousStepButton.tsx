import React from 'react';
import { Button } from '@ui5/webcomponents-react';
import './PreviousStepButton.css';
import selectPreviousStep from '../Functions/selectPreviousStep';

export default function PreviousStepButton() {
  return (
    <Button
      className="PreviousStepButton"
      design="Emphasized"
      onClick={(event) => selectPreviousStep(event.target)}
    >
      Previous Step
    </Button>
  );
}
