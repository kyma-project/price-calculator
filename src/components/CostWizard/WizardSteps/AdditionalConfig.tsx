import React, { useEffect } from 'react';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import InfoField from '../common/InfoField';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import ApplyConversionRate from '../UserInputs/additionalConfig/applyConversionRate';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import { useRecoilValue } from 'recoil';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';

export default function NodeStep() {
  const conversionRatio = useRecoilValue<number>(applyConversionRateState);

  const { setConversionRatio } = useCostCalculator();

  useEffect(() => {
    setConversionRatio(conversionRatio);
  }, [setConversionRatio, conversionRatio]);

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
