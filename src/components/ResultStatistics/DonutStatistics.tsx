import { DonutChart } from '@ui5/webcomponents-react-charts';
import './DonutStatistics.css';

interface Props {
  nodeConfigCosts: number;
  additionalCosts: number;
  storageCosts: number;
}

const LABELS = ['Worker Nodes', 'Additional Config', 'Storage'];
const COLORS = ['#000080', '#1D428A', '#0437F2'];

function euros(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

// ─── Custom SVG label injected via cloneElement by the UI5 chart ────────────
// Receives recharts Pie label props: cx, cy, midAngle, outerRadius,
// name, value, percent, fill (segment colour).
function SegmentLabel(props: any) {
  const { cx, cy, midAngle, outerRadius, name, value, percent, fill } = props;
  if (!value || percent < 0.005) return null;

  const RADIAN = Math.PI / 180;
  const r = (outerRadius as number) + 18;
  const x = (cx as number) + r * Math.cos(-midAngle * RADIAN);
  const y = (cy as number) + r * Math.sin(-midAngle * RADIAN);
  const anchor = x > (cx as number) + 6 ? 'start' : x < (cx as number) - 6 ? 'end' : 'middle';

  return (
    <g>
      <text x={x} y={y - 10} textAnchor={anchor} fontSize={13} fill={fill} opacity={0.85}>
        {name}
      </text>
      <text x={x} y={y + 7} textAnchor={anchor} fontSize={15} fontWeight="bold" fill={fill}>
        € {euros(value)}
      </text>
      <text x={x} y={y + 25} textAnchor={anchor} fontSize={13} fill={fill} opacity={0.85}>
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
}

// ────────────────────────────────────────────────────────────────────────────
export default function DonutStatistics({ nodeConfigCosts, additionalCosts, storageCosts }: Props) {
  const vals = [
    Math.max(0, nodeConfigCosts),
    Math.max(0, additionalCosts),
    Math.max(0, storageCosts),
  ];
  const total = vals.reduce((a, b) => a + b, 0);

  const dataset = LABELS.map((name, i) => ({ name, value: vals[i] }));

  return (
    <div className="donut-root">
      <DonutChart
        dataset={dataset}
        dimension={{ accessor: 'name' }}
        measure={{
          accessor: 'value',
          colors: COLORS,
          // UI5 checks isValidElement → must be a JSX element, not a component ref
          DataLabel: <SegmentLabel /> as any,
        }}
        centerLabel={total > 0 ? `€ ${euros(total)}` : '–'}
        chartConfig={{
          innerRadius: '35%',
          outerRadius: '75%',
          paddingAngle: 1,
          margin: { top: 50, right: 70, bottom: 50, left: 70 },
        }}
        style={{ height: '360px' }}
        noLegend
        noAnimation
      />
    </div>
  );
}