import config from '../../config.json';

export interface AdditionalNodeVolumeCostProps {
  additionalVolumeGb: number;
  minAutoscaler: number;
  timeConsumption: number;
}

// Billing rounds each node's extra volume up to the next 32 GB block before
// pricing (see consumption-reporter getSizeRoundedToBlockSize).
const STORAGE_BLOCK_SIZE_GB = 32;

export default function calculateAdditionalNodeVolumeCosts(
  props: AdditionalNodeVolumeCostProps,
): number {
  const { additionalVolumeGb, minAutoscaler, timeConsumption } = props;
  const volumeConfig = config.nodeConfig.AdditionalNodeVolume;
  const safeAdditional = Math.max(0, additionalVolumeGb);
  const billedExtraPerNode =
    Math.ceil(safeAdditional / STORAGE_BLOCK_SIZE_GB) * STORAGE_BLOCK_SIZE_GB;

  return (
    billedExtraPerNode *
    volumeConfig.PricePerUnit *
    minAutoscaler *
    timeConsumption
  );
}
