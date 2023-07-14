import React from 'react';
import GBQuantityInputField from '../../UserInputs/storage/GBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import TimeConStorageInput from '../../UserInputs/storage/TimeConStorageInput';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton'

export default function StorageStep() {
  return (
    <WizardStep disabled titleText="Additional Storage">
      <Title wrappingType="Normal" level="H2">
        3. Additional storage for the Kyma cluster
      </Title>
      <div className="StepContent">
        <GBQuantityInputField />
        <TimeConStorageInput />
      </div>
      <div className="ButtonContainer">
        <PreviousStepButton/>
        <div className='DownloadButtonContainer'>
        <CSVDownloadButton/>
        <XlsxDownloadButton />
        </div>
      </div>
    </WizardStep>
  );
}
