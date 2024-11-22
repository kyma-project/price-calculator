import React from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import InfoField from '../common/InfoField';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import ApplyConversionRate from '../UserInputs/additionalConfig/applyConversionRate';

export default function NodeStep() {
  return (
    <WizardStep disabled titleText="Additional Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        3. Additional Configuration
      </Title>
      <div className="StepContent">
        <InfoField info="The 'conversion rate' will help you to calculate eventual discounts." />
        <ApplyConversionRate />
      </div>
      <div className="ButtonContainer">
        <PreviousStepButton />
        <div className="DownloadButtonContainer">
          <CSVDownloadButton />
          <XlsxDownloadButton />
        </div>
      </div>
    </WizardStep>
  );
}
