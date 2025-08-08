import React from 'react';
import { useAtomValue } from 'jotai';
import ResultStatistics from '../ResultStatistics/ResultStatistics';
import './SideContent.css';
import { timeConsumptionState } from '../../state/additionalConfig/timeConsumptionState';

export default function SideContent() {
  const timeConsumption = useAtomValue(timeConsumptionState);

  return (
    <div id="SideContent">
      <h1 id="SideHeader">Resulting total costs</h1>
      <h4 id="SideHeader2">(per month ≈ {timeConsumption} hrs.)</h4>
      <ResultStatistics />
    </div>
  );
}
