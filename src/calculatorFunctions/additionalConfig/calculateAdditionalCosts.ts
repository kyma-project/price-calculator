interface Props {
  redis: number;
}

// Redis costs are flat monthly CU values per tier (not hourly rates),
// so they are not scaled by timeConsumption unlike node and storage costs.
export default function calculateAdditionalCosts(props: Props): number {
  const { redis } = props;

  return redis;
}
