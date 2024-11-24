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
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const setValue = useSetRecoilState<MachineType>(machineTypeState);
  const baseConfigOptions = config.baseConfig.machineTypeFactor.MachineTypes;

  const { updateBaseConfigCosts } = useCostCalculator();

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setValue({
      value: selection.value,
      multiple: selection.multiple,
    });

    updateBaseConfigCosts({
      timeConsumption,
      vmMultiplier,
      minAutoscaler,
      machineTypeFactor: selection.multiple,
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Machine Type
      </Title>
      <Select onChange={onChange}>
        {baseConfigOptions.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-multiple={item.multiple}
          >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
