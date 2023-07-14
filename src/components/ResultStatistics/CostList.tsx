import React from 'react';
import './CostList.css';
import roundDecimals from './roundDecimals';

interface Props {
  baseConfigCosts: number;
  nodeCosts: number;
  storageCosts: number;
  totalCosts: number;
}

export default function CostList(props: Props) {
  const { baseConfigCosts, nodeCosts, storageCosts, totalCosts } = props;

  return (
    <>
      <div className="row">
        <h5 className="text">Base Configuration</h5>
        <h5 className="value">{roundDecimals(baseConfigCosts, true)} €</h5>
      </div>
      <div className="row">
        <h5 className="text">Node</h5>
        <h5 className="value">{roundDecimals(nodeCosts, true)} €</h5>
      </div>
      <div className="row">
        <h5 className="text">Storage</h5>
        <h5 className="value">{roundDecimals(storageCosts, true)} €</h5>
      </div>
      <div className="row" id="final-row">
        <h2 className="text">Total Costs</h2>
        <h3 className="value">{roundDecimals(totalCosts, true)} €</h3>
      </div>
    </>
  );
}
