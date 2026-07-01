import config from '../../config.json';

export interface StorageCostProps {
  GiBQuantity: number;
  nfsGiBQuantity: number;
  snapshotGiBQuantity: number;
  timeConsumption: number;
}

export default function calculateStorageCosts(props: StorageCostProps): number {
  const { GiBQuantity, nfsGiBQuantity, snapshotGiBQuantity, timeConsumption } =
    props;
  const PPU: number = config.Storage.PricePerUnit;
  const nfsPPU: number = config.NFSStorage.multiplier;
  const snapshotPPU: number = config.SnapshotStorage.multiplier;

  // Standard storage gets a fixed number of free blocks before billing; NFS and
  // snapshot do not.
  const billableStandardBlocks: number = Math.max(
    0,
    GiBQuantity / config.Storage.Step - config.Storage.FreeStorageBlocks,
  );

  return (
    PPU * timeConsumption * billableStandardBlocks +
    nfsPPU * PPU * timeConsumption * (nfsGiBQuantity / config.NFSStorage.Step) +
    snapshotPPU *
      PPU *
      timeConsumption *
      (snapshotGiBQuantity / config.SnapshotStorage.Step)
  );
}
