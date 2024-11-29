import { DonutChart } from '@ui5/webcomponents-react-charts';
import React, { useState } from 'react';
import roundDecimals from './roundDecimals';
import './DonutStatistics.css';

interface Props {
  baseConfigCosts: number;
  additionalCosts: number;
  storageCosts: number;
}

export default function DonutStatistics(props: Props) {
  const { baseConfigCosts, additionalCosts, storageCosts } = props;
  const [activeSegment, setActiveSegment] = useState(0);
  const handleClick = (event: CustomEvent) => {
    setActiveSegment(event.detail.index ?? event.detail.dataIndex ?? -1);
  };

  return (
    <DonutChart
      id="donut-chart"
      dataset={[
        {
          name: 'Base Configuration',
          costs: roundDecimals(baseConfigCosts, false),
        },
        {
          name: 'Storage',
          costs: roundDecimals(storageCosts, false),
        },

        {
          name: 'Additional',
          costs: roundDecimals(additionalCosts, false),
        },
      ]}
      dimension={{
        accessor: 'name',
      }}
      measure={{
        accessor: 'costs',
        colors: ['#000080', '#1D428A', '#0437F2'],
      }}
      chartConfig={{
        paddingAngle: 0.5,
        innerRadius: '40%',
        outerRadius: '80%',
        activeSegment: activeSegment,
        margin: { left: 40, right: 40, top: 40, bottom: 40 },
      }}
      noAnimation={true}
      onClick={handleClick}
      onDataPointClick={() => {}}
      onLegendClick={() => {}}
    />
  );
}
