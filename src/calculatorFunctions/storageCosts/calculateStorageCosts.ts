import config from '../../config.json';

export interface StorageCostProps {
  GBQuantity: number;
  premiumGBQuantity: number;
  snapshotGBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: StorageCostProps): number {
  const { GBQuantity, premiumGBQuantity, snapshotGBQuantity, timeConsumption } = props;
  const PPU: number = config.Storage.PricePerUnit;
  const premiumPPU: number = config.PremiumStorage.multiplier;
  const snapshotPPU: number = config.SnapshotStorage.PricePerUnit;

  return (
    PPU * timeConsumption * (GBQuantity / config.Storage.Step) +
    premiumPPU *
      PPU *
      timeConsumption *
      (premiumGBQuantity / config.PremiumStorage.Step) +
    snapshotPPU * timeConsumption * (snapshotGBQuantity / config.SnapshotStorage.Step)
  );
}
