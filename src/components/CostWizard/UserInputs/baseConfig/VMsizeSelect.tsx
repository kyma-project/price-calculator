import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize, VMsizeState } from '../../../../state/baseConfig/VMsizeState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { minAutoscalerState } from '../../../../state/baseConfig/minAutoscalerState';
import { timeConsumptionBaseConfigState } from '../../../../state/baseConfig/timeConsumptionState';
import {
  MachineType,
  machineTypeState,
} from '../../../../state/baseConfig/machineTypeState';
import { useCostCalculator } from '../../../../calculatorFunctions/CostCalculatorContext';

export default function VMsizeSelect() {
  const minAutoscaler: number = useRecoilValue<number>(minAutoscalerState);
  const machineTypeFactor =
    useRecoilValue<MachineType>(machineTypeState).multiple;
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const setValue = useSetRecoilState<VMSize>(VMsizeState);
  const baseConfigOptions = config.baseConfig.VirtualMachineSize.Options;

  const { updateBaseConfigCosts } = useCostCalculator();

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setValue({
      value: selection.value,
      multiple: selection.multiple,
      nodes: parseInt(selection.nodes),
    });
    updateBaseConfigCosts({
      timeConsumption,
      vmMultiplier: selection.multiple,
      minAutoscaler,
      machineTypeFactor,
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Virtual Machine Size
      </Title>
      <Select onChange={onChange}>
        {baseConfigOptions.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-nodes={item.nodes}
            data-multiple={item.multiple}
          >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
