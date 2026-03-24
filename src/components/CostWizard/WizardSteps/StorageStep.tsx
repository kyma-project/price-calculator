import GBQuantityInputField from '../UserInputs/storage/GBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import NextStepButton from '../Buttons/NextStepButton';
import PremiumGBQuantityInputField from '../UserInputs/storage/PremiumGBQuantityInputField';
import SnapshotGBQuantityInputField from '../UserInputs/storage/SnapshotGBQuantityInputField';

export default function StorageStep() {
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
