import { DonutChart } from '@ui5/webcomponents-react-charts';
import React, { useState } from 'react';
import roundDecimals from './roundDecimals';

interface Props {
  baseConfigCosts: number;
  nodeCosts: number;
  storageCosts: number;
}

export default function DonutStatistics(props: Props) {
  const { baseConfigCosts, nodeCosts, storageCosts } = props;
  const [activeSegment, setActiveSegment] = useState(0);
  const handleClick = (event: CustomEvent) => {
    setActiveSegment(event.detail.index ?? event.detail.dataIndex ?? -1);
  };

  return (
    <DonutChart
      dataset={[
        {
          name: 'Base Configuration',
          costs: roundDecimals(baseConfigCosts, false),
        },
        {
          name: 'Node',
          costs: roundDecimals(nodeCosts, false),
        },
        {
          name: 'Storage',
          costs: roundDecimals(storageCosts, false),
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
