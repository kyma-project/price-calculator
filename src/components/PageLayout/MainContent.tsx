import React from 'react';
import CostWizard from '../CostWizard/CostWizard';
import './MainContent.css';

export default function MainContent() {
  return (
    <div id="MainContent">
      <h1 className="header">Estimate the costs for your Kyma Runtime</h1>
      <h4 className="header">
        Size your scenario to calculate the required capacity units
      </h4>
      <CostWizard />
    </div>
  );
}
