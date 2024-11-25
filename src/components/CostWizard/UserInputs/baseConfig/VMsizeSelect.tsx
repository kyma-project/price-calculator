import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize, VMsizeState } from '../../../../state/baseConfig/VMsizeState';
import { useSetRecoilState } from 'recoil';

export default function VMsizeSelect() {
  const baseConfigOptions = config.baseConfig.VirtualMachineSize.Options;
  const setVmSize = useSetRecoilState<VMSize>(VMsizeState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setVmSize({
      value: selection.value,
      multiple: selection.multiple,
      nodes: parseInt(selection.nodes),
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
