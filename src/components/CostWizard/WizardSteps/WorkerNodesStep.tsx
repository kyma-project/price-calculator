import { FlexBox, Icon, Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import PreviousStepButton from '../Buttons/PreviousStepButton';
import AddWorkerNodes from '../AddWorkerNodes';
import openLinks from '../Functions/openLinks';

export default function WorkerNodesStep() {
  return (
    <WizardStep disabled titleText="Worker Node Pools">
      <FlexBox alignItems="Center" wrap="NoWrap">
        <Title wrappingType="Normal" level="H2" size="H2">
          2. Add more worker node pools
        </Title>
        <Icon
          className="help-portal-link"
          design="Information"
          mode="Interactive"
          name="sys-help"
          onClick={() => openLinks('worker-node-pools')}
        />
      </FlexBox>
      <div className="StepContent">
        <AddWorkerNodes />
      </div>
      <div className="ButtonContainer">
        <PreviousStepButton />
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
