import config from '../../config.json';

export interface StorageCostProps {
  GBQuantity: number;
  premiumGBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: StorageCostProps): number {
  const { GBQuantity, premiumGBQuantity, timeConsumption } = props;
  const PPU: number = config.Storage.PricePerUnit;
  const premiumPPU: number = config.PremiumStorage.multiplier;

  return (
    PPU * timeConsumption * (GBQuantity / config.Storage.Step) +
    premiumPPU *
      PPU *
      timeConsumption *
      (premiumGBQuantity / config.PremiumStorage.Step)
  );
}
