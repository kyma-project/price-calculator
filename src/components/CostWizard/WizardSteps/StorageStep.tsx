import GiBQuantityInputField from '../UserInputs/storage/GiBQuantityInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import NextStepButton from '../Buttons/NextStepButton';
import NFSGiBQuantityInputField from '../UserInputs/storage/NFSGiBQuantityInputField';
import SnapshotGiBQuantityInputField from '../UserInputs/storage/SnapshotGiBQuantityInputField';

export default function StorageStep() {
  return (
    <WizardStep disabled titleText="Storage">
      <Title wrappingType="Normal" level="H2" size="H2">
        3. Add storage for the cluster
      </Title>
      <div className="StepContent">
        <GiBQuantityInputField />
        <NFSGiBQuantityInputField />
        <SnapshotGiBQuantityInputField />
      </div>

      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
