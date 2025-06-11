interface Props {
  redis: number;
}

export default function calculateAdditionalCosts(props: Props): number {
  const { redis } = props;

  return redis;
}
