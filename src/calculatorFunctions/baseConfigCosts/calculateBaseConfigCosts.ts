import config from '../../config.json';

interface Props {
  timeConsumption: number;
  vmMultiplier: number;
  minAutoscaler: number;
}

export default function calculateBaseConfigCosts(props: Props): number {
  const { timeConsumption, minAutoscaler, vmMultiplier } = props;

  const PPU: number = config.baseConfig.PricePerUnit;
  const BaseStorageEventsPPU: number =
    config.baseConfig.BaseStorageEventsPricePerUnit;

  return (
    minAutoscaler * timeConsumption * PPU * vmMultiplier + BaseStorageEventsPPU
  );
}
