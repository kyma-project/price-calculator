import config from '../../config.json';

export interface NodeConfigProps {
  timeConsumption: number;
  vmMultiplier: number;
  minAutoscaler: number;
  machineTypeFactor: number;
}

export default function calculateNodeConfigCosts(
  props: NodeConfigProps,
): number {
  const { timeConsumption, minAutoscaler, vmMultiplier, machineTypeFactor } =
    props;

  const PPU: number = config.nodeConfig.PricePerUnit;
  const BaseStorageEventsPPU: number =
    config.nodeConfig.BaseStorageEventsPricePerUnit;

  return (
    minAutoscaler * timeConsumption * PPU * vmMultiplier * machineTypeFactor +
    BaseStorageEventsPPU
  );
}
