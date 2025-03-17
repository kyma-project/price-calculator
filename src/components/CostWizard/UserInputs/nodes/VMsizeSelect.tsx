import React from 'react';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { useRecoilState } from 'recoil';
import { MachineSetup, machineSetupState } from '../../../../state/nodes/machineSetupState';
import config from '../../../../config.json';

interface Props {
  nodeIndex: number;
}
export default function VMsizeSelect(props:Props) {
  const baseConfigOptions = config.nodeConfig.machineTypeFactor.MachineTypes;
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

  const VMSizeIndexMachineType = baseConfigOptions.filter((item) => 
    typeof(machineSetup[props.nodeIndex]) === "undefined" || 
    item.value === machineSetup[props.nodeIndex].machineType.value).flatMap((item) => 
    item.VMSizeOptions);

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Virtual Machine Size
      </Title>
      <Select onChange={onChange}>
        {VMSizeIndexMachineType.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-nodes={item.nodes}
            data-multiple={item.multiple} >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
