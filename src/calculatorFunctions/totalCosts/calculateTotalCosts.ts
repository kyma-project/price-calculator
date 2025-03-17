export interface TotalCostsProps {
  nodeConfigCosts: number;
  storageCosts: number;
  additionalCosts: number;
  conversionRatio: number;
}

export interface TotalCosts {
  CU: number;
  CC: number;
}

export default function calculateTotalCosts(
  props: TotalCostsProps,
): TotalCosts {
  const { nodeConfigCosts, storageCosts, additionalCosts, conversionRatio } =
    props;
  const costInCU = nodeConfigCosts + storageCosts + additionalCosts;
  return { CU: costInCU, CC: costInCU * conversionRatio };
}
