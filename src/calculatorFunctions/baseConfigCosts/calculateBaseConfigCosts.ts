import config from '../../config.json';

export interface BaseConfigProps {
  timeConsumption: number;
  vmMultiplier: number;
  minAutoscaler: number;
  machineTypeFactor: number;
}

export default function calculateBaseConfigCosts(
  props: BaseConfigProps,
): number {
  const { timeConsumption, minAutoscaler, vmMultiplier, machineTypeFactor } =
    props;

  const PPU: number = config.baseConfig.PricePerUnit;
  const BaseStorageEventsPPU: number =
    config.baseConfig.BaseStorageEventsPricePerUnit;

  return (
    minAutoscaler * timeConsumption * PPU * vmMultiplier * machineTypeFactor +
    BaseStorageEventsPPU
  );
}
