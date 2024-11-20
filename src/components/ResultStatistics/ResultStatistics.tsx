import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalCostsInCCState, totalCostsState } from '../../state/costs/totalCostsState';
import DonutStatistics from './DonutStatistics';
import { baseConfigCostsState } from '../../state/costs/baseConfigCostsState';
import { additionalCostsState } from '../../state/costs/additionalCostsState';
import { storageCostsState } from '../../state/costs/storageCostsState';
import CostList from './CostList';

export default function ResultStatistics() {
  const baseConfigCosts: number = useRecoilValue<number>(baseConfigCostsState);
  const additionalCosts: number = useRecoilValue<number>(additionalCostsState);
  const storageCosts: number = useRecoilValue<number>(storageCostsState);
  const totalCosts = useRecoilValue<number>(totalCostsState);
  const totalCostsInCC = useRecoilValue<number>(totalCostsInCCState);

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
        totalCostsInCC={totalCostsInCC}
      />
    </>
  );
}
