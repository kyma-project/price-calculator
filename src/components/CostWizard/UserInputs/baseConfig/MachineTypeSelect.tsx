import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import {
  MachineType,
  machineTypeState,
} from '../../../../state/baseConfig/machineTypeState';
import { useSetRecoilState } from 'recoil';

export default function VMsizeSelect() {
  const baseConfigOptions = config.baseConfig.machineTypeFactor.MachineTypes;
  const setMachineType = useSetRecoilState<MachineType>(machineTypeState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setMachineType({
      value: selection.value,
      multiple: selection.multiple,
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" >
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
