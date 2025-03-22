import config from '../../config.json';

export interface NodeConfigProps {
  timeConsumption: number;
  computeUnits: number;
  minAutoscaler: number;
  machineTypeFactor: number;
}

export default function calculateNodeConfigCosts(
  props: NodeConfigProps,
): number {
  const { timeConsumption, minAutoscaler, computeUnits, machineTypeFactor } =
    props;

  const PPU: number = config.nodeConfig.PricePerUnit;

  return (
    minAutoscaler * computeUnits * PPU * machineTypeFactor * timeConsumption
  );
}
