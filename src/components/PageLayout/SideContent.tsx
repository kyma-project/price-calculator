import React from 'react';
import InfoField from '../CostWizard/common/InfoField';
import ResultStatistics from '../ResultStatistics/ResultStatistics';
import './SideContent.css';

export default function SideContent() {
  return (
    <div>
    <div id="SideContent">
      <h1 id="SideHeader">Resulting total costs in Capacity Units</h1>
      <h4 id="SideHeader2">(per month)</h4>
      <ResultStatistics />
    </div >
      <InfoField css="infoSideContent" info="CU stands for capacity Units and 1 CU equals 1 €" />
    </div>
  );
}
