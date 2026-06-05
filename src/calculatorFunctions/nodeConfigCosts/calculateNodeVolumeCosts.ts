import config from '../../config.json';

export interface NodeVolumeCostProps {
  nodeVolumeSizeGb: number;
  minAutoscaler: number;
  timeConsumption: number;
}

// Billing rounds each node's excess volume up to the next 32-GiB storage
// block before pricing — see consumption-reporter `getSizeRoundedToBlockSize`.
const STORAGE_BLOCK_SIZE_GIB = 32;

export default function calculateNodeVolumeCosts(
  props: NodeVolumeCostProps,
): number {
  const { nodeVolumeSizeGb, minAutoscaler, timeConsumption } = props;
  const volumeConfig = config.nodeConfig.NodeVolumeSize;
  const rawExcess = Math.max(0, nodeVolumeSizeGb - volumeConfig.Default);
  const billedExcessPerNode =
    Math.ceil(rawExcess / STORAGE_BLOCK_SIZE_GIB) * STORAGE_BLOCK_SIZE_GIB;

  return (
    billedExcessPerNode *
    volumeConfig.PricePerUnit *
    minAutoscaler *
    timeConsumption
  );
}
