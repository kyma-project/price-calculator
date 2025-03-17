import React, { useEffect } from "react";
import { Form } from "@ui5/webcomponents-react";
import VMsizeSelect from "./UserInputs/nodes/VMsizeSelect";
import MachineTypeSelect from "./UserInputs/nodes/MachineTypeSelect";
import MinAutoscalerInputField from "./UserInputs/nodes/MinAutoscalerInputField";
import "./CostWizard.css";
import calculateNodeConfigCosts from "../../calculatorFunctions/nodeConfigCosts/calculateNodeConfigCosts";
import { useCostCalculator } from "../../context/CostCalculatorContext";
import { useRecoilState } from "recoil";
import { MachineSetup, machineSetupState } from "../../state/nodes/machineSetupState";
import config from "../../config.json";
import { costNodeState } from "../../state/costStatus";

interface Props {
  nodeIndex: number;
  workerNode: boolean;
}
export default function MachineSetupForm(props: Props) {
  const [machineSetup, setMachineSetup] = useRecoilState<MachineSetup[]>(machineSetupState);
  const [costNode, setCostNode] = useRecoilState(costNodeState);
  const autoscalerMinValue = config.nodeConfig.AutoScalerMin.Min;
  const timeConsumptionDefaultValue = config.nodeConfig.TimeConsumption.Default;
  const machineTypeDefaultValue =
    config.nodeConfig.machineTypeFactor.MachineTypes[0];
  const machineTypeDefaultValueVMSize = machineTypeDefaultValue.VMSizeOptions[0];
  if (props.nodeIndex >= machineSetup.length) {
    //permit the component to be not in race condition between rendering / updating
    setTimeout(() => {
      setMachineSetup([
      ...machineSetup,
      {
        machineType: {
          value: machineTypeDefaultValue.value,
          multiple: machineTypeDefaultValue.multiple,
        },
        minAutoscaler: autoscalerMinValue,
        timeConsuption: timeConsumptionDefaultValue,
        VMSize: {
          value: machineTypeDefaultValueVMSize.value,
          multiple: machineTypeDefaultValueVMSize.multiple,
          nodes: machineTypeDefaultValueVMSize.nodes
        },
        visible: true
      },
    ]);
    setCostNode([...costNode, 0]);
  }, 0);
  }

  const { setNodeConfigCosts } = useCostCalculator();

  useEffect(() => {

    let nodeConfigCosts = 0;
     for (let i = 0; i < machineSetup.length; i++) {
      if (machineSetup.at(i)?.visible) {
        const updatedCost = calculateNodeConfigCosts({
          timeConsumption: machineSetup.at(i)?.timeConsuption ?? timeConsumptionDefaultValue,
          vmMultiplier: machineSetup.at(i)?.VMSize.multiple ?? machineTypeDefaultValueVMSize.multiple,
          minAutoscaler: machineSetup.at(i)?.minAutoscaler ?? autoscalerMinValue,
          machineTypeFactor: machineSetup.at(i)?.machineType.multiple ?? machineTypeDefaultValue.multiple,
        });
        nodeConfigCosts += updatedCost;
        if (i===props.nodeIndex){

          setCostNode((prevSetups) =>
            prevSetups.map((setup, index) =>
              index === props.nodeIndex ? updatedCost : setup)
            );
        }
      }
    }
    setNodeConfigCosts(nodeConfigCosts);
  }, [
    setNodeConfigCosts,
    machineSetup,
    autoscalerMinValue,
    machineTypeDefaultValue,
    machineTypeDefaultValueVMSize,
    timeConsumptionDefaultValue,
    props.nodeIndex, setCostNode
  ]);
  return (
    <Form>
      <MachineTypeSelect
        nodeIndex={props.nodeIndex}
        workerNode={props.workerNode}
      />
      <VMsizeSelect nodeIndex={props.nodeIndex} />
      <MinAutoscalerInputField nodeIndex={props.nodeIndex} />
    </Form>
  );
}
