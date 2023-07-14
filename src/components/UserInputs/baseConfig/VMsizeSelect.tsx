import React from 'react';
import config from '../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize, VMsizeState } from '../../../state/baseConfig/VMsizeState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { minAutoscalerState } from '../../../state/baseConfig/minAutoscalerState';
import { timeConsumptionBaseConfigState } from '../../../state/baseConfig/timeConsumptionState';
import { baseConfigCostsState } from '../../../state/costs/baseConfigCostsState';
import calculateBaseConfigCosts from '../../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts';
import { nodeCostsState } from '../../../state/costs/nodeCostsState';
import { storageCostsState } from '../../../state/costs/storageCostsState';
import { totalCostsState } from '../../../state/costs/totalCostsState';
import calculateTotalCosts from '../../../calculatorFunctions/totalCosts/calculateTotalCosts';

export default function VMsizeSelect() {
  const minAutoscaler: number = useRecoilValue<number>(minAutoscalerState);
  const timeConsumption: number = useRecoilValue<number>(
    timeConsumptionBaseConfigState,
  );
  const setBaseConfigCosts = useSetRecoilState<number>(baseConfigCostsState);
  const setValue = useSetRecoilState<VMSize>(VMsizeState);
  const baseConfigOptions = config.baseConfig.VirtualMachineSize.Options;

  const nodeCosts: number = useRecoilValue(nodeCostsState);
  const storageCosts: number = useRecoilValue(storageCostsState);
  const setTotalCosts = useSetRecoilState<number>(totalCostsState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setValue({
      value: selection.value,
      multiple: selection.multiple,
      nodes: parseInt(selection.nodes),
    });

    const baseConfigCosts = calculateBaseConfigCosts({
      vmMultiplier: selection.multiple,
      timeConsumption,
      minAutoscaler,
    });
    setBaseConfigCosts(baseConfigCosts);

    const totalCosts = calculateTotalCosts({
      baseConfigCosts,
      nodeCosts,
      storageCosts,
    });
    setTotalCosts(totalCosts);
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5">
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
