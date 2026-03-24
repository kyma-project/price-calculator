import PreviousStepButton from '../Buttons/PreviousStepButton';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import ConversionRateInput from '../UserInputs/additionalConfig/ConversionRateInput';
import Redis from '../UserInputs/additionalConfig/RedisSelect';
import { WizardStep, Title } from '@ui5/webcomponents-react';

export default function AdditionalConfigStep() {
  return (
    <WizardStep disabled titleText="Additional Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        4. Additional configuration options
      </Title>
      <div className="StepContent">
        <ConversionRateInput />
        <Redis />
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
