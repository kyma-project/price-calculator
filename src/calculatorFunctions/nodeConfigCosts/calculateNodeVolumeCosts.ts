import config from '../../config.json';

export interface NodeVolumeCostProps {
  nodeVolumeSizeGb: number;
  minAutoscaler: number;
  timeConsumption: number;
}

export default function calculateNodeVolumeCosts(
  props: NodeVolumeCostProps,
): number {
  const { nodeVolumeSizeGb, minAutoscaler, timeConsumption } = props;
  const volumeConfig = config.nodeConfig.NodeVolumeSize;
  const excessGb = Math.max(0, nodeVolumeSizeGb - volumeConfig.Default);

  return excessGb * volumeConfig.PricePerUnit * minAutoscaler * timeConsumption;
}
