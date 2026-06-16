import config from '../../config.json';

interface Props {
  redisStorageGb: number;
  timeConsumption: number;
}

// Redis is billed like storage: GB are converted to 32-GiB blocks, then priced
// at the storage block rate and scaled by time consumption.
export default function calculateAdditionalCosts(props: Props): number {
  const { redisStorageGb, timeConsumption } = props;

  const redisStorageBlocks = redisStorageGb / config.Storage.Step;

  return redisStorageBlocks * config.Storage.PricePerUnit * timeConsumption;
}
