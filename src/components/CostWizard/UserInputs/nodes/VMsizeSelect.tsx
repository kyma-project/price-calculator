import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize } from '../../../../state/nodes/machineSetupState';

interface Props {
  VMSize: VMSize;
  setVMSize: (vmSize: VMSize) => void;
  VMSizeOptions: VMSize[];
}

export default function VMsizeSelect({
  VMSize,
  setVMSize,
  VMSizeOptions,
}: Props) {
  const onChange = (event: {
    detail: { selectedOption: { dataset: DOMStringMap } };
  }) => {
    const selection = event.detail.selectedOption.dataset;
    setVMSize({
      value: selection.value ?? '',
      computeUnits: Number(selection.compute_units),
      defaultVolumeSize: Number(selection.default_volume_size),
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Virtual Machine Size
      </Title>
      <Select
        id="vm-size-select"
        value={VMSize.value}
        onChange={onChange}
        style={{ width: '20rem' }}
      >
        {VMSizeOptions.map((item) => (
          <Option
            key={item.value}
            value={item.value}
            data-value={item.value}
            data-compute_units={item.computeUnits}
            data-default_volume_size={item.defaultVolumeSize}
          >
            {`${item.value} - ${item.defaultVolumeSize} GB volume`}
          </Option>
        ))}
      </Select>
    </>
  );
}
