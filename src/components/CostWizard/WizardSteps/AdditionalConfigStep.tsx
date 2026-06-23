import PreviousStepButton from '../Buttons/PreviousStepButton';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import ConversionRateInput from '../UserInputs/additionalConfig/ConversionRateInput';
import Redis from '../UserInputs/additionalConfig/RedisSelect';
import InfoField from '../common/InfoField';
import { WizardStep, Title } from '@ui5/webcomponents-react';
import config from '../../../config.json';

export default function AdditionalConfigStep() {
  const conversionRateInfo = (
    <>
      <div>
        With the '<strong>conversion rate</strong>' you can change the amount of{' '}
        <strong>{config.CurrencyCode}</strong> you are paying for{' '}
        <strong>1 Capacity Unit</strong>. This will help you to calculate
        eventual discounts.
      </div>
      <div>
        If you are unsure about how to change the default value (
        {config.ConversionRateCUCC.toFixed(2)}), please ask your SAP Sales
        Specialist.
      </div>
    </>
  );

  return (
    <WizardStep disabled titleText="Additional Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        4. Additional configuration options
      </Title>
      <InfoField info={conversionRateInfo} />
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
