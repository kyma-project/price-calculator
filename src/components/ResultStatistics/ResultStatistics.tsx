import { useAtomValue } from 'jotai';
import DonutStatistics from './DonutStatistics';
import CostList from './CostList';
import {
  nodeConfigCostsAtom,
  storageCostsAtom,
  additionalCostsAtom,
  totalCostsAtom,
} from '../../state/costState';

export default function ResultStatistics() {
  const nodeConfigCosts = useAtomValue(nodeConfigCostsAtom);
  const storageCosts = useAtomValue(storageCostsAtom);
  const additionalCosts = useAtomValue(additionalCostsAtom);
  const totalCosts = useAtomValue(totalCostsAtom);

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
