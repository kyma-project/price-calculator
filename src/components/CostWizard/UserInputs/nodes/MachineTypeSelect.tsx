import config from '../../../../config.json';
import { Option, Select, Title } from '@ui5/webcomponents-react';
import { MachineType, VMSize } from '../../../../state/nodes/machineSetupState';

interface Props {
  machineType: MachineType;
  setMachineType: (machineType: MachineType) => void;
  workerNode: boolean;
}
export default function MachineTypeSelect({
  machineType,
  setMachineType,
  workerNode,
}: Props) {
  const configMachineTypes = config.nodeConfig.MachineTypes;

  const onChange = (event: {
    detail: { selectedOption: { dataset: DOMStringMap } };
  }) => {
    const selection = event.detail.selectedOption.dataset;

    const selectedMachineType = configMachineTypes.find(
      (machineType) => machineType.value === selection.value,
    );
    const vmSizeOptions: VMSize[] = selectedMachineType?.VMSizeOptions ?? [];

    setMachineType({
      value: selection.value ?? '',
      multiple: Number(selection.multiple),
      VMSizeOptions: vmSizeOptions,
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Machine Type
      </Title>
      <Select
        onChange={onChange}
        value={machineType.value}
        disabled={!workerNode}
        id={'machine-type-select'}
      >
        {configMachineTypes.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-multiple={item.multiple}
            selected={item.value === machineType.value}
          >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
