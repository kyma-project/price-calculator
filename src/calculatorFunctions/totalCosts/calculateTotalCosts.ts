interface Props {
  baseConfigCosts: number;
  storageCosts: number;
  additionalCosts: number;
  conversionRatio: number;
}

interface Costs {
  CU: number;
  CC: number;
}

export default function calculateTotalCosts(props: Props): Costs {
  const { baseConfigCosts, storageCosts, additionalCosts, conversionRatio } =
    props;
  const costInCU = baseConfigCosts + storageCosts + additionalCosts;
  return { CU: costInCU, CC: costInCU * conversionRatio };
}
