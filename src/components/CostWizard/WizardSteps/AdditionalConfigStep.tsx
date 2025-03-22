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
import { RedisSize, redisState } from '../../../state/additionalConfig/redisState';
import Redis from '../UserInputs/additionalConfig/RedisSelect';
import calculateAdditionalCosts from '../../../calculatorFunctions/additionalConfig/calculateAdditionalCosts';
import config from '../../../config.json';

export default function AdditionalConfigStep() {
  const conversionRatio = useRecoilValue<number>(applyConversionRateState);
  const redis = useRecoilValue<RedisSize>(redisState);

  const { setConversionRatio } = useCostCalculator();
  const { setAdditionalCosts } = useCostCalculator();

  useEffect(() => {
    setConversionRatio(conversionRatio);
    setAdditionalCosts(calculateAdditionalCosts({redis: redis.value}));
  }, [setConversionRatio, setAdditionalCosts, conversionRatio, redis]);
  const text = <><div>With the '<strong>conversion rate</strong>' you can change the amount of <strong>{config.CurrencyCode}</strong> you are paying for <strong>1 Capacity Unit</strong>.</div>
    <div>This will help you to calculate eventual discounts.</div>
   <div>If you are unsure about how to change the default value ({config.ConversionRateCUCC}), please ask your SAP Sales Specialist.</div> </>;

  return (
    <WizardStep disabled titleText="Additional Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        4. Additional configuration options
      </Title>
      <div className="StepContent">
        <InfoField info={text} />
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
