import React from 'react';
import config from '../../../../config.json';
import { Slider, StepInput } from '@ui5/webcomponents-react';
import HeaderWithInfo from '../../common/HeaderWithInfo';
import { useRecoilState } from 'recoil';
import { MachineSetup, machineSetupState } from '../../../../state/nodes/machineSetupState';

interface Props {
  nodeIndex: number;
}
export default function MinAutoscalerInputField(props:Props) {
  const configuration = config.nodeConfig.AutoScalerMin;
  const min = configuration.Min;
  const max = configuration.Max;
  const step = configuration.Step;

  const [machineSetup, setMachineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);

  function handleChange(event: any): void {
    const newValue: number = parseInt(event.target.value);
    setMachineSetup(prevSetups =>
      prevSetups.map((setup, index) =>
      index === props.nodeIndex ? { ...setup, minAutoscaler: newValue } : setup));
  }

  return (
    <>
      <HeaderWithInfo
        header="Autoscaler Min"
        info="minimum number of available Virtual Machines"
      />
      <StepInput
        value={machineSetup.at(props.nodeIndex)?.minAutoscaler}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
      <Slider
        value={machineSetup.at(props.nodeIndex)?.minAutoscaler}
        onInput={handleChange}
        min={min}
        max={max}
        step={step}
        showTooltip
      />
    </>
  );
}
