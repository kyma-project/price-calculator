import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { useRecoilState } from 'recoil';
import { MachineSetup, machineSetupState } from '../../../../state/machineSetupState';

interface Props {
  nodeIndex: number;
}
export default function VMsizeSelect(props:Props) {
  const baseConfigOptions = config.baseConfig.VirtualMachineSize.Options;

  const [machineSetup, setMachineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setMachineSetup(prevSetups =>
      prevSetups.map((setup, index) =>
      index === props.nodeIndex ? { ...setup, VMSize: {
        value: selection.value,
        multiple: selection.multiple,
        nodes: parseInt(selection.nodes),
      } } : setup));
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
