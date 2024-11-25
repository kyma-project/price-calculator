import React, { useEffect } from 'react';
import VMsizeSelect from '../UserInputs/baseConfig/VMsizeSelect';
import MinAutoscalerInputField from '../UserInputs/baseConfig/MinAutoscalerInputField';
import { Title, WizardStep } from '@ui5/webcomponents-react';
import NextStepButton from '../Buttons/NextStepButton';
import InfoField from '../common/InfoField';
import MachineTypeSelect from '../UserInputs/baseConfig/MachineTypeSelect';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import {
  MachineType,
  machineTypeState,
} from '../../../state/baseConfig/machineTypeState';
import calculateBaseConfigCosts from '../../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { useCostCalculator } from '../../../context/CostCalculatorContext';
import { useRecoilValue } from 'recoil';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';

export default function BaseConfigStep() {
  const minAutoscaler = useRecoilValue<number>(minAutoscalerState);
  const vmSize = useRecoilValue<VMSize>(VMsizeState);
  const timeConsumption = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const machineType = useRecoilValue<MachineType>(machineTypeState);

  const { setBaseConfigCosts } = useCostCalculator();

  useEffect(() => {
    const baseConfigCosts = calculateBaseConfigCosts({
      timeConsumption,
      vmMultiplier: vmSize.multiple,
      minAutoscaler,
      machineTypeFactor: machineType.multiple,
    });

    setBaseConfigCosts(baseConfigCosts);
  }, [setBaseConfigCosts, minAutoscaler, vmSize, timeConsumption, machineType]);

  return (
    <WizardStep selected titleText="Base Configuration">
      <Title wrappingType="Normal" level="H2" size="H2">
        1. Choose the Base Configuration
      </Title>
      <div className="StepContent">
        <InfoField info="contains 224 GB of storage by default" />
        <VMsizeSelect />
        <MachineTypeSelect />
        <MinAutoscalerInputField />
      </div>
      <div className="ButtonContainer">
        <NextStepButton />
      </div>
    </WizardStep>
  );
}
