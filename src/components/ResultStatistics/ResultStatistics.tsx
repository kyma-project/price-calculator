import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalCostsState } from '../../state/costs/totalCostsState';
import DonutStatistics from './DonutStatistics';
import { baseConfigCostsState } from '../../state/costs/baseConfigCostsState';
import { nodeCostsState } from '../../state/costs/nodeCostsState';
import { storageCostsState } from '../../state/costs/storageCostsState';
import CostList from './CostList';

export default function ResultStatistics() {
  const baseConfigCosts: number = useRecoilValue<number>(baseConfigCostsState);
  const nodeCosts: number = useRecoilValue<number>(nodeCostsState);
  const storageCosts: number = useRecoilValue<number>(storageCostsState);
  const totalCosts = useRecoilValue<number>(totalCostsState);

  return (
    <>
      <DonutStatistics
        baseConfigCosts={baseConfigCosts}
        nodeCosts={nodeCosts}
        storageCosts={storageCosts}
      />
      <CostList
        baseConfigCosts={baseConfigCosts}
        nodeCosts={nodeCosts}
        storageCosts={storageCosts}
        totalCosts={totalCosts}
      />
    </>
  );
}
