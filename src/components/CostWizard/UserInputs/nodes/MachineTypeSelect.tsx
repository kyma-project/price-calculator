import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { MachineSetup, machineSetupState } from '../../../../state/nodes/machineSetupState';
import { useSetRecoilState } from 'recoil';

interface Props {
  nodeIndex: number;
  workerNode: boolean;
}
export default function MachineTypeSelect(props:Props) {
  const baseConfigOptions = config.baseConfig.machineTypeFactor.MachineTypes;
  const setMachineSetup = useSetRecoilState<MachineSetup[]>(machineSetupState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setMachineSetup(prevSetups =>
      prevSetups.map((setup, index) =>
      index === props.nodeIndex ? { ...setup, machineType: {
        value: selection.value,
        multiple: selection.multiple,
      } } : setup));
  };
  const filteredOptions = props.workerNode ? baseConfigOptions : baseConfigOptions.filter(item => item.value === config.baseConfig.machineTypeFactor.MachineTypes[0].value);
  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Machine Type
      </Title>
      <Select onChange={onChange}>
        {filteredOptions.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-multiple={item.multiple} >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
