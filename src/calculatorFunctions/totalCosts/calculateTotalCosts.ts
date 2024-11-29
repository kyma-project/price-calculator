export interface TotalCostsProps {
  baseConfigCosts: number;
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
  const { baseConfigCosts, storageCosts, additionalCosts, conversionRatio } =
    props;
  const costInCU = baseConfigCosts + storageCosts + additionalCosts;
  return { CU: costInCU, CC: costInCU * conversionRatio };
}
