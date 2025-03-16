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
import { costNodeState } from "../../state/costStatus";

interface Props {
  nodeIndex: number;
  workerNode: boolean;
}
export default function MachineSetup(props: Props) {
  const [machineSetup, setMachineSetup] = useRecoilState(machineSetupState);
  const [costNode,setCostNode] = useRecoilState(costNodeState);
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
        visible: true
      },
    ]);
    setCostNode([...costNode, 0]);
  }

  const { setBaseConfigCosts } = useCostCalculator();

  useEffect(() => {

    let baseConfigCosts = 0;
     for (let i = 0; i < machineSetup.length; i++) {
      if (machineSetup.at(i)?.visible) {
        const updatedCost = calculateBaseConfigCosts({
          timeConsumption: machineSetup.at(i)?.timeConsuption ?? timeConsumptionDefaultValue,
          vmMultiplier: machineSetup.at(i)?.VMSize.multiple ?? VMSizeDefaultMultiple,
          minAutoscaler: machineSetup.at(i)?.minAutoscaler ?? autoscalerMinValue,
          machineTypeFactor: machineSetup.at(i)?.machineType.multiple ?? machineTypeDefaultMultiple,
        });
        baseConfigCosts += updatedCost;
        if (i===props.nodeIndex){

          setCostNode((prevSetups) =>
            prevSetups.map((setup, index) =>
              index === props.nodeIndex ? updatedCost : setup)
            );
        }
      }
    }
    setBaseConfigCosts(baseConfigCosts);
  }, [
    setBaseConfigCosts,
    machineSetup,
    machineTypeDefaultMultiple,
    autoscalerMinValue,
    VMSizeDefaultMultiple,
    timeConsumptionDefaultValue,
    props.nodeIndex, setCostNode
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
