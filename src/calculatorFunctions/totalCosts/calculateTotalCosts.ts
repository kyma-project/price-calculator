interface Props {
  baseConfigCosts: number;
  nodeCosts: number;
  storageCosts: number;
}

export default function calculateTotalCosts(props: Props): number {
  const { baseConfigCosts, nodeCosts, storageCosts } = props;
  return baseConfigCosts + nodeCosts + storageCosts;
}
