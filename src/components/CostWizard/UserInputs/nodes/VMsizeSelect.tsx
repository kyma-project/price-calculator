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
    });
  };

  return (
    <>
      <Title className="wizard-subheader" level="H5" size="H5">
        Virtual Machine Size
      </Title>
      <Select id={'vm-size-select'} value={VMSize.value} onChange={onChange}>
        {VMSizeOptions.map((item) => (
          <Option
            key={item.value}
            data-value={item.value}
            data-compute_units={item.computeUnits}
            selected={item.value === VMSize.value}
          >
            {item.value}
          </Option>
        ))}
      </Select>
    </>
  );
}
