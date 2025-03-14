import React, { useEffect } from 'react';
import { Form } from '@ui5/webcomponents-react';
import VMsizeSelect from './UserInputs/baseConfig/VMsizeSelect';
import MachineTypeSelect from './UserInputs/baseConfig/MachineTypeSelect';
import MinAutoscalerInputField from './UserInputs/baseConfig/MinAutoscalerInputField';
import './CostWizard.css';
import { VMSize, VMsizeState } from '../../state/baseConfig/VMsizeState';
import {
  MachineType,
  machineTypeState,
} from '../../state/baseConfig/machineTypeState';
import calculateBaseConfigCosts from '../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { useCostCalculator } from '../../context/CostCalculatorContext';
import { useRecoilValue, useRecoilState } from 'recoil';
import { minAutoscalerState } from '../../state/baseConfig/minAutoscalerState';
import { timeConsumptionBaseConfigState } from '../../state/baseConfig/timeConsumptionState';
import config from '../../config.json';


interface Props {
  nodeIndex: number;
}
export default function MachineSetup(props:Props) {
  const [minAutoscaler, setMinAutoscaler] = useRecoilState(minAutoscalerState);
  const autoscalerMinValue = config.baseConfig.AutoScalerMin.Min;
  if (props.nodeIndex >= minAutoscaler.length){
    setMinAutoscaler([...minAutoscaler, autoscalerMinValue]);
  }
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
      minAutoscaler: minAutoscaler.at(props.nodeIndex) ?? autoscalerMinValue,
      machineTypeFactor: machineType.multiple,
    });

    setBaseConfigCosts(baseConfigCosts);
  }, [setBaseConfigCosts, minAutoscaler, vmSize, timeConsumption, machineType, props.nodeIndex]);
  return (
    <Form>
      <VMsizeSelect />
      <MachineTypeSelect />
      <MinAutoscalerInputField nodeIndex={props.nodeIndex} />
    </Form>
  );
}
