import config from '../../config.json';

export interface StorageCostProps {
  GBQuantity: number;
  premiumGBQuantity: number;
  snapshotGBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: StorageCostProps): number {
  const { GBQuantity, premiumGBQuantity, snapshotGBQuantity, timeConsumption } =
    props;
  const PPU: number = config.Storage.PricePerUnit;
  const premiumPPU: number = config.PremiumStorage.multiplier;
  const snapshotPPU: number = config.SnapshotStorage.multiplier;

  // Standard storage gets a fixed number of free blocks before billing; premium
  // (NFS) and snapshot do not.
  const billableStandardBlocks: number = Math.max(
    0,
    GBQuantity / config.Storage.Step - config.Storage.FreeStorageBlocks,
  );

  return (
    PPU * timeConsumption * billableStandardBlocks +
    premiumPPU *
      PPU *
      timeConsumption *
      (premiumGBQuantity / config.PremiumStorage.Step) +
    snapshotPPU *
      PPU *
      timeConsumption *
      (snapshotGBQuantity / config.SnapshotStorage.Step)
  );
}
