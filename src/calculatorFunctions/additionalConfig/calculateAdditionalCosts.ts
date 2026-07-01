import config from '../../config.json';

interface Props {
  redisStorageGib: number;
  timeConsumption: number;
}

// Redis is billed like storage: GiB are converted to 32-GiB blocks, then priced
// at the storage block rate and scaled by time consumption.
export default function calculateAdditionalCosts(props: Props): number {
  const { redisStorageGib, timeConsumption } = props;

  const redisStorageBlocks = redisStorageGib / config.Storage.Step;

  return redisStorageBlocks * config.Storage.PricePerUnit * timeConsumption;
}
