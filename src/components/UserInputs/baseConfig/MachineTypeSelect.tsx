import React from 'react';
import config from '../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import {
  MachineType,
  machineTypeState,
} from '../../../state/baseConfig/machineTypeState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import calculateBaseConfigCosts from '../../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { additionalCostsState } from '../../../state/costs/additionalCostsState';
import { applyConversionRateState } from '../../../state/additionalConfig/applyConversionRateState';
import {
  totalCostsInCCState,
  totalCostsState,
} from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';

export default function VMsizeSelect() {
  const minAutoscaler: number = useRecoilValue<number>(minAutoscalerState);
  const vmMultiplier: number = useRecoilValue<VMSize>(VMsizeState).multiple;
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const setBaseConfigCosts = useSetRecoilState<number>(baseConfigCostsState);
  const setValue = useSetRecoilState<MachineType>(machineTypeState);
  const baseConfigOptions = config.baseConfig.machineTypeFactor.MachineTypes;

  const storageCosts: number = useRecoilValue(storageCostsState);
  const additionalCosts: number = useRecoilValue(additionalCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);
  const setTotalCostsInCC = useSetRecoilState<number>(totalCostsInCCState);

  const conversionRatio: number = useRecoilValue(applyConversionRateState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setValue({
      value: selection.value,
      multiple: selection.multiple,
    });

    const baseConfigCosts = calculateBaseConfigCosts({
      vmMultiplier,
      timeConsumption,
      minAutoscaler,
      machineTypeFactor: selection.multiple,
    });
    setBaseConfigCosts(baseConfigCosts);

    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      storageCosts,
      additionalCosts,
      conversionRatio,
    });
    setTotalCosts(totalCosts.CU);
    setTotalCostsInCC(totalCosts.CC);
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
