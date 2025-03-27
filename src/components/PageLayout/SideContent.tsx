import React from 'react';
import ResultStatistics from '../ResultStatistics/ResultStatistics';
import './SideContent.css';
import { timeConsumptionState } from '../../state/additionalConfig/timeConsumptionState';
import { useRecoilValue } from 'recoil';

export default function SideContent() {
  const timeConsumption = useRecoilValue<number>(timeConsumptionState);
  
  return (
    <div id="SideContent">
      <h1 id="SideHeader">Resulting total costs</h1>
      <h4 id="SideHeader2">(per month ≈ {timeConsumption} hrs.)</h4>
      <ResultStatistics />
    </div>
  );
}
