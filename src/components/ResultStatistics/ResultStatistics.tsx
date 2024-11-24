import React from 'react';
import DonutStatistics from './DonutStatistics';
import CostList from './CostList';
import { useCostCalculator } from '../../context/CostCalculatorContext';

export default function ResultStatistics() {
  const { baseConfigCosts, storageCosts, additionalCosts, totalCosts } =
    useCostCalculator();

  return (
    <>
      <DonutStatistics
        baseConfigCosts={baseConfigCosts}
        additionalCosts={additionalCosts}
        storageCosts={storageCosts}
      />
      <CostList
        baseConfigCosts={baseConfigCosts}
        additionalCosts={additionalCosts}
        storageCosts={storageCosts}
        totalCosts={totalCosts}
      />
    </>
  );
}
