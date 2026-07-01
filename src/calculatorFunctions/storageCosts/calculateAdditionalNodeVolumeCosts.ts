import config from '../../config.json';

export interface AdditionalNodeVolumeCostProps {
  additionalVolumeGib: number;
  minAutoscaler: number;
  timeConsumption: number;
}

// Billing rounds each node's extra volume up to the next 32 GiB block before
// pricing (see consumption-reporter getSizeRoundedToBlockSize).
const STORAGE_BLOCK_SIZE_GIB = 32;

export default function calculateAdditionalNodeVolumeCosts(
  props: AdditionalNodeVolumeCostProps,
): number {
  const { additionalVolumeGib, minAutoscaler, timeConsumption } = props;
  const volumeConfig = config.nodeConfig.AdditionalNodeVolume;
  const safeAdditional = Math.max(0, additionalVolumeGib);
  const billedExtraPerNode =
    Math.ceil(safeAdditional / STORAGE_BLOCK_SIZE_GIB) * STORAGE_BLOCK_SIZE_GIB;

  return (
    billedExtraPerNode *
    volumeConfig.PricePerUnit *
    minAutoscaler *
    timeConsumption
  );
}
