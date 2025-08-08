import React, { useEffect } from 'react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import XlsxDownloadButton from '../Buttons/XlsxDownloadButton';
import CSVDownloadButton from '../Buttons/CSVDownloadButton';
import ApplyConversionRate from '../UserInputs/additionalConfig/applyConversionRate';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import {
  redisState,
} from '../../../state/additionalConfig/redisState';
import Redis from '../UserInputs/additionalConfig/RedisSelect';
import calculateAdditionalCosts from '../../../calculatorFunctions/additionalConfig/calculateAdditionalCosts';
import { WizardStep, Title } from '@ui5/webcomponents-react';
import { useAtomValue } from 'jotai';

export default function AdditionalConfigStep() {
  const conversionRatio = useAtomValue(applyConversionRateState);
  const redis = useAtomValue(redisState);

  const { setConversionRatio } = useCostCalculator();
  const { setAdditionalCosts } = useCostCalculator();

  useEffect(() => {
    setConversionRatio(conversionRatio);
    setAdditionalCosts(calculateAdditionalCosts({ redis: redis.value }));
  }, [setConversionRatio, setAdditionalCosts, conversionRatio, redis]);

  return (
    <WizardStep disabled titleText="Additional Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        4. Additional configuration options
      </Title>
      <div className="StepContent">
        <ApplyConversionRate />
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
