import React from 'react';
import DonutStatistics from './DonutStatistics';
import CostList from './CostList';
import { useCostCalculator } from '../../context/CostCalculatorContext';

export default function ResultStatistics() {
  const { nodeConfigCosts, storageCosts, additionalCosts, totalCosts } =
    useCostCalculator();

  return (
    <>
      <DonutStatistics
        nodeConfigCosts={nodeConfigCosts}
        additionalCosts={additionalCosts}
        storageCosts={storageCosts}
      />
      <CostList
        nodeConfigCosts={nodeConfigCosts}
        additionalCosts={additionalCosts}
        storageCosts={storageCosts}
        totalCosts={totalCosts}
      />
    </>
  );
}
