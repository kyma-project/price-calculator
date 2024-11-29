import React, { useEffect } from 'react';
import GBQuantityInputField from '../UserInputs/storage/GBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import NextStepButton from '../Buttons/NextStepButton';
import PremiumGBQuantyInputField from '../UserInputs/storage/PremiumGBQuantyInputField';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import calculateStorageCosts from '../../../calculatorFunctions/storageCosts/calculateStorageCosts';
import { useRecoilValue } from 'recoil';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { timeConsumptionStorageState } from '../../../state/storage/timeConsumptionState';

export default function StorageStep() {
  const GBQuantity = useRecoilValue<number>(GBQuantityState);
  const premiumGBQuantity = useRecoilValue<number>(premiumGBQuantityState);
  const timeConsumption = useRecoilValue<number>(timeConsumptionStorageState);

  const { setStorageCosts } = useCostCalculator();

  useEffect(() => {
    const storageCosts = calculateStorageCosts({
      GBQuantity,
      premiumGBQuantity,
      timeConsumption,
    });

    setStorageCosts(storageCosts);
  }, [setStorageCosts, GBQuantity, premiumGBQuantity, timeConsumption]);

  return (
    <WizardStep disabled titleText="Additional Storage">
      <Title wrappingType="Normal" level="H2" size="H2">
        2. Additional storage for the Kyma cluster
      </Title>
      <div className="StepContent">
        <GBQuantityInputField />
        <PremiumGBQuantyInputField />
      </div>

      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
