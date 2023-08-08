import React from 'react';
import ResultStatistics from '../ResultStatistics/ResultStatistics';
import './SideContent.css';

export default function SideContent() {
  return (
    <div id="SideContent">
      <h1 id="SideHeader">Resulting total costs in Capacity Units</h1>
      <h4 id="SideHeader2">(per month)</h4>
      <ResultStatistics />
    </div >
  );
}
