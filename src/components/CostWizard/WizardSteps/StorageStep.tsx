import React, { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import GBQuantityInputField from '../UserInputs/storage/GBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import NextStepButton from '../Buttons/NextStepButton';
import PremiumGBQuantityInputField from '../UserInputs/storage/PremiumGBQuantityInputField';
import SnapshotGBQuantityInputField from '../UserInputs/storage/SnapshotGBQuantityInputField';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import calculateStorageCosts from '../../../calculatorFunctions/storageCosts/calculateStorageCosts';
import { GBQuantityState } from '../../../state/storage/GBQuantityState';
import { premiumGBQuantityState } from '../../../state/storage/premiumGBQuantityState';
import { snapshotGBQuantityState } from '../../../state/storage/snapshotGBQuantityState';
import { timeConsumptionState } from '../../../state/additionalConfig/timeConsumptionState';

export default function StorageStep() {
  const GBQuantity = useAtomValue(GBQuantityState);
  const premiumGBQuantity = useAtomValue(premiumGBQuantityState);
  const snapshotGBQuantity = useAtomValue(snapshotGBQuantityState);
  const timeConsumption = useAtomValue(timeConsumptionState);

  const { setStorageCosts } = useCostCalculator();

  useEffect(() => {
    const storageCosts = calculateStorageCosts({
      GBQuantity,
      premiumGBQuantity,
      snapshotGBQuantity,
      timeConsumption,
    });

    setStorageCosts(storageCosts);
  }, [
    setStorageCosts,
    GBQuantity,
    premiumGBQuantity,
    snapshotGBQuantity,
    timeConsumption,
  ]);

  return (
    <WizardStep disabled titleText="Storage">
      <Title wrappingType="Normal" level="H2" size="H2">
        3. Add storage for the cluster
      </Title>
      <div className="StepContent">
        <GBQuantityInputField />
        <PremiumGBQuantityInputField />
        <SnapshotGBQuantityInputField />
      </div>

      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
