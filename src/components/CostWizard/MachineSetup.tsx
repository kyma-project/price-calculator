import React, { useEffect } from "react";
import { Form } from "@ui5/webcomponents-react";
import VMsizeSelect from "./UserInputs/nodes/VMsizeSelect";
import MachineTypeSelect from "./UserInputs/nodes/MachineTypeSelect";
import MinAutoscalerInputField from "./UserInputs/nodes/MinAutoscalerInputField";
import "./CostWizard.css";
import calculateBaseConfigCosts from "../../calculatorFunctions/baseConfigCosts/calculateBaseConfigCosts";
import { useCostCalculator } from "../../context/CostCalculatorContext";
import { useRecoilState } from "recoil";
import { machineSetupState } from "../../state/nodes/machineSetupState";
import config from "../../config.json";

interface Props {
  nodeIndex: number;
  workerNode: boolean;
}
export default function MachineSetup(props: Props) {
  const [machineSetup, setMachineSetup] = useRecoilState(machineSetupState);
  const autoscalerMinValue = config.baseConfig.AutoScalerMin.Min;
  const timeConsumptionDefaultValue = config.baseConfig.TimeConsumption.Default;
  const machineTypeDefaultValue =
    config.baseConfig.machineTypeFactor.MachineTypes[0].value;
  const machineTypeDefaultMultiple =
    config.baseConfig.machineTypeFactor.MachineTypes[0].multiple;
  const VMSizeDefaultValue =
    config.baseConfig.VirtualMachineSize.Options[0].value;
  const VMSizeDefaultMultiple =
    config.baseConfig.VirtualMachineSize.Options[0].multiple;
  const VMSizeDefaultNodes =
    config.baseConfig.VirtualMachineSize.Options[0].nodes;
  const costCalcultaionDefaultObject = {
    timeConsumption: timeConsumptionDefaultValue,
    vmMultiplier: VMSizeDefaultMultiple,
    minAutoscaler: autoscalerMinValue,
    machineTypeFactor: machineTypeDefaultMultiple,
  };

  if (props.nodeIndex >= machineSetup.length) {
    setMachineSetup([
      ...machineSetup,
      {
        machineType: {
          value: machineTypeDefaultValue,
          multiple: machineTypeDefaultMultiple,
        },
        minAutoscaler: autoscalerMinValue,
        timeConsuption: timeConsumptionDefaultValue,
        VMSize: {
          value: VMSizeDefaultValue,
          multiple: VMSizeDefaultMultiple,
          nodes: VMSizeDefaultNodes,
        },
        visible: true,
        costCalulation: calculateBaseConfigCosts(costCalcultaionDefaultObject),
      },
    ]);
  }

  const { setBaseConfigCosts } = useCostCalculator();

  useEffect(() => {
    const updatedCostCalculation = calculateBaseConfigCosts({
      timeConsumption: timeConsumptionDefaultValue,
      vmMultiplier:
        machineSetup.at(props.nodeIndex)?.VMSize.multiple ??
        VMSizeDefaultMultiple,
      minAutoscaler:
        machineSetup.at(props.nodeIndex)?.minAutoscaler ?? autoscalerMinValue,
      machineTypeFactor:
        machineSetup.at(props.nodeIndex)?.machineType.multiple ??
        machineTypeDefaultMultiple,
    });
    setMachineSetup((prevSetups) =>
      prevSetups.map((setup, index) =>
        index === props.nodeIndex
          ? { ...setup, costCalulation: updatedCostCalculation }
          : setup
      )
    );
    let baseConfigCosts = 0;
    for (let i = 0; i < machineSetup.length; i++) {
      if (i === props.nodeIndex && machineSetup.at(i)?.visible) {
        baseConfigCosts += updatedCostCalculation;
      } else if (machineSetup.at(i)?.visible) {
        baseConfigCosts += machineSetup.at(i)?.costCalulation ?? 0;
      }
    }

    setBaseConfigCosts(baseConfigCosts);
  }, [
    setBaseConfigCosts, 
    machineSetup.at(props.nodeIndex)?.visible,
    machineSetup.at(props.nodeIndex)?.VMSize,
    machineSetup.at(props.nodeIndex)?.machineType.multiple,
    machineSetup.at(props.nodeIndex)?.minAutoscaler,
  ]);
  return (
    <Form>
      <VMsizeSelect nodeIndex={props.nodeIndex} />
      <MachineTypeSelect
        nodeIndex={props.nodeIndex}
        workerNode={props.workerNode}
      />
      <MinAutoscalerInputField nodeIndex={props.nodeIndex} />
    </Form>
  );
}
