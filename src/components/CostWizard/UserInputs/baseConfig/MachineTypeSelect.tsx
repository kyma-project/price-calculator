import React from 'react';
import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { MachineSetup, machineSetupState } from '../../../../state/machineSetupState';
import { useRecoilState } from 'recoil';

interface Props {
  nodeIndex: number;
}
export default function VMsizeSelect(props:Props) {
  const baseConfigOptions = config.baseConfig.machineTypeFactor.MachineTypes;
  const [machineSetup, setMachineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);

  const onChange = (event: any) => {
    const selection = event.detail.selectedOption.dataset;
    setMachineSetup(prevSetups =>
      prevSetups.map((setup, index) =>
      index === props.nodeIndex ? { ...setup, machineType: {
        value: selection.value,
        multiple: selection.multiple,
      } } : setup));
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
