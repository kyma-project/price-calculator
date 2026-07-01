import { Option, Select, Title } from '@ui5/webcomponents-react';
import { VMSize } from '../../../../state/nodes/machineSetupState';
import calculateDefaultVolumeSize from '../../../../calculatorFunctions/defaultVolumeSize/calculateDefaultVolumeSize';

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
      vcpus: Number(selection.vcpus),
      memoryGib: Number(selection.memory_gib),
    });
  };

  return (
    <div>
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
            data-vcpus={item.vcpus}
            data-memory_gib={item.memoryGib}
          >
            {`${item.value} - ${calculateDefaultVolumeSize(item.vcpus, item.memoryGib)} GiB volume`}
          </Option>
        ))}
      </Select>
    </div>
  );
}
