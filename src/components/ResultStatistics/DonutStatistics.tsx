import { DonutChart } from '@ui5/webcomponents-react-charts';
import './DonutStatistics.css';

// ── Types ────────────────────────────────────────────────────────────────────

interface Props {
  nodeConfigCosts: number;
  additionalCosts: number;
  storageCosts: number;
}

/** Props injected by recharts into each custom DataLabel element. */
interface SegmentLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  outerRadius: number;
  name: string;
  value: number;
  percent: number;
  fill: string;
}

// ── Constants ────────────────────────────────────────────────────────────────

const SEGMENTS = [
  { label: 'Worker Nodes',     color: '#000080' },
  { label: 'Additional Config', color: '#1D428A' },
  { label: 'Storage',          color: '#0437F2' },
] as const;

const RADIAN = Math.PI / 180;

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCUs(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2);
}

// ── SegmentLabel ─────────────────────────────────────────────────────────────

/**
 * Custom SVG callout rendered outside each donut segment.
 *
 * UI5 injects this via React.cloneElement, forwarding standard recharts
 * Pie label props (cx, cy, midAngle, outerRadius, name, value, percent, fill).
 */
function SegmentLabel(props: SegmentLabelProps) {
  const { cx, cy, midAngle, outerRadius, name, value, percent, fill } = props;

  if (!value || percent < 0.005) return null;

  const r = outerRadius + 18;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  const anchor = x > cx + 6 ? 'start' : x < cx - 6 ? 'end' : 'middle';

  return (
    <g>
      <text x={x} y={y - 10} textAnchor={anchor} fontSize={13} fill={fill} opacity={0.85}>
        {name}
      </text>
      <text x={x} y={y + 7} textAnchor={anchor} fontSize={15} fontWeight="bold" fill={fill}>
        {formatCUs(value)} CU
      </text>
      <text x={x} y={y + 25} textAnchor={anchor} fontSize={13} fill={fill} opacity={0.85}>
        {(percent * 100).toFixed(1)}%
      </text>
    </g>
  );
}

// ── Component ────────────────────────────────────────────────────────────────

export default function DonutStatistics({ nodeConfigCosts, additionalCosts, storageCosts }: Props) {
  const vals = [nodeConfigCosts, additionalCosts, storageCosts].map((v) => Math.max(0, v));
  const total = vals.reduce((a, b) => a + b, 0);

  const dataset = SEGMENTS.map(({ label }, i) => ({ name: label, value: vals[i] }));
  const colors = SEGMENTS.map(({ color }) => color);

  return (
    <div className="donut-root">
      <DonutChart
        dataset={dataset}
        dimension={{ accessor: 'name' }}
        measure={{
          accessor: 'value',
          colors,
          // UI5 requires an element (not a ref) so it can cloneElement and inject props
          DataLabel: <SegmentLabel /> as any,
        }}
        centerLabel={total > 0 ? `${formatCUs(total)}` : '–'}
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
